import 'core-js/stable';
import 'regenerator-runtime/runtime';

class CookieMessage{
    constructor(){
        this.message = 
            'We use cookies for improving functionality and analytics. <button class="btn cookie__btn">Got it!</button>';
    }

    createCookieMessage(){
        const divCookie = document.createElement('div');
        divCookie.classList.add('cookie');
        divCookie.innerHTML = this.message;
        return divCookie;
    }
}

const headerCookie = document.querySelector('.header');
const cookieMessage = new CookieMessage().createCookieMessage();

headerCookie.append(cookieMessage);

document.querySelector('.cookie__btn').addEventListener('click', function(e){
        e.preventDefault();
        cookieMessage.remove();
    }
);