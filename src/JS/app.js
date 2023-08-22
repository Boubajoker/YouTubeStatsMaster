let like_count_text = document.querySelector('.like-count-text');
let view_count_text = document.querySelector('.view-count-text');
let like_percentage_text = document.querySelector('.like-percentage-text');
let error_message_text = document.querySelector('.error-msg-text');
let stat_text_1 = document.querySelector('#statistics-text-1');
let stat_text_2 = document.querySelector('#statistics-text-2');
let stat_text_3 = document.querySelector('#statistics-text-3');
let headers1 = document.querySelector('h1');
let like_img = document.querySelector('.like-img');
let view_img = document.querySelector('.view-img');
let like_percent_img = document.querySelector('.like-percent-img');
let id_length = 0;
let actual_mod_text = document.querySelector('.actual-mod');
let credit_text = document.querySelector('.credit-text');
let credit_link = document.querySelector('.credit-link');
let backline_1 = document.querySelector('.backline-1');
let backline_2 = document.querySelector('.backline-2');

function setup_error(console_msg, ui_msg) {
    console.error(console_msg);
    like_img.remove();
    view_img.remove();
    like_percent_img.remove();
    stat_text_1.remove();
    stat_text_2.remove();
    stat_text_3.remove();
    backline_1.remove();
    backline_2.remove();
    credit_link.remove();
    credit_text.remove();
    error_message_text.innerText = ui_msg;
};

if (localStorage.getItem('shorts_optimized')) {
    actual_mod_text.innerText = "YouTube Shorts\u2122";
    id_length = 31;
} else {
    actual_mod_text.innerText = "YouTube\u2122 long videos";
    id_length = 32;
};

if (localStorage.getItem('dark_theme')) {
    document.body.style.background = 'rgb(0, 0, 0)';
    stat_text_1.style.color = 'rgb(255, 255, 255)';
    stat_text_2.style.color = 'rgb(255, 255, 255)';
    stat_text_3.style.color = 'rgb(255, 255, 255)';
    headers1.style.color = 'rgb(255, 255, 255)';
    credit_text.style.color = 'rgb(255, 255, 255)';
    credit_link.style.color = 'rgb(255, 255, 255)';
    like_img.src = "./assets/img/like_img_dark.svg";
    view_img.src = "./assets/img/view_img_dark.svg";
    like_percent_img.src = "./assets/img/like_percent_img_dark.svg";
};

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let user_current_url = tabs[0].url;

    if (user_current_url.slice(0, 32) === "https://www.youtube.com/watch?v=" || user_current_url.slice(0, 31) === "https://www.youtube.com/shorts/") {
        let video_ID = user_current_url.slice(id_length, user_current_url.length);
        let api_key = "AIzaSyAjtE-vpXkacQJexdbJ_xj_GmYXLNOk2ao";
        let api_url = `https://www.googleapis.com/youtube/v3/videos?id=${video_ID}&key=${api_key}&part=statistics`;

        fetch(api_url)
        .then(response => response.json())
        .then(data => {
            let statistics = data.items[0].statistics;
            let likes = statistics.likeCount;
            let views = statistics.viewCount;
            let like_percentage_equation = Math.round((likes * 100 / views) * 100)/100;

            like_count_text.innerHTML = `<span id=\"main-stats\">${likes}</span> likes.`;
            view_count_text.innerHTML = `<span id=\"main-stats\">${views}</span> views.`;
            like_percentage_text.innerHTML = `≈ <span id=\"main-stats\">${like_percentage_equation}%</span> of the people who watched the video liked it.`;
            like_percentage_text.title = `${likes} likes out of ${views} views.`;
        }).catch(err => {
            console.error(err);
            if (localStorage.getItem('shorts_optimized')) {
                setup_error(`[ERROR]:WRONG_PAGE. (${user_current_url})`,'OOPS.. Something went wrong ! (note: if you want to analyze YouTube videos go to the extensions options -> right click on extension icon then select \'Options\').');
            } else {
                setup_error(`[ERROR]:WRONG_PAGE. (${user_current_url})`,'OOPS.. Something went wrong ! (note: if you want to analyze YouTube Shorts\u2122 go to the extensions options -> right click on extension icon then select \'Options\'.).');
            };
        });
    } else {
        setup_error('[ERROR]:VIDEO_STATS_FETCH_FAILED.', 'OOPS... Something went wrong ! Please make sure that you are connected to internet or that you are on YouTube');
    };
});
//24|8 K.B.