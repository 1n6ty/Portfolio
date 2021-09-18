var preloader = document.querySelector('.preloader'),
	content = document.querySelector('content'),
	aboutBut = document.querySelector('div.sign-right > h5'),
	nav = document.querySelector('.nav'),
	navClose = document.querySelector('.nav .close'),
	navOut = document.querySelector('.nav .out'),
	emailCopy = document.querySelector('div.topNav > div.meWrap > div > ul > li:nth-child(1) > a');

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

document.addEventListener('DOMContentLoaded', function(){
	$('header .slider').slick({
		arrows: false,
		dots: true,
		swipe: false,
		autoplay: true,
		speed: 1200,
		autoplaySpeed: 5000,
	});
	content.style = "display: block;";
	preloader.classList.toggle('close');
	setTimeout(() => {preloader.style = "display: none;"}, 1000);
});

aboutBut.addEventListener('click', function(e){
	nav.style = '';
	nav.classList.toggle('active');
	nav.classList.toggle('open');
	setTimeout(() => {
		nav.classList.toggle('open');
	}, 500);
});
navClose.addEventListener('click', function(e){
	nav.style = 'visibility: hidden;';
	nav.classList.toggle('close');
	setTimeout(() => {
		nav.classList.toggle('active');
		nav.classList.toggle('close');
	}, 500);
});
navOut.addEventListener('click', function(e){
	nav.style = 'visibility: hidden;';
	nav.classList.toggle('close');
	setTimeout(() => {
		nav.classList.toggle('active');
		nav.classList.toggle('close');
	}, 500);
});

emailCopy.addEventListener('mouseenter', function(e){
	emailCopy.innerText = 'Copy email to clipboard';
});
emailCopy.addEventListener('mouseout', function(e){
	emailCopy.innerText = 'Email';
});
emailCopy.addEventListener('click', function(e){
	copy('artyom.inety@gmail.com');
	emailCopy.innerText = 'Copied!';
});