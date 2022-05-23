import React from "react";
import { connect } from "react-redux";

import { Menu, } from "antd";

/**
 * @prop addonSettingSubMenu
 * @prop addonRightMenu
 */
class NavigationMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mailList: [],
    };
  }

  render() {
    return (
      <Menu mode="horizontal">
        <Menu.SubMenu title="設定">
          {this.props.addonSettingSubMenu}
        </Menu.SubMenu>
        {this.props.addonRightMenu}
      </Menu>
    );
  }
}

const mapStateToProps = () => ({ });

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);
