import React, { Component } from 'react';
import { Flex, InputItem, Button, Modal, ActivityIndicator } from 'antd-mobile';
import { Navbar } from './../../components';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      handleSubmit: false,
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
        this.setState({ handleSubmit: true });

        const username = this.state.form.fields.username.value;
        const password = this.state.form.fields.password.value;

        setTimeout(() => {
          if (username === 'pwareact' && password === 'pwa@react') {
            this.setState({ handleSubmit: false });
            this.props.history.replace('/home');
          } else {
            this.setState({
              handleSubmit: false
            }, () => {
              Modal.alert('', 'Invalid Username or Password', [
                { text: 'Try Again' }
              ]);
            });
          }
        }, 1000);
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
            <p className="text-app-desc">Welcome to Progressive Web Application</p>
            <p className="text-app-desc">with React Javascript</p>
            <p className="text-app-desc">Hosting Google Firebase</p>
            <div className="form-login">
              { this.renderInput(this.state.form, 'username') }
              { this.renderInput(this.state.form, 'password') }
              <div className="form-group">
                <Button className="button button-primary" activeClassName="button-active" onClick={() => this.onSubmit()} disabled={this.state.handleSubmit || this.state.form.hasError}>Login</Button>
              </div>
              <div className="form-group">
                <Button className="button button-register" onClick={() => this.props.history.push('/register')} activeClassName="button-active" disabled={this.state.handleSubmit}>Register</Button>
              </div>
            </div>
          </Flex>
        </div>
        {
          <Modal
            visible={this.state.handleSubmit}
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

export default Login;
