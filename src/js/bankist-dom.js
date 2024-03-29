// @ts-check
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
// @ts-ignore
const navHeight = navbar.getBoundingClientRect();

const main = document.querySelector('.main');
const lazyImages = document.querySelectorAll('img[data-src]');

const allSlides = document.querySelectorAll('.testimonials__slide');
const slideBtnLeft = document.querySelector('.testimonials__btn--left');
const slideBtnRight = document.querySelector('.testimonials__btn--right');

const sliderGroup = document.querySelector('.testimonials__slider');
const dotGroup = document.querySelector('.testimonials__dots');

/* Smooth Scrolling */
// @ts-ignore
btnScrollToFeatures.addEventListener('click', function(e){
    e.preventDefault();

    /* For older Browsers */
    window.scrollTo({
       // @ts-ignore
       left: featuresSection.getBoundingClientRect().left + window.scrollX,
       // @ts-ignore
       top: featuresSection.getBoundingClientRect().top + window.scrollY,
       behavior: "smooth",
    });

    /* For Newer Browsers */
    // @ts-ignore
    featuresSection.scrollIntoView({behavior: "smooth"});
});

// Event DELEGATION USANDO BUBBLING
// @ts-ignore
navLinksGroup.addEventListener('click',
    function (e){
        e.preventDefault();
        const targetElement = e.target;

        //Verifica se é o objeto desejado
        // @ts-ignore
        if(targetElement.classList.contains('navbar__archor')){
            // @ts-ignore
            document.querySelector(`${targetElement.getAttribute('href')}`).scrollIntoView({behavior: "smooth"});
        }
    }
);

/* TABBED COMPONENT -> Na section de operations */
// @ts-ignore
operationsTabGroup.addEventListener('click',
    function(e){
        e.preventDefault();
        // @ts-ignore
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

/**
 * Controls the navbar fading
 * @param {Event} e - Event
 */
function fading(e){
    const overElement = e.target;

    // @ts-ignore
    if(overElement.classList.contains('navbar__link')){
        // @ts-ignore
        const allLinks = overElement.closest('.navbar').querySelectorAll('.navbar__link');
        // @ts-ignore
        const logo = overElement.closest('.navbar').querySelector('.navbar__img');

        allLinks.forEach( (sib) => {
            if(sib !== overElement) sib.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}

// @ts-ignore
navbar.addEventListener('mouseover', fading.bind(0.5));
// @ts-ignore
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

/**
 * Makes the navigation stick
 * @param {Array<IntersectionObserverEntry>} entries 
 * @param {IntersectionObserver} observer 
 */
// @ts-ignore
function observerCallStick(entries, observer){
    entries.forEach((entry)=>{
        if(!entry.isIntersecting){
            // @ts-ignore
            navbar.classList.add('sticky');
        }else{
            // @ts-ignore
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
// @ts-ignore
headerObserver.observe(header);

/* Scrool Effect */
/**
 * Gives all page sections a scrool showing affect
 * @param {Array<IntersectionObserverEntry>} entries 
 * @param {IntersectionObserver} observer 
 */
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

    // @ts-ignore
    [...main.children].forEach( (value) => {
        sectionObserver.observe(value);
    });
}

showingScroolEffect();

/**
 * Load lazy imgs
 * @param {Array<IntersectionObserverEntry>} entries 
 * @param {IntersectionObserver} observer 
 */
function callLazyImgs(entries, observer){
    entries.forEach( (entry) => {
        if(!entry.isIntersecting) return;
        // @ts-ignore
        entry.target.setAttribute('src', entry.target.dataset.src);

        // @ts-ignore
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

/** Moves the to the next slider on the slider component */
function nextSlide(){
    const oldDot = currentDot;
    currentSlide++;
    currentDot++;

    //Retorna ao primeiro slide
    if(currentSlide >= allSlides.length) [currentSlide, currentDot] = [0,0]; 
    moveToSlide(currentSlide);
    moveToDot(oldDot, currentDot);
}

/** Moves the to the previous slider on the slider component */
function prevSlide(){
    const oldDot = currentDot;
    currentSlide--;
    currentDot--;

    //Vai para o úlitmo slide
    if(currentSlide < 0) [currentSlide, currentDot] = [allSlides.length-1, allSlides.length-1];
    moveToSlide(currentSlide);
    moveToDot(oldDot, currentDot);
}

/**
 * Moves to the dot representing the current slider in the slide component
 * @param {number} oldDot 
 * @param {number} dotControl
 * @returns {void}
 */
function moveToDot(oldDot, dotControl){
    //Remove o Dot antigo
    // @ts-ignore
    document.querySelector(`.testimonials__dot--${oldDot+1}`)
            .classList.toggle(`testimonials__dot--active`);

    //Highlight no novo dot
    // @ts-ignore
    document.querySelector(`.testimonials__dot--${dotControl+1}`)
            .classList.toggle(`testimonials__dot--active`);
}

/**
 * Moves to a slider on the slider component
 * @param {number} control - Represents the number of the current slider 
 * @returns {void}
 */
function moveToSlide(control){
    allSlides.forEach( (slide, index) => {
        // @ts-ignore
        slide.style.transform = `translateX(${(index-control)*100}%)`
    })
}

/** Initialize the positions for the sliders in the slider component */
function slidePositionsInit(){
    moveToSlide(0);
}

slidePositionsInit();

//Movimento clicando nos botões 
// @ts-ignore
slideBtnRight.addEventListener('click', nextSlide)
// @ts-ignore
slideBtnLeft.addEventListener('click', prevSlide)

//Movimento clicando usando as setas do teclado
/**
 * Handler fot the keyboard controls of the slider component
 * @param {Event} e 
 */
function keyboardSliderHandler(e){
    console.log('Oi --> key down event active');
    // @ts-ignore
    if(e.key === 'ArrowLeft') prevSlide();
    // @ts-ignore
    else if(e.key === 'ArrowRight') nextSlide();
}

/**
 * Controls the location where the slider keyboard controls are permited to affect the slider component
 * @param {Array<IntersectionObserverEntry>} entries 
 * @param {IntersectionObserver} observer 
 */
// @ts-ignore
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

    // @ts-ignore
    sliderObserver.observe(sliderGroup);
}

arrowKeyBoardSlideMovement();

//Movimentando usando os dots.
/** Controls the movement of the sliders in the slider component using the dots */
function dotSlideMovement(){
    // @ts-ignore
    dotGroup.addEventListener('click', function(e){
        e.preventDefault();
        console.log(e.target);
        // @ts-ignore
        if(e.target.classList.contains('testimonials__dot--1')) { 
            moveToSlide(0); moveToDot(currentDot, 0);
            currentSlide = 0;
            currentDot = 0;
        }
        // @ts-ignore
        else if(e.target.classList.contains('testimonials__dot--2')) { 
            moveToSlide(1); moveToDot(currentDot, 1); 
            currentSlide = 1;
            currentDot = 1;
        }
        // @ts-ignore
        else if(e.target.classList.contains('testimonials__dot--3')) { 
            moveToSlide(2); moveToDot(currentDot, 2);
            currentSlide = 2;
            currentDot = 2;
        }
    })
}

dotSlideMovement();