'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

/* Smooth Scrolling */
const featuresSection = document.querySelector('.features');
const btnScrollToFeatures = document.querySelector('.hero__more');
const navLinksGroup = document.querySelector('.navbar__list');

/* Tabbed Componentes */
const operationsTabGroup = document.querySelector('.operations__tab');

const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const navHeight = navbar.getBoundingClientRect();

const main = document.querySelector('.main');
const lazyImages = document.querySelectorAll('img[data-src]');

const allSlides = document.querySelectorAll('.testimonials__slide');
const slideBtnLeft = document.querySelector('.testimonials__btn--left');
const slideBtnRight = document.querySelector('.testimonials__btn--right');

const sliderGroup = document.querySelector('.testimonials__slider');
const dotGroup = document.querySelector('.testimonials__dots');

/* Smooth Scrolling */
btnScrollToFeatures.addEventListener('click', function(e){
    e.preventDefault();

    /* For older Browsers */
    window.scrollTo({
       left: featuresSection.getBoundingClientRect().left + window.scrollX,
       top: featuresSection.getBoundingClientRect().top + window.scrollY,
       behavior: "smooth",
    });

    /* For Newer Browsers */
    featuresSection.scrollIntoView({behavior: "smooth"});
});

// Event DELEGATION USANDO BUBBLING
navLinksGroup.addEventListener('click',
    function (e){
        e.preventDefault();
        const targetElement = e.target;

        //Verifica se é o objeto desejado
        if(targetElement.classList.contains('navbar__archor')){
            document.querySelector(`${targetElement.getAttribute('href')}`).scrollIntoView({behavior: "smooth"});
        }
    }
);

/* TABBED COMPONENT -> Na section de operations */
operationsTabGroup.addEventListener('click',
    function(e){
        e.preventDefault();
        const clicked = e.target.closest('.operations__btn'); 
        //Retorna o pai mais próximo com a classe especificada.

        // if clicked exists
        if(clicked){
            //Mudando o foco dos botões
            [...clicked.parentElement.children].forEach( (value) => {
                value.classList.remove('operations__btn--active');
            });
            clicked.classList.toggle('operations__btn--active');

            // Mudando o card de apresentação da operação
            clicked.closest('.operations__group').querySelectorAll('.operations__card').forEach(
                (value) =>{
                    value.classList.remove('operations__card--active');
                }
            );
            clicked.closest('.operations__group')
                .querySelector(`.operations__card--${clicked.dataset.tab}`)
                .classList.add('operations__card--active');
        }
    }
);

/* Fading Navbar */

function fading(e){
    const overElement = e.target;

    if(overElement.classList.contains('navbar__link')){
        const allLinks = overElement.closest('.navbar').querySelectorAll('.navbar__link');
        const logo = overElement.closest('.navbar').querySelector('.navbar__img');

        allLinks.forEach( (sib) => {
            if(sib !== overElement) sib.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}

navbar.addEventListener('mouseover', fading.bind(0.5));
navbar.addEventListener('mouseout', fading.bind(1));

/* Stick Navigation */

//Solução SEM OBSERVER
// window.addEventListener('scroll', function(e){
//     const featuresPosition = featuresSection.getBoundingClientRect();
//     if(window.scrollY >= featuresPosition.top && !navbar.classList.contains('.stick')){
//         navbar.classList.add('sticky');
//     }else{
//         navbar.classList.remove('sticky');
//     }
// })

function observerCallStick(entries, observer){
    entries.forEach((entry)=>{
        if(!entry.isIntersecting){
            navbar.classList.add('sticky');
        }else{
            navbar.classList.remove('sticky');
        }
    });
}

const headerObserver = new IntersectionObserver(observerCallStick, 
    {
        root:null, 
        threshold: 0,
        rootMargin: `-${navHeight.height}px`
    }
);
headerObserver.observe(header);

/* Scrool Effect */

function observerCallSection(entries, observer){
    entries.forEach( (entry) => {
        if(entry.isIntersecting){
           entry.target.classList.remove('section--hidden');
           observer.unobserve(entry.target);
        } 

    });
}

function showingScroolEffect(){
    const sectionObserver = new IntersectionObserver(observerCallSection,
        {
            root: null,
            threshold: 0.2,
        }
    );

    [...main.children].forEach( (value) => {
        sectionObserver.observe(value);
    });
}

showingScroolEffect();

//loading lazy imgs
function callLazyImgs(entries, observer){
    entries.forEach( (entry) => {
        if(!entry.isIntersecting) return;
        entry.target.setAttribute('src', entry.target.dataset.src);

        entry.target.addEventListener('load', function(e){
            entry.target.classList.remove('img-blur');
        })
        
        observer.unobserve(entry.target);
    });
}

function loadingLazyImgs(){
    const lazyImgObserver = new IntersectionObserver(callLazyImgs, 
        {
            root: null,
            threshold: 0.2,
            rootMargin: '200px'
        }
    );

    lazyImages.forEach( (img) => {
        lazyImgObserver.observe(img);
    });
}

loadingLazyImgs();

/* SLIDER COMPONENT */
let currentSlide = 0;
let currentDot = 0;

function nextSlide(){
    const oldDot = currentDot;
    currentSlide++;
    currentDot++;

    //Retorna ao primeiro slide
    if(currentSlide >= allSlides.length) [currentSlide, currentDot] = [0,0]; 
    moveToSlide(currentSlide, currentDot);
    moveToDot(oldDot, currentDot);
}

function prevSlide(){
    const oldDot = currentDot;
    currentSlide--;
    currentDot--;

    //Vai para o úlitmo slide
    if(currentSlide < 0) [currentSlide, currentDot] = [allSlides.length-1, allSlides.length-1];
    moveToSlide(currentSlide);
    moveToDot(oldDot, currentDot);
}

function moveToDot(oldDot, dotControl){
    //Remove o Dot antigo
    document.querySelector(`.testimonials__dot--${oldDot+1}`)
            .classList.toggle(`testimonials__dot--active`);

    //Highlight no novo dot
    document.querySelector(`.testimonials__dot--${dotControl+1}`)
            .classList.toggle(`testimonials__dot--active`);
}

function moveToSlide(control){
    allSlides.forEach( (slide, index) => {
        slide.style.transform = `translateX(${(index-control)*100}%)`
    })
}

function slidePositionsInit(){
    moveToSlide(0);
}

slidePositionsInit();

//Movimento clicando nos botões 
slideBtnRight.addEventListener('click', nextSlide)
slideBtnLeft.addEventListener('click', prevSlide)

//Movimento clicando usando as setas do teclado
function keyboardSliderHandler(e){
    console.log('Oi --> key down event active');
    if(e.key === 'ArrowLeft') prevSlide();
    else if(e.key === 'ArrowRight') nextSlide();
}

function callSliderArrow(entries, observer){
    entries.forEach( (entry) => {
        console.log(entry);
        if(entry.isIntersecting)
            document.addEventListener('keydown', keyboardSliderHandler)
        else document.removeEventListener('keydown', keyboardSliderHandler);
    })
}

function arrowKeyBoardSlideMovement(){
    const sliderObserver = new IntersectionObserver(callSliderArrow,
        {
            root: null,
            threshold: 0
        }
    )

    sliderObserver.observe(sliderGroup);
}

arrowKeyBoardSlideMovement();

//Movimentando usando os dots.
function dotSlideMovement(){
    dotGroup.addEventListener('click', function(e){
        e.preventDefault();
        console.log(e.target);
        if(e.target.classList.contains('testimonials__dot--1')) { 
            moveToSlide(0); moveToDot(currentDot, 0);
            currentSlide = 0;
            currentDot = 0;
        }
        else if(e.target.classList.contains('testimonials__dot--2')) { 
            moveToSlide(1); moveToDot(currentDot, 1); 
            currentSlide = 1;
            currentDot = 1;
        }
        else if(e.target.classList.contains('testimonials__dot--3')) { 
            moveToSlide(2); moveToDot(currentDot, 2);
            currentSlide = 2;
            currentDot = 2;
        }
    })
}

dotSlideMovement();