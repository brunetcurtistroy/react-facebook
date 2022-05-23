import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Table, Checkbox, Input, InputNumber } from "antd";

class WS0933003_RequiredPrecisionExaminerVariousMasterSetting extends React.Component {
  static propTypes = {
    Li_Division: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '要精検者各種ﾏｽﾀ設定';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {}
    };
  }

  render() {
    return (
      <div className="required-precision-examiner-various-master-setting">
        <Card title="要精検者各種ﾏｽﾀ設定">
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
            rowClassName={(record, index) => record.id === this.state.rowSelect.id ? 'hightlight-row-selected' : ''}
            onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
          >
            <Table.Column title="ｺｰﾄﾞ" dataIndex="code" render={(value, record) => (
              <InputNumber
                value={value === 0 ? null : value}
                maxLength={record.Expression_6}
                readOnly={record.Expression_5}
              />
            )} />
            <Table.Column title="診療科" dataIndex="content" render={(value, record) => (
              <Input
                value={value}
                maxLength={256}
              />
            )} />
            <Table.Column title="" dataIndex="enabled_disabled" render={(value, record) => (
              <Checkbox checked={value} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0933003_RequiredPrecisionExaminerVariousMasterSetting);
