import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Button, Row, Col, Form, Input } from "antd";

class WS0560001_GlobalEventRegisterCorrect extends React.Component {
  static propTypes = {
    Li_Date: PropTypes.any,
    Lo_StsModify: PropTypes.bool,

    onClickedSelect: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'グローバルイベント登録修正';

    this.state = {
      selectedRows: [],
      dataSource: [
        {
          key: '1',
          DateWithDayOfWeek: 10,
          title: '10',
          editing: false
        },
        {
          key: '2',
          DateWithDayOfWeek: 15,
          title: '10',
          editing: false
        },
      ]
    };
  }

  onDelete() {

  }

  render() {
    return (
      <div className="global-event-register-correct">
        <Card title="グローバルイベント登録修正">
          <Table
            dataSource={this.state.dataSource}
            loading={false}
            pagination={false}
            rowKey="key"
            bordered={true}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRows: ', selectedRows);
                this.setState({
                  selectedRows: selectedRows
                })
              }
            }}
          >
            <Table.Column title="日　付" dataIndex="DateWithDayOfWeek" />
            <Table.Column title="イベント" dataIndex="title" />

          </Table>
          <br></br>
          <Row gutter={24} style={{ float: "right" }}>
            <Col span={8}>
              <Button type="primary" style={{ float: "right" }} onClick={() => this.onDelete()} >削除</Button>
            </Col>
            <Col span={8}>
              <Button type="primary" style={{ float: "right" }}
                onClick={() => {
                  if (this.props.onClickedSelect) {
                    this.props.onClickedSelect({
                      Lo_StsModify: true,
                    });
                  }
                }}
              >挿入</Button>
            </Col>
            <Col span={8}>
              <Button type="primary" style={{ float: "right" }}>検索</Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0560001_GlobalEventRegisterCorrect);
