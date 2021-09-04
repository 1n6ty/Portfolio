var mainCarousel = document.querySelector('#mainCarousel'),
		prevButton = '',
		nextButton = '',
		wrapPrevButton = '',
		wrapNextButton = '',
		prevWrap = 0,
		background = document.querySelector('.background');

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

var colors = [
	'#c6829b', '#c38248', '#5b8e9d', '#69af89'
];

var pics = [];

var timer = 0, intTimer = 0;

function getRand(cAnimation, cur){
	let rNum = Math.floor(Math.random() * animations[cAnimation].length);
	while (rNum == cur) rNum = Math.floor(Math.random() * animations[cAnimation].length);
	return rNum;
}

function setAnimation(cAnimation, fstFlag = false){
	let currentAn = 0;
	function times(){
		timer = setTimeout(() => {
			currentAn = getRand(cAnimation, currentAn);
			$('#curve1 > path').attr('d', animations[cAnimation][currentAn]);
			timer = setTimeout(() => {
				currentAn = getRand(cAnimation, currentAn);
				$('#curve1 > path').attr('d', animations[cAnimation][currentAn]);
			}, 3000);
		}, 0);
	}
	if(!fstFlag) pics[cAnimation].insertBefore($('.svgImg'));
	else pics[cAnimation].css('opacity', 1).appendTo($('.imgToSvg'));
	clearTimeout(timer);
	clearInterval(intTimer);
	times();
	intTimer = setInterval(() => {
		times();
	}, 6000);
}

pics.push($('<img src="assets/IMG/1.jpg" style="clip-path: url(#curve1);" class="svgImg 1"/>'));
pics.push($('<img src="assets/IMG/4.jpg" style="clip-path: url(#curve1);" class="svgImg 2"/>'));
pics.push($('<img src="assets/IMG/2.jpg" style="clip-path: url(#curve1);" class="svgImg 3"/>'));
pics.push($('<img src="assets/IMG/3.jpg" style="clip-path: url(#curve1);" class="svgImg 4"/>'));

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
	setTimeout(() => {$('.svgImg.' + (prev + 1)).css('opacity', 1);$('.svgImg.' + (prev + 1)).detach()}, 1000);
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

$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(1)').hover(function(e){
	$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(1)').css('opacity', 0);
	$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(2)').css('visibility', 'inherit');
	$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(2)').css('opacity', 1);
	setTimeout(() => $('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(1)').css('visibility', 'hidden'), 1);
});
$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(2)').hover(function(e){}, function(e){
	$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(2)').css('opacity', 0);
	$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(1)').css('visibility', 'inherit');
	$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(1)').css('opacity', 1);
	setTimeout(() => {
		$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(2)').css('visibility', 'hidden');
		$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(2)').text('Copy email to clipboard');
	}, 1);
});
function copy(text) {
  const ta = document.createElement('textarea');
  ta.style.cssText = 'opacity:0; position:fixed; width:1px; height:1px; top:0; left:0;';
  ta.value = text;
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand('copy');
  ta.remove();
}
$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(2)').on('click', function(e){
	copy('artyom.inety@gmail.com');
	$('#mainCarousel > section > div.topNav > div.meWrap > div > ul > li:nth-child(1) > a:nth-child(2)').text('Copied!');
});