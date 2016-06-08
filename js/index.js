//DOM Functions:
var getElementById = document.getElementById;
var getElementsByClassName = document.getElementsByClassName;
var createElement = document.createElement;
var loopCollection = Array.prototype.forEach.call;
var getAttribute = function (element, attribute) {
	return element.getAttribute(attribute);
}

//Containers of the Headers, Descriptions and media:
var headerContainer = getElementById('header-container');
var descriptionContainer = getElementById('description-container');
var mediaContainer = getElementById('media-container');

//Function for adding common Class Name:
function setClassName(elements, className) {
	elements.forEach(function(element) {
		element.className = className;
	});
}

//Rendering the Slides Data:
slidesData.forEach(function (slideData) {

	var header = createElement('h2');
	var description = createElement('div');
	var media = createElement('img');

	header.innerHTML = slideData.header;
	description.innerHTML = slideData.description;



});
