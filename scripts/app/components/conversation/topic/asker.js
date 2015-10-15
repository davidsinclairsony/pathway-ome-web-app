import Actions from '../../../actions';
import assign from 'object-assign';
import base from '../../base';
import React from 'react/addons';
import NumberInput from './asker/numberInput';

export default React.createClass(assign({}, base, {
	displayName: 'Asker',
	render: function() {
		let inner = [];

		this.props.data.map((o, i) => {
			let input;

			switch(o.type) {
				case 'number':
					input = (<NumberInput {...o}  id={this.props.id} />);
					break;
			}

			let asideInner = [];

			if(
				typeof(o.help.isValid) !== 'undefined' &&
				o.help.isValid !== 2
			) {
				if(o.help.isValid) {
					// Add success icon
					asideInner.push(
						<div key={0} className='icon-check circle positive small' />
					);
				} else {
					// Add help icon
					asideInner.push(
						<div key={0}
							className='icon-help circle negative small clickable'
							onClick={() => {
								Actions.Fields.changeShowHelp({
									field: this.props.classes,
									value: !this.props.help.showHelp
								});
							}}
						/>
					);

					// Show help content if clicked
					if(o.help.showHelp) {
						asideInner.push(
							<div key={1} className='help'>{o.help.content}</div>
						);
					}
				}
			}

			inner.push(
				<li key={i}>
					<label htmlFor={o.name}>
						{o.text.en}
						{o.help.required? '' :  ' *'}
					</label>
					<div className={o.type}>
						{input}
						<aside>{asideInner}</aside>
					</div>
				</li>
			);
		});

		return (
			<div className='asker'>
				<h3>For an accurate answer, please provide more information</h3>
				<ul className='fields'>{inner}</ul>
				<button
					className='medium button positive'
					onClick={() => {
						Actions.Conversation.askerSubmit(this.props.id);
					}}
				>Send Information</button>
			</div>
		);
	}
}));