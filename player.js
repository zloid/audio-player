
//all variables
let audioNowPlayingInt = 0,
    isFirstPlayBool = true,
    muteSwitchBool = false,
    randomSwitchBool = false,
    playPauseSwitchBool = false,
    allHTMLAudioElementArr = document.querySelectorAll('audio'),
    arrayOfNewUIAudioInterfaceObj;

//all functions
function drawNewUi (arrayAllAudio, setNewClassForNewUIAudio, putNewUIThere, displayOldUIAudio, oldUIAudioControlsBool) {
    let containerForNewUIAudioElement = document.querySelector(putNewUIThere);
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
            newLi.innerHTML = newLi.innerHTML.replace(/[a-z]/i, upperFirstLetter);
        }, 300)        
        newUl.appendChild(newLi);        
    }    
    containerForNewUIAudioElement.appendChild(newUl);
}
 
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
    muteModeAction(indexOfAudio);    
    
    allHTMLAudioElementArr[indexOfAudio].play();   
    
    namingProgressBarEqualCurrentAudioSrc('#trackNameContainer', allHTMLAudioElementArr, indexOfAudio);
    updaitingTimeOfAudio(allHTMLAudioElementArr, indexOfAudio, '#timer');       
    updaitingProgressBarOfAudio(allHTMLAudioElementArr, indexOfAudio, '#songSlider', '#trackProgress');

    arrayOfNewUIAudioInterfaceObj[indexOfAudio].className = 'newLiClassPlaying';
    arrayOfNewUIAudioInterfaceObj[indexOfAudio].innerHTML = arrayOfNewUIAudioInterfaceObj[indexOfAudio].innerHTML.replace(/▶/, '❚❚');
    playButtonObj.innerHTML = 'PAUSE';
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].style.color = '';
    
} 


function stopActualAudio () {                  
    allHTMLAudioElementArr[audioNowPlayingInt].pause();
    allHTMLAudioElementArr[audioNowPlayingInt].currentTime = 0;
    playPauseSwitchBool = false;
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].className = 'newLiClass';
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML = arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML.replace(/❚❚/, '▶ ');            
    playButtonObj.innerHTML = 'PLAY';
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].style.color = '#389c35';
}

//todo
function pauseActualAudio () {
    allHTMLAudioElementArr[audioNowPlayingInt].pause();
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].className = 'newLiClass';
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].style.color = '#389c35';

    // arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].classList.add("newLiClassPlayingPaused");
    arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML = arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].innerHTML.replace(/❚❚/, '▶');     
}

function updaitingTimeOfAudio (allHTMLAudioElementArr, indexOfAudio, putTimerTo) {    
    let timerUpdate = document.querySelector(putTimerTo);
    allHTMLAudioElementArr[indexOfAudio].addEventListener('timeupdate', () => { 
        let currentSec = (Math.floor(allHTMLAudioElementArr[indexOfAudio].currentTime % 60) < 10 ? '0' : '') + Math.floor(allHTMLAudioElementArr[indexOfAudio].currentTime % 60);
        let currentMinutes = Math.floor(allHTMLAudioElementArr[indexOfAudio].currentTime / 60);
         
        timerUpdate.innerHTML = currentMinutes + ":" + currentSec + ' &#128337; ' + Math.floor(allHTMLAudioElementArr[indexOfAudio].duration / 60) + ":" + (Math.floor(allHTMLAudioElementArr[indexOfAudio].duration % 60) < 10 ? '0' : '') + Math.floor(allHTMLAudioElementArr[indexOfAudio].duration % 60);            
    })
}

function updaitingProgressBarOfAudio (allHTMLAudioElementArr, indexOfAudio, idSongSlider, idTrackProgress) {
    allHTMLAudioElementArr[indexOfAudio].addEventListener('timeupdate' , () => {
        let percentageOfSong = (allHTMLAudioElementArr[indexOfAudio].currentTime/allHTMLAudioElementArr[indexOfAudio].duration);
        let getSongSlider = document.querySelector(idSongSlider);
        let percentageOfSlider = getSongSlider.offsetWidth * percentageOfSong;        
        document.querySelector(idTrackProgress).style.width = Math.round(percentageOfSlider) + "px";
//todo
        // if (percentageOfSlider > 0) {
        //     allHTMLAudioElementArr[indexOfAudio].className = 'newLiClassPlaying';
        // } else {
        //     allHTMLAudioElementArr[indexOfAudio].className = 'newLiClass';
        // }
    })
}

function namingProgressBarEqualCurrentAudioSrc (putAudioLowerCaseNameTo, allHTMLAudioElementArr, indexOfAudio) {
    setTimeout(() => {
        let AudioLowerCaseNameContainer = document.querySelector(putAudioLowerCaseNameTo);
        let  pathToAudio = allHTMLAudioElementArr[indexOfAudio].currentSrc;
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
    // let clickLocationInt =  event.layerX;
    // let clickLocationInt =  event.clientX;
    let clickLocationInt =  event.clientX  - takeAudioProgressBarObj.offsetLeft;
    
    //todo

        // alert(clickLocationInt + ' / ' + songSliderWidthInt);


    let percentage = (clickLocationInt/songSliderWidthInt);
    //bingo
    allHTMLAudioElementArr[audioNowPlayingInt].currentTime = allHTMLAudioElementArr[audioNowPlayingInt].duration * percentage;
}

 
function playNextAudio (indexAudioNowPlayingInt, arrayAllAudio, delayBetweenAudioInt) {
    if (isFirstPlayBool) {
        return
    }    
    //todo
    // muteModeAction(indexAudioNowPlayingInt);

    stopActualAudio();
    arrayOfNewUIAudioInterfaceObj[indexAudioNowPlayingInt].style.color = '';
    audioNowPlayingInt = indexAudioNowPlayingInt + 1;     
        //last audio's detector
    if (indexAudioNowPlayingInt == arrayAllAudio.length - 1) {             
        audioNowPlayingInt = 0;
    }
    //todo
    // setTimeout(() => {            
        randomSwitchBool ? shufflePlay() : playOneAudioPlus(audioNowPlayingInt);           
    // }, delayBetweenAudioInt)
}


function playBackAudio (arrayAllAudio) {  
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
    }, 100)
}      

function playPauseAction (audioNowPlayingInt) {    
    if (!playPauseSwitchBool) {        
        playOneAudioPlus(audioNowPlayingInt);
        playButtonObj.innerHTML = 'PAUSE';
    } else {
        pauseActualAudio();  
        playButtonObj.innerHTML = 'PLAY';
    }    
    playPauseSwitchBool ? playPauseSwitchBool = false : playPauseSwitchBool = true;
}

function playingNewUIAudioElements (takeNewClassFromNewUIAudio) {  
    arrayOfNewUIAudioInterfaceObj = document.querySelectorAll(takeNewClassFromNewUIAudio);    
    for (let i = 0; i < arrayOfNewUIAudioInterfaceObj.length; i++) {                   
        arrayOfNewUIAudioInterfaceObj[i].addEventListener('click', () => {                    
            if (i != audioNowPlayingInt) {                    
                stopActualAudio();                                        
                playOneAudioPlus(i);
                playPauseSwitchBool = true;
            } else {
                playPauseAction(audioNowPlayingInt);
            }                
            audioNowPlayingInt = i;                 
        })
    }        
}

function muteModeAction (audioNowPlayingInt) {    
    if (muteSwitchBool) {              
        allHTMLAudioElementArr[audioNowPlayingInt].volume = 0;
        muteButtonObj.id = 'muteActive';        
    } else {           
        allHTMLAudioElementArr[audioNowPlayingInt].volume = 1; 
        muteButtonObj.id = 'mute';        
    }     
}

//todo
function shufflePlay (delayBetweenAudioInt = 50) {        
    if (randomSwitchBool) {        
        stopActualAudio();
        arrayOfNewUIAudioInterfaceObj[audioNowPlayingInt].style.color = '';
        audioNowPlayingInt--;
        let randomAudioInt = Math.floor(Math.random() * (allHTMLAudioElementArr.length - 1));
        // console.log('1audioNowPlayingInt:', audioNowPlayingInt);
        // console.log('1randomAudioInt:', randomAudioInt);        
        (audioNowPlayingInt == randomAudioInt) ? audioNowPlayingInt = randomAudioInt+= 3 : audioNowPlayingInt = randomAudioInt;
        // console.log('2audioNowPlayingInt:', audioNowPlayingInt);        
        if (audioNowPlayingInt > (allHTMLAudioElementArr.length - 1)) {
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
drawNewUi(allHTMLAudioElementArr, 'newLiClass', '#AudioPlayerByZloid', 'none', false);
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
    playPauseButtonObj = document.querySelector('#play'),
    takeAudioProgressBarObj = document.querySelector('#songSlider');
//===========================================

//EVENTS  

 
//play next song when prev. ended
for (let i = 0; i < allHTMLAudioElementArr.length; i++) { 
    allHTMLAudioElementArr[i].addEventListener('ended', () => {  
            playNextAudio(i, allHTMLAudioElementArr);

             
        //todo
        // muteModeAction(i);
    })
}    

//event button-play
// playButtonObj.addEventListener('click', () => {
    
    // if (playButtonObj.innerHTML == 'PLAY') {
        
    //     playOneAudioPlus(audioNowPlayingInt);
    //     playButtonObj.innerHTML = 'PAUSE';
    // } else {
    //     pauseActualAudio();  
    //     playButtonObj.innerHTML = 'PLAY';
    // }

// });

//event stop-button 
stopButtonObj.onclick = stopActualAudio;

//event nextButtonObj
nextButtonObj.addEventListener('click', () => {
    playNextAudio(audioNowPlayingInt, allHTMLAudioElementArr);
})


//event button-back
backButtonObj.addEventListener('click', () => {
    playBackAudio(allHTMLAudioElementArr);
})


//  todo
takeAudioProgressBarObj.addEventListener('click', setSongPosition);

//event mute
muteButtonObj.addEventListener('click', () => {
    muteSwitchBool ? muteSwitchBool = false : muteSwitchBool = true;
    muteModeAction(audioNowPlayingInt);
});

//event playPause on button
//todo
playPauseButtonObj.addEventListener('click', () => {
    playPauseAction(audioNowPlayingInt);     
});


//event random
randomButtonObj.addEventListener('click', () => {
    randomSwitchBool ? randomSwitchBool = false : randomSwitchBool = true;
    shufflePlay();
})
 
