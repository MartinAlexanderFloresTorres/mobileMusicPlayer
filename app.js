///////////////////////////carousel ////////////////////////////
const carousel = [...document.querySelectorAll(".carousel img")];

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle("active");

    if (carouselImageIndex >= carousel.length - 1) {
        carouselImageIndex = 0;
    } else {
        carouselImageIndex++;
    }
};

setInterval(() => {
    changeCarousel();
}, 3000);

//////////////////////////////navigation/////////////////////////

//////////////////////////////toogle player//////////////////////

const musicPlayerSection = document.querySelector(".music-player-section");
const botonArriba = document.querySelector(".botonArriba");
    botonArriba.addEventListener("click", () => {
    musicPlayerSection.classList.add("active");
});
///////////////////back from music player///////////////////////

const backToHomeBtn = document.querySelector(".music-player-section .back-btn");

backToHomeBtn.addEventListener("click", () => {
    musicPlayerSection.classList.remove("active");
});

///////////////////////////access play list///////////////////////

const playListSection = document.querySelector(".playlist");
const navBtn = document.querySelector(".music-player-section .nav-btn");

navBtn.addEventListener("click", () => {
    playListSection.classList.add("active");
});

////////////////////////back from playlist to music player////////

const backToMusicPlayer = document.querySelector(".playlist .back-btn");
backToMusicPlayer.addEventListener("click", () => {
    playListSection.classList.remove("active");
});
//////////////// Navigation done/////////////

///// music

let currentMusic = 0;

const music = document.querySelector("#audio-source");
const seekbar = document.querySelector(".music-seek-bar");
const songName = document.querySelector(".current-song-name");
const artistName = document.querySelector(".artist-name");
const coverImg = document.querySelector(".cover");
const musicaTime = document.querySelector(".current-time");
const musicaDuration = document.querySelector(".duration");

const queve = [...document.querySelectorAll(".queve")];

//////// select all buttons here

const retrocederBtn = document.querySelector("i.bx-rewind");
const avanzarBtn = document.querySelector("i.bx-fast-forward");
const playBtn = document.querySelector("i.bx-play");
const pauseBtn = document.querySelector("i.bx-pause");
const repetirdBtn = document.querySelector("span.bx-redo");
const volumenBtn = document.querySelector("span.bxs-volume-full");
const volumenSlider = document.querySelector(".volume-slider");

////// playbtn click event

playBtn.addEventListener("click", () => {
    music.play();
    playBtn.classList.remove("active");
    pauseBtn.classList.add("active");
});

////// pausebtn click event

pauseBtn.addEventListener("click", () => {
    music.pause();
    pauseBtn.classList.remove("active");
    playBtn.classList.add("active");
});

//// funcion for setting up music

const setMusic = (i) => {
    seekbar.value = 0;
    let song = canciones[i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImg.src = song.cover;

    setTimeout(() => {
        seekbar.max = music.duration;
        musicaDuration.innerHTML = formaTime(music.duration);
    }, 300);

    musicaTime.innerHTML = "00 : 00";
    queve.forEach((item) => item.classList.remove("active"));
    queve[currentMusic].classList.add("active");
};
setMusic(0);

//// for duracion de 00 : 00 formato

const formaTime = (time) => {
    let min = Math.floor(time / 60);

    if (min < 10) {
        min = "0" + min;
    }

    let sec = Math.floor(time % 60);

    if (sec < 10) {
        sec = "0" + sec;
    }

    return `${min} : ${sec}`;
};

/// evento de seekbar
setInterval(() => {
    seekbar.value = music.currentTime;
    musicaTime.innerHTML = formaTime(music.currentTime);

    if (Math.floor(music.currentTime) == Math.floor(seekbar.value)){

        if (repetirdBtn.className.includes('active')) {    
            playBtn.click();
        } 
    }
}, 500);

seekbar.addEventListener("change", () => {
    music.currentTime = seekbar.value;
});
/// controles de next y retro
retrocederBtn.addEventListener("click", () => {
    if (currentMusic <= 0) {
        currentMusic = canciones.length - 1;
    } else {
        currentMusic--;
    }

    setMusic(currentMusic);
    playBtn.click();
});

avanzarBtn.addEventListener("click", () => {
    if (currentMusic >= canciones.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
});


///// repetir

repetirdBtn.addEventListener("click", () => {
    repetirdBtn.classList.toggle("active");
});

//// volumen
volumenBtn.addEventListener("click", () => {
    volumenBtn.classList.toggle("active");
    volumenSlider.classList.toggle("active");
});
volumenSlider.addEventListener("input", () => {
    music.volume = volumenSlider.value;
});

////   playlist queve
queve.forEach((item, i) => {
    item.addEventListener("click", () => {
        setMusic(i);
        playBtn.click();
    });
});
