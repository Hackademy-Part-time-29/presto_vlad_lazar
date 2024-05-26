let navbar=document.querySelector('#navbar');
let buttonSearch=document.querySelector('#button-search');
let firstNumber=document.querySelector('#firstNumber');
let secondNumber=document.querySelector('#secondNumber');
let thirdNumber=document.querySelector('#thirdNumber');
window.addEventListener('scroll', ()=>{
    let scrolled=window.scrollY;
    if(scrolled > 200){
        navbar.classList.remove("navbar-classes");
        navbar.classList.add("scrolledNavbar");
    }else{
        navbar.classList.add("navbar-classes");
        navbar.classList.remove("scrolledNavbar");
    }
});
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

function createInterval(element, n, time){
  let counter=0;
let interval = setInterval(()=>{
  if(counter<n){
    counter++;
    element.innerHTML=counter;
  }else{
    clearInterval(interval);
  }
}, time);
}
let confirm=true;
let observer=new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting && confirm){
      confirm=false;
      createInterval(firstNumber, 1000, 10);
      createInterval(secondNumber, 103, 100);
      createInterval(thirdNumber, 50, 200);
      setTimeout(()=>{
        confirm=true;
      }, 8000);
    }
  });
});
observer.observe(firstNumber);
