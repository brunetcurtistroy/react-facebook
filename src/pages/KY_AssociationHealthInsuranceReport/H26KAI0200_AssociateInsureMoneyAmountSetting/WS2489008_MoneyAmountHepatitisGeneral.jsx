import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Input, Table, Form, InputNumber, Button, message } from "antd";
import { SaveOutlined } from '@ant-design/icons';

import MoneyAmountHepatitisGeneralAction from "redux/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/MoneyAmountHepatitisGeneral.action";

class WS2489008_MoneyAmountHepatitisGeneral extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_Format: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // document.title = '金額肝炎一般';

    this.state = {
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: [],
      isLoadingTable: true,
      indexTable: null,
    };
  }

  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  }

  getScreenData() {
    let param = {
      formatOp: this.props.Li_Format
    }

    this.setState({ isLoadingTable: true })
    MoneyAmountHepatitisGeneralAction.getScreenData(param)
      .then((res) => {
        this.setState({
          dataSource: res,
          isLoadingTable: false,
          selectedRows: [],
          selectedRowKeys: [],
          indexTable: null,
        })

        this.formRef.current?.setFieldsValue({
          dataTable: res
        })
      })
      .finally(() => {
        this.setState({ isLoadingTable: false })
      })
  }

  forcusData(index) {
    let data = [...this.state.dataSource];
    this.setState({
      selectedRows: [data[index]],
      indexTable: index
    })
  }

  updateDatasource(index, field, value, record) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });

    this.formRef.current.setFieldsValue({
      dataTable: data
    });
  }

  onSaveData(index) {
    let param = {
      ...this.state.dataSource[index]
    }

    MoneyAmountHepatitisGeneralAction.updateRecord(param)
      .then(res => {
        message.success(res?.data?.message);
        this.getScreenData()
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  onFinish(values) { }

  render() {
    return (
      <div className="money-amount-hepatitis-general">
        <Card title="金額肝炎一般">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <Table
              loading={this.state.isLoadingTable}
              dataSource={this.state.dataSource}
              pagination={false}
              rowKey={record => record.id}
              scroll={{ y: 750 }}
            >
              <Table.Column title="SEQ" dataIndex="seq"
                render={(value, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "seq"]} style={{ marginBottom: 0 }}>
                      <Input readOnly style={{ border: 'none', background: 'transparent' }} />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="備　考" dataIndex="remarks"
                render={(value, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "remarks"]} style={{ marginBottom: 0 }}>
                      <Input readOnly style={{ border: 'none', background: 'transparent' }} />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="設定" dataIndex="set_pattern"
                render={(value, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "set_pattern"]} style={{ marginBottom: 0 }}>
                      <Input readOnly style={{ border: 'none', background: 'transparent' }} />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="契約単価" dataIndex="ContractUnitPrice"
                render={(value, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "ContractUnitPrice"]} style={{ marginBottom: 0 }}>
                      <InputNumber maxLength={6} min={0}
                        formatter={value => `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        onFocus={() => {
                          this.forcusData(index);
                        }}
                        onChange={(value) => {
                          this.updateDatasource(index, "ContractUnitPrice", value, record)
                        }}
                      />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column title="負担率" dataIndex="SelfBurdenRate"
                render={(value, record, index) => {
                  return (
                    <Form.Item name={["dataTable", index, "SelfBurdenRate"]} style={{ marginBottom: 0 }}>
                      <InputNumber min={0} max={9.99} maxLength={4} step="0.01"
                        onFocus={() => {
                          this.forcusData(index);
                        }}
                        onChange={(value) => this.updateDatasource(index, "SelfBurdenRate", value)}
                      />
                    </Form.Item>
                  )
                }}
              />
              <Table.Column width={70} fixed={'right'}
                render={(text, record, index) => {
                  return <div style={{ textAlign: "center" }}>
                    <Button
                      hidden={index !== this.state.indexTable}
                      onClick={() => { this.onSaveData(index) }}
                      style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                      icon={<SaveOutlined />} >
                    </Button>
                  </div>
                }}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2489008_MoneyAmountHepatitisGeneral);
