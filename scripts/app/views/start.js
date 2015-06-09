import {assign, React} from '../../libs';
import logo from '../components/logo';
import create from '../components/create';
import login from '../components/login';
import footer from '../components/footer';
import StartStore from '../stores/start';
import base from '../components/base';

// Get state from store
let getState = () => {
	// Reset store
	StartStore.initialize();

	return {
		createShowExpanded: StartStore.get(['createShowExpanded']),
		createCollapsible: StartStore.get(['createCollapsible']),
		loginShowExpanded: true,
		loginCollapsible: true
	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Start',
	getInitialState: function() {
		return getState();
	},
	componentDidMount: function() {
		StartStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function() {
		StartStore.removeChangeListener(this._onChange);
	},
	render: function() {
		let inner = [];
		let props = {className: 'start view'};

		// Add h1 and logo
		inner.push(React.DOM.h1({key: 0}, React.createElement(logo, {key: 0})));

		// Add create component
		inner.push(React.createElement(create, {
			key: 1,
			showExpanded: this.state.createShowExpanded,
			collapsible: this.state.createCollapsible,

		}));

		// Add login component


		// Add footer
		inner.push(React.createElement(footer, {key: 3}));

		return React.DOM.div(props, inner);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));