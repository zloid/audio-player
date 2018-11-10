//[+] take all audio elements in 1 selector
//[-] hide all audio elements
//[-] create new ul>li equal all audio elements
//[-] create new array vith milisec all audio (equal audio elements key)
//[-] take all song name from currentSrc of song
//[+] RegExp for cut name song
//[-] 
//[-] 
//[-] 


class AudioPlayer {

    constructor () {

        this.allAudioElement = document.querySelectorAll('audio'); 
       
        this.createNewUlLi = function (appendTo) {
                       
            let newUl = document.createElement('ul');
               
            for (let i = 0; i < this.allAudioElement.length; i++) {
    
                let newLi = document.createElement('li');                
                
                let currentSrc = this.allAudioElement[i].currentSrc;
                
                //take song name from song's src
                newLi.innerHTML = currentSrc.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig, ' ');
                
                newUl.appendChild(newLi);

                document.querySelector(appendTo).appendChild(newLi);

            }
        }           
                                               
    }           
}  


let somePlayer = new AudioPlayer();


window.onload = () => {
    
    somePlayer.createNewUlLi('hr');
 
}


 
 

 





// (c) Sergey Voytehovich

 
 
 
 
 /*
    old logic

 // take all <li>
 let allOfLi = document.querySelectorAll('li');    
            
 //new array of all li's milisec
 let arrayOfSongsLongs = []; 

 //re-change view all li
 for (let i = 0; i < allOfLi.length; i++) {
     arrayOfSongsLongs.push(allOfLi[i].innerHTML);  
     
     allOfLi[i].innerHTML = '&#9654; play : ' + allOfLi[i].innerHTML;
     allOfLi[i].style.border = '3px solid #fff'
 }

 //START main logic==================================================================
 let intervalOfPlayLoop;

 function PlayloopSonglistFromSomeKey (startSongKey, endKeyOfSongList = 0, querySelectorAllSong) {
     
     clearInterval(intervalOfPlayLoop);
                         
         ;(function invokePlayLoopPlaylist () {                
             //erase all visual songs plaing
             for (let i = 0; i < querySelectorAllSong.length; i++) {
                 querySelectorAllSong[i].style.border = '3px solid #fff';
                 querySelectorAllSong[i].style.opacity = '.5';
                 querySelectorAllSong[i].innerHTML = '&#9632; stop : ' + arrayOfSongsLongs[i];
             }                    
                 //set visual song play
                 querySelectorAllSong[startSongKey].style.border = '3px solid #008000';
                 querySelectorAllSong[startSongKey].style.opacity = '1';
                 querySelectorAllSong[startSongKey].innerHTML = '&#9632; stop : ' + arrayOfSongsLongs[startSongKey];


                         intervalOfPlayLoop = setTimeout(() => {
                             

                             if (startSongKey > querySelectorAllSong.length - 1) {
                                 startSongKey = endKeyOfSongList;
                             }
                                 
                                 if (onSwitch) {
                                     
                                     invokePlayLoopPlaylist();
                                     
                                 }
                         
                         }, arrayOfSongsLongs[startSongKey])
                                                
                 startSongKey++;
         })()
 
 }


 let onSwitch = false;
 
 //on-off switch
 function onOffToSwitch () {
     onSwitch ? onSwitch = false : onSwitch = true;            
 }
  
 //put event on each song
 for (let i = 0; i < allOfLi.length; i++) {
     
     allOfLi[i].addEventListener('click', () => {                
         
         PlayloopSonglistFromSomeKey(i, 0, allOfLi);
          
         onOffToSwitch();
             
             if (!onSwitch) {
                     for (let i = 0; i < allOfLi.length; i++) {
                         allOfLi[i].innerHTML = '&#9654; play &#9654; : ' + arrayOfSongsLongs[i];                                
                     }
             }
                         
     })            
 }

*/