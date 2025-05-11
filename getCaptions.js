// getCaptions.js

const { getSubtitles } = require('youtube-captions-scraper');

// Replace with your target YouTube Video ID (e.g. "dQw4w9WgXcQ")
const VIDEO_ID = 'dQw4w9WgXcQ'; // <-- change this

async function fetchCaptions(videoId) {
  console.log(`⏳ Fetching captions for video ID: ${videoId}...`);

  try {
    const captions = await getSubtitles({
      videoID: videoId,
      lang: 'en' // 'a.en' can be used for auto-generated captions
    });

    if (captions.length === 0) {
      console.log('⚠️ No captions found for this video.');
      return;
    }

    console.log('✅ Captions retrieved:\n');

    // Just print plain text
    captions.forEach((caption, index) => {
      console.log(`${index + 1}. [${caption.start}s] ${caption.text}`);
    });

  } catch (err) {
    console.error('❌ Error fetching captions:', err.message);
  }
}

fetchCaptions(VIDEO_ID);
