import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SignIn, SignOut } from '../actions';

class GoogleAuth extends Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId:
						'572443672910-crk8rvhhs8b85c4a1cfalau2nmpi0ecd.apps.googleusercontent.com',
					scope: 'email',
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}
	onAuthChange = isSignedIn => {
		if (isSignedIn) {
			this.props.SignIn(this.auth.currentUser.get().getId());
		} else {
			this.props.SignOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};
	onSignOutClick = () => {
		this.auth.signOut();
		alert('You have signed out!');
	};
	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onSignOutClick} className='ui red google button'>
					<i className='google icon' />
					Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.onSignInClick} className='ui red google button'>
					<i className='google icon' />
					Sign In with Google
				</button>
			);
		}
	}
	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}
const mapStateToProps = state => {
	return {
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { SignIn, SignOut })(GoogleAuth);
