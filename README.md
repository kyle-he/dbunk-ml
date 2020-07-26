# sketchy-news

## The problem

The advent of the Internet and the Information Age has transformed the way we receive and interact with information. Billions of people worldwide now rely on online news sources to stay up-to-date with current topics, and we are now able to spread information at speeds never seen before.

However, this comes with a catch. Fake news is becoming more and more prevalent on online news sites, and it is increasingly difficult to distinguish credible information from articles meant to spread misinformation. This issue has become a hot-button topic in recent news and election cycles. Often, this requires doing extensive research and cross-checking of sources, which takes an immense amount of time and effort.

Furthermore, being able to trust online information is especially important during critical situations like COVID-19. In a time like this, the truthfulness of news has become a public health issue. When citizens rely on news sources to keep themselves safe, it is extremely important that those sources are telling the truth.

We surveyed the residents of Cupertino, San Jose, Saratoga, and nearby cities, and found that over 60% of people expressed concern over fake and real news on the internet. What’s more, nearly 80% of people would be more engaged in current events, activism, and politics if they had a better way to identify credible information. Busy parents and workers expressed to us that they lacked the time and energy to keep up with the news on top of their already packed schedules. We wondered if there was a better, more efficient way to filter out misinformation. That better way did not exist, until now.

## Our solution

**Introducing dbunk.ml**. Leveraging big data, modern machine learning frameworks like TensorFlow, and the massive computational power of Google’s Cloud Tensor Processing Units, we can now train neural networks tens of thousands of times faster than we could before. Using this technology, we tailored our model to 10 million news articles from over 1000 different online news websites in order to classify news articles as completely fake, largely political, or credible. After iterating on network design and training for multiple days, our model can now correctly categorize news articles 94% of the time, a result comparable to that of existing fact-checking watchdogs, but our fully-automated solution lets users know whether or not to trust articles with a single click.

Our state-of-the-art system is displayed using a browser extension that clearly displays the credibility of a certain website. While browsing the web, our extension will automatically detect applicable news sites, and the extension icon will light up. By clicking the icon, the article is then sent to our servers, which analyze the article using our model and send the result back to the user within seconds. 

dbunk.ml is:
- *Instant.* Our extension gives you instant insights into news articles as you browse, with a single click.
- *Accurate.* Powered by state-of-the-art machine learning technology, our model delivers 94% accuracy across thousands of news sites.
- *Detailed.* Our algorithms deliver comprehensive analysis and political bias indicators from hundreds of news sites instantly in a simple user friendly interface.

Thank you, and welcome to dbunk.ml.
