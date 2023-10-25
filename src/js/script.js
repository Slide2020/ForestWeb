const burgerBtn = document.querySelector('.burger-btn')
const navMobile = document.querySelector('#nav-mobile')
const burgerBtnIcon = document.querySelector('#burger-icon')
const nav = document.querySelector('.nav')
const navLinksList = document.querySelectorAll('.nav__item-mobile')
const footerYear = document.querySelector('.footer__copy-right span')

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

navLinksList.forEach(el=> el.addEventListener('click', e =>{
    console.log(e.target)
    navMobile.classList.toggle("nav-mobile--active")
    burgerBtnIcon.classList.remove("fa-x")
    burgerBtnIcon.classList.add("fa-bars")
}))


const handleCurrentYear = () => {
	const year = (new Date).getFullYear();
	footerYear.innerText = year;
}

handleCurrentYear();



burgerBtn.addEventListener('click', toogleMobileNav)

