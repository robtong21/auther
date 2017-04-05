import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { newUser } from '../redux/login'

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      email: '',
      password: ''
    }
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onSignupSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
                onChange = {this.changeEmail}
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                required
                onChange = {this.changePassword}
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onSignupSubmit(event) {
    event.preventDefault();
    this.props.signup(this.state.email, this.state.password)
  }

  changeEmail(event) {
    const newEmail = event.target.value;
    this.setState({email: newEmail})
  }

  changePassword(event) {
    const newPassword = event.target.value;
    this.setState({password: newPassword})
  }

}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });
const mapDispatch = dispatch => {
  return {
    signup: (email, password) => {
      dispatch(newUser(email, password))
    }
  }
 };

export default connect(mapState, mapDispatch)(Signup);
