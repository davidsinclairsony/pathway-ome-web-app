export default (() => {
	let settings;

	switch(process.env.NODE_ENV) {
		case 'dev':
			settings = {
				uglify: false,
				styles: 'nested',
				baseUrl: 'http://atldev.pathway.com:5000/'
			};
			break;
		case 'devstage':
			settings = {
				uglify: false,
				styles: 'nested',
				baseUrl: 'http://atldevstage.pathway.com:5000/'
			};
			break;
		case 'stage':
			settings = {
				uglify: true,
				styles: 'compressed',
				baseUrl: 'http://atlstage.pathway.com:5000/'
			};
			break;
		default:
			settings = {
				uglify: true,
				styles: 'compressed',
				baseUrl: 'http://atlproduction.pathway.com:5000/'
			};
	}

	settings.version = 21;

	return settings;
})();