const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/download-glb', async (req, res) => {
  const { url, name } = req.body;
  if (!url || !name) return res.status(400).json({ error: 'Missing url or name' });

  const fileName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.glb';
  const filePath = path.join(__dirname, '../../frontend/public/models/', fileName);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch GLB');
    const dest = fs.createWriteStream(filePath);
    response.body.pipe(dest);
    response.body.on('end', () => {
      res.json({ localPath: `/models/${fileName}` });
    });
    response.body.on('error', () => {
      res.status(500).json({ error: 'Stream error' });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;