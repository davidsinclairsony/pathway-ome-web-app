import app from '../app';
import activate from './views/activate';
import consent from './views/consent';
import create from './views/create';
import error from './views/error';
import home from './views/home';
import login from './views/login';
import profile from './components/profile';
import reactivate from './views/reactivate';
import User from './utilities/user';
import {IndexRoute, Route} from 'react-router';
import React from 'react'; // eslint-disable-line no-unused-vars

export default <Route path='/' component={app}>
	<IndexRoute
		component={home}
		onEnter={(a, b) => {User.ensureAuthentication(a, b);}}
	/>
	<Route
		component={home}
		onEnter={(a, b) => {User.ensureAuthentication(a, b);}}
	>
		<Route path='profile' component={profile} />
	</Route>
	<Route path='activate' component={activate} />
	<Route path='consent' component={consent} />
	<Route path='create' component={create} />
	<Route path='login' component={login} />
	<Route path='reactivate' component={reactivate} />
	<Route path='*' component={error} />
</Route>;