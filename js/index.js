//Containers of the Headers, Descriptions and media:
var headerContainer = document.getElementById('header-container');
var descriptionContainer = getElementById('description-container');
var mediaContainer = getElementById('media-container');
var mediaLinksContainer = getElementById('media-links-container');
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
function appendToParent(parents, childrens){
	parents.forEach(function (parent, index) {
		parent.appendChild(childrens[index]);
	});
}
//Function to offset elements
function offsetElements(elements, initialOffset) {
	var initialOffset = initialOffset;
	elements.forEach(function (element) {
		element.style.left = initialOffset.toString() + '%';
		initialOffset = initialOffset + 100;
	});
}
//Function for offsetting the Slides:
function offsetElements(elements, offsetPercentage, offsetFactor) {
	var offsetValue = (offsetPercentage * offsetFactor).toString();
	elements.forEach(function (element) {
		element.style.left = offsetValue + '%';
	});
}
//Rendering the Slides Data:
function renderData() {
	//Offsett percentage value for the elements that are going to slide
	var offsetPercentage = 100;
	var slideClassName = 'slide';
	slidesData.forEach(function (slideData, index) {

		var header = createElement('h2');
		var description = createElement('div');
		var media = createElement('img');
		var anchor = createElement('a');
		var initialLinkState = 'off'
		//Redeclaring the link state, if it's the first link:
		if( index === 0 ) {
			initialLinkState = 'on';
		}

		header.innerHTML = slideData.header;
		description.innerHTML = slideData.description;
		media.src = slideData.media;
		anchor.className = 'media-link' + ' ' + initialLinkState;

		var childrens = [header, description, media, anchor];
		var slideClassChildrens = childrens.slice(0, 3);

		setClassName(slideClassChildrens, [slideClassName, slideClassName + index]);
		offsetElements(slideClassChildrens, offsetPercentage, index);
		appendToParent([headerContainer, descriptionContainer, mediaContainer, mediaLinksContainer], childrens);

	});

}

renderData();
