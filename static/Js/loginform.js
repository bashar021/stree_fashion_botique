const Captcha_box = document.getElementById('captcha_box')
const Captcha_input_field = document.getElementById('captcha_input_field')
const Captcha_alert = document.getElementById('captcha_alert')
const Refresh_icon = document.getElementById('refresh_icon')
const toggle_refresh = document.getElementsByClassName('fa-refresh')
const genrate_captcha = function () {
    let captcha = ""
    const random_captcha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let index = 0; index < 5; index++) {
        captcha += random_captcha.charAt(Math.random() * random_captcha.length)
    }
    Captcha_box.innerHTML = captcha;
    Refresh_icon.classList.remove('fa-spin')
}
window.onload = genrate_captcha
const verify_captcha = function (event) {
    if (Captcha_input_field.value == Captcha_box.innerHTML) {
        return true
    }
    else {
        event.preventDefault()
        Captcha_alert.innerHTML = 'Invalid Captcha Code'
    }
}
const refresh_captcha = function (elment) {
    Refresh_icon.classList.toggle('fa-spin')
    setTimeout(genrate_captcha, 1000)
}
const trial = function () {
    Captcha_alert.innerHTML = '';
}
Captcha_input_field.addEventListener('input', trial)

