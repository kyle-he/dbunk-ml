import random

from flask import Flask, request

import numpy as np
from flask_cors import CORS
from scipy.special import softmax

app = Flask(__name__)
CORS(app)


possible = ["fake", "bias", "satire", "political", "reliable"]

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
