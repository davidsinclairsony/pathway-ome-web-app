let append = () => {
	[
		'/scripts/libs.bundle.js?v=8', '/scripts/main.bundle.js?v=8'
	].map(o => {
		let script = document.createElement('script');
		script.src = o;
		script.async = false;
		document.head.appendChild(script);
	});
};

if(
	document.readyState === 'complete' ||
	document.readyState === 'loaded' ||
	document.readyState === 'interactive'
) {
	append();
} else {
	document.addEventListener('DOMContentLoaded', append);
}