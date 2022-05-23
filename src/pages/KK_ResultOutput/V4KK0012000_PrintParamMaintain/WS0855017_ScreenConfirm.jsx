import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input } from "antd";
import ScreenConfirmAction from "redux/ResultOutput/PrintParamMaintain/ScreenConfirm.action"
import Color from "constants/Color";

class WS0855017_ScreenConfirm extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '画面確認';

    this.state = {
      parramIndex: {
        Li_StyleCode: "",
        Li_StsListFormat: ""
      },
      pagination: {
        defaultPageSize: 13,
        size: 'small',
        showQuickJumper: true
      },
    };
  }

  componentDidMount() {
    this.state.parramIndex.Li_StyleCode = this.props.Li_StyleCode
    this.state.parramIndex.Li_StsListFormat = this.props.Li_StsListFormat
    this.getScreenData(true)
  }
  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.state.parramIndex.Li_StyleCode = this.props.Li_StyleCode
      this.state.parramIndex.Li_StsListFormat = this.props.Li_StsListFormat
      this.getScreenData(true);
    }
  }

  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    ScreenConfirmAction.getScreenData(this.state.parramIndex)
      .then((res) => {
        let data = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: data,
          isLoadingTable: false,
          rowSelected: data.length > 0 ? [data[index]] : [],
          selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          indexTable: index,
        })
      })
      .finally()
  }
  render() {
    return (
      <div className="screen-confirm">
        <Card title="画面確認">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <div style={{ display: 'none' }}>
              <Form.Item name="Target"><Input /></Form.Item>
            </div>
            <Table
              size='small'
              dataSource={this.state.dataSource}
              loading={false}
              pagination={this.state.pagination}
              bordered={true}
              scroll={{ x: 500, y: 600 }}
              rowKey={(record) => record.id}
            >
              <Table.Column title="行番号" width={80}
                render={(value, record, index) => {
                  return (
                    <div style={{ color: Color(record.Expression_2)?.Foreground, textAlign: 'right' }}>{record.W1_line_num}</div>
                  )
                }} />
              <Table.Column title="内容"
                render={(value, record, index) => {
                  return (
                    <div style={{ color: Color(record.Expression_2)?.Foreground }}>{record.Expression_3} </div>
                  )
                }} />
              <Table.Column title="重複" width={50} align='center'
                render={(value, record, index) => {
                  return (
                    <span style={{ color: Color(record.Expression_2)?.Foreground }}>{record.Target}</span>
                  )
                }} />
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0855017_ScreenConfirm);
