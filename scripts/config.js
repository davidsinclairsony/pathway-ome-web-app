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
		case 'production':
			settings = {
				uglify: true,
				styles: 'compressed',
				baseUrl: 'http://atldevstage.pathway.com:5000/'
			};
			break;
	}

	settings.version = 22;

	return settings;
})();