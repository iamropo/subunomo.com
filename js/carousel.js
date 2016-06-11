//Fetching the navigation buttons:
var navigationButtons = getElementsByClassName('navigation-button');
//Fetching the the slides:
var slides = getElementsByClassName('slide');
//Fetching the media links:
var mediaLinks = getElementsByClassName('media-link');
//Collection fo HTML elements that are qualified to stop the carousel:
var qualifiedCollection = concatenetCollections([navigationButtons, slides, mediaLinks]);

//Functions for HTML Collections
function concatenetCollections(collections) {
  return Array.prototype.reduce.call(collections, function (prev, current) {
    return Array.prototype.concat.call(prev, current);
  });
}

function loopCollection(collection, callback) {
  return Array.prototype.forEach.call(collection, callback);
}

//Function for Translating slides:
function translateSlides(slides, slideOffset) {
  Array.prototype.forEach.call(slides, function (slide) {
    slide.style.transform = 'translateX(' + slideOffset.toString() + '%)';
    slide.style.transition = 'transform 1s';
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

  return carouselTimer;

}

var initiateCarousel = startCarousel();
//Stopping the Carousel:
qualifiedCollection.forEach(function (collection) {
   loopCollection(collection, function (element) {
       element.addEventListener('mousedown', function () {
        clearInterval(initiateCarousel);
      });
    });
  });
