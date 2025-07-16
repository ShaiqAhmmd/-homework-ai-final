const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const app = express();
app.use(cors());
const upload = multer();

app.post('/extract', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text, numpages: data.numpages, info: data.info });
  } catch (e) {
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`PDF API running on port ${PORT}`));