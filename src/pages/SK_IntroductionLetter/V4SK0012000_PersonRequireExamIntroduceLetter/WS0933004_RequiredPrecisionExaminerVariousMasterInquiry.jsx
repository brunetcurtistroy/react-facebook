import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Table, InputNumber, Space, Button } from "antd";

class WS0933004_RequiredPrecisionExaminerVariousMasterInquiry extends React.Component {
  static propTypes = {
    Li_Division: PropTypes.any,
    Lo_Code: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = '要精検者各種ﾏｽﾀ照会';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      Expression_3: ''
    };
  }

  eventF11 = () => { }

  render() {
    return (
      <div className="required-precision-examiner-various-master-inquiry">
        <Card title="要精検者各種ﾏｽﾀ照会">
          <Table
            bordered
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={{
              ...this.state.pagination,
              hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
            }}
            rowKey={(record) => record.id}
            onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
          >
            <Table.Column title="ｺｰﾄﾞ" dataIndex="code" render={(value, record) => (
              <InputNumber
                value={value === 0 ? null : value}
                maxLength={10}
                readOnly={record.Expression_5}
              />
            )} />
            <Table.Column title={'診療科' || this.state.Expression_3} dataIndex="content" />
            <Table.Column render={(text, record) => (
              <Space>
                <Button type='primary' onClick={this.eventF11}>設定</Button>
                <Button type='primary' onClick={() => {
                  if (this.props.onFinishScreen)
                    this.props.onFinishScreen({
                      Lo_Code: record.code,
                      recordData: record,
                    })
                }}>選択</Button>
              </Space>
            )} />
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0933004_RequiredPrecisionExaminerVariousMasterInquiry);
