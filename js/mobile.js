// Direction Index:
var leftSwipe = 4
var rightSwipe = 2
var requiredSlides = []

loopCollection(slides, function (slide) {
  requiredSlides.push(new Hammer(slide))
})

requiredSlides.forEach(function (slide) {
  slide.on('swipe', handleSwipe)
})

function handleSwipe(event) {

  clearInterval(startCarousel)

  var activeSlideIndex = getActiveSlideIndex()
  // Do Nothing for the first and the last slide
  if (activeSlideIndex === 0 && event.direction === leftSwipe) {
    return false
  } else if (activeSlideIndex === slides.length - 1 && event.direction === rightSwipe) {
    return false
  }
  else {

    var slideOffset
    var slideOffsetPercentage = 100
    var currentOffset = activeSlideIndex * slideOffsetPercentage

    if (event.direction === rightSwipe) {
      var  nextSlideIndex = activeSlideIndex + 1
    } else if (event.direction === leftSwipe) {
      var prevSlideIndex = activeSlideIndex - 1
    }
    toggleButton(nextSlideIndex || prevSlideIndex)
    mediaLinks[activeSlideIndex].className = mediaLinks[activeSlideIndex].className.replace('on', 'off')
    if (nextSlideIndex) {
      slideOffset = (-(currentOffset)) - slideOffsetPercentage
      mediaLinks[nextSlideIndex].className = mediaLinks[nextSlideIndex].className.replace('off', 'on')
    } else {
      slideOffset = (-(currentOffset)) + slideOffsetPercentage
      mediaLinks[prevSlideIndex].className = mediaLinks[prevSlideIndex].className.replace('off', 'on')
    }
    translateSlides(slides, slideOffset)
  }

}
