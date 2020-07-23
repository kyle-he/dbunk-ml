import random

from flask import Flask, request

app = Flask(__name__)


@app.route("/", methods=["POST"])
def dbl():
    if "url" not in request.json:
        return {"status": "error", "error": "Missing url"}, 400

    result = random.choice(
        [
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
    )

    return {"status": "success", "result": result}


if __name__ == "__main__":
    app.run()
