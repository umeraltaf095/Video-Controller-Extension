console.log("content running successfully");

const videos = document.querySelectorAll("video");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   // video pause feature
    if (request.action === "pauseVideo") {                               
           if (videos.length>0) {
            videos.forEach((video) => {
                video.pause();
              
              //  console.log("Video paused successfully");
            });
        } else {
            console.log("No video element found");
        }
    } else  if (request.action === "playVideo") {   
          
      
      if (videos.length>0) {
          videos.forEach((video) => {
            if(video.paused){
              video.play();
            
             // console.log("Video played successfully");
            }
          });
      } else {
          console.log("No video element found");
      }
  } // video backward feature  
  else if(request.action==="backwardVideo"){                            
       if(videos.length >0){
        videos.forEach((video)=>{
        video.currentTime -=10;
        
       // console.log("Video moves backward successfully", video.currentTime);
        
    })
      }
      else{
        console.log("No video element found");
        
      }
    } // video forward feature 
    else  if(request.action==="forwardVideo"){                          
      if(videos.length >0){
        videos.forEach((video)=>{
        video.currentTime +=10;
        
       // console.log("Video moves forward successfully", video.currentTime);
        
   })
      }
      else{
        console.log("No video element found");
        
      }
    }  // Frequency Control
    else if (request.action && request.action.startsWith("freqControl")) {         
      console.log("controller working properly");
      
      const level = parseInt(request.action.replace("freqControl", ""));
      const freq = level * 1000; 
      bequadFilter.frequency.setValueAtTime(freq, audio.currentTime);
      //console.log(`Frequency changed to ${freq} Hz`);
    }  // Speed Control 
     else  if (request.action && request.action.startsWith("speedControl")) {      
      console.log("controller working properly");
      
      const level = parseInt(request.action.replace("speedControl", ""), 10);
      const speed =  Math.min(level*0.25, 2);
       if(videos.length>0){
        videos.forEach((video)=>{
          video.playbackRate = speed;
  
        })
      } // sound control
    } else  if(request.action && request.action.startsWith("soundControl")){                          
      
      const level = parseInt(request.action.replace("soundControl", " "),10);
      if(videos.length>0){
        videos.forEach((video)=>{
          if(level == 10){
            video.volume = 1.0;
          }
          if(level !=10){
          video.volume = `0.${level}`;
          }
        })
      }
    }
});




  
   const audio = new(window.AudioContext);
 const bequadFilter = audio.createBiquadFilter();
 bequadFilter.type = 'bandpass';
 bequadFilter.frequency.value = 1000;

if(videos.length>0){
  videos.forEach((video)=>{
    const source = audio.createMediaElementSource(video);
    source.connect(bequadFilter);
    bequadFilter.connect(audio.destination);


  })
}





