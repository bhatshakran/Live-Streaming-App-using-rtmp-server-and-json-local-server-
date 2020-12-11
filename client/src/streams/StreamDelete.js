import React from 'react';
import { Fragment } from 'react';
import Modal from '../components/Modal';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	renderActions() {
		const { id } = this.props.match.params;
		return (
			<Fragment>
				<div className='modal-footer'>
					<button
						onClick={() => this.props.deleteStream(id)}
						className='btn btn-danger'>
						Delete
					</button>
					<Link to='/' className='btn btn-secondary'>
						Cancel
					</Link>
				</div>
			</Fragment>
		);
	}
	renderContent() {
		if (!this.props.stream) {
			return 'Are you sure you want to delete this stream?';
		}
		return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
	}
	render() {
		return (
			<div>
				StreamDelete
				<Modal
					title='Delete Stream'
					content={this.renderContent()}
					actions={this.renderActions()}
				/>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
	};
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(
	StreamDelete
);
