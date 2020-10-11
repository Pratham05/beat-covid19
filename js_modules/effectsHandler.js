// Scroll Effects

const navigation = document.querySelector(".navigation");

const scrollEffectHandler = _ => {
    let lastScrollTop = window.pageYOffset;
    
    window.onscroll = _ => {
        if (window.pageYOffset > 0.98* window.innerHeight) {
            let scrollTop = window.pageYOffset;
            // navigation__inactive has css code for hiding the navigation bar
            if (scrollTop > lastScrollTop) {
                navigation.classList.add('navigation__inactive'); 
            } else {
                navigation.classList.remove('navigation__inactive');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        } else {
            // Added for a possible scenario where scroll was near 98vh and was very fast
            navigation.classList.remove('navigation__inactive');
        }
    };     
};

const changingTextEffectHandler = _ => {
    const phrases = ["<div>Wear a <span>Mask</span></div>", 
                        "<div>Stay at <span>Home</span></div>", "<div>Wash <span>Hands</span></div>",];
    const textHolder = document.querySelector(".heading-primary__changing-text");
    let index = 0, pos = 100;
    textHolder.innerHTML = phrases[index];
    textHolder.style.top = pos/10 + 'rem';
    setInterval(_ => {
        if (pos > -90) {
            textHolder.style.top = pos/10 + 'rem';
            pos--;
        } else {
            pos = 100;
            index++;
            if (index === phrases.length) index = 0;
            textHolder.firstChild.remove();
            textHolder.insertAdjacentHTML("afterbegin", phrases[index]);
        }
    }, 20);
};

module.exports = changingTextEffectHandler;