import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Flex } from 'antd-mobile';
import { Navbar, DrawerButton } from './../../components';

class Home extends Component {
  render () {
    return (
      <div className="app-container">
        <Navbar leftComponent={<DrawerButton />} />
        <div className="content-container">
          <Flex direction="column" className="getstart-container">
            <h1 className="text-app-name">PWA React</h1>
            {
              <div className="logo-container">
                <img className="img-responsive" alt="img-logo" src={require('./../../assets/img/react-icon.png')} />
              </div>
            }
            <p className="text-app-desc">Progressive Web Application</p>
            <p className="text-app-desc">with React & Redux</p>
            <p className="text-app-desc">Hosting Google Firebase</p>
          </Flex>
          <div className="container">
            <p className="text-topic text-center">Getting Started</p>
            <div className="row">
              <p className="text-header">1. Cloning the repository: <span className="text-span">The command below will create a folder "pwapp-react" relative to your current directory</span></p>
              <pre className="language-bash">
                <code>git clone https://github.com/ss5530211037/pwapp-react.git</code>
              </pre>
            </div>
            <div className="row">
              <p className="text-header">2. Moving to the folder "pwapp-react" & installing package:</p>
              <pre className="language-bash">
                <code>cd pwapp-react && npm install</code>
              </pre>
            </div>
            <div className="row">
              <p className="text-header">3. Run the project:</p>
              <pre className="language-bash">
                <code>npm start</code>
              </pre>
            </div>
            <div className="row">
              <p>Visit
                <a className="entrance" href="http://localhost:3001" rel="see more">http://localhost:3001</a>
                to see the boilerplate in action!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default withRouter(connect(mapStateToProps)(Home));
