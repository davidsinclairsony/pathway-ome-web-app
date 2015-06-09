import {ReactRouter} from '../libs';
import routes from './routes';

export default ReactRouter.create({
	routes,
	location: ReactRouter.HistoryLocation
});