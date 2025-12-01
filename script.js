const reasons=[
"Your smile lights up my day.",
"You make ordinary moments feel special.",
"Your voice is my favorite sound.",
"You believe in me.",
"You are kind to everyone.",
"You make me want to be better.",
"You understand me without words.",
"You are my safe place.",
"You give the warmest hugs.",
"You are beautiful inside and out.",
"You inspire me.",
"You never give up on us.",
"You make me feel loved every day.",
"You are thoughtful.",
"You listen to the little things.",
"You have the most caring heart.",
"You make me laugh until I can't breathe.",
"You make home feel like a person.",
"You see the best in me.",
"You are my favorite hello and hardest goodbye.",
"You challenge me in the best ways.",
"You celebrate my wins.",
"You hold me in my losses.",
"You are my peace.",
"You make everything more fun.",
"You make quiet nights perfect.",
"You love me at my best and worst.",
"You are patient with me.",
"You remember what matters to me.",
"You make me feel chosen.",
"You are honest and real.",
"You are my favorite story.",
"You bring color to my world.",
"You are the sweetest surprise.",
"You make me proud.",
"You make the stars feel closer.",
"You are graceful and strong.",
"You are my best friend.",
"You make time stand still.",
"You make me smile for no reason.",
"You love my quirks.",
"You are my greatest gift.",
"You make everywhere feel like home.",
"You believe in us.",
"You are my favorite person.",
"You make me feel lucky.",
"You say my name like it matters.",
"You turn rain into dancing.",
"You make little moments magical.",
"You are my sunshine on cloudy days.",
"You are my constant.",
"You know my heart.",
"You hold my hand and my heart.",
"You are my reason and my why.",
"You are the love of my life.",
"You make every day better.",
"You are simply you, and that is everything."
];
const defaultMedia=[
  "code/WhatsApp Image 2025-12-01 at 10.56.55_f232ae42.jpg",
  "code/WhatsApp Image 2025-12-01 at 10.56.56_40e86e99.jpg",
  "code/WhatsApp Image 2025-12-01 at 10.56.56_b0f40248.jpg",
  "code/WhatsApp Image 2025-12-01 at 10.56.57_0845e193.jpg",
  "code/WhatsApp Image 2025-12-01 at 10.56.57_14b79fe7.jpg",
  "code/WhatsApp Image 2025-12-01 at 10.56.58_2737b5b2.jpg",
  "code/WhatsApp Image 2025-12-01 at 10.56.58_64f191e3.jpg",
  "code/WhatsApp Image 2025-12-01 at 10.56.58_81f46c44.jpg",
  "code/WhatsApp Image 2025-12-01 at 10.56.58_bba73aac.jpg",
  "code/WhatsApp Video 2025-12-01 at 10.56.58_07af9b6a.mp4",
  "code/WhatsApp Video 2025-12-01 at 10.56.58_1ff91c2c.mp4",
  "code/WhatsApp Video 2025-12-01 at 10.56.58_3bcf3365.mp4",
  "code/WhatsApp Video 2025-12-01 at 10.56.58_6e1374aa.mp4",
  "code/WhatsApp Video 2025-12-01 at 10.56.58_9a2906fb.mp4",
  "code/WhatsApp Video 2025-12-01 at 10.56.58_ad41d75c.mp4",
  "code/WhatsApp Video 2025-12-01 at 10.56.58_b9d4cb3c.mp4"
];
const defaultSongs=[
  "songs/John Legend - Tonight (Best You Ever Had) (Official Video) ft. Ludacris - johnlegendVEVO.mp3",
  "songs/Mario - Let Me Love You (Official Video) - MarioVEVO.mp3",
  "songs/Raindance - Dave.mp3",
  "songs/You ((without rap)) - Lloyd.mp3"
];
const slideshow=document.getElementById("slideshow");
const hearts=document.getElementById("hearts");
const reasonText=document.getElementById("reasonText");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
const counter=document.getElementById("counter");
const autoToggle=document.getElementById("autoToggle");
const photosInput=document.getElementById("photosInput");
const songInput=document.getElementById("songInput");
const playPause=document.getElementById("playPause");
const volume=document.getElementById("volume");
const fsToggle=document.getElementById("fsToggle");
const startOverlay=document.getElementById("startOverlay");
const startBtn=document.getElementById("startBtn");
const audio=document.getElementById("audio");
const gateOverlay=document.getElementById("gateOverlay");
const gateInput=document.getElementById("gateInput");
const gateBtn=document.getElementById("gateBtn");
const gateError=document.getElementById("gateError");
const dropOverlay=document.getElementById("dropOverlay");
let reasonIndex=0;let reasonTimer=null;let slideIndex=0;let slideTimer=null;let slides=[];let usingObjectUrls=[];let started=false;let songList=[];let songIndex=0;
function renderReason(){reasonText.textContent=reasons[reasonIndex];counter.textContent=`${reasonIndex+1}/${reasons.length}`}
function nextReason(){reasonIndex=(reasonIndex+1)%reasons.length;renderReason()}
function prevReason(){reasonIndex=(reasonIndex-1+reasons.length)%reasons.length;renderReason()}
function setAutoPlay(on){if(reasonTimer)clearInterval(reasonTimer);if(on)reasonTimer=setInterval(nextReason,5000)}
function revokeObjectUrls(){usingObjectUrls.forEach(u=>URL.revokeObjectURL(u));usingObjectUrls=[]}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function handleFiles(files){
  const media=(files||[]).filter(f=>f.type&&(f.type.startsWith('image/')||f.type.startsWith('video/')));
  if(!media.length) return;
  revokeObjectUrls();
  const urls=media.map(f=>{const u=URL.createObjectURL(f);usingObjectUrls.push(u);return u});
  buildSlides(urls);
  startSlideshow();
}
function isVideoUrl(u){return /(\.mp4|\.webm|\.ogg|\.mov)(\?|#|$)/i.test(u)}
function buildSlides(urls){
  slideshow.innerHTML="";
  slides=urls.map(u=>{
    const d=document.createElement("div");
    d.className="slide";
    if(isVideoUrl(u)){
      const v=document.createElement("video");
      v.src=u;
      v.muted=true;
      v.playsInline=true;
      v.loop=true;
      v.preload="metadata";
      d.appendChild(v);
    }else{
      d.style.backgroundImage=`url('${u}')`;
    }
    slideshow.appendChild(d);
    return d;
  });
  slideIndex=0;
  if(slides.length){
    slides[0].classList.add("active");
    manageVideoPlayback(-1,0);
  }
}
function manageVideoPlayback(prevIndex,nextIndex){
  if(prevIndex>=0&&slides[prevIndex]){
    const pv=slides[prevIndex].querySelector('video');
    if(pv){try{pv.pause();pv.currentTime=0;}catch(e){}}
  }
  if(nextIndex>=0&&slides[nextIndex]){
    const nv=slides[nextIndex].querySelector('video');
    if(nv){try{nv.play().catch(()=>{});}catch(e){}}
  }
}
function nextSlide(){
  if(!slides.length)return;
  const prev=slideIndex;
  slides[slideIndex].classList.remove("active");
  slideIndex=(slideIndex+1)%slides.length;
  slides[slideIndex].classList.add("active");
  manageVideoPlayback(prev,slideIndex);
}
function startSlideshow(){if(slideTimer)clearInterval(slideTimer);slideTimer=setInterval(nextSlide,6000)}
function startHearts(){if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;setInterval(()=>{const h=document.createElement("div");h.className="heart";h.textContent="❤";h.style.left=Math.random()*100+"vw";h.style.fontSize=(12+Math.random()*26)+"px";h.style.opacity=(.7+Math.random()*.3).toString();hearts.appendChild(h);setTimeout(()=>h.remove(),9500)},800)}
function tryPlay(){audio.play().catch(()=>{})}
function startExperience(){
  if(started)return;
  started=true;
  startOverlay.style.display="none";
  // prepare music playlist if not ready
  if(!songList.length){songList=shuffle([...defaultSongs]);}
  if(!audio.src && songList.length){loadSong(0);} // ensure a track is loaded
  startSlideshow();
  setAutoPlay(autoToggle.checked);
  // attempt to start music immediately on the user gesture
  tryPlay();
  // extra retries for stubborn autoplay policies
  setTimeout(tryPlay,250);
  setTimeout(tryPlay,1000);
  // retry once audio is ready to play
  const onCanPlay=()=>{tryPlay();audio.removeEventListener('canplay',onCanPlay)};
  audio.addEventListener('canplay',onCanPlay);
  playActiveVideo();
  startHearts();
}
function playActiveVideo(){const s=slides[slideIndex];if(!s)return;const v=s.querySelector('video');if(v){try{v.play().catch(()=>{});}catch(e){}}}
prevBtn.addEventListener("click",prevReason);nextBtn.addEventListener("click",nextReason);autoToggle.addEventListener("change",e=>setAutoPlay(e.target.checked));
playPause.addEventListener("click",()=>{if(audio.paused){tryPlay()}else{audio.pause()}updatePlayBtn()});
volume.addEventListener("input",()=>{audio.volume=parseFloat(volume.value)});
fsToggle.addEventListener("click",()=>{const d=document.documentElement;if(!document.fullscreenElement){if(d.requestFullscreen)d.requestFullscreen()}else{if(document.exitFullscreen)document.exitFullscreen()}});
if(songInput){songInput.addEventListener("change",()=>{const f=songInput.files&&songInput.files[0];if(!f)return;const u=URL.createObjectURL(f);audio.src=u;tryPlay();updatePlayBtn()});}
function loadSong(i){
  if(!songList.length)return;
  songIndex=((i%songList.length)+songList.length)%songList.length;
  audio.src=songList[songIndex];
  try{audio.load()}catch(e){}
}
function nextSong(){if(!songList.length)return;loadSong(songIndex+1);tryPlay()}
audio.addEventListener("ended",nextSong);
if(photosInput){photosInput.addEventListener("change",()=>{handleFiles(Array.from(photosInput.files||[]))});}
startBtn.addEventListener("click",startExperience);
function unlockGate(){const v=(gateInput.value||"").trim();if(v==="Brempomaa"){gateError.style.display="none";gateOverlay.style.display="none";startExperience()}else{gateError.style.display="block";gateInput.value="";gateInput.focus()}}
gateBtn.addEventListener("click",unlockGate);
gateInput.addEventListener("keydown",e=>{if(e.key==="Enter")unlockGate()});
window.addEventListener("load",()=>{gateInput.focus()});
audio.addEventListener("play",updatePlayBtn);audio.addEventListener("pause",updatePlayBtn);
function updatePlayBtn(){playPause.textContent=audio.paused?"Play":"Pause"}
audio.volume=parseFloat(volume.value);renderReason();buildSlides(shuffle([...defaultMedia]));songList=shuffle([...defaultSongs]);if(songList.length){loadSong(0)}

// Drag & drop support for photos
let dragDepth=0;
function hasFiles(e){return e.dataTransfer && Array.from(e.dataTransfer.types||[]).includes('Files')}
window.addEventListener('dragenter',e=>{if(hasFiles(e)){dragDepth++;dropOverlay.classList.add('active');}}
);
window.addEventListener('dragover',e=>{if(hasFiles(e)){e.preventDefault();e.dataTransfer.dropEffect='copy';dropOverlay.classList.add('active');}}
);
window.addEventListener('dragleave',e=>{if(hasFiles(e)){dragDepth=Math.max(0,dragDepth-1);if(dragDepth===0)dropOverlay.classList.remove('active');}}
);
window.addEventListener('drop',e=>{if(hasFiles(e)){e.preventDefault();dragDepth=0;dropOverlay.classList.remove('active');const files=Array.from(e.dataTransfer.files||[]);handleFiles(files);}}
);
