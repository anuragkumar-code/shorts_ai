const { openai } = require('../utils/openaiClient');

exports.generateShorts = async (transcript) => {
  const prompt = `
You are a viral content strategist.

Based on the transcript below, generate 5 viral YouTube Shorts ideas.

Respond strictly in **valid JSON format**, structured like:
[
  {
    "title": "Short Title",
    "script": "Engaging script for 15–60 seconds.",
    "timestamp": "Optional timestamp or context",
    "hashtags": ["#hashtag1", "#hashtag2"]
  },
  ...
]

Only return the JSON. Do not include any explanation or commentary.

Transcript:
${transcript}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content;
  console.log('🔍 Raw AI Response:', content);

  try {
    const parsed = JSON.parse(content);
    console.log('✅ Parsed JSON:', parsed);
    return parsed;
  } catch (err) {
    console.error('❌ Failed to parse AI response as JSON:', err.message);
    throw new Error('Failed to parse AI response as JSON.');
  }
};


function formatTime(seconds) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}
