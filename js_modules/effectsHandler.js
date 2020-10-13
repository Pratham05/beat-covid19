/** 
  * @desc This module adds in effects for the website
  * 2 effects are added - ScrollEffect for Navigation scroll
  * and Changing text on Hero component
*/


/** 
  * @desc Adds in the navigation scroll effect
*/
const scrollEffectHandler = _ => {
    const navigation = document.querySelector(".navigation");
    let lastScrollTop = window.pageYOffset;
    window.onscroll = _ => {
        // The scroll effect should not work on screen sizes less than 900
        // to support responsive design
        if (window.innerWidth > 900) {
            if (window.pageYOffset > 0.20* window.innerHeight) {
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
        } else {
            // Make visible in case window resized when invisible
            navigation.classList.remove('navigation__inactive');
        }
    };     
};

/** 
  * @desc Adds in the Change of text on hero component
*/
const changingTextEffectHandler = _ => {
    const phrases = ["<div>Wear a <span>Mask</span></div>", 
                        "<div>Stay at <span>Home</span></div>", "<div>Wash <span>Hands</span></div>",];
    const textHolder = document.querySelector(".heading-primary__changing-text");
    let index = 0;
    textHolder.insertAdjacentHTML("afterbegin", phrases[index]);
    setInterval(_ => {
        let timer = setInterval(_ => {
            textHolder.firstChild.remove();
            textHolder.insertAdjacentHTML("afterbegin", phrases[index]);
            textHolder.classList.remove("u-inactive");
            clearInterval(timer);
            timer = null;
        }, 400);
        
        textHolder.classList.add("u-inactive");
        index += 1;
        if (index === phrases.length) {
            index = 0;
        }
    }, 3000);
};

exports.changingTextEffectHandler = changingTextEffectHandler;
exports.scrollEffectHandler = scrollEffectHandler;