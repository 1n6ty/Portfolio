var mainCarousel = document.querySelector('#mainCarousel'),
	prevButton = document.querySelector('#mainCarousel .carousel-control-prev'),
	nextButton = document.querySelector('#mainCarousel .carousel-control-next'),
	wrapPrevButton = document.querySelector('#mainCarousel .wrapPrev'),
	wrapNextButton = document.querySelector('#mainCarousel .wrapNext'),
	background = document.querySelector('.background');
var carousel = new bootstrap.Carousel(mainCarousel, {
	interval: false,
	touch: true
});
var gradientList = [
	{
		prev: 'linear-gradient(90deg, rgba(202,230,215, 1) 0%, rgba(202,230,215, 0) 100%)',
		next: 'linear-gradient(90deg, rgba(254,214,182, 0) 0%, rgba(254,214,182, 1) 100%)',
		background: '#edd7df'
	},
	{
		prev: 'linear-gradient(90deg, rgba(237,215,223, 1) 0%, rgba(237,215,223, 0) 100%)',
		next: 'linear-gradient(90deg, rgba(186,216,224, 0) 0%, rgba(186,216,224, 1) 100%)',
		background: '#fed6b6'
	},
	{
		prev: 'linear-gradient(90deg, rgba(254,214,182, 1) 0%, rgba(254,214,182, 0) 100%)',
		next: 'linear-gradient(90deg, rgba(202,230,215, 0) 0%, rgba(202,230,215, 1) 100%)',
		background: '#bad8e0'
	},
	{
		prev: 'linear-gradient(90deg, rgba(186,216,224, 1) 0%, rgba(186,216,224, 0) 100%)',
		next: 'linear-gradient(90deg, rgba(237,215,223, 0) 0%, rgba(237,215,223, 1) 100%)',
		background: '#cae6d7'
	}
];

mainCarousel.addEventListener('slide.bs.carousel', function(e){
	wrapPrevButton.style.opacity = 0;
	wrapNextButton.style.opacity = 0;
});
mainCarousel.addEventListener('slid.bs.carousel', function(e){
	prevButton.style.background = gradientList[e.to].prev;
	nextButton.style.background = gradientList[e.to].next;
	background.style.background = gradientList[e.to].background;
	wrapPrevButton.style = '';
	wrapNextButton.style = '';
});
mainCarousel.addEventListener('wheel', function (e){
	if(e.deltaY > 0){
		carousel.next();
	} else{
		carousel.prev();
	}
});
