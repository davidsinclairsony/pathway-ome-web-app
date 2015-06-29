export default {
	'slide-forward': {
		duration: 500,
		enter: {translateX: ['0%', '100%']},
		leave: {translateX: ['-100%', '0%']}
	},
	'slide-back': {
		duration: 500,
		enter: {translateX: ['0%', '-100%']},
		leave: {translateX: ['100%', '0%']}
	},
	'slideover-forward': {
		duration: 500,
		enter: {
			translateX: ['0%', '100%'],
			zIndex: [1, 1 ]
		},
		leave: {
			// translateX: ['0%', '0%'],
			zIndex: [0, 0 ]
		}
	},
	'slideover-back': {
		duration: 500,
		enter: {
			// translateX: ['0%', '0%'],
			zIndex: [0, 0 ]
		},
		leave: {
			translateX: ['100%', '0%'],
			zIndex: [1, 1 ]
		}
	},
	'fade-slow': {
		duration: 2000,
		enter: {opacity: [1, 0]},
		leave: {opacity: [0, 1]}
	},
	'fade-fast': {
		duration: 100,
		enter: {opacity: [1, 0]},
		leave: {opacity: [0, 1]}
	},
	default: {
		duration: 500,
		enter: {opacity: [1, 0]},
		leave: {opacity: [0, 1]}
	}
};