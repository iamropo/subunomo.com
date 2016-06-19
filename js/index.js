/* global slidesData */

// Required Elements:
var mediaLinksContainer = getElementById('media-links-container')
var slideContainer = getElementById('slide-container')
var navigationButtons = getElementsByClassName('navigation-button')
// The slides:
var slides = getElementsByClassName('slide')
var mediaLinks = getElementsByClassName('media-link')
// Current year
var currentYear = getElementById('year')
// DOM Functions:
function getElementById (id) {
  return document.getElementById(id)
}
function getElementsByClassName (className) {
  return document.getElementsByClassName(className)
}
function createElement (tag) {
  return document.createElement(tag)
}

// Functions for HTML Collections
function concatenetCollections (collections) {
  return Array.prototype.reduce.call(collections, function (prev, current) {
    return Array.prototype.concat.call(prev, current)
  })
}

function loopCollection (collection, callback) {
  return Array.prototype.forEach.call(collection, callback)
}
// Function to retrieve the index of the active slide based on the active media link:
function getActiveSlideIndex () {
  var activeIndex
  loopCollection(mediaLinks, function (link, index) {
    if (link.className.indexOf('on') !== -1) {
      activeIndex = index
    }
  })
  return activeIndex
}
// To toggle visibility of the buttons
function toggleButton (index) {
  if (index === 0) {
    getElementById('prev-button').style.visibility = 'hidden'
    getElementById('next-button').style.visibility = 'visible'
  } else if (index === 3) {
    getElementById('prev-button').style.visibility = 'visible'
    getElementById('next-button').style.visibility = 'hidden'
  } else {
    getElementById('prev-button').style.visibility = 'visible'
    getElementById('next-button').style.visibility = 'visible'
  }
}

// Function for appending child element to parent element
function appendToContainer (parent, childrens) {
  childrens.forEach(function (children) {
    parent.appendChild(children)
  })
}

// Function for offsetting the Slides:
function offsetElement (element, offsetPercentage, offsetFactor) {
  var offsetValue = (offsetPercentage * offsetFactor).toString()
  element.style.left = offsetValue + '%'
}
// Rendering the Slides Data:
function renderData (slidesData) {
  // Offsett percentage value for the elements that are going to slide
  var offsetPercentage = 100
  slidesData.forEach(function (slideData, index) {
    var slide = createElement('div')
    var header = createElement('h2')
    var description = createElement('div')
    var media = createElement('img')
    var anchor = createElement('a')
    var initialLinkState = 'off'

    slide.className = 'slide'
    slide.id = 'slide-' + index
    slide.style.position = 'absolute'
    header.innerHTML = slideData.header
    header.className = 'header'
    description.innerHTML = slideData.description
    description.className = 'description'
    media.src = slideData.media
    media.className = 'media'
    anchor.className = 'media-link' + ' ' + initialLinkState
    anchor.id = index

    var slideChildrens = [header, description, media]

    mediaLinksContainer.appendChild(anchor)
    appendToContainer(slide, slideChildrens)
    offsetElement(slide, offsetPercentage, index)
    slideContainer.appendChild(slide)
  })
}

renderData(slidesData)

/* Carousel.js */

// Collection fo HTML elements that are qualified to stop the carousel:
var qualifiedCollection = concatenetCollections([navigationButtons, slides, mediaLinks])

// Function for Translating slides:
function translateSlides (slides, slideOffset) {
  Array.prototype.forEach.call(slides, function (slide) {
    slide.style.transform = 'translateX(' + slideOffset.toString() + '%)'
    slide.style.transition = 'transform 1s'
  })
}

function startCarousel () {
  var index = 0
  // For the slides
  var slideOffset = 0
  var slideOffsetPercentage = 100
  var currentSlideIndex

  mediaLinks[index].className = mediaLinks[index].className.replace('off', 'on')
  toggleButton(index)
  function switchLink () {
    var prevSlideIndex = currentSlideIndex || index
    mediaLinks[index].className = mediaLinks[index].className.replace('on', 'off')
    index++
    if (index === mediaLinks.length) {
      index = 0
    }
    currentSlideIndex = index
    toggleButton(currentSlideIndex)
    mediaLinks[index].className = mediaLinks[index].className.replace('off', 'on')
    slideOffset = slideOffset + ((prevSlideIndex - currentSlideIndex) * slideOffsetPercentage)
    translateSlides(slides, slideOffset)
  }

  var carouselTimer = setInterval(switchLink, 4000)

  return carouselTimer
}

var initiateCarousel = startCarousel()
// Stopping the Carousel:
qualifiedCollection.forEach(function (collection) {
  loopCollection(collection, function (element) {
    element.addEventListener('mousedown', function () {
      clearInterval(initiateCarousel)
    })
  })
})

/* Navigation.js */

// Direction index based on hammer.js:
var requestPreviousSlide = 4
var requestNextSlide = 2

/* Note: The slide offset values are negative,
 because the slides are offset relative to right offset which takes negative value to occur*/

function mediaLinkNavigation (link) {
  var activeSlideIndex = getActiveSlideIndex()
  var requestedSlideIndex = Number(link.id)
  toggleButton(requestedSlideIndex)
  var slideOffsetPercentage = 100
  var activeSlideOffset = - activeSlideIndex * slideOffsetPercentage
  var slideOffset

  if (requestedSlideIndex !== activeSlideIndex) {
    mediaLinks[activeSlideIndex].className = mediaLinks[activeSlideIndex].className.replace('on', 'off')
    mediaLinks[requestedSlideIndex].className = mediaLinks[requestedSlideIndex].className.replace('off', 'on')

    slideOffset = activeSlideOffset + ((activeSlideIndex - requestedSlideIndex) * slideOffsetPercentage)
    translateSlides(slides, slideOffset)
  }
}

function buttonAndSwipeNavigation (direction, activeSlideIndex) {
  // True is to forward, False is to backwards
  var slideOffset
  // Boundary issue will be solved by hiding the button with css
  var activeSlideIndex = activeSlideIndex || getActiveSlideIndex()
  var slideOffsetPercentage = 100
  var currentOffset = activeSlideIndex * slideOffsetPercentage

  if (direction === requestNextSlide) {
    var nextSlideIndex = activeSlideIndex + 1
  } else if (direction === requestPreviousSlide) {
    var prevSlideIndex = activeSlideIndex - 1
  }
  toggleButton(nextSlideIndex || prevSlideIndex)
  // dealing with media links, also the Boundary issue will be solved by hiding the button with css
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

year.innerHTML = new Date().getFullYear()

getElementById('next-button').addEventListener('mousedown', function () {buttonAndSwipeNavigation(requestNextSlide)})
getElementById('prev-button').addEventListener('mousedown', function () {buttonAndSwipeNavigation(requestPreviousSlide)})
loopCollection(mediaLinks, function (mediaLink) {
  mediaLink.addEventListener('mousedown', function () {
    mediaLinkNavigation(this)
  })
})

