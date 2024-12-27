const songs = [
  {
    name: "1. It's Raining After All",
    src: "songs/It's Raining After All.mp3",
    cover: "albums/It's Raining After All (Album).jpg",
    video: "videos/It's Raining After All.mp4",
  },
  {
    name: "2. Early Summer",
    src: "songs/Early summer.mp3",
    cover: "albums/It's Raining After All (Album).jpg",
    video: "",
  },
  {
    name: "3. Under the Summer Breeze",
    src: "songs/Under the Summer Breeze.mp3",
    cover: "albums/It's Raining After All (Album).jpg",
    video: "videos/Under the Summer Breeze.mp4",
  },
  {
    name: "4. When the Morning Glory Falls",
    src: "songs/When the Morning Glory Falls.mp3",
    cover: "albums/It's Raining After All (Album).jpg",
    video: "videos/When the Morning Glory Falls.mp4",
  },
  {
    name: "5. Loneliness and the Future",
    src: "songs/Loneliness and the Future.mp3",
    cover: "albums/It's Raining After All (Album).jpg",
    video: "videos/Loneliness and the Future.mp4",
  },
  {
    name: "6. I'm Getting on the Bus to the Other World, See Ya!",
    src: "songs/I'm getting on the bus to the other world, see ya!.mp3",
    cover: "albums/It's Raining After All (Album).jpg",
    video: "videos/I'm getting on the bus to the other world, see ya!.mp4",
  },
  {
    name: "7. Perhaps I'll be Able to Become the Sun",
    src: "songs/Perhaps I'll be able to become the Sun..mp3",
    cover: "albums/It's Raining After All (Album).jpg",
    video: "videos/Perhaps I'll be able to become the Sun..mp4",
  },
  {
    name: "8. Envy",
    src: "songs/Envy.mp3",
    cover: "albums/It's Raining After All (Album).jpg",
    video: "",
  },
  {
    name: "9. Compared Child",
    src: "songs/Compared Child.mp3",
    cover: "albums/It's Raining After All (Album).jpg",
    video: "videos/Compared Child.mp4",
  },
  {
    name: "10. Goodbye to Rock You",
    src: "songs/Goodbye to Rock you.mp3",
    cover: "albums/It's Raining After All (Album).jpg",
    video: "videos/Goodbye to Rock you.mp4",
  },
  {
    name: "11. Even Tears Withered",
    src: "songs/Even tears withered.mp3",
    cover: "albums/It's Raining After All (Album).jpg",
    video: "videos/Even tears withered.mp4",
  },
];

const player = document.getElementById("player");
const songTitle = document.getElementById("song-title");
const albumCover = document.getElementById("album-cover");
const audio = document.getElementById("audio");
const backgroundVideo = document.getElementById("background-video");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const timeline = document.getElementById("timeline");
const timelineProgress = document.getElementById("timeline-progress");

let currentSongIndex = 0;
let isPlaying = false;

const loadSong = (index) => {
  const song = songs[index];
  songTitle.textContent = song.name;
  albumCover.src = song.cover;
  audio.src = song.src;
  backgroundVideo.src = song.video;
};

const playSong = () => {
  audio.play();
  backgroundVideo.play();
  isPlaying = true;
  playButton.innerHTML = '<i class="fas fa-stop"></i>';
};
const pauseSong = () => {
  audio.pause();
  backgroundVideo.pause();
  isPlaying = false;
  playButton.innerHTML = '<i class="fas fa-play"></i>';
};

const updateTimeline = () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  timelineProgress.style.width = `${progress}%`;
  backgroundVideo.currentTime = audio.currentTime;
};

const seek = (event) => {
  const rect = timeline.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const width = rect.width;
  const percent = offsetX / width;
  const newTime = percent * audio.duration;

  audio.currentTime = newTime;
  backgroundVideo.currentTime = newTime;
};

const fadeOut = (callback) => {
  player.classList.add("hidden");
  setTimeout(() => {
    callback();
    player.classList.remove("hidden");
  }, 500);
};

playButton.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  fadeOut(() => {
    loadSong(currentSongIndex);
    playSong();
  });
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  fadeOut(() => {
    loadSong(currentSongIndex);
    playSong();
  });
});

timeline.addEventListener("click", seek);
audio.addEventListener("timeupdate", updateTimeline);
audio.addEventListener("ended", () => {
  currentSongIndex = Math.floor(Math.random() * songs.length);
  fadeOut(() => {
    loadSong(currentSongIndex);
    playSong();
  });
});

loadSong(currentSongIndex);
