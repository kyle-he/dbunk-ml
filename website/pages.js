var pages = {
    true: {
        icon: "fas fa-check-circle fa-5x",
        color: "#04b401",
        bgColor: "green",
        description: "Our algorithms indicate that this article is credible.",
        longdesc:
            "This news seems credible! Credible sources circulate news and information in a manner consistent with traditional and ethical practices in journalism. Our model discerns real and fake news around 94% of the time. Please remain aware of fake and real news. ",
    },
    false: {
        icon: "fas fa-times-circle fa-5x",
        color: "#a21010",
        bgColor: "red",
        description:
            "Our algorithms indicate that this article may contain falsified or twisted information. Proceed with caution.",
        longdesc:
            "Fake doesn’t doesn’t always mean that the information is fake, but rather the information may be presented in a misleading manner. Although rare, sometimes amateur reporters and writers do not include solid reasoning and evidence while presenting news, so they may come out as fake.",
    },
    political: {
        icon: "fas fa-exclamation-triangle fa-5x",
        color: "#cdaf0a",
        bgColor: "yellow",
        description:
            "Our algorithms indicate that this article is heavily political.",
        longdesc:
            "Political sites often contain biased and misleading information depending on the news site. For articles like these, please refer to the site information page to see ways the site may be biased.",
    },
    unknown: {
        icon: "fas fa-exclamation-triangle fa-5x",
        color: "#cdaf0a",
        bgColor: "gray",
        description:
            "Our algorithms weren't able to identify the nature of this article.",
        longdesc:
            "Topics like satire doesn’t fall in the spectrum of fake and real so sites like The Onion and The Daily Mash will show up as “Uncertain” with confidence ratings of around 55%. To ensure user’s get the most accurate information, when our confidence ratings fall below 60%, we will show the site as “Uncertain”.",
    },
};
