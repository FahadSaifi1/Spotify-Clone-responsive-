console.log("Starting");
let currentsong =  new Audio(); 
let songs;
let currfolder;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

                                                                      

   
    async function getSongs(folder){
        currfolder=folder;
        let a = await fetch(`http://127.0.0.1:3000/SPOTIFY%20CLONE/${folder}/`)
        let response =await a.text();
        let div=document.createElement("div");
        div.innerHTML=response;
        let as=div.getElementsByTagName("a");
      songs=[]
       for(let i=0; i<as.length;i++){
        const element =as[i];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1]);
       }
    }
        let songUL= document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML=songUL.innerHTML +`<li>
           <div class="playpng"> <img src="music.png" alt="music"/></div>
            <div class="info">
           
             <div> ${song.replaceAll("%20", " ")}  </div>
           
            </div>
             <div class="playbutton2"><img src="playbutton.svg" alt="music"/></div>

            </li>`;
    }

   
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", element=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML);
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    })
  })
   
   
}
const playMusic= (track, pause=false)=>{
    //let audio=new Audio("http://127.0.0.1:3000/SPOTIFY%20CLONE/songs/" + track)
    currentsong.src=`/${folder}/`+ track
    if(!pause){
        currentSong.play()
    }
    //currentsong.play()
    document.querySelector(".songinfo").innerHTML=decodeURI(track)
    document.querySelector(".songtime").innerHTML="00:00/00"

    
}

async function main(){
  
    songs= await getSongs("songs/ncs")
    console.log(songs)
    playMusic(songs[0],true)



  play.addEventListener("click", ()=>{
    if(currentsong.paused){
        currentsong.play()
    }
    else{
        currentsong.pause()
    }

  })
  currentsong.addEventListener("timeupdate", () => {
    console.log(currentsong.currentTime, currentsong.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`;
    document.querySelector(".seekcircle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";

})
document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".seekcircle").style.left = percent + "%";
    currentsong.currentTime = ((currentsong.duration) * percent) / 100
})

document.querySelector(".hamburger").addEventListener("click", e => {
document.querySelector(".left").style.left ="0"
})

document.querySelector(".close").addEventListener("click", e => {
    document.querySelector(".left").style.left ="-110%"
    })

    previous.addEventListener("click", () => {
        currentsong.pause()
        console.log("Previous clicked")
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add an event listener to next
    forward.addEventListener("click", () => {
        currentsong.pause()
        console.log("Next clicked")

        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100")
        currentsong.volume = parseInt(e.target.value) / 100
        if (currentsong.volume >0){
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })

    Array.from(document.getElementsByClassName("card")).forEach(e=> {e.addEventListener("click",async item=>{
        songs= await getSongs(`songs/${item.currentTarget.dataset.folder }`)
       
    })
})
}
main()


let songUL= document.querySelector(".songlist").getElementsByTagName("ul")[0]
for (const song of songs) {
    songUL.innerHTML=songUL.innerHTML +`<li>
       <div class="playpng"> <img src="music.png" alt="music"/></div>
        <div class="info">
       
         <div> ${song.replaceAll("%20", " ")}  </div>
       
        </div>
         <div class="playbutton2"><img src="playbutton.svg" alt="music"/></div>

        </li>`;
}


Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
e.addEventListener("click", element=>{
console.log(e.querySelector(".info").firstElementChild.innerHTML);
playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
})
})