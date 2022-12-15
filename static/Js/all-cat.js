const close_tab = function(){
    const zoom_img_container = document.getElementById('zoom_img_cont')
    zoom_img_container.style.display = 'none';
}
const copy_img_url = function(imagesrc){
    const zoom_img_container = document.getElementById('zoom_img_cont')
    const img_tag = document.getElementById('zoomed_image')
    const download_link = document.getElementById('download_image_link')
    zoom_img_container.style.display = 'block';
    img_tag.src = imagesrc.src ;
    
}
make_dots()
function make_dots(){
    const slides = document.getElementsByClassName('poster_containers')
    const parent = document.getElementById('slide_dots_cont')
    for (let index = 1; index<= slides.length; index++) {
        const span = document.createElement("span");
        if(slides.length > 0){
            span.classList.add("dot");
            parent.appendChild(span) 
        }
    }
}
let slideIndex = 0;
cat_slides()
function cat_slides(){
    const slides = document.getElementsByClassName('poster_containers')
    let dots = document.getElementsByClassName("dot");
    if(slides.length > 0){
        for (let index = 0; index < slides.length; index++) {
            slides[index].style.display = 'none'
        }
        slideIndex++
        if (slideIndex > slides.length) {
            slideIndex = 1
        } 
        if (slideIndex > slides.length) {slideIndex = 1}    
        for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
        }   
        slides[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].className += " active";
        setTimeout(cat_slides,8000)
        // make_dots()
    }
}