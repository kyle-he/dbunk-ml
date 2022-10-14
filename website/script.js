// Retrieve url

var urlParams = new URLSearchParams(window.location.search);

if (!urlParams.has("url")) {
    window.location.href = "https://dbunk.ml";
}

// Initialize vue app

var app = new Vue({
    el: "#main",
    data: {
        url: urlParams.get("url"),
        pages: pages,
        score: null,
        site: null,
    },
    computed: {
        highestAttribute() {
            if (this.score == null) return null;
            var highestAttribute = ["unknown", 0];
            for (const [key, value] of Object.entries(this.score.result)) {
                if (value > highestAttribute[1]) {
                    highestAttribute = [key, value];
                }
            }
            return highestAttribute;
        },
    },
});

// Get the news site information

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

// Post data to the ML endpoint

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

function getScore(url) {
    return postData("https://dbunk-api.herokuapp.com", { url: url });
}

// Retrieve data

async function main() {
    var siteStats = getSite(app.url);
    if (siteStats.retrieved) {
        app.site = {
            title: siteStats.title,
            rating: ratingObjs[siteStats.bias_rating].alt,
            desc: ratingObjs[siteStats.bias_rating].desc,
            link: siteStats.allsides_url,
        };
    }
    app.score = await getScore(app.url);
}

main();
