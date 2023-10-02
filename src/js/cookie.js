// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';

/** Class representing a cookie message */
class CookieMessage{
    /** Creates a cookie message */
    constructor(){
        /**
         * @property {string} message Cookie message
         */
        this.message = 
            'We use cookies for improving functionality and analytics. <button class="btn cookie__btn">Got it!</button>';
    }

    /** 
     * @property {Fuction} createCookieMessage Render cookie message 
     * @returns  {HTMLElement} A div element containing the cookie message
    */
    createCookieMessage(){
        const divCookie = document.createElement('div');
        divCookie.classList.add('cookie');
        divCookie.innerHTML = this.message;
        return divCookie;
    }
}

const headerCookie = document.querySelector('.header');

/**
 * [See CookieMessage Class]{@link CookieMessage}
 */
const cookieMessage = new CookieMessage().createCookieMessage();

//@ts-ignore
headerCookie.append(cookieMessage);

// @ts-ignore
document.querySelector('.cookie__btn').addEventListener('click', function(e){
        e.preventDefault();
        cookieMessage.remove();
    }
);