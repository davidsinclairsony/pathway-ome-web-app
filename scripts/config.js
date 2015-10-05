export default (() => {
	let settings;

	if(process.env.NODE_ENV == 'development') {
		settings = {
			uglify: false,
			styles: 'nested'
		};
	} else {
		settings = {
			uglify: true,
			styles: 'compressed'
		};
	}

	settings.version = 12;

	return settings;
})();