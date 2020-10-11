/** 
  * @desc This module handles the opening and closing of the modal
  * When the modal is opened video cooresponding to the button is inserted
  * Closing, removes the video from modal
  * Also facilitates closing modal on a backdrop click
*/

const modalHandler = () => {

  // Video iframs corresponding to each feature
  const videoHandler = {
    "hand-wash" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/3PmVJQUCm4E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "keep-distance" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/2WCtGFNENYU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "wear-mask" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/adB8RW4I3o4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "elbow-coughing" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/mMzaiZ2n0cw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "stay-home" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/8ZfWp7Zdp9M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "get-tested" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/zulEwoIIlrM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  };

  /** 
    * @desc Removes The video from the modal
  */
  const removeVideo = _ => {
    const videoElement = document.querySelector(".modal__video").firstChild;
    if (videoElement) document.querySelector(".modal__video").firstChild.remove();
  };

  // Set Event Listeners

  // For closing the modal and removing the button on backdrop click
  document.querySelector(".modal").addEventListener("click", _ => {
    removeVideo();
    window.location.href = '#section-how';
  });

  // For removing the video when the cross button is clicked
  document.querySelector(".modal__close").addEventListener("click", () => {
    removeVideo();
  });

  // Event listener for adding the corresponding videos for all the buttons
  document.querySelectorAll(".card__btn").forEach((btn) => {
    btn.addEventListener("click", event => {
      // Extract button identifier
      const identifier = event.target.classList[event.target.classList.length -1].split('--')[1];
      // Add corresponding video using the video object
      document.querySelector(".modal__video").insertAdjacentHTML("beforeend", videoHandler[identifier]);
    });
  });
};

module.exports = modalHandler;
