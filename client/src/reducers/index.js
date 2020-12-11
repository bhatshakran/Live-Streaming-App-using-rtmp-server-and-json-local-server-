import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import { AuthReducer } from './AuthReducer';
import { streamReducer } from './streamReducer';
export default combineReducers({
	auth: AuthReducer,
	form: reducer,
	streams: streamReducer,
});
