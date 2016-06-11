/*NOTE: THE SLIDE OFFSET VALUES ARE NEGATIVE,
 BECAUSE THE SLIDES ARE OFFSETTED RELATIVE TO RIGHT OFFSET WHICH TAKES NEGATIVE VALUE TO OCCUR*/

//Function to retrieve the index of the active slide based on the active media link:
function getActiveSlideIndex() {

  var activeIndex;

  loopCollection(mediaLinks, function (link, index) {
    if (link.className.indexOf('on') !== -1) {
       activeIndex = index;
    }
  });

  return activeIndex;

}

function mediaLinkNavigation(link) {

  var activeSlideIndex = getActiveSlideIndex();
  var requestedSlideIndex = link.id;
  var slideOffsetPercentage = 100;
  var activeSlideOffset = - activeSlideIndex * slideOffsetPercentage;
  var slideOffset;

  if (requestedSlideIndex !== activeSlideIndex) {

      mediaLinks[activeSlideIndex].className = mediaLinks[activeSlideIndex].className.replace('on', 'off');
      mediaLinks[requestedSlideIndex].className = mediaLinks[requestedSlideIndex].className.replace('off', 'on');

      slideOffset = activeSlideOffset + ((activeSlideIndex - requestedSlideIndex) * slideOffsetPercentage);
      translateSlides(slides, slideOffset);

  }

}

function buttonNavigation(direction) {
  //True is to forward, False is to backwards
  var slideOffset;
  //Boundary issue will be solved by hiding the button with css
  var activeSlideIndex = getActiveSlideIndex();
  var slideOffsetPercentage = 100;
  var currentOffset = activeSlideIndex * slideOffsetPercentage;

  if (direction) {
    var nextSlideIndex = activeSlideIndex + 1;
  } else {
    var prevSlideIndex = activeSlideIndex - 1;
  }
  //dealing with media links, also the Boundary issue will be solved by hiding the button with css
  mediaLinks[activeSlideIndex].className = mediaLinks[activeSlideIndex].className.replace('on', 'off');
  if (nextSlideIndex) {
    slideOffset = (-(currentOffset)) - slideOffsetPercentage;
    mediaLinks[nextSlideIndex].className = mediaLinks[nextSlideIndex].className.replace('off', 'on');
  } else {
    slideOffset = (-(currentOffset)) + slideOffsetPercentage;
    mediaLinks[prevSlideIndex].className = mediaLinks[prevSlideIndex].className.replace('off', 'on');
  }
  translateSlides(slides, slideOffset);

}

getElementById('next-button').addEventListener('mousedown', function () {buttonNavigation(true)});
getElementById('prev-button').addEventListener('mousedown', function () {buttonNavigation(false)});
loopCollection(mediaLinks, function (mediaLink) {
  mediaLink.addEventListener('mousedown', function () {
    mediaLinkNavigation(this);
  });
});
