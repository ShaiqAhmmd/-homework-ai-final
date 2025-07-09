'use client'
import React, { useRef, useState } from 'react'
import Tesseract from 'tesseract.js'

type Props = {
  question: string
  setQuestion: (q: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

export default function QuestionForm({ question, setQuestion, onKeyDown }: Props) {
  const [image, setImage] = useState<File | null>(null)
  const [ocrLoading, setOcrLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      processImage(e.target.files[0])
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImage(e.dataTransfer.files[0])
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  async function processImage(file: File) {
    setImage(file)
    setOcrLoading(true)
    try {
      const { data } = await Tesseract.recognize(file, 'eng', {
        logger: () => {}
      })
      setQuestion(data.text.trim())
    } catch {
      alert('Failed to extract text from image.')
    }
    setOcrLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Question Input */}
      <div className="bg-white rounded-xl shadow p-6">
        <label className="block font-semibold text-gray-900 mb-2">
          Your Homework Question
        </label>
        <textarea
          className="w-full min-h-[100px] border border-gray-200 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Paste your question here (e.g. 'Solve for x: 3x + 5 = 20')"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>

      {/* Image Upload */}
      <div
        className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition min-h-[150px]"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image ? (
          <div className="flex flex-col items-center">
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="max-h-32 mb-2 rounded"
            />
            <span className="text-gray-700 text-sm">{image.name}</span>
            {ocrLoading && (
              <span className="text-blue-500 text-sm mt-2">Extracting text...</span>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🖼️</span>
            <span className="text-gray-500">
              Drag &amp; drop an image or click to upload
            </span>
            <span className="text-xs text-gray-400 mt-1">
              Supports JPG, PNG (Max 5MB)
            </span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>
    </div>
  )
}