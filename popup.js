 const playVideo = document.querySelector("#pause");
 playVideo.addEventListener("click", pausePlay);
     


function pausePlay(){
  console.log("Button Clicked");
  if(playVideo.innerText == 'Play Video'){
    console.log("The inner text is play video");
    playVideo.innerText = 'Pause Video';
    chrome.tabs.query({active: true, currentWindow: true},tabs =>{
      chrome.tabs.sendMessage(tabs[0].id,{action: "playVideo"});
     
    });
   

   } else {

  
 chrome.tabs.query({active: true, currentWindow: true}, tabs =>{
      chrome.tabs.sendMessage(tabs[0].id, {action: "pauseVideo" });
    playVideo.innerText = 'Play Video';

    });
  }

}
  document.querySelector("#backBtn").addEventListener("click", () => {
    console.log("Button Clicked");
    

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "backwardVideo" });
  });
});

document.querySelector("#forwBtn").addEventListener("click", () => {
  console.log("Button Clicked");
  

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "forwardVideo" });
});
});
const slider = document.querySelector("#slider")

slider.addEventListener("input", slideCotroller);
  
  



function slideCotroller() {
  console.log("Slider Moves");

  const level = Math.ceil(slider.value / 10);  
  const action = `soundControl${level}`;

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {action});
  });
}

const freqSlider = document.querySelector("#freqSlider");

freqSlider.addEventListener("input", freqController);

function freqController(){
  
  const level = Math.ceil(freqSlider.value / 1000);  
  const action = `freqControl${level}`;
 

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {action});
  });

  
}

const speed = document.querySelector('#speedSlider');

speed.addEventListener("input", speedController);

function speedController(){
  const level = (speed.value/0.25);
  const action = `speedControl${level}`;
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {action});
  });

}

