'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const singUpNav = document.querySelector('.navbar__btn');
const singUpRecommendation = document.querySelector('.account__btn');
const closeModal =  document.querySelector('.modal__close');

class Modal{
    constructor(modal, overlay){
        this.modal = modal;
        this.overlay = overlay;
    }

    singUpButtonClick(){
        this.overlay.classList.toggle('hidden');
        this.modal.classList.toggle('hidden');
    }
}

const bankistModal = new Modal(
                                document.querySelector('.modal'), 
                                document.querySelector('.overlay'),
                            );


singUpNav.addEventListener("click", 
                            bankistModal.singUpButtonClick.bind(bankistModal)
                        );

singUpRecommendation.addEventListener('click', 
                            bankistModal.singUpButtonClick.bind(bankistModal)
                        );

closeModal.addEventListener('click', 
                            bankistModal.singUpButtonClick.bind(bankistModal)
                        );
