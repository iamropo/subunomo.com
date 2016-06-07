var prevButton = document.getElementById('prev-button');
var nextButton = document.getElementById('next-button');

var mediaLinks = document.getElementsByClassName('media-link');
var activeLinkColor = '#ffffff';
var inactiveLinkColor = '#5b5b5b';
var current = mediaLinks[0];
var next;
var counter = 0;

function buttonState(element) {

	var prev = Boolean(parseInt(element.getAttribute('prev')));
	var next = Boolean(parseInt(element.getAttribute('next')));

	if (!prev) {
		prevButton.style.visibility = 'hidden';
		nextButton.style.visibility = 'visible';
	} else if (!next) {
		prevButton.style.visibility = 'visible';
		nextButton.style.visibility = 'hidden'
	} else {
		prevButton.style.visibility = 'visible';
		nextButton.style.visibility = 'visible';
	}

}

function switchLinks() {
	
	current = mediaLinks[counter];
	
	if ((counter + 1) == mediaLinks.length) {
	
		counter = 0;
		next = mediaLinks[counter];
		buttonState(next);
		next.style.backgroundColor = activeLinkColor;
		current.style.backgroundColor = inactiveLinkColor;
	
	} else {

		next = mediaLinks[counter + 1];
		current.style.backgroundColor = inactiveLinkColor;
		next.style.backgroundColor = activeLinkColor;
		buttonState(next);
		counter++;
	
	}

}

current.style.backgroundColor = activeLinkColor;

buttonState(current);

var animateMediaLinks = setInterval(switchLinks, 3000);

