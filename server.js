const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();



const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
const token = process.env.KEY_TOKEN;
app.post('/api/poem', async (req, res) => {
  const { name } = req.body;

  const prompt = `ช่วยแต่งคำชวนเป็นกลอน 4 บรรทัดแนววัยรุ่น สนุก น่ารัก สำหรับชวนหวานใจ ไปเล่นน้ำสงกรานต์ โดยใส่ชื่อ "${name}" อย่างน้อย 1 บรรทัด`;  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents:[{parts:[{text:prompt}]}],
      })
    });

    const data = await response.json();
    const rawText = data.candidates[0].content.parts[0].text || "";
    const cleaned = rawText.replace(prompt, "").trim();

    const poem = cleaned
      ? cleaned.split('\n').filter(line => line.trim()).slice(0, 4).join('\n')
      : `สงกรานต์นี้อยากเจอหน้า\nมาเล่นน้ำกันนะ ${name} จ๋า 💦\nถ้ามาด้วยกันคงสนุกแน่ๆ\nเพราะเธอคือคนที่ใช่เลยน้า~`;

    res.json({ poem });

  } catch (err) {
    console.error("API error:", err);
    res.json({
      poem: `สงกรานต์นี้อยากเจอหน้า\nมาเล่นน้ำกันนะ ${name} จ๋า 💦\nถ้ามาด้วยกันคงสนุกแน่ๆ\nเพราะเธอคือคนที่ใช่เลยน้า~`
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server ready at http://localhost:3000");
});