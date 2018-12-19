/*
*   audio-player v0.1.23 
*   https://github.com/zloid/audio-player
*/
;(() => {    
//first block of variables
let currentAudioNum = 0,
    isFirstPlayBool = true,
    muteSwitchBool = false,
    randomSwitchBool = false,
    playPauseSwitchBool = false,
    allHTMLAudioElementsArr = document.querySelectorAll('audio'),
    allNewUIAudioElementsArr;
    
//FUNCTIONS
function drawNewUi (allHTMLAudioElementsArr, newClassForNewUIAudioStr, putNewUIThereStr, oldUIAudioControlsBool = 'true', displayOldUIAudioStr = 'block') {
    let containerForNewUIAudioElement = document.querySelector(putNewUIThereStr);
    drawProgressBarScreen(containerForNewUIAudioElement);
    drawAllNewButtons(containerForNewUIAudioElement);
    drawAdvancedAudioControls(containerForNewUIAudioElement);
    let newUl = document.createElement('ul');  
    newUl.id = 'ulForNewUiAudioElement';
    for (let i = 0; i < allHTMLAudioElementsArr.length; i++) { 
        allHTMLAudioElementsArr[i].controls = oldUIAudioControlsBool;        
        allHTMLAudioElementsArr[i].style.display = displayOldUIAudioStr;        
        let newLi = document.createElement('li');        
        newLi.className = newClassForNewUIAudioStr;
        let k = i + 1; 
        setTimeout(() => {
            let  pathToAudio = allHTMLAudioElementsArr[i].currentSrc;
            newLi.innerHTML = '▶ ' + k + '. ' + pathToAudio.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig, ' ');

            let upperFirstLetter  = newLi.innerHTML.match(/[a-z]/i).join('').toUpperCase();
            newLi.innerHTML = newLi.innerHTML.replace(/[a-z]/i, upperFirstLetter);
        }, 300)        
        newUl.appendChild(newLi);        
    }    
    containerForNewUIAudioElement.appendChild(newUl);
}

function playPauseNewUIAudioElements (newClassForNewUIAudioStr) {  
    allNewUIAudioElementsArr = document.querySelectorAll(newClassForNewUIAudioStr);    
    for (let i = 0; i < allNewUIAudioElementsArr.length; i++) {                   
        allNewUIAudioElementsArr[i].addEventListener('click', () => { 
            i != currentAudioNum ? (stopCurrentAudio(), togglePlayToPause(i)) : togglePlayToPause(currentAudioNum);                         
            currentAudioNum = i;                 
        })
    }   
}
 
function drawAllNewButtons (containerForNewUIAudioElement) {
    // common div
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
    // common div
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
    //timer > 0:00 🕑 1:08 
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
    //mute
    let divMuteButtonObj = document.createElement('div');
    divMuteButtonObj.id = 'muteActive';
    divMuteButtonObj.id = 'mute';
    //render
    containerForNewUIAudioElement.appendChild(divContainerForAdvancedAudioControlsObj);
    divContainerForAdvancedAudioControlsObj.appendChild(divShuffleButtonObj);
    divContainerForAdvancedAudioControlsObj.appendChild(divMuteButtonObj);
}

//if  resolution changes dynamic > adapt length of audio-progress screen
function resizeAudioProgressCover () {    
    let progressBarContainerActualWidthNum = document.querySelector('#progressBarContainer').offsetWidth;
    let timerContainerCurrentWidthNum = document.querySelector('#timer').offsetWidth;
    let songSliderWidth = document.querySelector('#songSlider');    
    songSliderWidth.style.width = progressBarContainerActualWidthNum - timerContainerCurrentWidthNum + 'px';    
}

//main actions
function playOneAudioPlus (indexOfAudio) {    
    isFirstPlayBool = false;
    toMuteUnmute(indexOfAudio);        
    allHTMLAudioElementsArr[indexOfAudio].play();   
    namingProgressBarEqualCurrentAudioSrc('#trackNameContainer', allHTMLAudioElementsArr, indexOfAudio);
    updaitingTimeOfAudio(allHTMLAudioElementsArr, indexOfAudio, '#timer');       
    updaitingProgressBarOfAudio(allHTMLAudioElementsArr, indexOfAudio, '#songSlider', '#trackProgress');    
    allNewUIAudioElementsArr[indexOfAudio].className = 'newLiClassPlaying';
    allNewUIAudioElementsArr[indexOfAudio].innerHTML = allNewUIAudioElementsArr[indexOfAudio].innerHTML.replace(/▶/, '❚❚');
    playPauseButtonObj.innerHTML = 'PAUSE';
    allNewUIAudioElementsArr[currentAudioNum].style.color = '';    
} 

function stopCurrentAudio () {                  
    allHTMLAudioElementsArr[currentAudioNum].pause();    
    allHTMLAudioElementsArr[currentAudioNum].currentTime = 0;
    playPauseSwitchBool = false;
    allNewUIAudioElementsArr[currentAudioNum].className = 'newLiClass';
    allNewUIAudioElementsArr[currentAudioNum].innerHTML = allNewUIAudioElementsArr[currentAudioNum].innerHTML.replace(/❚❚/, '▶ ');      
    playPauseButtonObj.innerHTML = 'PLAY';
    allNewUIAudioElementsArr[currentAudioNum].style.color = '#389c35';
}

function playNextAudio (indexAudioNowPlayingNum, allHTMLAudioElementsArr) {
    if (isFirstPlayBool) {
        return
    }    
    stopCurrentAudio();
    allNewUIAudioElementsArr[indexAudioNowPlayingNum].style.color = '';
    currentAudioNum = indexAudioNowPlayingNum + 1;     
    // detect last track
    indexAudioNowPlayingNum === allHTMLAudioElementsArr.length - 1 && (currentAudioNum = 0);
    randomSwitchBool ? playShuffle() : playOneAudioPlus(currentAudioNum);  
    playPauseSwitchBool = true;         
}

function playPrevAudio (allHTMLAudioElementsArr) {  
    if (isFirstPlayBool) {
        return
    }
    stopCurrentAudio();
    allNewUIAudioElementsArr[currentAudioNum].style.color = '';
    currentAudioNum--;
    // detect first track
    currentAudioNum < 0 && (currentAudioNum = allHTMLAudioElementsArr.length - 1);
    setTimeout(() => {        
        randomSwitchBool ? playShuffle() : playOneAudioPlus(currentAudioNum);
    }, 100)
    playPauseSwitchBool = true;
}      

function pauseCurrentAudio () {
    allHTMLAudioElementsArr[currentAudioNum].pause();
    allNewUIAudioElementsArr[currentAudioNum].className = 'newLiClass';
    allNewUIAudioElementsArr[currentAudioNum].style.color = '#389c35';
    allNewUIAudioElementsArr[currentAudioNum].innerHTML = allNewUIAudioElementsArr[currentAudioNum].innerHTML.replace(/❚❚/, '▶');     
}
 
function togglePlayToPause (currentAudioNum) {    
    if (!playPauseSwitchBool) {        
        playOneAudioPlus(currentAudioNum);
        playPauseButtonObj.innerHTML = 'PAUSE';
    } else {
        pauseCurrentAudio();  
        playPauseButtonObj.innerHTML = 'PLAY';
    }    
    playPauseSwitchBool ? playPauseSwitchBool = false : playPauseSwitchBool = true;
}

function toMuteUnmute (currentAudioNum) {    
    if (muteSwitchBool) {              
        allHTMLAudioElementsArr[currentAudioNum].volume = 0;
        muteButtonObj.id = 'muteActive';        
    } else {           
        allHTMLAudioElementsArr[currentAudioNum].volume = 1; 
        muteButtonObj.id = 'mute';        
    }     
}

function playShuffle () {        
    if (randomSwitchBool) {        
        stopCurrentAudio();
        allNewUIAudioElementsArr[currentAudioNum].style.color = '';
        currentAudioNum--;
        let randomAudioNum = Math.floor(Math.random() * (allHTMLAudioElementsArr.length - 1));
        currentAudioNum === randomAudioNum ? (currentAudioNum = randomAudioNum += 3) : currentAudioNum = randomAudioNum;
        currentAudioNum > allHTMLAudioElementsArr.length - 1 && (currentAudioNum = Math.round(randomAudioNum / 2));
        playOneAudioPlus(currentAudioNum);                         
        randomButtonObj.id = 'randomActive';
    } else {
        randomButtonObj.id = 'random';        
    }
    playPauseSwitchBool = true;
}

function updaitingTimeOfAudio (allHTMLAudioElementsArr, indexOfAudio, putTimerTo) {  
    //need updating timer > 0:00 🕑 
    let timerUpdate = document.querySelector(putTimerTo);
    let trackObj = allHTMLAudioElementsArr[indexOfAudio];
    //when audio playing
    trackObj.addEventListener('timeupdate', () => { 
        let currentSec = (Math.floor(trackObj.currentTime % 60) < 10 ? '0' : '') + Math.floor(trackObj.currentTime % 60);
        let currentMinutes = Math.floor(trackObj.currentTime / 60);  
        //addition variables together, expect > 0:00 🕑 1:08
        timerUpdate.innerHTML = currentMinutes + ":" + currentSec + ' &#128337; ' + Math.floor(trackObj.duration / 60) + ":" + (Math.floor(trackObj.duration % 60) < 10 ? '0' : '') + Math.floor(trackObj.duration % 60);            
    })
}

function updaitingProgressBarOfAudio (allHTMLAudioElementsArr, indexOfAudio, idSongSlider, idTrackProgress) {
    allHTMLAudioElementsArr[indexOfAudio].addEventListener('timeupdate' , () => {
        let percentageOfSong = (allHTMLAudioElementsArr[indexOfAudio].currentTime / allHTMLAudioElementsArr[indexOfAudio].duration);
        let getSongSlider = document.querySelector(idSongSlider);
        let percentageOfSlider = getSongSlider.offsetWidth * percentageOfSong;        
        document.querySelector(idTrackProgress).style.width = Math.round(percentageOfSlider) + "px";
    })
}

function namingProgressBarEqualCurrentAudioSrc (putAudioLowerCaseNameTo, allHTMLAudioElementsArr, indexOfAudio) {
    setTimeout(() => {
        let audioLowerCaseNameContainer = document.querySelector(putAudioLowerCaseNameTo);
        let  pathToAudio = allHTMLAudioElementsArr[indexOfAudio].currentSrc;
        audioLowerCaseNameContainer.innerHTML = pathToAudio.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig, ' ').toLowerCase();
        audioLowerCaseNameContainer.innerHTML.length > 50 && (audioLowerCaseNameContainer.innerHTML = audioLowerCaseNameContainer.innerHTML.slice(0, 25) + ' ...');
    }, 1)
}

function setTimePositionForAudio(event) {    
    let songSliderWidthNum = takeAudioProgressBarObj.offsetWidth;   
    let clickLocationNum =  event.clientX  - takeAudioProgressBarObj.offsetLeft;
    let percentage = (clickLocationNum / songSliderWidthNum);
    allHTMLAudioElementsArr[currentAudioNum].currentTime = allHTMLAudioElementsArr[currentAudioNum].duration * percentage;
}

//DRAW NEW UI
drawNewUi(allHTMLAudioElementsArr, 'newLiClass', '#AudioPlayerByZloid', false, 'none');
playPauseNewUIAudioElements('.newLiClass');
//second block of variables, necessary add after drawNewUi(), playPauseNewUIAudioElements()
let stopButtonObj = document.querySelector('#stop'),
    backButtonObj = document.querySelector('#back'),
    nextButtonObj = document.querySelector('#next'),
    randomButtonObj = document.querySelector('#random'),
    muteButtonObj = document.querySelector('#mute'),
    playPauseButtonObj = document.querySelector('#play'),
    takeAudioProgressBarObj = document.querySelector('#songSlider');

//EVENTS 
//adjust size of progress bar
window.addEventListener('resize', () => {
    resizeAudioProgressCover();
})
takeAudioProgressBarObj.addEventListener('click', setTimePositionForAudio);
//play next song when prev. ended
for (let i = 0; i < allHTMLAudioElementsArr.length; i++) { 
    allHTMLAudioElementsArr[i].addEventListener('ended', () => {  
            playNextAudio(i, allHTMLAudioElementsArr);
    })
}    
//event stop-button 
stopButtonObj.onclick = stopCurrentAudio;
//event nextButtonObj
nextButtonObj.addEventListener('click', () => {
    playNextAudio(currentAudioNum, allHTMLAudioElementsArr);
})
//event button-back
backButtonObj.addEventListener('click', () => {
    playPrevAudio(allHTMLAudioElementsArr);
})
//event playPause button
playPauseButtonObj.addEventListener('click', () => {
    togglePlayToPause(currentAudioNum);     
});
//event random
randomButtonObj.addEventListener('click', () => {
    randomSwitchBool ? randomSwitchBool = false : randomSwitchBool = true;
    playShuffle();
})
//event mute
muteButtonObj.addEventListener('click', () => {
    muteSwitchBool ? muteSwitchBool = false : muteSwitchBool = true;
    toMuteUnmute(currentAudioNum);
});
//iife
})();