/*

Storing the text that will be displayed for each category

*/

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
    political: {
        icon: "fas fa-exclamation-triangle fa-5x",
        color: "#cdaf0a",
        description:
            "Our algorithms indicate that this article is heavily political.",
    },
    uncertain: {
        icon: "fa fa-question-circle fa-5x",
        color: "#A0A0A0",
        description:
            "Our algorithms weren't able to identify the nature of this article.",
    },
};

export { pages };
