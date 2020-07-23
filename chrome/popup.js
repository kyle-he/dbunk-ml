chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
        console.log(tabs[0].url);
        getScore(tabs[0].url)
   }
);

async function getScore(url){
    console.log(await postData("https://api.dbunk.ml", {url: url}))
}

function getPopup(score){
    const oldImg = document.getElementById("status-image")
    const oldText = document.getElementById("status-text")
    const newText = document.createElement('div');
    const newImg = document.createElement('div');
    if (score > 90){
        // good stuff
        newImg.innerHTML = '<i  id="status-image" class="fas fa-check-circle fa-5x" style="color:#04b401" ></i>';
        newText.innerHTML = '<div id="status-text" style="font-size:18px;color:#099400" > Our algorithms indicate that this article has a high chance of being credible. </div>';
    } else if (score<90 && score>70) {
        // warning
        newImg.innerHTML = '<i  id="status-image" class="fas fa-exclamation-triangle fa-5x" style="color:#cdaf0a" ></i>';
        newText.innerHTML = '<div id="status-text" style="font-size:18px;color:#cdaf0a" >Our algorithms indicate that this article may contain falsified or twisted information. </div>';
    } else {
        //super sus article
        newImg.innerHTML = '<div id="status-image" class="fas fa-times-circle fa-5x" style="color:#a21010" ></div>';
        newText.innerHTML = '<div id="status-text" style="font-size:18px;color:#a21010" >Our algorithms indicate that this article may contain falsified or twisted information. Please proceed with caution.</div>';
    }
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