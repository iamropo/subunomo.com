var numberOfSlides = data.length;
var playArea = document.getElementById('play-area');
var mediaLink = document.getElementById('media-link');
var leftDistance = -100;//starting value
var slides;

data.forEach(function (data) {

	var img = document.createElement('img');
	var li = document.createElement('li');
	var anchor = document.createElement('a');

	img.src = data.image;
	imageName = data.image.split('/');
	img.alt = imageName[imageName.length - 1];
	img.class = 'slide';
	img.id = data.id;
	leftDistance = leftDistance + 100;
	img.style.left = leftDistance + '%';
	playArea.appendChild(img);

	anchor.href = '#' + data.id;
	li.appendChild(anchor);
	mediaLink.appendChild(li);

})

slides = document.getElementsByClassName('slide');

