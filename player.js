// TASKS:
// [+] take all audio in []
// [+] stop all ()
// [+] play 1 ()
// [+] play audio loop, from next song ()
// [+] play next ()
// [+] play before ()
// [+] create new UI-Li = all audio elem
// [+] RegExp name for all songs from SRC audio elements
// [+] clickable visual play of each audio element
// [+] progress bar()
// [+] visual time progress () like - 01:45 (Song Meter and Time Tracker)
// [-] Volume Meter
// [-] Volume Up, Down
// [-] random() btn
// [-] cicle() btn
// [-] visual play/pause () on 1 btn
// [-] 
// [-] 
// [-] abort text select
// [-] sharing() ?
// [-] download() ... feature ?
// [-] pause() btn ???


//todo
console.time('runTimeAllScript');

//all variables
let audioNowPlaying = 0,
isFirstPlay = true,
arrayAllHTMLAudioElement = document.querySelectorAll('audio'),
stopButton = document.querySelector('#stop'),
playButton = document.querySelector('#play'),
nextButton = document.querySelector('#next'),
backButton = document.querySelector('#back'),
arrayOfNewUIAudioInterface,
takeAudioProgressBar = document.querySelector('#songSlider');


//all functions
function stopAllAudio () {
    for (let i = 0; i < arrayAllHTMLAudioElement.length; i++) {                
        arrayAllHTMLAudioElement[i].pause();
        arrayAllHTMLAudioElement[i].currentTime = 0;
        arrayOfNewUIAudioInterface[i].className = 'newLiClass';
        arrayOfNewUIAudioInterface[i].innerHTML = arrayOfNewUIAudioInterface[i].innerHTML.replace(/■ /, '▶ ');        
    }
}

function playOneAudioPlus (indexOfAudio) {
    isFirstPlay = false;
    stopAllAudio();
    namingProgressBarEqualCurrentAudioSrc('#trackNameContainer', arrayAllHTMLAudioElement, indexOfAudio);
    updaitingTimeOfAudio(arrayAllHTMLAudioElement, indexOfAudio, '#timer');
    arrayAllHTMLAudioElement[indexOfAudio].play();    
    updaitingProgressBarOfAudio(arrayAllHTMLAudioElement, indexOfAudio, '#songSlider', '#trackProgress');
    arrayOfNewUIAudioInterface[indexOfAudio].className = 'newLiClassPlaying';
    arrayOfNewUIAudioInterface[indexOfAudio].innerHTML = arrayOfNewUIAudioInterface[indexOfAudio].innerHTML.replace(/▶ /, '■ ');
} 

function updaitingTimeOfAudio (arrayAllHTMLAudioElement, indexOfAudio, putTimerTo) {    
    let timerUpdate = document.querySelector(putTimerTo);
    arrayAllHTMLAudioElement[indexOfAudio].addEventListener('timeupdate', () => { 
        let currentSec = (Math.floor(arrayAllHTMLAudioElement[indexOfAudio].currentTime % 60) < 10 ? '0' : '') + Math.floor(arrayAllHTMLAudioElement[indexOfAudio].currentTime % 60);
        let currentMinutes = Math.floor(arrayAllHTMLAudioElement[indexOfAudio].currentTime / 60);
         
        timerUpdate.innerHTML = currentMinutes + ":" + currentSec + ' &#128337; ' + Math.floor(arrayAllHTMLAudioElement[indexOfAudio].duration / 60) + ":" + (Math.floor(arrayAllHTMLAudioElement[indexOfAudio].duration % 60) < 10 ? '0' : '') + Math.floor(arrayAllHTMLAudioElement[indexOfAudio].duration % 60);            
    })
}

function updaitingProgressBarOfAudio (arrayAllHTMLAudioElement, indexOfAudio, idSongSlider, idTrackProgress) {
    arrayAllHTMLAudioElement[indexOfAudio].addEventListener('timeupdate' , () => {
        let percentageOfSong = (arrayAllHTMLAudioElement[indexOfAudio].currentTime/arrayAllHTMLAudioElement[indexOfAudio].duration);
        let getSongSlider = document.querySelector(idSongSlider);
        let percentageOfSlider = getSongSlider.offsetWidth * percentageOfSong;
        document.querySelector(idTrackProgress).style.width = Math.round(percentageOfSlider) + "px";
    })
}

function namingProgressBarEqualCurrentAudioSrc (putAudioLowerCaseNameTo, arrayAllHTMLAudioElement, indexOfAudio) {
    setTimeout(() => {
        let AudioLowerCaseNameContainer = document.querySelector(putAudioLowerCaseNameTo);
        let  pathToAudio = arrayAllHTMLAudioElement[indexOfAudio].currentSrc;
        AudioLowerCaseNameContainer.innerHTML = pathToAudio.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig, ' ').toLowerCase();
        AudioLowerCaseNameContainer.innerHTML = `&nbsp;&nbsp; ${AudioLowerCaseNameContainer.innerHTML}`;
    }, 1)
}

//  todo
function setSongPosition(event){    
    let songSliderWidth = takeAudioProgressBar.offsetWidth;    
    //window.event
    let clickLocation =  event.layerX - takeAudioProgressBar.offsetLeft;
    let percentage = (clickLocation/songSliderWidth);
    //bingo
    arrayAllHTMLAudioElement[audioNowPlaying].currentTime = arrayAllHTMLAudioElement[audioNowPlaying].duration * percentage;
}

//  todo
takeAudioProgressBar.addEventListener('click', setSongPosition);

 
//=================================
function playNextAudio (indexAudioNowPlaying, arrayAllAudio) {
    if (isFirstPlay) {
        return
    }    
    stopAllAudio();
    audioNowPlaying = indexAudioNowPlaying + 1;
    //last audio's detector
    if (indexAudioNowPlaying == arrayAllAudio.length - 1) {             
        audioNowPlaying = 0;
        playOneAudioPlus(audioNowPlaying);   
    } else {
        playOneAudioPlus(audioNowPlaying);    
    }
}


function playBackAudio (arrayAllAudio) {  
    if (isFirstPlay) {
        return
    }
    stopAllAudio();
    audioNowPlaying--;
    if (audioNowPlaying < 0) {
        audioNowPlaying = arrayAllAudio.length - 1;
    }
    playOneAudioPlus(audioNowPlaying);
}      

function drawNewUi (arrayAllAudio, setNewClassForNewUIAudio, putNewUIThere, displayOldUIAudio, oldUIAudioControlsBool) {
    let containerForNewUIAudioElement = document.querySelector(putNewUIThere);
    let newUl = document.createElement('ul');        
    for (let i = 0; i < arrayAllAudio.length; i++) {                 
        arrayAllAudio[i].style.display = displayOldUIAudio;        
        arrayAllAudio[i].controls = oldUIAudioControlsBool;        
        let newLi = document.createElement('li');        
        newLi.className = setNewClassForNewUIAudio;
        
        let k = i + 1; 
        setTimeout(() => {
            let  pathToAudio = arrayAllAudio[i].currentSrc;
            newLi.innerHTML = '▶ ' + k + ') ' + pathToAudio.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig, ' ');
            
            let upperFirstLetter  = newLi.innerHTML.match(/[a-z]/i).join('').toUpperCase();
            newLi.innerHTML = newLi.innerHTML.replace(/[a-z]/i, upperFirstLetter)
            
        }, 200)        
        newUl.appendChild(newLi);        
    }    
    containerForNewUIAudioElement.appendChild(newUl);
}

function playingNewUIAudioElements (takeNewClassFromNewUIAudio, arrayAllAudio) {  
    arrayOfNewUIAudioInterface = document.querySelectorAll(takeNewClassFromNewUIAudio);    
    for (let i = 0; i < arrayOfNewUIAudioInterface.length; i++) {                   
        arrayOfNewUIAudioInterface[i].addEventListener('click', () => {                    
            if (arrayAllAudio[i].currentTime == 0){
                playOneAudioPlus(i);
            } else {                
                stopAllAudio();                
            }            
            audioNowPlaying = i;                              
        })
    }    
}

//==============================



// todo

//DRAW NEW UI
drawNewUi(arrayAllHTMLAudioElement, 'newLiClass', '#AudioPlayerByZloid', 'none', false);
playingNewUIAudioElements('.newLiClass', arrayAllHTMLAudioElement);
//EVENTS  
//play next song when prev. ended
for (let i = 0; i < arrayAllHTMLAudioElement.length; i++) { 
    arrayAllHTMLAudioElement[i].addEventListener('ended', () => {
        playNextAudio(i, arrayAllHTMLAudioElement);
    })
}    

//event button-play
playButton.addEventListener('click', () => {
    playOneAudioPlus(audioNowPlaying);
})

//event stop-button 
stopButton.onclick = stopAllAudio;

//event nextButton
nextButton.addEventListener('click',() => {
    playNextAudio(audioNowPlaying, arrayAllHTMLAudioElement);
})


//event button-back
backButton.addEventListener('click', () => {
    playBackAudio(arrayAllHTMLAudioElement);
})


console.timeEnd('runTimeAllScript');