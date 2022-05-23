import React from "react";
import { Button, Space, Dropdown, Menu } from "antd";

const styleButton = {
    color: '#000000'
}

class Menubar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <Space>
                <Button type='text' style={styleButton} hidden={true}>編集</Button>
                <Dropdown
                    trigger='click'
                    overlay={() => (
                        <Menu>
                            <Menu.Item style={styleButton} onClick={this.props?.OptionsDisplay}>オプション情報</Menu.Item>
                            <Menu.Item style={styleButton}>ユーザー定義</Menu.Item>
                            {this.props.menus?.map(menu => (
                                <Menu.Item key={'MenuItem_' + menu.id} style={styleButton} onClick={menu.handleClick}>{menu.label}</Menu.Item>
                            ))}
                        </Menu>
                    )}
                >
                    <Button type='text' style={styleButton}>設定</Button>
                </Dropdown>
                <Button type='text' style={styleButton}>ﾍﾙﾌﾟ</Button>
                <Button type='text' style={{ padding: 0 }} hidden={!(this.props.items?.length > 0)}>|</Button>
                {this.props.items?.map(item => (
                    <Button key={'Button_' + item.id} disabled={item.disabled || false} type='text' style={styleButton} onClick={item.handleClick}>{item.label}</Button>
                ))}
            </Space>
        )
    }
}

export default Menubar;