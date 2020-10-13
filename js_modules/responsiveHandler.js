/** 
  * @desc This module adds in event listenrs for responsive navigation menu
  * 1. Close menu on size increase more than 900px
  * 2. Show and hide backdrop on menu closing and opening
  * 3. Close menu and backdrop on backdrop click
*/

/** 
  * @desc Close menu by unchecking checkbox and giving inactive class to backdrop
*/
const closeMenu = _ => {
    // Close hamburger Menu
    document.querySelector('#navigation__menu-btn').checked = false;
    // Close BackDrop
    document.querySelector(".backdrop").classList.add("u-inactive");
};

/** 
  * @desc Adds listener on window size change for menu closing
*/
const addResizingListener = _ => {
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
};


/** 
  * @desc Adds backdrop listeners
*/
const addBackdroplListeners = _ => {
    // Appearing and Disappearing
    document.querySelector('#navigation__menu-btn').addEventListener("change", (event) => {
        document.querySelector(".backdrop").classList.toggle("u-inactive");
    });

    // Close menu on backdrop click
    document.querySelector('.backdrop').addEventListener("click", _ => {
        closeMenu();
    });
};


/** 
  * @desc Main function 
  * calss other listener adders and is exported for the main js
*/
const responsiveHandler = _ => {
    // close menu on resizing
    addResizingListener();
    // Backdrop Manipulation
    addBackdroplListeners();
};

module.exports = responsiveHandler;