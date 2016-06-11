//Required Containers:
var mediaLinksContainer = getElementById('media-links-container');
var slideContainer = getElementById('slide-container');
//Function for looping a collection: (Doesn't work, Fix it.)
var loopCollection = Array.prototype.forEach.call;

//DOM Functions:
function getElementById(id) {
	return document.getElementById(id);
}
function getElementsByClassName(className) {
	return document.getElementsByClassName(className);
}
function createElement(tag) {
	return document.createElement(tag);
}
function getAttribute(element, attribute) {
	return element.getAttribute(attribute);
}

//Function for adding common Class Name:
function setClassName(elements, classNames) {
	var className = classNames.join(' ');
	elements.forEach(function (element) {
		element.className = className;
	});
}
//Function for appending child element to parent element
function appendToContainer(parent, childrens){
	childrens.forEach(function (children) {
		parent.appendChild(children);
	});
}

//Function for offsetting the Slides:
function offsetElement(element, offsetPercentage, offsetFactor) {
	var offsetValue = (offsetPercentage * offsetFactor).toString();
	element.style.left = offsetValue + '%';
}
//Rendering the Slides Data:
function renderData(slidesData) {
	//Offsett percentage value for the elements that are going to slide
	var offsetPercentage = 100;
	slidesData.forEach(function (slideData, index) {

		var slide = createElement('div');
		var header = createElement('h2');
		var description = createElement('div');
		var media = createElement('img');
		var anchor = createElement('a');
		var initialLinkState = 'off'

		slide.className = 'slide';
		slide.id = 'slide-' + index;
		slide.style.position = 'absolute';
		header.innerHTML = slideData.header;
		header.className = 'header';
		description.innerHTML = slideData.description;
		description.className = 'description';
		media.src = slideData.media;
		media.className = 'media';
		anchor.className = 'media-link' + ' ' + initialLinkState;
		anchor.id = index;

		var slideChildrens = [header, description, media];

		mediaLinksContainer.appendChild(anchor);
		appendToContainer(slide, slideChildrens);
		offsetElement(slide, offsetPercentage, index);
		slideContainer.appendChild(slide);

	});

}

renderData(slidesData);
