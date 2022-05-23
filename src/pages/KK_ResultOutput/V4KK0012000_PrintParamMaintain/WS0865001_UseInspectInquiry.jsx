import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, InputNumber, Checkbox, Table, Space, Row, Col, Input } from "antd";

import UseInspectInquiryAction from "redux/ResultOutput/PrintParamMaintain/UseInspectInquiry.action";
import Color from "constants/Color";

class WS0865001_UseInspectInquiry extends React.Component {
  static propTypes = {
    Li_SearchKey: PropTypes.string,
    Li_AllInspected: PropTypes.any,
    Li_InspectCode: PropTypes.number,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'V4-V2MS0420:使用検査照会';

    this.state = {
      parramScreenData: {
        AllInspected: 0,
        SearchKey: "",
      },
      parramMaintain: {
        Li_InspectCode: ""
      },
      dataSource: [],
      dataSourceMaintain: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
    };
  }
  componentDidMount() {
    this.getScreenData(true);
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.getScreenData(true);
    }
  }

  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    UseInspectInquiryAction.getScreenData(this.state.parramScreenData)
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
        if (data.length > 0) {
          this.state.parramMaintain.Li_InspectCode = data[index].test_item_code
          this.getScreenDataMaintain(true)
        } else {
          this.state.dataSourceMaintain = []
        }
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  getScreenDataMaintain(reload) {
    this.setState({ isLoadingTable: true })
    UseInspectInquiryAction.getMaintain(this.state.parramMaintain)
      .then((res) => {
        let data = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSourceMaintain: data,
          // isLoadingTable: false,
          // rowSelected: data.length > 0 ? [data[index]] : [],
          // selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          // indexTable: index,
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }
  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  // check selected record while add new
  changeRow(index) {
    let data = [...this.state.dataSource];

    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })
    if (idTemp) {
      this.setState({
        rowSelected: [data[0]],
        selectedRowKeys: [data[0].id],
        indexTable: 0
      });
    } else {
      this.setState({
        indexTable: index
      });
    }
  }

  updateDatasource(field, value) {
    this.state.parramScreenData[field] = value

  }

  CheckAllInspected(event) {
    event ? this.state.parramScreenData.AllInspected = 1 : this.state.parramScreenData.AllInspected = 0
    this.getScreenData(true)
  }

  render() {
    return (
      <div className="use-inspect-inquiry p-td">

        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          <Card title="V4-V2MS0420:使用検査照会" className="mb-2">
            <Row>
              <Col span={8}>
                <Form.Item name="SearchKey" label="検索キー" >
                  <Input onChange={(e) => {
                    this.updateDatasource("SearchKey", e.target.value)
                  }}
                    onBlur={(e) => { this.getScreenData(true) }}
                  />
                </Form.Item>
              </Col>
              <Col span={16} >
                <Space style={{ marginLeft: '1em' }}>
                  <Form.Item name="AllInspected" valuePropName="checked" style={{ marginBottom: '0px' }} >
                    <Checkbox onChange={(event) => this.CheckAllInspected(event.target.checked)}>全検査対象</Checkbox>
                  </Form.Item>
                  <Form.Item style={{ marginBottom: '0px' }} >
                    <span style={{ color: 'red' }}>※赤色は未使用の検査です。</span>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          </Card>
          <Row>
            <Col span={12}>
              <Table
                style={{ width: '98%' }}
                dataSource={this.state.dataSource}
                loading={this.state.isLoadingTable}
                pagination={false}
                rowKey={(record) => record.id}
                scroll={{ x: 500, y: 400 }}
                bordered
                rowSelection={{
                  type: "radio",
                  selectedRowKeys: this.state.selectedRowKeys,
                  onSelect: (record, selected, selectedRows) => {
                    let index = this.state.dataSource.findIndex(x => x.id === record.id)
                    this.setState({
                      rowSelected: selectedRows,
                      selectedRowKeys: selectedRows.map(x => x.id),
                      indexTable: index
                    });
                    this.changeRow(index)
                    this.state.parramMaintain.Li_InspectCode = this.state.dataSource[index].test_item_code
                    this.getScreenDataMaintain(true)
                  },
                }}
              >
                <Table.Column title="検査ｺｰﾄﾞ"
                  render={(text, record, index) => (
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: Color(record.Expression_3)?.Foreground }}>{record.test_item_code}</span>
                    </div>

                  )} />
                <Table.Column title="検査略名" dataIndex="exam_short_name"
                  render={(text, record, index) => (
                    <span style={{ color: Color(record.Expression_3)?.Foreground }}>{record.exam_short_name}</span>
                  )} />
                <Table.Column title="検査名称" dataIndex="exam_name"
                  render={(text, record, index) => (
                    <span style={{ color: Color(record.Expression_3)?.Foreground }}>{record.exam_name}</span>
                  )} />
                <Table.Column title="外部ｺｰﾄﾞ" dataIndex="item_code_external"
                  render={(text, record, index) => (
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: Color(record.Expression_3)?.Foreground }}>{record.item_code_external}</span>
                    </div>
                  )} />
                <Table.Column title="ﾀｲﾌﾟ" dataIndex="exam_type"
                  render={(text, record, index) => (
                    <span style={{ color: Color(record.Expression_3)?.Foreground }}>{record.exam_type}</span>
                  )} />
              </Table>
            </Col>
            <Col span={12}>
              <Table
                style={{ width: '98%' }}
                dataSource={this.state.dataSourceMaintain}
                loading={this.state.isLoadingTable}
                pagination={false}
                rowKey={(record) => record.id}
                scroll={{ x: 500, y: 400 }}
                bordered
              >
                <Table.Column title="ﾊﾟﾀｰﾝCD" dataIndex="pattern_code" width={150} />
                <Table.Column title="パターン名" dataIndex="pattern_name" />
                <Table.Column title="ｶﾃｺﾞﾘ" width={100}
                  render={(text, record, index) => (
                    <div style={{ textAlign: 'right' }}>
                      <span>{record.category_code}</span>
                    </div>

                  )} />
                <Table.Column title="カテゴリー名称" dataIndex="category_name" />
              </Table>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0865001_UseInspectInquiry);
