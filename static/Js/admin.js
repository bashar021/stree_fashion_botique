
const Cat_Designs_Containers = document.getElementsByClassName('cat_designs_containers')
const Option_bt = document.getElementsByClassName('option_bt')
const MySidenav = document.getElementById('mySidenav')
const Open_Designs_Container = function (boxes) {
    const Boxes_id = boxes.id + '_' + 'cont'
    const show_boxes = document.getElementById(Boxes_id)
    for (let index = 0; index < Cat_Designs_Containers.length; index++) {
        Cat_Designs_Containers[index].style.display = 'none'
    }
    show_boxes.style.display = 'block';
    for (let index = 0; index < Option_bt.length; index++) {
        Option_bt[index].style.display = 'none'
        Option_bt[index].style.height = '0%'
    }
    const Option = boxes.id + '_option'
    const Option_buttons = document.getElementById(Option)
    Option_buttons.style.display = 'block'
    Option_buttons.style.display = 'auto'
}
const open_menu_bar = function () {
    const Menu_bar = document.getElementById('mySidenav')
    Menu_bar.style.width = '100%'
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    for (let index = 0; index < Option_bt.length; index++) {
        Option_bt[index].style.display = 'none'
        Option_bt[index].style.height = '0%'
    }
}
const select_options = function (id_name) {
    const container = id_name.id + 2 + '_' + id_name.innerHTML
    const designs_container = document.getElementById(container)
    const trending_more_slides = document.getElementsByClassName('trending_designs_')
    for (let index = 0; index < trending_more_slides.length; index++) {
        trending_more_slides[index].style.display = 'none';
    }
    designs_container.style.display = 'block'
}
const select_another_options = function (id_name) {
    const trending_more_slides = document.getElementsByClassName('trending_designs_')
    for (let index = 0; index < trending_more_slides.length; index++) {
        trending_more_slides[index].style.display = 'none';
    }
    const container = id_name.id + '_' + id_name.innerHTML
    const designs_container = document.getElementById(container)
    designs_container.style.display = 'block'
}
const select_slides_option = function (id_name) {
    const trending_more_slides = document.getElementsByClassName('trending_designs_')
    for (let index = 0; index < trending_more_slides.length; index++) {
        trending_more_slides[index].style.display = 'none';
    }
    const slides_container = id_name.id + '_Slides_Designs'
    const slides_designs_container = document.getElementById(slides_container)
    slides_designs_container.style.display = 'block'
}
window.onclick = function (event) {
    if (event.target == MySidenav) {
        document.getElementById("mySidenav").style.width = "0";
    }
}
const Deletion_confirmation = function (event,btn) {
    let text = "Do You Want To Delete Image Permanently";
    if (confirm(text) == true) {
        event.preventDefault();
        const url = btn.href
        fetch(url)
        .then(function (response) {
            return response.text()
        }).then(function (data) {
            alert(data)
        }).catch(function (error) {
            alert('Unabel to delete image try again ')
        }) 
    }
    else {
        event.preventDefault();
    }
}





