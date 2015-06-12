import {assign, React} from '../../libs';
import logo from '../components/logo';
import create from '../components/create';
import login from '../components/login';
import footer from '../components/footer';
import StartStore from '../stores/start';
import base from '../components/base';

// Get state from store
let getState = () => {
	return {
		createShowExpanded: StartStore.get(['createShowExpanded']),
		createCollapsible: StartStore.get(['createCollapsible']),
		loginShowExpanded: StartStore.get(['loginShowExpanded']),
		loginCollapsible: StartStore.get(['loginCollapsible'])
	};
};

export default React.createClass(assign({}, base, {
	displayName: 'Start',
	getInitialState: function() {
		// Reset store
		StartStore.initialize();

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
		inner.push(React.createElement(login, {
			key: 2,
			showExpanded: this.state.loginShowExpanded,
			collapsible: this.state.loginCollapsible,

		}));

		// Wrap for sticky footer purposes
		return React.DOM.div(props, [
			React.DOM.div({className: 'wrapper', key: 0}, inner),
			React.createElement(footer, {key: 1})
		]);
	},
	_onChange: function() {
		this.setState(getState());
	}
}));