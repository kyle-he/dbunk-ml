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


@app.route("/", methods=["POST"])
def dbl():
    if "url" not in request.json:
        return {"status": "error", "error": "Missing url"}, 400

    article = Article(request.json["url"])
    article.download()
    article.parse()

    text = article.title + " " + article.text

    result = model.predict([text])

    result = float(result[0][0])

    return {"status": "success", "result": {"true": result, "false": 1 - result}}


if __name__ == "__main__":
    app.run()
