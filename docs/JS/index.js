let home_btn = document.querySelector('.home-btn');
let download_btn = document.querySelector('.download-btn');

home_btn.addEventListener('click', ()=>{
    fetch("./")
    .then(window.location = "./")
    .catch(err => {
        console.error(`[ERROR]: ${err}`);
    });
});
download_btn.addEventListener('click', ()=>{
    fetch('./downloads.html')
    .then(window.location = "./downloads.html")
    .catch(err => {
        console.error(`[ERROR]: ${err}`);
    });
});