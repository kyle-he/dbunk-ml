import random

import numpy as np
from flask import Flask, request
from scipy.special import softmax

app = Flask(__name__)


possible = [
    "rumor",
    "hate",
    "unreliable",
    "conspiracy",
    "clickbait",
    "satire",
    "fake",
    "reliable",
    "bias",
    "political",
    "junksci",
    "unknown",
]


@app.route("/", methods=["POST"])
def dbl():
    if "url" not in request.json:
        return {"status": "error", "error": "Missing url"}, 400

    category = random.choice(possible)

    result = [6.0 if i == category else random.random() for i in possible]
    result = np.array(result)
    result = softmax(result)

    labeled = {possible[idx]: v for idx, v in enumerate(result)}

    return {"status": "success", "result": labeled}


if __name__ == "__main__":
    app.run()
