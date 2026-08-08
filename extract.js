const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const videoPath = path.join(__dirname, 'public', 'videos', 'hero-explainer.mp4');
const posterPath = path.join(__dirname, 'public', 'videos', 'hero-poster.webp');

try {
  // Enclose paths in quotes for Windows
  const cmd = `"${ffmpeg}" -i "${videoPath}" -ss 00:00:00.050 -vframes 1 -c:v libwebp -quality 80 -update 1 "${posterPath}" -y`;
  console.log('Running: ' + cmd);
  execSync(cmd, { stdio: 'inherit' });
  console.log('Successfully extracted poster frame to hero-poster.webp');
} catch(err) {
  console.error('Failed to extract frame', err);
}
