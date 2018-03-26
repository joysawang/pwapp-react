import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Flex, InputItem, Button, Modal, ActivityIndicator } from 'antd-mobile';
import { Navbar } from './../../components';
import * as actionAuth from './../../actions/authAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      form: {
        rules: {
          username: {
            required: true,
            minLength: 4
          },
          password: {
            required: true,
            minLength: 6
          }
        },
        fields: {
          username: {
            placeholder: 'Username',
            type: 'text',
            value: 'pwareact',
          },
          password: {
            placeholder: 'Password',
            type: 'password',
            value: 'pwa@react',
          }
        },
        errors: {},
        hasError: false,
      }
    }
  }

  componentDidMount() {
    this.setState({
      isReady: true
    });
  }

  onSubmit() {
    try {
      if (this.validate()) {
        const username = this.state.form.fields.username.value;
        const password = this.state.form.fields.password.value;

        this.props.actions.onLogin(username, password);
      }
    } catch (e) {
      console.log(e);
    }
  }

  renderInput(form, fieldName) {
    try {
      const { fields, errors } = form;
      const formGroupClass = 'form-group' + (errors[fieldName] ? ' has-error' : '');

      return (
        <div className={formGroupClass}>
          <div className="form-control">
            <InputItem
              type={fields[fieldName].type || 'text'}
              placeholder={fields[fieldName].placeholder || ''}
              onChange={(text) => {
                fields[fieldName].value = text;
                this.valid(fieldName);
                this.setState({ form });
              }}
              value={fields[fieldName].value}
            />
          </div>
          <label className="error-label">{errors[fieldName]}</label>
        </div>
      );
    } catch (e) {
      console.log(e);
    }
  }

  valid(fieldName, submit = false) {
    try {
      let form = this.state.form;
      let hasError = false;

      const rule = form.rules[fieldName];
      const field = form.fields[fieldName];

      delete form.errors[fieldName];

      if (!hasError && rule.required === true) {
        if (field.value === '' && submit === true) {
          form.errors[fieldName] = 'This field is required';
          form.hasError = true;
          hasError = true;
        }
      }

      if (!hasError && rule.minLength) {
        if ((field.value === '' || field.value.length < rule.minLength) && submit === true) {
          form.errors[fieldName] = `Please enter at least ${rule.minLength} characters`;
          form.hasError = true;
          hasError = true;
        }
      }

      if (Object.keys(form.errors).length === 0) {
        form.hasError = false;
      }

      this.setState({ form });
    } catch (e) {
      console.log(e);
    }
  }

  validate() {
    try {
      let { fields } = this.state.form;

      Object.keys(fields).map((key) => {
        return this.valid(key, true);
      });

      return !this.state.form.hasError;
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!this.state.isReady) {
      return null;
    }

    const { auth } = this.props;

    return (
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Flex direction="column" justify="center" className="intro-container">
            <h1 className="text-app-name">PWA React</h1>
            {
              <div className="logo-container">
                <img className="img-responsive" alt="img-logo" src={require('./../../assets/img/react-icon.png')} />
              </div>
            }
            <p className="text-app-desc">Progressive Web Application</p>
            <p className="text-app-desc">with React & Redux</p>
            <p className="text-app-desc">Hosting Google Firebase</p>
            <div className="form-login">
              { this.renderInput(this.state.form, 'username') }
              { this.renderInput(this.state.form, 'password') }
              {
                auth.hasError &&
                <div className="form-group">
                  <label className="error-msg">{auth.errorMessage}</label>
                </div>
              }
              <div className="form-group">
                <Button className="button button-primary" activeClassName="button-active" onClick={() => this.onSubmit()} disabled={auth.handleSubmit || this.state.form.hasError}>Login</Button>
              </div>
              <div className="form-group">
                <Button className="button button-register" onClick={() => this.props.history.push('/register')} activeClassName="button-active" disabled={auth.handleSubmit}>Register</Button>
              </div>
            </div>
          </Flex>
        </div>
        {
          <Modal
            visible={auth.handleSubmit}
            transparent
            maskClosable={false}
          >
            <Flex direction="row">
              <ActivityIndicator className="loading-icon" animating /><span>Loading...</span>
            </Flex>
          </Modal>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionAuth, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
