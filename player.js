const video = document.getElementById("demo");
const status = document.getElementById("status");
const source = video.dataset.source;

function showError(message) {
  status.textContent = message;
  status.classList.add("visible");
}

if (video.canPlayType("application/vnd.apple.mpegurl")) {
  video.src = source;
} else if (window.Hls && window.Hls.isSupported()) {
  const hls = new window.Hls({ enableWorker: true });
  hls.loadSource(source);
  hls.attachMedia(video);
  hls.on(window.Hls.Events.ERROR, (_event, data) => {
    if (data.fatal) showError("The video could not be loaded. Please refresh and try again.");
  });
} else {
  showError("This browser cannot play the project demo. Please open the page in a current browser.");
}
