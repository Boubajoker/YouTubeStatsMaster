let check_box_dark_theme = document.querySelector('.check-box-dark-theme');
let check_box_shorts = document.querySelector('.check-box-shorts');
let headers1 = document.querySelector('h1');
let theme_section_title = document.querySelector('.theme-section-title');
let shorts_section_title = document.querySelector('.shorts-section-title');
let dark_theme_text = document.querySelector('.dark-theme-text');
let shorts_text = document.querySelector('.shorts-text');
let app_container = document.querySelector('.app-container');
let copyright_text = document.querySelector('.copyright-text');
let about_section_title = document.querySelector('.about-section-title');
let data_about_project = document.querySelector('.data-about-project');

if (localStorage.getItem('dark_theme')) {
    check_box_dark_theme.setAttribute('checked', 'true');
    document.body.style.background = 'rgb(0, 0, 0)';
    headers1.style.color = 'rgb(255, 255, 255)';
    theme_section_title.style.color = 'rgb(255, 255, 255)';
    shorts_section_title.style.color = 'rgb(255, 255, 255)';
    dark_theme_text.style.color = 'rgb(255, 255, 255)';
    shorts_text.style.color = 'rgb(255, 255, 255)';
    app_container.style.color = 'rgb(255, 255, 255, 0.3)';
    copyright_text.style.color = 'rgb(255, 255, 255)';
    about_section_title.style.color = 'rgb(255, 255, 255)';
    data_about_project.style.color = 'rgb(255, 255, 255)';
};

if (localStorage.getItem('shorts_optimized')) {
    check_box_shorts.setAttribute('checked', 'true');
};

check_box_dark_theme.addEventListener('change', ()=>{
    if (check_box_dark_theme.checked) {
        localStorage.setItem('dark_theme', true);
    } else if (!check_box_dark_theme.checked) {
        localStorage.removeItem('dark_theme');
    };
});

check_box_shorts.addEventListener('change', ()=>{
    if (check_box_shorts.checked) {
        localStorage.setItem('shorts_optimized', true);
    } else if (!check_box_shorts.checked) {
        localStorage.removeItem('shorts_optimized');
    };
});

fetch("./manifest.json")
.then(response => response.json())
.then(data => {
    console.log(`${data.name} v${data.version} by ${data.author}`);
    data_about_project.innerText = `${data.name} v${data.version} by ${data.author}`;
});