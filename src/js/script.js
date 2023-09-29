const burgerBtn = document.querySelector('.burger-btn')
const navMobile = document.querySelector('#nav-mobile')
const burgerBtnIcon = document.querySelector('#burger-icon')
const nav = document.querySelector('.nav')


const toogleMobileNav = () =>{
    navMobile.classList.toggle("nav-mobile--active")


    if(navMobile.classList.contains("nav-mobile--active")){
        burgerBtnIcon.classList.remove("fa-bars")
        burgerBtnIcon.classList.add("fa-x")
    }
    else{
        burgerBtnIcon.classList.remove("fa-x")
        burgerBtnIcon.classList.add("fa-bars")
    }
   
}


burgerBtn.addEventListener('click', toogleMobileNav)