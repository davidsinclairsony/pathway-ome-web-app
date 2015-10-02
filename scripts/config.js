export default (() => {
	if(process.env.NODE_ENV == 'development') {
		return {
			uglify: false,
			styles: 'nested',
			version: 11
		};
	} else {
		return {
			uglify: true,
			styles: 'compressed',
			version: 11
		};
	}
})();