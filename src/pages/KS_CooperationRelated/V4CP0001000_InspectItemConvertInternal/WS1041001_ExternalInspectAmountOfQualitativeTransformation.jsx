import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import { Card, Form, DatePicker, Table, message, Button, Modal, Input, Select } from "antd";
import ExternalInspectAmountOfQualitativeTransformationAction from 'redux/CooperationRelated/InspectItemConvertInternal/ExternalInspectAmountOfQualitativeTransformation.actions'
import moment from "moment";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1041001_ExternalInspectAmountOfQualitativeTransformation extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    // document.title = 'V4-V2MS0330:外部検定量定性変換';
    this.state = {
      isLoadding: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      count: "a",
    };
  }
  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      tableData: []
    })
    this.GetScreenData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.GetScreenData();
    }
  }

  GetScreenData() {
    this.setState({ isLoadding: true });
    ExternalInspectAmountOfQualitativeTransformationAction.GetScreenData({
      DateAdoption: this.isEmpty(this.formRef.current?.getFieldValue("DateAdoption")) ? "" : this.formRef.current?.getFieldValue("DateAdoption").format("YYYY-MM-DD")
    }).then(res => {
      if (res?.length > 0) {
        let arr = []
        for (const value of res) {
          value.date_of_adoption_on = moment(value.date_of_adoption_on).isValid() ? moment(value.date_of_adoption_on) : ""
          arr.push(value)
        }
          this.formRef.current?.setFieldsValue({
            tableData: arr
          })
      } 
      this.forceUpdate();
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isLoadding: false }))

  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  AddNewData() {
    const { count } = this.state;
    const newData = {
      id: count, date_of_adoption_on: "", external_exam_code: "", quantitative_numerical_quantitative_range_check: "0.0000", sex: 1,
      lower_limit_value_qualitative_and_quantitativeL: "", upper_limit_quantitative_only: "", conversion_result: "", enabled_disabled: "", option_remark: ""
    };
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.length > 0 ? data.unshift(newData) : data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1,
    })
  }
  Save(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    for (const value of arr) {
      if (value.id === record.id) {
        if (isNaN(value.id)) {
          let obj = {
            id: "",
            date_of_adoption_on: this.isEmpty(value.date_of_adoption_on) ? "0000/00/00" : value.date_of_adoption_on.format("YYYY-MM-DD"),
            external_exam_code: value.external_exam_code,
            sex: value.sex,
            quantitative_numerical_quantitative_range_check: value.quantitative_numerical_quantitative_range_check,
            lower_limit_value_qualitative_and_quantitative: value.lower_limit_value_qualitative_and_quantitative,
            upper_limit_quantitative_only: value.upper_limit_quantitative_only,
            conversion_result: value.conversion_result,
            option_remark: value.option_remark,
            enabled_disabled: value.enabled_disabled,
          }
          this.SaveData(obj)
          return;
        } else {
          this.SaveData(value);
          return;
        }
      }
    }
  }
  SaveData(record) {
    this.setState({ isLoadding: true });
    ExternalInspectAmountOfQualitativeTransformationAction.SaveData(record).then(res => {
      this.GetScreenData()
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isLoadding: false }))
  }
  Delete(record) {
    let arr = [...this.formRef.current?.getFieldValue("tableData")];
    if (isNaN(record.id)) {
      arr.map((value, index) => {
        if (value.id === record.id) {
          arr.splice(index, 1)
          this.formRef.current?.setFieldsValue({
            tableData: arr
          })
          this.forceUpdate()
        }
      })
    } else { 
      ExternalInspectAmountOfQualitativeTransformationAction.DeleteData({ id: record.id }).then(res => {
        this.GetScreenData()
      })
    }
  }
  render() {
    return (
      <div className="external-inspect-amount-of-qualitative-transformation">
        <Card title="V4-V2MS0330:外部検定量定性変換">
          <Form
            ref={this.formRef} initialValues={{ DateAdoption: moment() }}
            autoComplete="off"
          >
            <Form.Item name="DateAdoption" label="採用日" >
              <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" onChange={()=>this.GetScreenData()} />
            </Form.Item>
            <Table dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
              loading={this.state.isLoadding}
              pagination={false} bordered={true} size="small"
              rowKey={(record) => record.id}  >
              <Table.Column title="採用日" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'date_of_adoption_on']} style={{ marginBottom: '0px' }}>
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
                </Form.Item>
              }} />
              <Table.Column title="外部検査コード" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'external_exam_code']} style={{ marginBottom: '0px' }}>
                  <Input maxLength={16} />
                </Form.Item>
              }} />
              <Table.Column title="性別" dataIndex="sex" width={90} render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'sex']} style={{ marginBottom: '0px' }}>
                  <Select >
                    <Select.Option value={1}>1:男</Select.Option>
                    <Select.Option value={2}>2:女</Select.Option>
                  </Select>
                </Form.Item>
              }} />
              <Table.Column title="定量数値" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'quantitative_numerical_quantitative_range_check']} style={{ marginBottom: '0px' }}>
                  <Input maxLength={10} />
                </Form.Item>
              }} />
              <Table.Column title="下限[定性/定量]" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'lower_limit_value_qualitative_and_quantitative']} style={{ marginBottom: '0px' }}>
                  <Input maxLength={10} />
                </Form.Item>
              }} />
              <Table.Column title="上限[定量のみ]" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'upper_limit_quantitative_only']} style={{ marginBottom: '0px' }}>
                  <Input maxLength={10} />
                </Form.Item>
              }} />
              <Table.Column title="変換結果" width={90} render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'conversion_result']} style={{ marginBottom: '0px' }}>
                  <Input maxLength={10} />
                </Form.Item>
              }} />
              <Table.Column title="FLG" width={50} render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'enabled_disabled']} style={{ marginBottom: '0px' }}>
                  <Input maxLength={1} onChange={(e) => {
                    let val = e.target.value;
                    const namePath = ['tableData', index, 'enabled_disabled']
                    if (isNaN(val)) {
                      this.formRef.current?.setFields([{
                        name: namePath,
                        value: ""
                      }])
                    }
                  }} />
                </Form.Item>
              }} />
              <Table.Column title="オプション" render={(value, record, index) => {
                return <Form.Item name={['tableData', index, 'option_remark']} style={{ marginBottom: '0px' }}>
                  <Input maxLength={1024} />
                </Form.Item>
              }} />
              <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} onClick={() => this.AddNewData()}  ></Button>}
                render={(text, record, index) => {
                  return <>
                    <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                      onClick={() => this.Save(record)}
                    ></Button>
                    <Button size='small' style={{ border: 'none' }} danger icon={<DeleteOutlined />}
                      onClick={() => {
                        Modal.confirm({
                          content: '消去してもよろしいですか？',
                          okText: 'は　い',
                          cancelText: 'いいえ',
                          onOk: () => this.Delete(record)
                        })
                      }}
                    ></Button>
                  </>
                }}
              />
            </Table>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1041001_ExternalInspectAmountOfQualitativeTransformation);
