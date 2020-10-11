/** 
  * @desc This module injects the iframes for youtube videos into the modal
  * HTML code for different options available in the website
*/

let handWashVideo = `<div><iframe width="560" height="315" src="https://www.youtube.com/embed/3PmVJQUCm4E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;


document.querySelector(".modal__close").addEventListener("click", () => {
  document.querySelector(".modal__video").firstChild.remove();
});



let inserter = () => {
    document.querySelector(".modal__video").insertAdjacentHTML("afterbegin", handWashVideo);
};



module.exports = inserter;
