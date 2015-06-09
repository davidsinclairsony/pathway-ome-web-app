import {assign, React} from '../../libs';
import base from './base';

export default React.createClass(assign({}, base, {
	displayName: 'Button',
	render: function() {
		return React.DOM.button(
			{className: this.props.classes},
			this.props.inner
		);
	}
}));