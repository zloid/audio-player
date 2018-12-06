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
// [+] muteMode ()
// [+] shufflePlay () {} + random() btn
// [-] Volume Meter
// [-] Volume Up, Down
// [-] cicle() btn
// [-] 
// [-] sharing() ?
// [-] download() ... feature ?
// [-] fix all dirty code


//todo
console.time('runTimeAllScript');

//all variables
let 
audioNowPlayingInt = 0,
isFirstPlayBool = true,
muteSwitchBool = false,
randomSwitchBool = false,
arrayAllHTMLAudioElementObj = document.querySelectorAll('audio'),
// stopButtonObj = document.querySelector('#stop'),
// playButtonObj = document.querySelector('#play'),
// nextButtonObj = document.querySelector('#next'),
// backButtonObj = document.querySelector('#back'),
// muteButtonObj = document.querySelector('#mute'),
// randomButtonObj = document.querySelector('#random'),
// takeAudioProgressBarObj = document.querySelector('#songSlider'),
arrayOfNewUIAudioInterfaceObj;


//all functions

function drawNewUi (arrayAllAudio, setNewClassForNewUIAudio, putNewUIThere, displayOldUIAudio, oldUIAudioControlsBool) {
    let containerForNewUIAudioElement = document.querySelector(putNewUIThere);
    //todo
    drawProgressBarScreen(containerForNewUIAudioElement);
    drawAllNewButtons(containerForNewUIAudioElement);
    drawAdvancedAudioControls(containerForNewUIAudioElement);

    let newUl = document.createElement('ul');  
    newUl.id = 'ulForNewUiAudioElement';
    for (let i = 0; i < arrayAllAudio.length; i++) { 

        arrayAllAudio[i].style.display = displayOldUIAudio;        
        arrayAllAudio[i].controls = oldUIAudioControlsBool;        
        let newLi = document.createElement('li');        
        newLi.className = setNewClassForNewUIAudio;
        
        let k = i + 1; 
        setTimeout(() => {
            let  pathToAudio = arrayAllAudio[i].currentSrc;
            newLi.innerHTML = '▶ ' + k + '. ' + pathToAudio.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig, ' ');
            
            let upperFirstLetter  = newLi.innerHTML.match(/[a-z]/i).join('').toUpperCase();
            newLi.innerHTML = newLi.innerHTML.replace(/[a-z]/i, upperFirstLetter)
            
        }, 300)        
        newUl.appendChild(newLi);        
    }    
    containerForNewUIAudioElement.appendChild(newUl);
}
 
//  ===================
function drawAllNewButtons (containerForNewUIAudioElement) {
    let divForButtons = document.createElement('div');
    divForButtons.id = 'allButtonsHere';    
    containerForNewUIAudioElement.appendChild(divForButtons);
    //stop
    let newBtnStop = document.createElement('button');
    newBtnStop.id = 'stop';
    newBtnStop.innerHTML = 'STOP';
    //play
    let newBtnPlay = document.createElement('button');
    newBtnPlay.id = 'play';
    newBtnPlay.innerHTML = 'PLAY';
    //back
    let newBtnBack = document.createElement('button');
    newBtnBack.id = 'back';
    newBtnBack.innerHTML = 'BACK';
    //next
    let newBtnNext = document.createElement('button');
    newBtnNext.id = 'next';
    newBtnNext.innerHTML = 'NEXT';
    //render
    divForButtons.appendChild(newBtnPlay);
    divForButtons.appendChild(newBtnBack);
    divForButtons.appendChild(newBtnStop);
    divForButtons.appendChild(newBtnNext);
}


 
function drawProgressBarScreen (containerForNewUIAudioElement) {
    let divForProgressBar = document.createElement('div');
    divForProgressBar.id = 'progressBarContainer';
    //songSlider
    let songSliderObj = document.createElement('div');
    songSliderObj.id = 'songSlider';
    //trackProgress
    let trackProgressObj = document.createElement('div');
    trackProgressObj.id = 'trackProgress';
    //trackNameContainer
    let trackNameContainerObj = document.createElement('div');
    trackNameContainerObj.id = 'trackNameContainer';
    //timer
    let timerObj = document.createElement('div');
    timerObj.id = 'timer';
    timerObj.innerHTML = '0:00 &#128337; 0:00';
    //render
    containerForNewUIAudioElement.appendChild(divForProgressBar);
    divForProgressBar.appendChild(songSliderObj);
    divForProgressBar.appendChild(timerObj);
    songSliderObj.appendChild(trackProgressObj);
    trackProgressObj.appendChild(trackNameContainerObj);

resizeAudioProgressCover();
}

function drawAdvancedAudioControls (containerForNewUIAudioElement) {
    let divContainerForAdvancedAudioControlsObj = document.createElement('div');
    divContainerForAdvancedAudioControlsObj.id = 'ContainerForAdvancedAudioControls';
    //shuffle
    let divShuffleButtonObj = document.createElement('div');
    divShuffleButtonObj.id = 'randomActive';
    divShuffleButtonObj.id = 'random';
    // divShuffleButtonObj.innerHTML = 'shuffle';
    //mute
    let divMuteButtonObj = document.createElement('div');
    divMuteButtonObj.id = 'muteActive';
    divMuteButtonObj.id = 'mute';
    //render
    containerForNewUIAudioElement.appendChild(divContainerForAdvancedAudioControlsObj);
    divContainerForAdvancedAudioControlsObj.appendChild(divShuffleButtonObj);
    divContainerForAdvancedAudioControlsObj.appendChild(divMuteButtonObj);
}

function resizeAudioProgressCover () {    
    let progressBarContainerActualWidthInt = document.querySelector('#progressBarContainer').offsetWidth;
    let timerContainerActualWidthInt = document.querySelector('#timer').offsetWidth;
    let songSliderWidth = document.querySelector('#songSlider');    
    songSliderWidth.style.width = progressBarContainerActualWidthInt - timerContainerActualWidthInt + 'px';    
}

//  ===================

//todo
function playOneAudioPlus (indexOfAudio) {    
 
    isFirstPlayBool = false;
    muteMode(indexOfAudio);    
    
    arrayAllHTMLAudioElementObj[indexOfAudio].play();   
    
    namingProgressBarEqualCurrentAudioSrc('#trackNameContainer', arrayAllHTMLAudioElementObj, indexOfAudio);
    updaitingTimeOfAudio(arrayAllHTMLAudioElementObj, indexOfAudio, '#timer');       
    updaitingProgressBarOfAudio(arrayAllHTMLAudioElementObj, indexOfAudio, '#songSlider', '#trackProgress');

    arrayOfNewUIAudioInterfaceObj[indexOfAudio].className = 'newLiClassPlaying';
    arrayOfNewUIAudioInterfaceObj[indexOfAudio].innerHTML = arrayOfNewUIAudioInterfaceObj[indexOfAudio].innerHTML.replace(/▶/, '❚❚');
    playButtonObj.innerHTML = 'PAUSE';
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].style.color = '';
    
} 


function stopActualAudio () {                  
    arrayAllHTMLAudioElementObj[audioNowPlayingInt].pause();
    arrayAllHTMLAudioElementObj[audioNowPlayingInt].currentTime = 0;
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].className = 'newLiClass';
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML = arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML.replace(/❚❚/, '▶ ');            
    playButtonObj.innerHTML = 'PLAY';
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].style.color = '#389c35';
}

//todo
function pauseActualAudio () {
    arrayAllHTMLAudioElementObj[audioNowPlayingInt].pause();
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].className = 'newLiClass';
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].style.color = '#389c35';

    // arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].classList.add("newLiClassPlayingPaused");
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML = arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML.replace(/❚❚/, '▶');     
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
//todo
        // if (percentageOfSlider > 0) {
        //     arrayAllHTMLAudioElementObj[indexOfAudio].className = 'newLiClassPlaying';
        // } else {
        //     arrayAllHTMLAudioElementObj[indexOfAudio].className = 'newLiClass';
        // }
    })
}

function namingProgressBarEqualCurrentAudioSrc (putAudioLowerCaseNameTo, arrayAllHTMLAudioElementObj, indexOfAudio) {
    setTimeout(() => {
        let AudioLowerCaseNameContainer = document.querySelector(putAudioLowerCaseNameTo);
        let  pathToAudio = arrayAllHTMLAudioElementObj[indexOfAudio].currentSrc;
        AudioLowerCaseNameContainer.innerHTML = pathToAudio.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig, ' ').toLowerCase();
        // AudioLowerCaseNameContainer.innerHTML = `${AudioLowerCaseNameContainer.innerHTML}`;
        // console.log('AudioLowerCaseNameContainer.innerHTML.length:', .innerHTML.length)

        // let SongSliderActualWidthInt = document.querySelector('#songSlider').offsetWidth;
        
        if (AudioLowerCaseNameContainer.innerHTML.length > 50) {
            AudioLowerCaseNameContainer.innerHTML = AudioLowerCaseNameContainer.innerHTML.slice(0, 25) + ' ...';
        }
    }, 1)
}

//  todo
function setSongPosition(event){    
    let songSliderWidthInt = takeAudioProgressBarObj.offsetWidth;    
    //window.event
    // let clickLocationInt =  event.layerX - takeAudioProgressBarObj.offsetLeft;
    let clickLocationInt =  event.layerX;
    let percentage = (clickLocationInt/songSliderWidthInt);
    //bingo
    arrayAllHTMLAudioElementObj[audioNowPlayingInt].currentTime = arrayAllHTMLAudioElementObj[audioNowPlayingInt].duration * percentage;
}

 
function playNextAudio (indexAudioNowPlayingInt, arrayAllAudio, delayBetweenAudioInt = 50) {
    if (isFirstPlayBool) {
        return
    }    
    stopActualAudio();
    arrayOfNewUIAudioInterfaceObj[indexAudioNowPlayingInt].style.color = '';
    audioNowPlayingInt = indexAudioNowPlayingInt + 1;     
        //last audio's detector
    if (indexAudioNowPlayingInt == arrayAllAudio.length - 1) {             
        audioNowPlayingInt = 0;
    }
    setTimeout(() => {            
        randomSwitchBool ? shufflePlay() : playOneAudioPlus(audioNowPlayingInt);           
    }, delayBetweenAudioInt)
}


function playBackAudio (arrayAllAudio, delayBetweenAudioInt = 50) {  
    if (isFirstPlayBool) {
        return
    }
    stopActualAudio();
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].style.color = '';
    audioNowPlayingInt--;
    if (audioNowPlayingInt < 0) {
        audioNowPlayingInt = arrayAllAudio.length - 1;
    }
    setTimeout(() => {        
        randomSwitchBool ? shufflePlay() : playOneAudioPlus(audioNowPlayingInt);
    }, delayBetweenAudioInt)
}      

//todo
function playingNewUIAudioElements (takeNewClassFromNewUIAudio) {  
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
        // muteButtonObj.innerHTML = 'loud';                
        arrayAllHTMLAudioElementObj[audioNowPlayingInt].volume = 0;
        muteButtonObj.id = 'muteActive';        
    } else {           
        arrayAllHTMLAudioElementObj[audioNowPlayingInt].volume = 1;                  
        // muteButtonObj.innerHTML = 'mute'
        muteButtonObj.id = 'mute';        
    }     
}

//todo
function shufflePlay (delayBetweenAudioInt = 50) {        
    if (randomSwitchBool) {        
        stopActualAudio();
        arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].style.color = '';
        audioNowPlayingInt--;
        let randomAudioInt = Math.floor(Math.random() * (arrayAllHTMLAudioElementObj.length - 1));
        // console.log('1audioNowPlayingInt:', audioNowPlayingInt);
        // console.log('1randomAudioInt:', randomAudioInt);        
        (audioNowPlayingInt == randomAudioInt) ? audioNowPlayingInt = randomAudioInt+= 3 : audioNowPlayingInt = randomAudioInt;
        // console.log('2audioNowPlayingInt:', audioNowPlayingInt);        
        if (audioNowPlayingInt > (arrayAllHTMLAudioElementObj.length - 1)) {
            audioNowPlayingInt = Math.round(randomAudioInt/2);
        }        
        setTimeout(() => {            
            playOneAudioPlus(audioNowPlayingInt);                         
        }, delayBetweenAudioInt)
        randomButtonObj.id = 'randomActive';
    } else {
        randomButtonObj.id = 'random';        
    }
}

//====================================================

//  end fun-s
//===============================================================

// todo

//DRAW NEW UI
drawNewUi(arrayAllHTMLAudioElementObj, 'newLiClass', '#AudioPlayerByZloid', '', true);
playingNewUIAudioElements('.newLiClass');

window.addEventListener('resize', () => {
    resizeAudioProgressCover();
})


//===========================================

let stopButtonObj = document.querySelector('#stop'),
backButtonObj = document.querySelector('#back'),
nextButtonObj = document.querySelector('#next'),
playButtonObj = document.querySelector('#play'),
randomButtonObj = document.querySelector('#random'),
muteButtonObj = document.querySelector('#mute'),
takeAudioProgressBarObj = document.querySelector('#songSlider');
//===========================================

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
nextButtonObj.addEventListener('click', () => {
    playNextAudio(audioNowPlayingInt, arrayAllHTMLAudioElementObj);
})


//event button-back
backButtonObj.addEventListener('click', () => {
    playBackAudio(arrayAllHTMLAudioElementObj);
})


//  todo
takeAudioProgressBarObj.addEventListener('click', setSongPosition);

//event mute
muteButtonObj.addEventListener('click', () => {
    muteSwitchBool ? muteSwitchBool = false : muteSwitchBool = true;
    muteMode(audioNowPlayingInt);
})

//event random
randomButtonObj.addEventListener('click', () => {
    randomSwitchBool ? randomSwitchBool = false : randomSwitchBool = true;
    shufflePlay();
})
 







// console.timeEnd('runTimeAllScript');

//todo xxx


// let xxx = document.querySelector('#trackNameContainer');
// console.log('trackNameContainer:', xxx.offsetWidth, 'px');