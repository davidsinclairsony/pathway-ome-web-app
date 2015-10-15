import config from './config.json';

let append = () => {
	[
		'/scripts/libs.bundle.js?v=' + config.version,
		'/scripts/main.bundle.js?v=' + config.version
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