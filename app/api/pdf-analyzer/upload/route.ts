import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';
import Tesseract from 'tesseract.js';
import pdfParse from 'pdf-parse';

export const runtime = 'nodejs'; // Required for file stream

function bufferFromReadable(readable: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readable.on('data', (chunk) => chunks.push(chunk));
    readable.on('end', () => resolve(Buffer.concat(chunks)));
    readable.on('error', reject);
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimetype = file.type;
    let extractedText = '';

    if (mimetype.includes('pdf')) {
      const data = await pdfParse(buffer);
      extractedText = data.text;
    } else if (mimetype.startsWith('image/')) {
      const imageResult = await Tesseract.recognize(buffer, 'eng');
      extractedText = imageResult.data.text;
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 });
    }

    if (!extractedText || extractedText.trim().length < 25) {
      return NextResponse.json({ error: 'No readable text found' }, { status: 400 });
    }

    return NextResponse.json({
      text: extractedText,
    });
  } catch (err) {
    console.error('❌ Text extraction failed:', err);
    return NextResponse.json({ error: 'Internal error extracting text' }, { status: 500 });
  }
}