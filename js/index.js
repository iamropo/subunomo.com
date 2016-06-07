var headerContainer = document.getElementById('header-container');
var descriptionContainer = document.getElementById('description-container');
var mediaContainer = document.getElementById('media-container');

var numberOfSlides = sliderData.length;
var slides;
var currentSlideIndex;
var leftDistance = -100;//starting value
var leftOffset = 100;
var slideInterval = 2000;
var animationSteps = numberOfSlides;
var animationDuration = 3;

var mediaLinksContainer = document.getElementById('media-links-container');

// function leftOffsetElement([header, decription, media], leftDistance) {
// 	var elements = arguments[0];
// 	elements.forEach(function (element) {
// 		element.style.left = leftDistance + '%';
// 	});
// }

function addSlideClassName([header, description, media], slideData) {
	var elements = arguments[0];
	elements.forEach(function (element) {
		element.className = element.className + ' ' + 'slide';
	});
}

sliderData.forEach(function (slideData) {

	var header = document.createElement('h2');
	var description = document.createElement('div');
 	var media = document.createElement('div');
	var li = document.createElement('li');
	var anchor = document.createElement('a');

	leftDistance = leftDistance + leftOffset;

	//header:
	header.innerHTML = slideData.header;
	header.className = 'header';
	//description:
	description.innerHTML = slideData.description;
	description.className = 'description';
	//medias:
	media.style.backgroundImage = 'url(' + slideData.image + ')';
	media.style.backgroundSize = 'cover';
	media.className = 'media';
	media.id = slideData.id;

	// leftOffsetElement([header, description, media], leftDistance);
	addSlideClassName([header, description, media], slideData);
	//appending to parent
	headerContainer.appendChild(header);
	descriptionContainer.appendChild(description);
	mediaContainer.appendChild(media);

	anchor.href = '#' + slideData.id;
	anchor.className = 'media-link';
	anchor.setAttribute('prev', slideData.prev);
	anchor.setAttribute('next', slideData.next);
	li.appendChild(anchor);
	mediaLinksContainer.appendChild(li);
});

slides = document.getElementsByClassName('slide');





