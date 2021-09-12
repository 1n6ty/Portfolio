var emailCopy = document.querySelector('div.topNav > div.meWrap > div > ul > li:nth-child(1) > a');

$(document).ready(function (){
	$('.slick-slider').slick({
	  centerMode: true,
	  centerPadding: '60px',
	  swipe: false,
	  slidesToShow: 3,
	  variableWidth: true,
	  cssEase: 'cubic-bezier(0.76, 0, 0.24, 1)',
	  speed: 1000,
	  dots: true,
	  prevArrow: `<div class="wrapPrev">
					<div class="carousel-control-prev"></div>
				</div>`,
		nextArrow: `<div class="wrapNext">
					<div class="carousel-control-next" type="button"></div>
				</div>`,
	  responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 3
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '300px',
	        slidesToShow: 1
	      }
	    }
	  ]
	});
	prevButton = document.querySelector('#mainCarousel .carousel-control-prev');
	nextButton = document.querySelector('#mainCarousel .carousel-control-next');
	wrapPrevButton = document.querySelector('#mainCarousel .wrapPrev');
	wrapNextButton = document.querySelector('#mainCarousel .wrapNext');
	setAnimation(0, true);
	$('.preloader').toggleClass('close');
	setTimeout(() => {$('.preloader').css('display', 'none')}, 1000);
});
$('.slick-slider').on('beforeChange', function(e, {}, prev, next){
	wrapPrevButton.style = 'opacity: 0';
	wrapNextButton.style = 'opacity: 0';
	setTimeout(() => {
		prevButton.style.background = gradientList[next].prev;
		nextButton.style.background = gradientList[next].next;
		background.style.background = gradientList[next].background;
	}, 500);
	prevWrap = next;
	$('.svgImg.' + (prev + 1)).css('opacity', 0);
	setTimeout(() => {$('.svgImg.' + (prev + 1)).css('opacity', 1);$('.svgImg.' + (prev + 1)).remove()}, 1000);
	setAnimation(next);
	$('.topNav .shortInfo span').get(0).style.setProperty('--linkColor', colors[next]);
	$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(2)').get(0).style.setProperty('--linkColor', colors[next]);
	$('#mainCarousel > section > div.topNav > div.close').get(0).style.setProperty('--linkColor', colors[next]);
	for(let i = 0; i < $('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li').length; i++){
		$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(' + (i + 1) + ') a').get(0).style.setProperty('--linkColor', colors[next]);
	}
});
$('.slick-slider').on('afterChange', function(e, {}, next){
	wrapPrevButton.style = '';
	wrapNextButton.style = '';
});
$('.slick-slide .wrap').on('click', function(e){
	let newWrap = parseInt(e.currentTarget.classList[1]);
	if(newWrap != prevWrap){
		if(prevWrap - newWrap == 3 || newWrap - prevWrap == 1){
			$('.slick-slider').slick('slickNext');
		} else{
			$('.slick-slider').slick('slickPrev');
		}
		prevWrap = newWrap;
	}
});
mainCarousel.addEventListener('wheel', function(e){
	if(e.deltaY > 0){
		$('.slick-slider').slick('slickNext');
	} else{
		$('.slick-slider').slick('slickPrev');
	}
});

$('#mainCarousel > div.sign-right > h5').on('click', function(e){
	$('.nav').toggleClass('active');
	$('.nav').toggleClass('open');
	setTimeout(() => {
		$('.nav').toggleClass('open');
	}, 500);
});
$('#mainCarousel > section > div > div.close').on('click', function(e){
	$('.nav').toggleClass('close');
	setTimeout(() => {
		$('.nav').toggleClass('active');
		$('.nav').toggleClass('close');
	}, 500);
});
$('.nav .out').on('click', function(e){
	$('.nav').toggleClass('close');
	setTimeout(() => {
		$('.nav').toggleClass('active');
		$('.nav').toggleClass('close');
	}, 500);
});

emailCopy.addEventListener('mouseenter', function(e){
	console.log('enter');
	emailCopy.innerText = 'Copy email to clipboard';
});
emailCopy.addEventListener('mouseout', function(e){
	console.log('over');
	emailCopy.innerText = 'Email';
});
emailCopy.addEventListener('click', function(e){
	copy('artyom.inety@gmail.com');
	emailCopy.innerText = 'Copied!';
});