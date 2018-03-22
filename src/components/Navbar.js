import React, { Component } from 'react';
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

export class DrawerButton extends Component {
  render () {
    return (
      <div className="navbar-items">
        <Icon size="md" type="ellipsis" />
      </div>
    );
  }
}

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
