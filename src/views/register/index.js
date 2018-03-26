import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Flex, InputItem, Button } from 'antd-mobile';
import { Navbar, BackButton } from './../../components';

class Register extends Component {
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
          },
          confirmPassword :{
            required: true,
            minLength: 6,
            equalTo: "password"
          }
        },
        fields: {
          username: {
            placeholder: 'Username',
            type: 'text',
            value: '',
          },
          password: {
            placeholder: 'Password',
            type: 'password',
            value: '',
          },
          confirmPassword: {
            placeholder: 'Confirm Password',
            type: 'password',
            value: '',
          }
        },
        errors: {},
        hasError: false
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
        this.setState({
          handleSubmit: false
        }, () => {
          let form = this.state.form;

          form.fields.username.value = '';
          form.fields.password.value = '';
          form.fields.confirmPassword.value = '';

          this.setState({ form });
        });
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


      if (!hasError && rule.equalTo) {
        if ((field.value === '' || field.value !== form.fields[rule.equalTo].value) && submit === true) {
          form.errors[fieldName] = `${fieldName} not match ${rule.equalTo}`;
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
        <Navbar
          leftComponent={<BackButton {...this.props} />}
        />
        <div className="content-container">
          <Flex direction="column" justify="center" className="intro-container">
            <h1 className="text-app-name">Register</h1>
            <p className="text-app-desc">PWA React using mobile ant design</p>
            <p className="text-app-desc">Please, Register to login user</p>
            <p className="text-app-desc">Getting started after login</p>
            <div className="form-login">
              { this.renderInput(this.state.form, 'username') }
              { this.renderInput(this.state.form, 'password') }
              { this.renderInput(this.state.form, 'confirmPassword') }
              <div className="form-group">
                <div className="form-control">
                  <Button className="button button-primary" activeClassName="button-active" onClick={() => this.onSubmit()} disabled={this.state.handleSubmit || this.state.form.hasError}>Register</Button>
                </div>
              </div>
            </div>
          </Flex>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Register);
