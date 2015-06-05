export default {
	'slide-forward': {
		duration: 1000,
		enter: {
			translateX: ['0%', '100%'],
		},
		leave: {
			translateX: ['-100%', '0%'],
		}
	},
	'slide-back': {
		duration: 1000,
			enter: {
				translateX: ['0%', '-100%'],
			},
		leave: {
			translateX: ['100%', '0%'],
		}
	},
	'slideover-forward': {
		duration: 1000,
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
		duration: 1000,
		enter: {
			// translateX: ['0%', '0%'],
			zIndex: [0, 0 ]
		},
		leave: {
			translateX: ['100%', '0%'],
			zIndex: [1, 1 ]
		}
	},
	'fade': {
		duration: 1000,
		enter: {
			opacity: [1, 0],
		},
		leave: {
			opacity: [0, 1],
		}
	},
	default: {
		duration: 1000,
		enter: {
			opacity: [1, 0],
		},
		leave: {
			opacity: [0, 1],
		}
	}
};