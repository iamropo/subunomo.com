//Loaded after index.js
//Fetching the the slides:
var slides = getElementsByClassName('slide');
//Fetching the media links:
var mediaLinks = getElementsByClassName('media-link');


function translateSlides(slides, slideOffset) {
  Array.prototype.forEach.call(slides, function (slide) {
    slide.style.transform = 'translateX(' + slideOffset.toString() + '%)';
    slide.style.transitionProperty = 'transform';
    slide.style.transition = '1s';
  });
}

function startCarousel() {

  var index = 0;
  //For the slides
  var slideOffset = 0;
  var slideOffsetPercentage = 100;
  var currentSlideIndex;

  mediaLinks[index].className = mediaLinks[index].className.replace('off', 'on');

  function switchLink() {

    var prevSlideIndex = currentSlideIndex || index;
    mediaLinks[index].className = mediaLinks[index].className.replace('on', 'off');
    index++;
    if (index === mediaLinks.length) {
      index = 0;
    }
    currentSlideIndex = index;
    mediaLinks[index].className = mediaLinks[index].className.replace('off', 'on');
    slideOffset = slideOffset + ((prevSlideIndex - currentSlideIndex) * slideOffsetPercentage)
    translateSlides(slides, slideOffset);

  }

  var carouselTimer = setInterval(switchLink, 3000);

}

startCarousel();
