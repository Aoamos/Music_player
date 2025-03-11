// Get HTML Elements
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

// Song List
const allSongs = [{
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
    },
    {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
    },
    {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
    },
    {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
    },
    {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
    },
    {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
    },
    {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
    },
];

// Audio Player
const audio = new Audio();
let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
};

// Play Song
const playSong = (id) => {
    const song = userData.songs.find((s) => s.id === id);
    if (!song) return;

    if (!userData.currentSong || userData.currentSong.id !== song.id) {
        audio.src = song.src;
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData.songCurrentTime;
    }

    userData.currentSong = song;
    playButton.classList.add("playing");
    audio.play();
};

// Render Songs List
const renderSongs = (array) => {
    playlistSongs.innerHTML = "";
    array.forEach((song) => {
        const li = document.createElement("li");
        li.classList.add("playlist-song");

        li.innerHTML = `
      <button class="playlist-song-info">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" fill="#4d4d62"/>
            <path fill="white" d="M5.32 5.18c.38-.28.95-.23 1.28.12L8 6.75l1.4-1.47c.33-.35.9-.4 1.28-.12.38.28.43.79.1 1.12L9.18 8l1.6 1.69c.33.33.28.84-.1 1.12-.38.28-.95.23-1.28-.12L8 9.25 6.6 10.7c-.33.35-.9.4-1.28.12-.38-.28-.43-.79-.1-1.12L6.8 8l-1.6-1.69c-.33-.33-.28-.84.1-1.12z"/>
          </svg>
      </button>
    `;

        li.querySelector(".playlist-song-info").addEventListener("click", () =>
            playSong(song.id)
        );
        playlistSongs.appendChild(li);
    });
};

// Play Button Logic
playButton.addEventListener("click", () => {
    if (!userData.currentSong) {
        playSong(userData.songs[0].id);
    } else {
        audio.play();
    }
});

// Pause Button Logic
pauseButton.addEventListener("click", () => {
    audio.pause();
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove("playing");
});

// Next Song
nextButton.addEventListener("click", () => {
    if (!userData.currentSong) return playSong(userData.songs[0].id);
    let nextIndex =
        userData.songs.findIndex((s) => s.id === userData.currentSong.id) + 1;
    if (nextIndex >= userData.songs.length) nextIndex = 0;
    playSong(userData.songs[nextIndex].id);
});

// Previous Song
previousButton.addEventListener("click", () => {
    if (!userData.currentSong) return playSong(userData.songs[0].id);
    let prevIndex =
        userData.songs.findIndex((s) => s.id === userData.currentSong.id) - 1;
    if (prevIndex < 0) prevIndex = userData.songs.length - 1;
    playSong(userData.songs[prevIndex].id);
});

// Shuffle Songs
shuffleButton.addEventListener("click", () => {
    userData.songs.sort(() => Math.random() - 0.5);
    renderSongs(userData.songs);
});

// Sort Songs Alphabetically
const sortSongs = () => {
    return [...userData.songs].sort((a, b) => a.title.localeCompare(b.title));
};

// Initialize Playlist
renderSongs(sortSongs());