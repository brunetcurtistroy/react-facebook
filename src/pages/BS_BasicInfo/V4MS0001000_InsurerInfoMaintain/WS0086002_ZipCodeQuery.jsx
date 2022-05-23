import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Button, } from "antd";


/**
 * ZipCodeQuery [郵便番号照会]
 * 
 * props {object}:
 * - onClickedSelect {function}: callback of parent screen
 */
class WS0086002_ZipCodeQuery extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '郵便番号照会';

    this.state = {
      zipcodeData: [],
      isLoadingZipcodeData: false,
    };
  }

  componentDidMount() {
    this.loadZipCodeList();
  }

  loadZipCodeList() {
    this.setState({
      isLoadingZipcodeData: true,
    });
  }

  render() {
    return (
      <div className="zip-code-query">
        <Card title="郵便番号照会">
          <Table
            dataSource={this.state.zipcodeData}
            loading={this.state.isLoadingZipcodeData}
            pagination={{
              defaultCurrent: 1,
              total: 1,
              pageSize: 1,
              showSizeChanger: true,
              onChange: (page, pageSize) => {},
              onShowSizeChange: (page, pageSize) => {},
            }}
            rowKey={(record) => record.id}
          >
            <Table.Column title="郵便番号" dataIndex="" key="" />
            <Table.Column title="住　所" dataIndex="" key="" />

          </Table>
          <Form.Item>
            <Button type="primary" htmlType="button"
              onClick={() => {
                console.log(this.props);
                if (this.props.onClickedSelect) {
                  const outputData = {
                    zipcode: "",
                    address1: "",
                    address2: "",
                  };
                  this.props.onClickedSelect(outputData);
                }
              }}
            >確認</Button>
          </Form.Item>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0086002_ZipCodeQuery);
