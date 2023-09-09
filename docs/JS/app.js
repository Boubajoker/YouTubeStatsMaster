let news_title = document.querySelector('.news-title');
let news_paragraph = document.querySelector('.news-paragraph');
let news_video = document.querySelector('.news-video');

fetch('./news.json')
.then(response => response.json())
.then(data =>{
    news_title.innerText = data.news_title;
    news_paragraph.innerText = data.news_paragraph;
    if (data.news_video.activate) {
        news_video.src = data.news_video.src;
        news_video.autoplay = data.news_video.autoplay;
        news_video.loop = data.news_video.loop;
    };
});