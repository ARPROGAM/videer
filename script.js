const videoPlayer = document.getElementById('video-player');
const playPauseButton = document.getElementById('play-pause');
const videoSourceSelect = document.getElementById('video-source');

// Links
const blobUrl = "blob:https://uzmovi.tv/0c88b2e0-e12c-4744-8ae6-5aa5e08f4452";
const m3u8Url = "https://srv108.uzdown.space/live/uzmovi.com%20qsh%20ertagi%20mob%20hd/index.m3u8";

// Play/Pause Button
playPauseButton.addEventListener('click', () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playPauseButton.textContent = "Pause";
  } else {
    videoPlayer.pause();
    playPauseButton.textContent = "Play";
  }
});

// Load Selected Video Source
videoSourceSelect.addEventListener('change', (event) => {
  const selectedSource = event.target.value;

  if (selectedSource === "blob") {
    videoPlayer.src = blobUrl;
  } else if (selectedSource === "m3u8") {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(m3u8Url);
      hls.attachMedia(videoPlayer);
    } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
      videoPlayer.src = m3u8Url;
    } else {
      alert("Your browser does not support M3U8 playback.");
    }
  }
});

// Default to Blob URL
videoSourceSelect.value = "blob";
videoPlayer.src = blobUrl;
