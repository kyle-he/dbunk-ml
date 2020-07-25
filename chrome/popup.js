import {pages} from './pages.js'
import {bias} from './bias.js'

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   async function(tabs){
        console.log(getScore(tabs[0].url))
        const distributions = await getScore(tabs[0].url)
        var simplifiedURL = tabs[0].url.toLowerCase().replace("\\", "").replace("http://", "https://").replace("www.", "");
        console.log(simplifiedURL)
        getPopup(distributions, simplifiedURL)
   }
);

function getScore(url){
    return postData("https://api.dbunk.ml", {url: url});
}

function getSite(url){
    for (var site of bias){
        try {
            if (url.includes(site.url.toLowerCase().replace("\\", "").replace("http://", "https://").replace("www.", "")) && site.url != ""){
                return{title: site.news_source, 
                       allsides_url: site.allsides_url, 
                       bias_rating: site.bias_rating,
                       retrieved: true
                    }
            }
        } catch(TypeError) {}
    }
    return{
        retrieved: false
    }
}
function getDescrip(url){
    var name = "temp";
    $.get(url, function(response) {  
        var challenges = $(response).find('latest_news_source');
        console.log(challenges)
    });
}
function getPopup(score, url){
    var siteStats = getSite(url)
    var ratingObjs = {
        "71": {"img": "images/bias-left.png", "alt": "Left bias",
            "desc": "This site tends to be biased to the left. This trend reflects the site as a whole and not any specific article."},
        "72": {"img": "images/bias-leaning-left.png", "alt": "Leaning left bias",
            "desc": "This site tends to be slightly biased to the left. This trend reflects the site as a whole and not any specific article."},
        "73": {"img": "images/bias-center.png", "alt": "Center bias",
            "desc": "This site tends to be centrally aligned. This trend reflects the site as a whole and not any specific article."},
        "74": {"img": "images/bias-leaning-right.png", "alt": "Leaning right bias",
            "desc": "This site tends to be slightly biased to the right. This trend reflects the site as a whole and not any specific article."},
        "75": {"img": "images/bias-right.png", "alt": "Right bias",
            "desc": "This site tends to be biased to the right. This trend reflects the site as a whole and not any specific article."},
        "2707": {"img": "images/bias-mixed.png", "alt": "Mixed bias",
            "desc": "This site has a very mixed alignment, or simply doesn't fall on the left/right partisanship scale."},
        "2690": {"img": "images/bias-not-yet-rated.png", "alt": "Site not rated",
            "desc": "This site has not yet been rated."}
    };
    if  (siteStats.retrieved){
        const oldTitle = document.getElementById("title")
        const oldRating = document.getElementById("bias")
        const oldDescrip = document.getElementById("bias-descrip")
    
        const newTitle = document.createElement('div');
        const newRating = document.createElement('span');
        const newDescrip = document.createElement('div');

        newTitle.innerHTML = `<div id="title" class="title normal_text no_padding">${siteStats.title}</div>`;
        newRating.innerHTML = `<span id="bias">${ratingObjs[siteStats.bias_rating].alt}</span>`;
        newDescrip.innerHTML = `<div id="bias-descrip">${ratingObjs[siteStats.bias_rating].desc}</div>`;

        oldTitle.parentNode.replaceChild(newTitle, oldTitle);
        oldRating.parentNode.replaceChild(newRating, oldRating);
        oldDescrip.parentNode.replaceChild(newDescrip, oldDescrip);
    }
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
    newText.innerHTML = `<div id="status-text" style="font-size:18px;color:${pages[highestAttribute[0]].color}" > ${highestAttribute[0].charAt(0).toUpperCase() + highestAttribute[0].slice(1)} with ${highestAttribute[1].toFixed(3)*100}% confidence. ${pages[highestAttribute[0]].description} </div>`;
    
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