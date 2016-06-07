var mediaLinks = document.getElementsByClassName('media-link');
var current = mediaLinks[0];
var next;
var counter = 0;
//initialising
current.style.backgroundColor = '#ffffff';

function change() {
	
	current = mediaLinks[counter];
	
	if((counter + 1) == mediaLinks.length) {
		counter = 0;
		next = mediaLinks[counter];
		next.style.backgroundColor = '#ffffff';
		current.style.backgroundColor = '#5b5b5b';
	}
	else
	{
		next = mediaLinks[counter + 1];
		current.style.backgroundColor = '#5b5b5b';
		next.style.backgroundColor = '#ffffff';
		counter++;
	}

}

var animateMediaLinks = setInterval(change, 3000);

