import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';
class StreamEdit extends React.Component {
	componentDidMount() {
		console.log(this.props);
		this.props.fetchStream(this.props.match.params.id);
	}
	onSubmit = formValues => {
		console.log(formValues);
		this.props.editStream(this.props.match.params.id, formValues);
	};
	render() {
		if (!this.props.stream) {
			return 'Loading...';
		}
		return (
			<div>
				<h3>Edit the stream</h3>
				<StreamForm
					initialValues={_.pick(this.props.stream, 'title', 'description')}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream, editStream })(
	StreamEdit
);
