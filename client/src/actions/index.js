import streams from '../apis/streams';
import history from '../components/history';
export const SignIn = userId => {
	return {
		type: 'SIGN_IN',
		payload: userId,
	};
};

export const SignOut = () => {
	return {
		type: 'SIGN_OUT',
	};
};

export const createStream = formValues => {
	return async (dispatch, getState) => {
		const { userId } = getState().auth;
		const response = await streams.post('/streams', { ...formValues, userId });
		dispatch({ type: 'CREATE_STREAM', payload: response.data });
		history.push('/');
	};
};

export const fetchStreams = () => {
	return async dispatch => {
		const response = await streams.get('/streams');
		dispatch({ type: 'FETCH_STREAMS', payload: response.data });
	};
};

export const fetchStream = id => {
	return async dispatch => {
		const response = await streams.get(`/streams/${id}`);
		dispatch({ type: 'FETCH_STREAM', payload: response.data });
	};
};

export const deleteStream = id => {
	return async dispatch => {
		await streams.delete(`/streams/${id}`);
		dispatch({ type: 'DELETE_STREAM', payload: id });
		history.push('/');
	};
};

export const editStream = (id, formValues) => {
	return async dispatch => {
		const response = await streams.patch(`/streams/${id}`, formValues);
		dispatch({ type: 'EDIT_STREAM', payload: response.data });
		history.push('/');
	};
};
