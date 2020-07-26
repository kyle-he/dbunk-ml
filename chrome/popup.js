import { pages } from "./pages.js";
import { bias, ratingObjs } from "./bias.js";

// Get active tab and query URL

chrome.tabs.query(
    { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    async function (tabs) {
        // get ML results
        const distributions = await getScore(tabs[0].url);

        // make popup
        var simplifiedURL = tabs[0].url
            .toLowerCase()
            .replace("\\", "")
            .replace("http://", "https://")
            .replace("www.", "");
        getPopup(distributions, simplifiedURL);
    }
);

function getScore(url) {
    return postData("https://api.dbunk.ml", { url: url });
}

// Get news site info

function getSite(url) {
    for (var site of bias) {
        try {
            if (
                url.includes(
                    site.url
                        .toLowerCase()
                        .replace("\\", "")
                        .replace("http://", "https://")
                        .replace("www.", "")
                ) &&
                site.url != ""
            ) {
                return {
                    title: site.news_source,
                    allsides_url: site.allsides_url,
                    bias_rating: site.bias_rating,
                    retrieved: true,
                };
            }
        } catch (TypeError) {}
    }
    return {
        retrieved: false,
    };
}

// Create popup

function getPopup(score, url) {
    // get news site info
    var siteStats = getSite(url);

    // get options
    chrome.storage.local.get(
        {
            showbias: true,
            threshhold: 0.6,
            displayType: "vertical",
        },
        function (items) {
            var styles = items;

            // if has news site info
            if (siteStats.retrieved && styles.showbias) {
                const details = document.getElementById("site-details");

                const title = document.getElementById("site-title");
                const rating = document.getElementById("site-rating");
                const descrip = document.getElementById("bias-descrip");

                title.innerHTML = siteStats.title;
                rating.innerHTML = ratingObjs[siteStats.bias_rating].alt;
                descrip.innerHTML = ratingObjs[siteStats.bias_rating].desc;

                details.classList.remove("hidden");
            }

            // get highest attribute from ML
            var highestAttribute = ["uncertain", 0];
            for (const [key, value] of Object.entries(score.result)) {
                if (value > highestAttribute[1] && value > items.threshhold) {
                    highestAttribute = [key, value];
                }
            }

            // get HTML elements to place text in
            const img = document.getElementById("status-image");
            const text = document.getElementById("status-text");
            const confidence = document.getElementById("status-confidence");
            const subtext = document.getElementById("status-subtext");
            const link = document.getElementById("status-link");

            // update HTML
            img.innerHTML = `<i class="${
                pages[highestAttribute[0]].icon
            }" style="color:${pages[highestAttribute[0]].color}"></i>`;

            text.style.color = pages[highestAttribute[0]].color;

            if (highestAttribute[0] != "uncertain") {
                confidence.innerHTML = `Confidence: ${
                    highestAttribute[1].toFixed(3) * 100
                }%`;
            }
            text.innerHTML =
                highestAttribute[0].charAt(0).toUpperCase() +
                highestAttribute[0].slice(1);
            subtext.innerHTML = pages[highestAttribute[0]].description;

            link.innerHTML = `<a href="https://dbunk.ml/analyze?url=${encodeURIComponent(
                url
            )}" target="_blank">More info</a>`;

            // remove loading screen
            document.getElementById("loading").classList.add("hidden");
            document.getElementById("hide-loading").classList.remove("hidden");
        }
    );
}

async function postData(url, data = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}
