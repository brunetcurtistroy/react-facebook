import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, } from "antd";

class WS1523004_SearchScreen extends React.Component {
  static propTypes = {
    Lio_SearchChar: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検索画面';

    this.state = {
      Lio_SearchChar: ''
    };
  }
  
render() {
  return (
    <div className="search-screen">
      <Card title="検索画面">
        <Form ref={this.formRef} onFinish={this.onFinish} >
          <Form.Item name='Lio_SearchChar'>
            <Input onKeyPress={(e) => {
              if (e.code === "Enter") {
                this.props?.onFinishScreen(this.state.Lio_SearchChar)
              }
            }}
              onChange={e => this.setState({ Lio_SearchChar: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1523004_SearchScreen);
