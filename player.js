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
arrayAllOldAudioElement = document.querySelectorAll('audio'),
stopButton = document.querySelector('#stop'),
playButton = document.querySelector('#play'),
nextButton = document.querySelector('#next'),
backButton = document.querySelector('#back'),
arrayOfNewUIAudioInterface;


//all functions
function stopAllAudio () {
    for (let i = 0; i < arrayAllOldAudioElement.length; i++) {                
        arrayAllOldAudioElement[i].pause();
        arrayAllOldAudioElement[i].currentTime = 0;
        arrayOfNewUIAudioInterface[i].className = 'newLiClass';
        arrayOfNewUIAudioInterface[i].innerHTML = arrayOfNewUIAudioInterface[i].innerHTML.replace(/■ /, '▶ ');        
    }
}

function playOneAudio (indexOfAudio) {
    isFirstPlay = false;
    stopAllAudio();
    namingProgressBarEqualCurrentAudioSrc('#trackNameContainer', arrayAllOldAudioElement, indexOfAudio);
    updaitingTimeOfAudio(arrayAllOldAudioElement, indexOfAudio, '#timer');
    arrayAllOldAudioElement[indexOfAudio].play();    
    updaitingProgressBarOfAudio(arrayAllOldAudioElement, indexOfAudio, '#songSlider', '#trackProgress');
    arrayOfNewUIAudioInterface[indexOfAudio].className = 'newLiClassPlaying';
    arrayOfNewUIAudioInterface[indexOfAudio].innerHTML = arrayOfNewUIAudioInterface[indexOfAudio].innerHTML.replace(/▶ /, '■ ');
} 

function updaitingTimeOfAudio (arrayAllOldAudioElement, indexOfAudio, putTimerHere) {    
    let timerUpdate = document.querySelector(putTimerHere);
    arrayAllOldAudioElement[indexOfAudio].addEventListener('timeupdate', () => { 
        let currentSec = (Math.floor(arrayAllOldAudioElement[indexOfAudio].currentTime % 60) < 10 ? '0' : '') + Math.floor(arrayAllOldAudioElement[indexOfAudio].currentTime % 60);
        let currentMinutes = Math.floor(arrayAllOldAudioElement[indexOfAudio].currentTime / 60);
         
        timerUpdate.innerHTML = currentMinutes + ":" + currentSec + ' &#128337; ' + Math.floor(arrayAllOldAudioElement[indexOfAudio].duration / 60) + ":" + (Math.floor(arrayAllOldAudioElement[indexOfAudio].duration % 60) < 10 ? '0' : '') + Math.floor(arrayAllOldAudioElement[indexOfAudio].duration % 60);            
    })
}

//todo
function updaitingProgressBarOfAudio (arrayAllOldAudioElement, indexOfAudio, idSongSlider, idTrackProgress) {
    arrayAllOldAudioElement[indexOfAudio].addEventListener('timeupdate', () => {
        let percentageOfSong = (arrayAllOldAudioElement[indexOfAudio].currentTime/arrayAllOldAudioElement[indexOfAudio].duration);
        let getSongSlider = document.querySelector(idSongSlider);
        let percentageOfSlider = getSongSlider.offsetWidth * percentageOfSong;
        document.querySelector(idTrackProgress).style.width = Math.round(percentageOfSlider) + "px";
    })
}

function namingProgressBarEqualCurrentAudioSrc (placeForAudioMiniName, arrayAllOldAudioElement, indexOfAudio) {
    setTimeout(() => {
        let getPlaceForAudioMiniName = document.querySelector(placeForAudioMiniName);
        let  pathToAudio = arrayAllOldAudioElement[indexOfAudio].currentSrc;
        getPlaceForAudioMiniName.innerHTML = pathToAudio.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig, ' ').toLowerCase();
    }, 1)
}

 
function setSongPosition(obj,e, arrayAllOldAudioElement, indexOfAudio){
    
    let songSliderWidth = obj.offsetWidth;

    let evtobj = window.event ? event : e;

    clickLocation =  evtobj.layerX - obj.offsetLeft;
    
    let percentage = (clickLocation/songSliderWidth);

    arrayAllOldAudioElement[indexOfAudio].currentTime = arrayAllOldAudioElement[indexOfAudio].duration * percentage;
}

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
        playOneAudio(audioNowPlaying);   
    } else {
        playOneAudio(audioNowPlaying);    
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
    playOneAudio(audioNowPlaying);
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
                playOneAudio(i);
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
drawNewUi(arrayAllOldAudioElement, 'newLiClass', '#AudioPlayerByZloid', 'none', false);
playingNewUIAudioElements('.newLiClass', arrayAllOldAudioElement);
//EVENTS  
//play next song when prev. ended
for (let i = 0; i < arrayAllOldAudioElement.length; i++) { 
    arrayAllOldAudioElement[i].addEventListener('ended', () => {
        playNextAudio(i, arrayAllOldAudioElement);
    })
}    

//event button-play
playButton.addEventListener('click', () => {
    playOneAudio(audioNowPlaying);
})

//event stop-button 
stopButton.onclick = stopAllAudio;

//event nextButton
nextButton.addEventListener('click',() => {
    playNextAudio(audioNowPlaying, arrayAllOldAudioElement);
})


//event button-back
backButton.addEventListener('click', () => {
    playBackAudio(arrayAllOldAudioElement);
})


console.timeEnd('runTimeAllScript');