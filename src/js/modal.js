// @ts-check
'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const singUpNav = document.querySelector('.navbar__btn');
const singUpRecommendation = document.querySelector('.account__btn');
const closeModal =  document.querySelector('.modal__close');

/**
 * Class Representing a Modal
 */
class Modal{
    /**
     * Create a modal
     * @param {HTMLElement} modal
     * @param {HTMLElement} overlay
     */
    constructor(modal, overlay){
        /** @property {HtmlElement} modal Modal Html Element */
        this.modal = modal;

        /** @property {HTMLElement} overlay Overlay Html Element */
        this.overlay = overlay;
    }

    /** 
     * @property {Fuction} singUpButtonClick Control the visibility of the modal 
     * @returns  {void}
    */
    singUpButtonClick(){
        this.overlay.classList.toggle('hidden');
        this.modal.classList.toggle('hidden');
    }
}

/**
 *[See Modal Class]{@link Modal}
 */
const bankistModal = new Modal(
    //@ts-ignore
                                document.querySelector('.modal'), 
                                document.querySelector('.overlay'),
                            );


//@ts-ignore
singUpNav.addEventListener("click", 
                            bankistModal.singUpButtonClick.bind(bankistModal)
                        );

//@ts-ignore
singUpRecommendation.addEventListener('click', 
                            bankistModal.singUpButtonClick.bind(bankistModal)
                        );

//@ts-ignore
closeModal.addEventListener('click', 
                            bankistModal.singUpButtonClick.bind(bankistModal)
                        );
