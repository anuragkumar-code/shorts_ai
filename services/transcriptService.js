const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { OpenAI } = require('openai');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.getTranscript = async (youtubeUrl) => {
  const videoId = extractVideoId(youtubeUrl);
  const filePath = path.join(__dirname, `../temp/${videoId}.mp3`);

  console.log("Extracted video ID:", videoId);
  console.log("File path for audio:", filePath);
  try {
    await downloadAudio(youtubeUrl, filePath);

    const resp = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-1',
      response_format: 'text'
    });

    console.log("Transcription response:", resp);

    fs.unlinkSync(filePath);

    return resp;
  } catch (err) {
    console.error("Whisper transcription failed:", err.message);
    throw new Error("Transcript could not be generated.");
  }
};

function extractVideoId(url) {
  const regex = /(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (!match || !match[1]) throw new Error("Invalid YouTube URL.");
  return match[1];
}


function downloadAudio(youtubeUrl, outputPath) {
  return new Promise((resolve, reject) => {
    console.log("Starting audio download...");
    const stream = ytdl(youtubeUrl, { filter: 'audioonly' });

    ffmpeg(stream)
    .audioBitrate(128)
    .toFormat('mp3')
    .on('start', commandLine => {
      console.log('FFmpeg command:', commandLine);
    })
    .on('progress', p => {
      console.log(`Processing: ${p.targetSize} KB converted`);
    })
    .on('end', () => {
      console.log('Download and conversion complete');
      resolve();
    })
    .on('error', err => {
      console.error('FFmpeg error:', err.message);
      reject(err);
    })
    .save(outputPath);

  });
}
