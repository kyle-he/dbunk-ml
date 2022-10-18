import random
import re
import string

import numpy as np
import tensorflow as tf
from flask import Flask, request
from flask_cors import CORS
from newspaper import Article
from tensorflow.keras.layers.experimental.preprocessing import TextVectorization

from scipy.special import softmax

app = Flask(__name__)
CORS(app)


def process_text(input_data):
    data = tf.strings.lower(input_data)
    data = tf.strings.regex_replace(data, r"\[[^]]*\]", "")
    data = tf.strings.regex_replace(data, r"http\S+", "")
    data = tf.strings.regex_replace(data, f"[{re.escape(string.punctuation)}]", "")
    return data


model = tf.keras.models.load_model(
    "model",
    custom_objects={
        "TextVectorization": TextVectorization,
        "process_text": process_text,
    },
)


urls = {}

@app.route("/")
def index():
    return "dbunk-ml api"

@app.route("/", methods=["POST"])
def dbl():
    if "url" not in request.json:
        return {"status": "error", "error": "Missing url"}, 400

    article = Article(request.json["url"])
    article.download()
    article.parse()
    text = article.title + "\n\n" + article.text

    result = model.predict([text])
    result = float(result[0][0])

    if request.json["url"] not in urls:
        urls[request.json["url"]] = random.random() / 30 + 0.02

    return {
        "status": "success",
        "result": result,
        "title": article.title,
        "text": article.text,
    }


if __name__ == "__main__":
    app.run()
