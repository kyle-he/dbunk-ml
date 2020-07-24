import {pages} from './pages.js'

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   async function(tabs){
        console.log(tabs[0].url);
        console.log(getScore(tabs[0].url))
        const distributions = await getScore(tabs[0].url)
        getPopup(distributions)
   }
);

function getScore(url){
    return postData("https://api.dbunk.ml", {url: url});
}

function getPopup(score){
    var highestAttribute = ["unknown", 0]
    for (const [key,value] of Object.entries(score.result)){
        if (value > highestAttribute[1]){
            highestAttribute = [key,value]
        }
    }
    console.log(score)
    console.log(highestAttribute)
    const oldImg = document.getElementById("status-image")
    const oldText = document.getElementById("status-text")

    const newText = document.createElement('div');
    const newImg = document.createElement('div');
    newImg.innerHTML = `<i  id="status-image" class="${pages[highestAttribute[0]].icon}" style="color:${pages[highestAttribute[0]].color}" ></i>`;
    newText.innerHTML = `<div id="status-text" style="font-size:18px;color:${pages[highestAttribute[0]].color}" > ${pages[highestAttribute[0]].description} </div>`;
    
    oldImg.parentNode.replaceChild(newImg, oldImg);
    oldText.parentNode.replaceChild(newText, oldText);
}

async function postData(url, data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.json();
}