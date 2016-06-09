//Loaded after index.js
//Fetching the the slides:
var slides = getElementsByClassName('slide');
//Fetching the media links:
var mediaLinks = getElementsByClassName('media-link');

// function slide(slideOffset, prevIndex, currentIndex) {
//
//   var slideOffsetPercentage = 100;
//
//   function translateSlides() {
//     Array.prototype.forEach.call(slides, function (slide) {
//       slide.style.transform = 'translateX(' + slideOffset.toString() + '%)';
//       slide.style.transitionProperty = 'transform';
//       slide.style.transition = '1s';
//     });
//   }
//
//   slideOffset = slideOffset + (prevIndex - currentIndex) * slideOffsetPercentage;
//   translateSlides();
//
// }

function toggle(link) {
  var state = link.className.split(' ')[1];
  if (state === 'off') {
    link.className = link.className.replace(state, 'on');
  }
  else {
    link.className = link.className.replace(state, 'off');
  }
}

function startCarousel() {

  var resetIndex = 0;
  var currentIndex = 0;
  var prevIndex;
  var slideOffset = 0;//initial slide offset, for the side function

  function switchLink() {
    if (prevIndex !== undefined) {
      toggle(mediaLinks[prevIndex]);
    }
    toggle(mediaLinks[currentIndex]);
    // slide(slideOffset, prevIndex, currentIndex);
    prevIndex = currentIndex;
    if (currentIndex + 1 === mediaLinks.length) {
      currentIndex = resetIndex;
    }
    else {
      currentIndex = currentIndex + 1;
    }
  }

  var carouselTimer = setInterval(switchLink, 3000);

}

startCarousel();
