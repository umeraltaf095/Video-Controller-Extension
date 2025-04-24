console.log("content running successfully");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "pauseVideo") {                                // video stope feature
        const videos = document.querySelectorAll("video");
        if (videos.length>0) {
            videos.forEach((video) => {
                video.pause();
              
                console.log("Video paused successfully");
            });
        } else {
            console.log("No video element found");
        }
    } else  if (request.action === "playVideo") {   
          
      const videos = document.querySelectorAll("video");
      if (videos.length>0) {
          videos.forEach((video) => {
            if(video.paused){
              video.play();
            
              console.log("Video played successfully");
            }
          });
      } else {
          console.log("No video element found");
      }
  } else if(request.action==="backwardVideo"){                             // video backward feature 
      const videos = document.querySelectorAll("video")
      if(videos.length >0){
        videos.forEach((video)=>{
        video.currentTime -=10;
        
        console.log("Video moves backward successfully", video.currentTime);
        
  
        })
      }
      else{
        console.log("No video element found");
        
      }
    } else  if(request.action==="forwardVideo"){                          // video forward feature
      const videos = document.querySelectorAll("video")
      if(videos.length >0){
        videos.forEach((video)=>{
        video.currentTime +=10;
        
        console.log("Video moves forward successfully", video.currentTime);
        
  
        })
      }
      else{
        console.log("No video element found");
        
      }
    } else if (request.action && request.action.startsWith("freqControl")) {         // Frequency Control
      console.log("controller working properly");
      
      const level = parseInt(request.action.replace("freqControl", ""));
      const freq = level * 1000; 
      bequadFilter.frequency.setValueAtTime(freq, audio.currentTime);
      console.log(`Frequency changed to ${freq} Hz`);
    } else  if (request.action && request.action.startsWith("speedControl")) {       // Speed Control 
      console.log("controller working properly");
      
      const level = parseInt(request.action.replace("speedControl", ""), 10);
      const speed =  Math.min(level*0.25, 2);
      const videos = document.querySelectorAll('video');
      if(videos.length>0){
        videos.forEach((video)=>{
          video.playbackRate = speed;
  
        })
      }
    }
});



chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{                        // Sound Control
  
  const videos = document.querySelectorAll('video');
  if(videos.length>0){
    videos.forEach((video)=>{
      switch(request.action){
        case 'soundControl0':
          video.volume = 0.0;
          break;
        case 'soundControl1':
          video.volume = 0.1;
          break;
          case 'soundControl2':
            video.volume = 0.2;
            break;
            case 'soundControl3':
              video.volume = 0.3;
              break;
              case 'soundControl4':
              video.volume = 0.4;
              break;
              case 'soundControl5':
                video.volume = 0.5;
                break;
                case 'soundControl6':
                  video.volume = 0.6;
                  break;
                  case 'soundControl7':
                  video.volume = 0.7;
                  break;
                  case 'soundControl8':
                  video.volume = 0.8;
                  break;
                  case 'soundControl9':
                  video.volume = 0.9;
                  break;
                  case 'soundControl10':
                  video.volume = 1.0;
                  break;
                  
                  
                  
    }})
  }
})
  
  


// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action && request.action.startsWith("freqControl")) {
//     console.log("controller working properly");
    
//     const level = parseInt(request.action.replace("freqControl", ""));
//     const freq = level * 1000; 
//     bequadFilter.frequency.setValueAtTime(freq, audio.currentTime);
//     console.log(`Frequency changed to ${freq} Hz`);
//   }
// });


 const audio = new(window.AudioContext);
 const bequadFilter = audio.createBiquadFilter();
 bequadFilter.type = 'bandpass';
 bequadFilter.frequency.value = 1000;

 const videos = document.querySelectorAll('video');
if(videos.length>0){
  videos.forEach((v)=>{
    const source = audio.createMediaElementSource(v);
    source.connect(bequadFilter);
    bequadFilter.connect(audio.destination);


  })
}





