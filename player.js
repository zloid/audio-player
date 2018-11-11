//[+] take all audio elements in 1 selector
//[+] hide all audio elements
//[+] create new ul>li equal all audio elements
//[+] take all song name from currentSrc of song
//[+] RegExp for cut name song
//[-] create new array with milisec all audio (equal audio elements key)
//[-] play() button
//[-] stop() button
//[-] pause() button
//[-] 


class AudioPlayer {

    constructor () {
        
        this.allAudioElement = document.querySelectorAll('audio'); 

        //we need hide all HTML5 audio tag
        this.hideAllHTMLAudioElement = function (condition) {
            for (let i = 0; i < this.allAudioElement.length; i++) {
                this.allAudioElement[i].controls = condition;
            }
        }
       
        //...and create new UI for each audio later
        this.createNewUIForSongs = function (appendUITo) {
            
            let newUl = document.createElement('ul');
            let newLi,
            pathToAudio;
                        
            //SRC doesn't work without this 'window.onload'
            // window.onload = () => {

                setTimeout(() => {
                    
                
                                    
                for (let i = 0; i < this.allAudioElement.length; i++) {
                    
                    newLi = document.createElement('li');   
                    
                    newLi.className = 'classOfNewSongLiElement'

                    pathToAudio = this.allAudioElement[i].currentSrc;
                    
                    //take song name from song's src
                    newLi.innerHTML = pathToAudio.match(/[%-\.\w]*$/ig).join('').replace(/mp3|ogg|[^a-z]+/ig,     ' ');

                    newUl.appendChild(newLi);
                }
            // }
        }, 1)

            document.querySelector(appendUITo).appendChild(newUl);

           

            
        }    
        
        this.mainLogic = function () {

            setTimeout(() => {

            // let qqq = document.querySelectorAll('.classOfNewSongLiElement');

            // for (let i = 0; i < qqq.length; i++) {
            //     qqq[i].style.color = 'red';    

            // }





 // take all <li>
 let allOfLi = document.querySelectorAll('.classOfNewSongLiElement');    
            
 //new array of all li's milisec
 let arrayOfSongsLongs = []; 


  
 setTimeout(() => {
     //re-change view all li
     for (let i = 0; i < this.allAudioElement.length; i++) {
         arrayOfSongsLongs.push(this.allAudioElement[i].duration * 1000);  
         
         allOfLi[i].innerHTML = '&#9654; play : ' + allOfLi[i].innerHTML;
         allOfLi[i].style.border = '3px solid #fff'
     }

     
    
        // console.log('this.allAudioElement[0]:', this.allAudioElement[0].duration)
         
     }, 100)

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







            }, 1) // end of setTimeout 
        }
       
        
    }       
}  


let somePlayer = new AudioPlayer();


// console.log('somePlayer:', somePlayer)
somePlayer.hideAllHTMLAudioElement(false);
somePlayer.createNewUIForSongs('hr');

somePlayer.mainLogic();

setTimeout(() => {
    
    console.log('somePlayer.allAudioElement[0]:', somePlayer.allAudioElement[0].duration)
}, 1000)

    

 
 

 





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