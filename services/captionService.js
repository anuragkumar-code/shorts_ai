const { getSubtitles } = require('youtube-captions-scraper');

exports.getCaptions = async (youtubeUrl) => {
    const videoId = extractVideoId(youtubeUrl);
    console.log('Extracted Video ID:', videoId);
  
    try {
      const captions = await getSubtitles({
        videoID: videoId,
        lang: 'en'
      });
  
      console.log('Fetched Captions:', captions.slice(0, 5)); // log first few for sanity
  
      if (!captions.length) {
        throw new Error('No English captions found.');
      }
  
      // Join caption text
      const fullTranscript = captions.map(c => c.text).join(' ');
      console.log('Joined Transcript:', fullTranscript.slice(0, 500)); // preview only
  
      return fullTranscript;
    } catch (err) {
      console.error('Caption fetch error:', err.message);
      throw new Error('Failed to fetch captions.');
    }
  };
  

function extractVideoId(url) {
  const regex = /(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (!match || !match[1]) throw new Error('Invalid YouTube URL.');
  return match[1];
}
