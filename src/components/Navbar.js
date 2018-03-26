import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export class BackButton extends Component {
  render () {
    return (
      <div className="navbar-items" onClick={() => this.props.history.goBack()}>
        <Icon size="lg" type="left" />
      </div>
    );
  }
}

class DrawerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }

    this.onOpenChange = this.onOpenChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  }

  handleClickOutside = (e) => {
    if (!ReactDOM.findDOMNode(this).contains(e.target) && this.state.open) {
      this.onOpenChange();
    }
  }

  onClickMenu(path, params = {}) {
    const { history } = this.props;

    this.setState({
      open: false
    }, () => {
      history.push(path, params);
    })
  }

  render () {
    return (
      <div className="navbar-items">
        <Icon onClick={this.onOpenChange} size="md" type="ellipsis" />
        <div className={`drawer ${this.state.open ? 'open' : 'close'}`}>
          <div className="drawer-container">
            <ul className="menu">
              <li className="menu-items" onClick={() => this.onClickMenu('/')}>Home</li>
              <li className="menu-items" onClick={() => this.props.onLogout()}>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch({ type: 'LOGOUT' })
  }
}

DrawerButton = withRouter(connect(mapStateToProps, mapDispatchToProps)(DrawerButton));

export {
  DrawerButton
};

class Navbar extends Component {
  render () {
    const {
      leftComponent,
      centerComponent,
      rightComponent,
      containerStyle
    } = this.props;

    return (
      <NavBar
        style={containerStyle}
        className="navbar-container"
        icon={leftComponent}
        rightContent={[
          rightComponent
        ]}
      >{centerComponent}</NavBar>
    );
  }
}

export default Navbar;
