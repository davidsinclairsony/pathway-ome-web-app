import ReactRouter from 'react-router';
import routes from './routes';

export default ReactRouter.create({
	routes,
	location: ReactRouter.HistoryLocation
});