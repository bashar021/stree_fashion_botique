const cat = document.getElementById('SlectCatagory')
const formtype = document.getElementById('FormType')
const form = document.getElementById('image_upload_form')
const formbtn = document.getElementById('form_btn')
const home_form = document.getElementById('home_upload_form')
const sizealert = document.getElementById('sizealert')
const formurl = function () {
    const form_Url = `/${cat.value}${formtype.value}`
    console.log(form_Url)
    form.action = form_Url
    formbtn.formAction = form_Url
}
const select_updation_type = function (btn) {
    if (btn.value == 'home') {
        form.style.display = 'none'
        home_form.style.display = 'block'
    }
    else if (btn.value == 'products') {
        form.style.display = 'block'
        home_form.style.display = 'none'
    }
}
const select_type = function (btn) {
    const home_btn = document.getElementById('home_upload_btn')
    const URL = `/admin/home/${btn.value}`
    home_form.action = URL
    home_btn.formAction = URL
}
function upload_check(inp){
    var max = 200000
    if(inp.files[0].size > max){sizealert.style.display = 'block'}
    else{sizealert.style.display = 'none'}
};
const verifyimagesize = function(evt,inpname) {
    const inpfile = document.getElementById(inpname)
    if(inpfile.files[0].size > 200000){
        evt.preventDefault()
        sizealert.style.display = 'block'
    }
    else{
        sizealert.style.display = 'none'
        return true
    }
}