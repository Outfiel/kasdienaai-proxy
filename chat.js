// api/chat.js — a Vercel Serverless Function
export default async function handler(req, res) {
  // only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // forward body to OpenAI
  const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify(req.body)
  });

  const data = await apiRes.json();
  res.status(apiRes.status).json(data);
}
