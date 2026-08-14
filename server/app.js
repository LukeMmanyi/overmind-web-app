import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())

app.post('/getAIR', async (req, res) => {
  if (
  !req.body.message ||
  typeof req.body.message !== 'string' ||
  !req.body.message.trim()
) {
  return res.status(400).json({ error: 'Invalid message' });
}
   try {
  const aiData = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.API_KEY,
      'anthropic-version': "2023-06-01",
    },

    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      messages: [{role: 'user', content: req.body.message}],
    }),
  });

  if (!aiData.ok) {
  throw new Error(`Anthropic error: ${aiData.status}`);
}

  const aiSituation = await aiData.json();
 
  res.json(aiSituation);
   }catch(error) {
    res.status(500).json({ error: "Something went wrong" })
   }
})

app.post('/sendUR', async (req, res) => {
  if (
  !req.body.message ||
  typeof req.body.message !== 'string' ||
  !req.body.message.trim()
) {
  return res.status(400).json({ error: 'Invalid message' });
}


  try{
  const aiData = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.API_KEY,
      'anthropic-version': "2023-06-01",
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      messages: [{role: 'user', content: req.body.message}],
    })
  })
  if (!aiData.ok) {
  throw new Error(`Anthropic error: ${aiData.status}`);
}

  const aiResponse = await aiData.json();

  res.json(aiResponse);
}catch(error) {
  res.status(500).json({ error: "Something went wrong" })
}
})

app.listen(PORT, () => {
  console.log('server is running');
} )