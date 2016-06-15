loopCollection(slides, function (slide) {
  (new Hammer(slide)).on('swipe', handleSwipe)
})

function handleSwipe(event) {

  clearInterval(initiateCarousel)

  var activeSlideIndex = getActiveSlideIndex()
  // Do Nothing for the first and the last slide
  if (activeSlideIndex === 0 && event.direction === requestPreviousSlide) {
    return false
  } else if (activeSlideIndex === slides.length - 1 && event.direction === requestNextSlide) {
    return false
  }
  else {

    if (event.direction === requestNextSlide) {
      buttonAndSwipeNavigation(requestNextSlide, activeSlideIndex)
    } else if (event.direction === requestPreviousSlide) {
      buttonAndSwipeNavigation(requestPreviousSlide, activeSlideIndex)
    }

  }

}
