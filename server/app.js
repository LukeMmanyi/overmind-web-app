import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(cors())

app.post('/getAIR', async (req, res) => {
   
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

  const aiSituation = await aiData.json();
 
  res.json(aiSituation);

})

app.post('/sendUR', async (req, res) => {
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

  const aiResponse = await aiData.json();

  res.json(aiResponse);
})

app.listen(PORT, () => {
  console.log('server is running');
} )