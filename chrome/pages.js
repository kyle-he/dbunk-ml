var pages = {
    true: {
        icon: "fas fa-check-circle fa-5x",
        color: "#04b401",
        description:
            "Our algorithms indicate that this article is credible.",
    },
    false: {
        icon: "fas fa-times-circle fa-5x",
        color: "#a21010",
        description:
            "Our algorithms indicate that this article may contain falsified or twisted information. Proceed with caution.",
    },
    bias: {
        icon: "fas fa-exclamation-triangle fa-5x",
        color: "#cdaf0a",
        description:
            "Our algorithms indicate that this article may be heavily biased. Proceed with caution.",
    },
    satire: {
        icon: "fas fa-exclamation-triangle fa-5x",
        color: "#cdaf0a",
        description:
            "Our algorithms indicate that this article contains satire.",
    },
    political: {
        icon: "fas fa-exclamation-triangle fa-5x",
        color: "#cdaf0a",
        description:
            "Our algorithms indicate that this article is heavily political.",
    },
    unknown: {
        icon: "fas fa-exclamation-triangle fa-5x",
        color: "#cdaf0a",
        description:
            "Our algorithms weren't able to identify the nature of this article.",
    },
};
export { pages };
