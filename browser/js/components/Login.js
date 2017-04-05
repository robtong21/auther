import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getUser } from '../redux/login'

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      email: '',
      password: ''
    }
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);

  }

  
  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
                onChange={this.changeEmail}
              />
            </div>
            <div className="form-group">
                <label>password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  required
                  onChange={this.changePassword}
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
              href="/api/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {
    event.preventDefault();
    this.props.verify(this.state.email, this.state.password)
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

const mapState = () => ({ message: 'Log in' });
const mapDispatch = dispatch => {
  return {
    verify: (email, password) => {
      dispatch(getUser(email, password))
    }
  }
 };

export default connect(mapState, mapDispatch)(Login);
