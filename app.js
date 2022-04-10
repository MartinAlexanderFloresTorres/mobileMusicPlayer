///////////////////////////carousel ////////////////////////////
const carousel = [...document.querySelectorAll(".carousel img")];

let carouselImageIndex = 0;
changeCarousel();
function changeCarousel() {
    carousel.forEach((img) => {
        img.classList.remove("active");
    });
    carousel[carouselImageIndex].classList.toggle("active");
    if (carouselImageIndex >= carousel.length - 1) {
        carouselImageIndex = 0;
    } else {
        ++carouselImageIndex;
    }
}
setInterval(() => {
    changeCarousel();
}, 2000);

//////////////////////////////navigation/////////////////////////

//////////////////////////////toogle player//////////////////////

const musicPlayerSection = document.querySelector(".music-player-section");
const botonArriba = document.querySelector(".botonArriba");
botonArriba.addEventListener("click", () => {
    musicPlayerSection.classList.add("active");
    document.querySelector("body").style.overflow = "hidden";
});
///////////////////back from music player///////////////////////

const backToHomeBtn = document.querySelector(".music-player-section .back-btn");

backToHomeBtn.addEventListener("click", () => {
    musicPlayerSection.classList.remove("active");
    document.querySelector("body").style.overflow = "auto";
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
const ramdomBtn = document.querySelector("span.bx-shuffle");
const uno = document.querySelector("span .uno");
const repostBtn = document.querySelector("span.bx-repost");
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
/*  */
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
//// funcion for setting up music

let song = {};
const setMusic = (i) => {
    seekbar.value = 0;
    song = canciones[i];
    currentMusic = i;
    music.src = song.path;
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImg.src = song.cover;
    seekbar.max = music.duration;
    musicaDuration.textContent = "00 : 00";
    setTimeout(() => {
        musicaDuration.textContent = formaTime(music.duration);
    }, 5000);

    musicaTime.innerHTML = "00 : 00";
    queve.forEach((item) => item.classList.remove("active"));
    queve[currentMusic].classList.add("active");
};
setMusic(0);
document.addEventListener("DOMContentLoaded", () => {
    let song2 = JSON.parse(localStorage.getItem("musica") || 0);
    if (song2 != 0) {
        music.src = song2.path;
        songName.innerHTML = song2.name;
        artistName.innerHTML = song2.artist;
        coverImg.src = song2.cover;
        seekbar.max = music.duration;

        musicaDuration.textContent = "00 : 00";
        queve.forEach((item, i) => {
            item.classList.remove("active");
            if (i == song2.id - 1) {
                item.classList.add("active");
            }
        });
    }
});

/*  */
setInterval(() => {
    seekbar.max = music.duration;
    musicaDuration.textContent = formaTime(music.duration);
}, 8000);
/// evento de seekbar
setInterval(() => {
    seekbar.value = music.currentTime;
    musicaTime.textContent = formaTime(music.currentTime);

    if (Math.floor(music.currentTime) == Math.floor(seekbar.value)) {
        if (repostBtn.className.includes("color")) {
            playBtn.click();
        }
    }
    if (seekbar.value == parseInt(seekbar.max)) {
        if (repostBtn.className.includes("active")) {
            if (currentMusic >= canciones.length - 1) {
                currentMusic = 0;
            } else {
                currentMusic++;
            }
            setMusic(currentMusic);
            playBtn.click();
        }
    }
    if (seekbar.value == parseInt(seekbar.max)) {
        if (ramdomBtn.className.includes("active")) {
            if (currentMusic >= canciones.length - 1) {
                currentMusic = 0;
            } else {
                let n = parseInt(Math.random() * 13);
                currentMusic = n;
            }
            setMusic(currentMusic);
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
    localStorage.setItem("musica", JSON.stringify(song));
    musicaDuration.textContent = "00 : 00";
});

avanzarBtn.addEventListener("click", () => {
    if (currentMusic >= canciones.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }

    setMusic(currentMusic);
    playBtn.click();
    localStorage.setItem("musica", JSON.stringify(song));
    musicaDuration.textContent = "00 : 00";
});
let v = 0;
///// repetir
ramdomBtn.addEventListener("click", () => {
    ramdomBtn.classList.toggle("active");
    uno.classList.remove("replay");
    repostBtn.classList.remove("active");
    repostBtn.classList.remove("color");
});

repostBtn.addEventListener("click", () => {
    ramdomBtn.classList.remove("active");
    uno.classList.remove("replay");
    repostBtn.classList.remove("color");
    repostBtn.classList.add("active");

    repostBtn.addEventListener("click", () => {
        repostBtn.classList.toggle("active");
        repostBtn.classList.add("color");
        uno.classList.add("replay");
        v++;
        if (v == 3) {
            v = 0;
            repostBtn.classList.toggle("active");
            uno.classList.toggle("replay");
            repostBtn.classList.remove("color");
        }
    });
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
        playListSection.classList.remove("active");
        setMusic(i);
        playBtn.click();
        localStorage.setItem("musica", JSON.stringify(song));
        musicaDuration.textContent = "00 : 00";
    });
});
