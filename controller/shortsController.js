const captionService = require('../services/captionService');
const aiShortsGenerator = require('../services/aiShortsGenerator');


exports.generateShorts = async (req, res) => {
  const { youtubeUrl } = req.body;

  if (!youtubeUrl) {
    return res.status(400).json({ error: 'YouTube URL is required.' });
  }

  try {
    const captions = await captionService.getCaptions(youtubeUrl);

    const aiResponse = await aiShortsGenerator.generateShorts(captions);

    return res.json({ shorts: aiResponse });
  } catch (err) {
    console.error('Error in generateShorts:', err.message);
    return res.status(500).json({ error: err.message || 'Something went wrong.' });
  }
};
