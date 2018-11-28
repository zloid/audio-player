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
// [+] pause() btn //integrate in play() btn + added playPause on each new UI element
// [+] visual play/pause () on 1 btn
// [+] abort text select
// [-] Volume Meter
// [-] muteMode ()
// [-] Volume Up, Down
// [-] random() btn
// [-] cicle() btn
// [-] 
// [-] sharing() ?
// [-] download() ... feature ?
// [-] fix all dirty code


//todo
console.time('runTimeAllScript');

//all variables
let audioNowPlayingInt = 0,
isFirstPlayBool = true,
muteSwitchBool = false,
arrayAllHTMLAudioElementObj = document.querySelectorAll('audio'),
stopButtonObj = document.querySelector('#stop'),
playButtonObj = document.querySelector('#play'),
nextButtonObj = document.querySelector('#next'),
backButtonObj = document.querySelector('#back'),
muteButtonObj = document.querySelector('#mute'),
arrayOfNewUIAudioInterfaceObj,
takeAudioProgressBarObj = document.querySelector('#songSlider');


//all functions
function stopActualAudio () {                  
    arrayAllHTMLAudioElementObj[audioNowPlayingInt].pause();
    arrayAllHTMLAudioElementObj[audioNowPlayingInt].currentTime = 0;
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].className = 'newLiClass';
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML = arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML.replace(/■ |[|][|]/, '▶ ');            
    playButtonObj.innerHTML = 'PLAY';
}

//todo
function pauseActualAudio () {
    arrayAllHTMLAudioElementObj[audioNowPlayingInt].pause();
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].className = 'newLiClass';
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML = arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML.replace(/[|][|]/, '▶');     
}

//todo
function playOneAudioPlus (indexOfAudio) {
    isFirstPlayBool = false;
    muteMode(indexOfAudio);
    pauseActualAudio();
    namingProgressBarEqualCurrentAudioSrc('#trackNameContainer', arrayAllHTMLAudioElementObj, indexOfAudio);
    updaitingTimeOfAudio(arrayAllHTMLAudioElementObj, indexOfAudio, '#timer');            
    arrayAllHTMLAudioElementObj[indexOfAudio].play();        
    updaitingProgressBarOfAudio(arrayAllHTMLAudioElementObj, indexOfAudio, '#songSlider', '#trackProgress');
    arrayOfNewUIAudioInterfaceObj[indexOfAudio].className = 'newLiClassPlaying';
    arrayOfNewUIAudioInterfaceObj[indexOfAudio].innerHTML = arrayOfNewUIAudioInterfaceObj[indexOfAudio].innerHTML.replace(/▶/, '||');

    playButtonObj.innerHTML = 'PAUSE';
    // playButtonObj.innerHTML = '99999999999999999';
} 

function updaitingTimeOfAudio (arrayAllHTMLAudioElementObj, indexOfAudio, putTimerTo) {    
    let timerUpdate = document.querySelector(putTimerTo);
    arrayAllHTMLAudioElementObj[indexOfAudio].addEventListener('timeupdate', () => { 
        let currentSec = (Math.floor(arrayAllHTMLAudioElementObj[indexOfAudio].currentTime % 60) < 10 ? '0' : '') + Math.floor(arrayAllHTMLAudioElementObj[indexOfAudio].currentTime % 60);
        let currentMinutes = Math.floor(arrayAllHTMLAudioElementObj[indexOfAudio].currentTime / 60);
         
        timerUpdate.innerHTML = currentMinutes + ":" + currentSec + ' &#128337; ' + Math.floor(arrayAllHTMLAudioElementObj[indexOfAudio].duration / 60) + ":" + (Math.floor(arrayAllHTMLAudioElementObj[indexOfAudio].duration % 60) < 10 ? '0' : '') + Math.floor(arrayAllHTMLAudioElementObj[indexOfAudio].duration % 60);            
    })
}

function updaitingProgressBarOfAudio (arrayAllHTMLAudioElementObj, indexOfAudio, idSongSlider, idTrackProgress) {
    arrayAllHTMLAudioElementObj[indexOfAudio].addEventListener('timeupdate' , () => {
        let percentageOfSong = (arrayAllHTMLAudioElementObj[indexOfAudio].currentTime/arrayAllHTMLAudioElementObj[indexOfAudio].duration);
        let getSongSlider = document.querySelector(idSongSlider);
        let percentageOfSlider = getSongSlider.offsetWidth * percentageOfSong;
        document.querySelector(idTrackProgress).style.width = Math.round(percentageOfSlider) + "px";
    })
}

function namingProgressBarEqualCurrentAudioSrc (putAudioLowerCaseNameTo, arrayAllHTMLAudioElementObj, indexOfAudio) {
    setTimeout(() => {
        let AudioLowerCaseNameContainer = document.querySelector(putAudioLowerCaseNameTo);
        let  pathToAudio = arrayAllHTMLAudioElementObj[indexOfAudio].currentSrc;
        AudioLowerCaseNameContainer.innerHTML = pathToAudio.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig, ' ').toLowerCase();
        AudioLowerCaseNameContainer.innerHTML = `&nbsp;&nbsp; ${AudioLowerCaseNameContainer.innerHTML}`;
    }, 1)
}

//  todo
function setSongPosition(event){    
    let songSliderWidth = takeAudioProgressBarObj.offsetWidth;    
    //window.event
    let clickLocation =  event.layerX - takeAudioProgressBarObj.offsetLeft;
    let percentage = (clickLocation/songSliderWidth);
    //bingo
    arrayAllHTMLAudioElementObj[audioNowPlayingInt].currentTime = arrayAllHTMLAudioElementObj[audioNowPlayingInt].duration * percentage;
}

//  todo
takeAudioProgressBarObj.addEventListener('click', setSongPosition);

 
//=================================
function playNextAudio (indexAudioNowPlayingInt, arrayAllAudio) {
    if (isFirstPlayBool) {
        return
    }    
    stopActualAudio();
    audioNowPlayingInt = indexAudioNowPlayingInt + 1;
     
        //last audio's detector
        if (indexAudioNowPlayingInt == arrayAllAudio.length - 1) {             
            audioNowPlayingInt = 0;
            setTimeout(() => {
                
                playOneAudioPlus(audioNowPlayingInt);   
            }, 200)
        } else {
            setTimeout(() => {
                
                playOneAudioPlus(audioNowPlayingInt);    
            }, 200)
        }
     
}


function playBackAudio (arrayAllAudio) {  
    if (isFirstPlayBool) {
        return
    }
    stopActualAudio();
    audioNowPlayingInt--;
    if (audioNowPlayingInt < 0) {
        audioNowPlayingInt = arrayAllAudio.length - 1;
    }
    playOneAudioPlus(audioNowPlayingInt);
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
            
        }, 250)        
        newUl.appendChild(newLi);        
    }    
    containerForNewUIAudioElement.appendChild(newUl);
}

//todo
function playingNewUIAudioElements (takeNewClassFromNewUIAudio, arrayAllHTMLAudioElementObj) {  
    arrayOfNewUIAudioInterfaceObj = document.querySelectorAll(takeNewClassFromNewUIAudio);    
    for (let i = 0; i < arrayOfNewUIAudioInterfaceObj.length; i++) {                   
        arrayOfNewUIAudioInterfaceObj[i].addEventListener('click', () => {      
              
                if (i != audioNowPlayingInt) {                    
                    stopActualAudio();                                        
                    playOneAudioPlus(i);
                    
                } else if (i == audioNowPlayingInt && (arrayOfNewUIAudioInterfaceObj[i].className != takeNewClassFromNewUIAudio.slice(1))) {
                    pauseActualAudio();
                    playButtonObj.innerHTML = 'PLAY';
                    
                } else if (i == audioNowPlayingInt && (arrayOfNewUIAudioInterfaceObj[i].className == takeNewClassFromNewUIAudio.slice(1))) {                    
                    playOneAudioPlus(i);                
                }                  
                
            audioNowPlayingInt = i;      

             
        })
    }    
}


function muteMode (audioNowPlayingInt) {    
    if (muteSwitchBool) {
        muteButtonObj.innerHTML = 'loud'        
        arrayAllHTMLAudioElementObj[audioNowPlayingInt].volume = 0;        
    } else {           
        arrayAllHTMLAudioElementObj[audioNowPlayingInt].volume = 1;                   
        muteButtonObj.innerHTML = 'mute'
    }     
}

muteButtonObj.addEventListener('click', () => {
    muteSwitchBool ? muteSwitchBool = false : muteSwitchBool = true;
    muteMode(audioNowPlayingInt);
    console.log('muteSwitchBool:', muteSwitchBool)
})

 
//xxx 
//===============================================================

// todo

//DRAW NEW UI
drawNewUi(arrayAllHTMLAudioElementObj, 'newLiClass', '#AudioPlayerByZloid', 'none', false);
playingNewUIAudioElements('.newLiClass', arrayAllHTMLAudioElementObj);

//EVENTS  
//play next song when prev. ended
for (let i = 0; i < arrayAllHTMLAudioElementObj.length; i++) { 
    arrayAllHTMLAudioElementObj[i].addEventListener('ended', () => {
        playNextAudio(i, arrayAllHTMLAudioElementObj);
        //todo
        muteMode(i);
    })
}    

//event button-play
playButtonObj.addEventListener('click', () => {
    
    if (playButtonObj.innerHTML == 'PLAY') {
        // stopActualAudio();
        playOneAudioPlus(audioNowPlayingInt);
        playButtonObj.innerHTML = 'PAUSE';
    } else {
        pauseActualAudio();  
        playButtonObj.innerHTML = 'PLAY';
    }

})

//event stop-button 
stopButtonObj.onclick = stopActualAudio;

//event nextButtonObj
nextButtonObj.addEventListener('click',() => {
    playNextAudio(audioNowPlayingInt, arrayAllHTMLAudioElementObj);
})


//event button-back
backButtonObj.addEventListener('click', () => {
    playBackAudio(arrayAllHTMLAudioElementObj);
})


console.timeEnd('runTimeAllScript');

//todo xxx

