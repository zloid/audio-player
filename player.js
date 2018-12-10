//first part of variables
let currentAudioInt = 0,
    isFirstPlayBool = true,
    muteSwitchBool = false,
    randomSwitchBool = false,
    playPauseSwitchBool = false,
    allHTMLAudioElementArr = document.querySelectorAll('audio'),
    arrayOfNewUIAudioInterfaceObj;

//functions
function drawNewUi (allHTMLAudioElementArr, newClassForNewUIAudioStr, putNewUIThereStr, oldUIAudioControlsBool = 'true', displayOldUIAudioStr = 'block') {
    let containerForNewUIAudioElement = document.querySelector(putNewUIThereStr);
    drawProgressBarScreen(containerForNewUIAudioElement);
    drawAllNewButtons(containerForNewUIAudioElement);
    drawAdvancedAudioControls(containerForNewUIAudioElement);
    let newUl = document.createElement('ul');  
    newUl.id = 'ulForNewUiAudioElement';
    for (let i = 0; i < allHTMLAudioElementArr.length; i++) { 
        allHTMLAudioElementArr[i].controls = oldUIAudioControlsBool;        
        allHTMLAudioElementArr[i].style.display = displayOldUIAudioStr;        
        let newLi = document.createElement('li');        
        newLi.className = newClassForNewUIAudioStr;
        let k = i + 1; 
        setTimeout(() => {
            let  pathToAudio = allHTMLAudioElementArr[i].currentSrc;
            newLi.innerHTML = '▶ ' + k + '. ' + pathToAudio.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig, ' ');

            let upperFirstLetter  = newLi.innerHTML.match(/[a-z]/i).join('').toUpperCase();
            newLi.innerHTML = newLi.innerHTML.replace(/[a-z]/i, upperFirstLetter);
        }, 300)        
        newUl.appendChild(newLi);        
    }    
    containerForNewUIAudioElement.appendChild(newUl);
}

function playPauseNewUIAudioElements (newClassForNewUIAudioStr) {  
    arrayOfNewUIAudioInterfaceObj = document.querySelectorAll(newClassForNewUIAudioStr);    
    for (let i = 0; i < arrayOfNewUIAudioInterfaceObj.length; i++) {                   
        arrayOfNewUIAudioInterfaceObj[i].addEventListener('click', () => { 
            i != currentAudioInt ? (stopCurrentAudio(), changePlayToPause(i)) : changePlayToPause(currentAudioInt);                         
            currentAudioInt = i;                 
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
    let progressBarContainerActualWidthInt = document.querySelector('#progressBarContainer').offsetWidth;
    let timerContainerCurrentWidthInt = document.querySelector('#timer').offsetWidth;
    let songSliderWidth = document.querySelector('#songSlider');    
    songSliderWidth.style.width = progressBarContainerActualWidthInt - timerContainerCurrentWidthInt + 'px';    
}

//main actions
function playOneAudioPlus (indexOfAudio) {    
    isFirstPlayBool = false;
    toMuteUnmute(indexOfAudio);        
    allHTMLAudioElementArr[indexOfAudio].play();   
    namingProgressBarEqualCurrentAudioSrc('#trackNameContainer', allHTMLAudioElementArr, indexOfAudio);
    updaitingTimeOfAudio(allHTMLAudioElementArr, indexOfAudio, '#timer');       
    updaitingProgressBarOfAudio(allHTMLAudioElementArr, indexOfAudio, '#songSlider', '#trackProgress');    
    arrayOfNewUIAudioInterfaceObj[indexOfAudio].className = 'newLiClassPlaying';
    arrayOfNewUIAudioInterfaceObj[indexOfAudio].innerHTML = arrayOfNewUIAudioInterfaceObj[indexOfAudio].innerHTML.replace(/▶/, '❚❚');
    playPauseButtonObj.innerHTML = 'PAUSE';
    arrayOfNewUIAudioInterfaceObj[currentAudioInt].style.color = '';    
} 

function stopCurrentAudio () {                  
    allHTMLAudioElementArr[currentAudioInt].pause();    
    allHTMLAudioElementArr[currentAudioInt].currentTime = 0;
    playPauseSwitchBool = false;
    arrayOfNewUIAudioInterfaceObj[currentAudioInt].className = 'newLiClass';
    arrayOfNewUIAudioInterfaceObj[currentAudioInt].innerHTML = arrayOfNewUIAudioInterfaceObj[currentAudioInt].innerHTML.replace(/❚❚/, '▶ ');      
    playPauseButtonObj.innerHTML = 'PLAY';
    arrayOfNewUIAudioInterfaceObj[currentAudioInt].style.color = '#389c35';
}

function playNextAudio (indexAudioNowPlayingInt, allHTMLAudioElementArr) {
    if (isFirstPlayBool) {
        return
    }    
    stopCurrentAudio();
    arrayOfNewUIAudioInterfaceObj[indexAudioNowPlayingInt].style.color = '';
    currentAudioInt = indexAudioNowPlayingInt + 1;     
    // detect last track
    indexAudioNowPlayingInt == allHTMLAudioElementArr.length - 1 && (currentAudioInt = 0);
    randomSwitchBool ? shufflePlay() : playOneAudioPlus(currentAudioInt);  
    playPauseSwitchBool = true;         
}


function playBackAudio (allHTMLAudioElementArr) {  
    if (isFirstPlayBool) {
        return
    }
    stopCurrentAudio();
    arrayOfNewUIAudioInterfaceObj[currentAudioInt].style.color = '';
    currentAudioInt--;
    // detect first track
    currentAudioInt < 0 && (currentAudioInt = allHTMLAudioElementArr.length - 1);
    setTimeout(() => {        
        randomSwitchBool ? shufflePlay() : playOneAudioPlus(currentAudioInt);
    }, 100)
    playPauseSwitchBool = true;
}      

function pauseCurrentAudio () {
    allHTMLAudioElementArr[currentAudioInt].pause();
    arrayOfNewUIAudioInterfaceObj[currentAudioInt].className = 'newLiClass';
    arrayOfNewUIAudioInterfaceObj[currentAudioInt].style.color = '#389c35';
    arrayOfNewUIAudioInterfaceObj[currentAudioInt].innerHTML = arrayOfNewUIAudioInterfaceObj[currentAudioInt].innerHTML.replace(/❚❚/, '▶');     
}
 
function changePlayToPause (currentAudioInt) {    
    if (!playPauseSwitchBool) {        
        playOneAudioPlus(currentAudioInt);
        playPauseButtonObj.innerHTML = 'PAUSE';
    } else {
        pauseCurrentAudio();  
        playPauseButtonObj.innerHTML = 'PLAY';
    }    
    playPauseSwitchBool ? playPauseSwitchBool = false : playPauseSwitchBool = true;
}

function toMuteUnmute (currentAudioInt) {    
    if (muteSwitchBool) {              
        allHTMLAudioElementArr[currentAudioInt].volume = 0;
        muteButtonObj.id = 'muteActive';        
    } else {           
        allHTMLAudioElementArr[currentAudioInt].volume = 1; 
        muteButtonObj.id = 'mute';        
    }     
}

function shufflePlay () {        
    if (randomSwitchBool) {        
        stopCurrentAudio();
        arrayOfNewUIAudioInterfaceObj[currentAudioInt].style.color = '';
        currentAudioInt--;
        let randomAudioInt = Math.floor(Math.random() * (allHTMLAudioElementArr.length - 1));
        currentAudioInt == randomAudioInt ? (currentAudioInt = randomAudioInt += 3) : currentAudioInt = randomAudioInt;
        currentAudioInt > allHTMLAudioElementArr.length - 1 && (currentAudioInt = Math.round(randomAudioInt / 2));
        playOneAudioPlus(currentAudioInt);                         
        randomButtonObj.id = 'randomActive';
    } else {
        randomButtonObj.id = 'random';        
    }
    playPauseSwitchBool = true;
}
//todo
function updaitingTimeOfAudio (allHTMLAudioElementArr, indexOfAudio, putTimerTo) {    
    let timerUpdate = document.querySelector(putTimerTo);
    let trackObj = allHTMLAudioElementArr[indexOfAudio];
    trackObj.addEventListener('timeupdate', () => { 
        let currentSec = (Math.floor(trackObj.currentTime % 60) < 10 ? '0' : '') + Math.floor(trackObj.currentTime % 60);
        let currentMinutes = Math.floor(trackObj.currentTime / 60);
         
        timerUpdate.innerHTML = currentMinutes + ":" + currentSec + ' &#128337; ' + Math.floor(trackObj.duration / 60) + ":" + (Math.floor(trackObj.duration % 60) < 10 ? '0' : '') + Math.floor(trackObj.duration % 60);            
    })
}

function updaitingProgressBarOfAudio (allHTMLAudioElementArr, indexOfAudio, idSongSlider, idTrackProgress) {
    allHTMLAudioElementArr[indexOfAudio].addEventListener('timeupdate' , () => {
        let percentageOfSong = (allHTMLAudioElementArr[indexOfAudio].currentTime / allHTMLAudioElementArr[indexOfAudio].duration);
        let getSongSlider = document.querySelector(idSongSlider);
        let percentageOfSlider = getSongSlider.offsetWidth * percentageOfSong;        
        document.querySelector(idTrackProgress).style.width = Math.round(percentageOfSlider) + "px";
    })
}

function namingProgressBarEqualCurrentAudioSrc (putAudioLowerCaseNameTo, allHTMLAudioElementArr, indexOfAudio) {
    setTimeout(() => {
        let audioLowerCaseNameContainer = document.querySelector(putAudioLowerCaseNameTo);
        let  pathToAudio = allHTMLAudioElementArr[indexOfAudio].currentSrc;
        audioLowerCaseNameContainer.innerHTML = pathToAudio.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig, ' ').toLowerCase();
        audioLowerCaseNameContainer.innerHTML.length > 50 && (audioLowerCaseNameContainer.innerHTML = audioLowerCaseNameContainer.innerHTML.slice(0, 25) + ' ...');
    }, 1)
}

function setTimePositionForAudio(event) {    
    let songSliderWidthInt = takeAudioProgressBarObj.offsetWidth;   
    let clickLocationInt =  event.clientX  - takeAudioProgressBarObj.offsetLeft;
    let percentage = (clickLocationInt / songSliderWidthInt);
    allHTMLAudioElementArr[currentAudioInt].currentTime = allHTMLAudioElementArr[currentAudioInt].duration * percentage;
}


//====================================================

//  end fun-s
//===============================================================

// todo

//DRAW NEW UI
drawNewUi(allHTMLAudioElementArr, 'newLiClass', '#AudioPlayerByZloid', false, 'none');
playPauseNewUIAudioElements('.newLiClass');

//second part of variables, necessary add after drawNewUi(), playPauseNewUIAudioElements()
let stopButtonObj = document.querySelector('#stop'),
backButtonObj = document.querySelector('#back'),
nextButtonObj = document.querySelector('#next'),
randomButtonObj = document.querySelector('#random'),
muteButtonObj = document.querySelector('#mute'),
playPauseButtonObj = document.querySelector('#play'),
takeAudioProgressBarObj = document.querySelector('#songSlider');


//adjust size of progress bar
window.addEventListener('resize', () => {
    resizeAudioProgressCover();
})

//EVENTS  

 
//play next song when prev. ended
for (let i = 0; i < allHTMLAudioElementArr.length; i++) { 
    allHTMLAudioElementArr[i].addEventListener('ended', () => {  
            playNextAudio(i, allHTMLAudioElementArr);
    })
}    


//event stop-button 
stopButtonObj.onclick = stopCurrentAudio;

//event nextButtonObj
nextButtonObj.addEventListener('click', () => {
    playNextAudio(currentAudioInt, allHTMLAudioElementArr);
})


//event button-back
backButtonObj.addEventListener('click', () => {
    playBackAudio(allHTMLAudioElementArr);
})


//  todo
takeAudioProgressBarObj.addEventListener('click', setTimePositionForAudio);

//event playPause on button
//todo
playPauseButtonObj.addEventListener('click', () => {
    changePlayToPause(currentAudioInt);     
});


//event random
randomButtonObj.addEventListener('click', () => {
    randomSwitchBool ? randomSwitchBool = false : randomSwitchBool = true;
    shufflePlay();
})

//event mute
muteButtonObj.addEventListener('click', () => {
    muteSwitchBool ? muteSwitchBool = false : muteSwitchBool = true;
    toMuteUnmute(currentAudioInt);
});

