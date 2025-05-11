const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

async function clipVideo({ inputPath, startTime, duration, outputName }) {
  const outputPath = path.join(__dirname, '..', 'output', `${outputName}.mp4`);

  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    ffmpeg(inputPath)
      .setStartTime(startTime)
      .duration(duration)
      .output(outputPath)
      .on('end', () => {
        console.log(`✅ Clip created at ${outputPath}`);
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('❌ FFmpeg Error:', err.message);
        reject(err);
      })
      .run();
  });
}

module.exports = { clipVideo };
