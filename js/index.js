// TA-DA!!!! this is where the magic happens

//First get all the elements you need to do stuff

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress-filled");
const point = player.querySelector(".point");
const play = player.querySelector(".play");
const volumeRange = player.querySelector(".volume-slider");
const volumeScrub = player.querySelector(".volume-scrub");
const volume = player.querySelector(".volume");
//const volumeFill = player.querySelector(".volume.filled");
const timer = player.querySelector(".timer");
const timing = player.querySelector(".timing");
const time = player.querySelector(".time");
const quality = player.querySelector(".quality");
const qualities = player.querySelector(".qualities");
const cc = player.querySelector(".cc");
const captions = player.querySelector(".captions");
const fullscreen = player.querySelector(".fullscreen");
const fav = player.querySelector(".favorite");
const tops = player.querySelector(".top");
const bottom = player.querySelector(".bottom");
const expand = player.querySelector(".expand");
const reduce = player.querySelector(".reduce");
const ff = player.querySelector(".skip");



//create the funtions that will work

function playIcons() {
    video.paused ? play.innerHTML = '<i class="material-icons">play_arrow</i>' : play.innerHTML = '<i class="material-icons">pause</i>';
}
playIcons();

function togglePlay() {
    const method = video.paused ? "play" : "pause";
    video[method]();
    //console.log(video.currentTime)
}

function volumeUpdate() {
    video[this.name] = this.value;
    //console.log(this.value)
}

function videoTime() {
    const duration = Math.round(video.duration);
    Number.prototype.toHHMMSS = function() {
        var hours = Math.floor(this / 3600) < 10 ? ("00" + Math.floor(this / 3600)).slice(-2) : Math.floor(this / 3600);
        var minutes = ("00" + Math.floor((this % 3600) / 60)).slice(-2);
        var seconds = ("00" + (this % 3600) % 60).slice(-2);
        return hours + ":" + minutes + ":" + seconds;
    }

    // Usage: [number variable].toHHMMSS();

    // Here is a simple test
    var totalsecond = duration;
    time.innerHTML = totalsecond.toHHMMSS();
}

function getTime() {
    //console.log(video.currentTime);
    const videoTime = Math.round(video.currentTime);
    Number.prototype.toHHMMSS = function() {
        var hours = Math.floor(this / 3600) < 10 ? ("00" + Math.floor(this / 3600)).slice(-2) : Math.floor(this / 3600);
        var minutes = ("00" + Math.floor((this % 3600) / 60)).slice(-2);
        var seconds = ("00" + (this % 3600) % 60).slice(-2);
        return hours + ":" + minutes + ":" + seconds;
    }

    // Usage: [number variable].toHHMMSS();

    // Here is a simple test
    var totalseconds = videoTime;
    timing.innerHTML = totalseconds.toHHMMSS();
}

setInterval(videoTime, 1000)
setInterval(getTime, 1000)


function qualityHover() {
    if (qualities.style.display == "none") {
        //console.log("hi");
        qualities.style.display = "block";
        quality.style.background = "rgba(85, 85, 85, 0.5)";
    } else {
        //console.log("hi");
        qualities.style.display = "none";
        quality.style.background = "transparent";
    }
}

function volumeHover() {
    if (volumeScrub.style.display == "none") {
        //console.log("hi");
        volumeScrub.style.display = "block";
        volume.style.background = "rgba(85, 85, 85, 0.5)";
    } else {
        //console.log("hi");
        volumeScrub.style.display = "none";
        volume.style.background = "transparent";
    }
}

function ccHover() {
    if (captions.style.display == "none") {
        captions.style.display = "block";
        cc.style.background = "rgba(85, 85, 85, 0.5)";
    } else {
        captions.style.display = "none";
        cc.style.background = "transparent";
    }
}

function translate() {
    if (tops.style.transform.includes("translateY(-100%)")) {
        tops.style.transform = "translateY(0)";
        bottom.style.transform = "translateY(0)";
    } else {
        tops.style.transform = "translateY(-100%)";
        bottom.style.transform = "translateY(150%)";
    }
}

var fullscreenAvailable = false;

// full-screen feature support text...
if (
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
) {
    fullscreenAvailable = true;
}

function full() {
    if (fullscreenAvailable) {
        launchFullscreen(video);
    } else {
        alert('Sorry, fullscreen not available...');
    }
    reduce.style.display = "block";
    fullscreen.style.display = "none";
}

function launchFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Exit Fullscreen mode
function resize() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    reduce.style.display = "none";
    fullscreen.style.display = "block";
}

//For the progress bar
function mainProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    point.style.marginLeft = `${percent}%`;
}

function videoScrub(e) {
    const jumpTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = jumpTime;
}

function refreshIcon() {
    play.innerHTML = '<i class="material-icons">refresh</i>'
}

function favorite() {
    if (fav.innerHTML == '<i class="material-icons">favorite_border</i>') {
        fav.innerHTML = '<i class="material-icons" style="color:red">favorite</i>'
    } else {
        fav.innerHTML = '<i class="material-icons">favorite_border</i>'
    }
}

function skip() {
    //console.log("skipped 10 seconds");
    const addedTime = parseFloat(this.dataset.skip);
    video.currentTime += addedTime;
}

//console.log(video.timeUpdate)

// the event handlers for the necessary parts


video.addEventListener("click", translate);
video.addEventListener("dblclick", resize);
video.addEventListener("play", playIcons);
video.addEventListener("pause", playIcons);
play.addEventListener("click", togglePlay);
document.addEventListener("keypress", (e) => {
    if (e.keyCode == "32") {
        togglePlay();
    }
})

video.addEventListener("timeupdate", mainProgress);
video.addEventListener("ended", refreshIcon)

volumeRange.addEventListener("change", volumeUpdate);
volumeRange.addEventListener("mousemove", volumeUpdate);

quality.addEventListener("click", qualityHover);
volume.addEventListener("click", volumeHover);
cc.addEventListener("click", ccHover);

fullscreen.addEventListener("click", full);
document.addEventListener("keypress", (e) => {
    if (e.keyCode == "13") {
        full();
    }
})

reduce.addEventListener("click", resize);

let mousedown = false;

progress.addEventListener("click", videoScrub);
progress.addEventListener("mousedown", (e) => mousedown && videoScrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

fav.addEventListener("click", favorite);
ff.addEventListener("click", skip)