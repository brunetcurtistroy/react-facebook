import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Select, Table, Row, Col, Space, DatePicker, Modal, Button } from "antd";
import WS0887001_IntroduceLetterVariousMasterInquiry from 'pages/SK_IntroductionLetter/V4SK0009000_AskIssued/WS0887001_IntroduceLetterVariousMasterInquiry.jsx';
import IntroduceLetterReturnInfoInputService from "services/IntroductionLetter/IntroduceLetterReturnInfoInput/IntroduceLetterReturnInfoInputService";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const defaultData = {
  "Sub": [
    {
      "id": 1,
      "seq": 10,
      "course_level": 1,
      "reservation_number": 1,
      "department": 1,
      "exam_code": 1,
      "exam_content": "血液検査",
      "findings_code": 1068,
      "findings_content": "1度AVブロック",
      "sick_name_code": 2057,
      "sick_name": "圧排所見",
      "treatment_code": 30,
      "treatment_content": "経過観察（１Ｍ）"
    }
  ],
  "ExamDateChar": "2020/04/06",
  "Lio_LandOldCoerciveGroupClassif": "200",
  "category_name": "胃　生  検",
  "Lio_MedicalInstitutionCode": "1",
  "medical_institutions_short_name": "長崎百合野病院",
  "Lio_LandOldCoercivePreciseResul": "血液検査",
  "Lio_Other": "血液検査"
}
class WS2804013_ReturnInfoInput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '返送情報入力';

    this.state = {
      isLoading: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      count: 1
    };
  }
  componentDidMount() {
    const {
      Lio_LandOldCoerciveGroupClassif,
      category_name,
      Lio_MedicalInstitutionCode,
      medical_institutions_short_name,
      Lio_LandOldCoercivePreciseResul,
      Lio_Other
    } = defaultData;
    this.formRef.current?.setFieldsValue({
      // tableData: []
      ExamDateChar: moment(defaultData.ExamDateChar, dateFormat),
      Lio_LandOldCoerciveGroupClassif,
      category_name,
      Lio_MedicalInstitutionCode,
      medical_institutions_short_name,
      Lio_LandOldCoercivePreciseResul,
      Lio_Other,
      tableData: defaultData.Sub
    })
  }

  // callApiReturnInfoInput = (params) => {
  //   this.setState({
  //     isLoading: true,
  //   })
  //   IntroduceLetterReturnInfoInputService.fetchReturnInfoInputService(params)
  //     .then()
  //     .catch()
  //     .finally(() => {
  //       this.setState({
  //         isLoading: false,
  //       })
  //     })
  // }

  onFinish(values) {

  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  setDataSend(condition) {
    if (condition === "exam_code") {
      return 2
    } else if (condition === "findings_code") {
      return 8
    } else if (condition === "sick_name_code") {
      return 5
    } else if (condition === "treatment_code") {
      return 3
    } else {
      return 4
    }
  }
  setDataOutput(condition, output) {
    if (condition === "exam_code") {
      this.formRef.current?.setFieldsValue({
        exam_code: output?.Lo_VariousCodes,
        exam_content: output?.recordData?.exam_content
      })
    } else if (condition === "findings_code") {
      this.formRef.current?.setFieldsValue({
        findings_code: output?.Lo_VariousCodes,
        findings_content: output?.recordData?.findings_content
      })
    } else if (condition === "sick_name_code") {
      this.formRef.current?.setFieldsValue({
        sick_name_code: output?.Lo_VariousCodes,
        sick_name: output?.recordData?.sick_name
      })
    } else if (condition === "treatment_code") {
      this.formRef.current?.setFieldsValue({
        treatment_code: output?.Lo_VariousCodes,
        treatment_content: output?.recordData?.treatment_content
      })
    } else {
      this.formRef.current?.setFieldsValue({
        Lio_MedicalInstitutionCode: output?.Lo_VariousCodes,
        medical_institutions_short_name: output?.recordData?.medical_institutions_short_name
      })
    }
  }

  showIntroduceLetterVariousMasterInquiry(condition = null) {
    const value = this.setDataSend(condition)
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '80%',
        component: (
          <WS0887001_IntroduceLetterVariousMasterInquiry
            Li_ManageCode={value}
            onFinishScreen={(output) => {
              this.setDataOutput(condition, output)
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  handleAddNew() {
    console.log('add new');
    const { count } = this.state;
    const newData = { id: count, exam_code: "", exam_content: "", findings_code: "", findings_content: "", sick_name_code: "", sick_name: "", treatment_code: "", treatment_content: "" }
    let data = [...this.formRef.current?.getFieldValue("tableData")];
    data.push(newData)
    this.formRef.current?.setFieldsValue({
      tableData: data,
    });
    this.forceUpdate()
    this.setState({
      ...this.state,
      count: count + 1,
    })
    console.log(data);
  }
  save(record) {
    console.log(record);
  }
  Delete(record) {
    console.log(record)
    if (isNaN(record.id)) {
      let arr = [...this.formRef.current?.getFieldValue("tableData")];
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
      //delete DB 

    }
  }
  render() {
    return (
      <div className="return-info-input">

        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          <Card title="返送情報入力" className="mb-2">
            <Row>
              <Col span={5}>
                <Form.Item label="&emsp;検査日" name="ExamDateChar">
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={dateFormat} />
                </Form.Item>
              </Col>
              <Col span={10} offset={4} >
                <Space>
                  <Form.Item label="地域保健" name="Lio_LandOldCoerciveGroupClassif">
                    <Input maxLength={5} />
                  </Form.Item>
                  <Form.Item  >
                    <span>{this.formRef.current?.getFieldValue("category_name")}</span>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Space>
                  <Form.Item label="医療機関" name="Lio_MedicalInstitutionCode">
                    <Input.Search onSearch={() => this.showIntroduceLetterVariousMasterInquiry()} />
                  </Form.Item>
                  <Form.Item  >
                    <span>{this.formRef.current?.getFieldValue("medical_institutions_short_name")}</span>
                  </Form.Item>
                </Space>
              </Col>
              <Col span={8} offset={1} >
                <Form.Item label="精密結果" name="Lio_LandOldCoercivePreciseResul" >
                  <Select >
                    <Select.Option ></Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={17}>
                <Form.Item name="Lio_Other" label="&emsp;その他">
                  <Input maxLength={80} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Table
            dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
            size="small" bordered={true} pagination={false} rowKey={(record => record.id)}
            loading={this.state.isLoading}
          >
            <Table.Column title="連番" width="65px" render={(value, record, index) => {
              return <Form.Item name={['tableData', index, 'seq']} style={{ marginBottom: '0px' }} >
                <Input type="number" maxLength={3} />
              </Form.Item>
            }} />
            <Table.Column title="検査" dataIndex="" render={(value, record, index) => {
              return <Row>
                <Col span={8}>
                  <Form.Item name={['tableData', index, 'exam_code']} style={{ marginBottom: '0px' }} >
                    <Input.Search type="number" maxLength={4} style={{ textAlign: 'right' }} onSearch={() => this.showIntroduceLetterVariousMasterInquiry("exam_code")} />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item name={['tableData', index, 'exam_content']} style={{ marginBottom: '0px' }} >
                    <Input.Search maxLength={20} onSearch={() => this.showIntroduceLetterVariousMasterInquiry("exam_code")} />
                  </Form.Item>
                </Col>
              </Row>
            }} />
            <Table.Column title="所見" dataIndex="" render={(value, record, index) => {
              return <Row>
                <Col span={8}>
                  <Form.Item name={['tableData', index, 'findings_code']} style={{ marginBottom: '0px' }} >
                    <Input.Search type="number" maxLength={4} onSearch={() => this.showIntroduceLetterVariousMasterInquiry("findings_code")} />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item name={['tableData', index, 'findings_content']} style={{ marginBottom: '0px' }} >
                    <Input.Search maxLength={30} onSearch={() => this.showIntroduceLetterVariousMasterInquiry("findings_code")} />
                  </Form.Item>
                </Col>
              </Row>
            }} />
            <Table.Column title="傷病" dataIndex="" render={(value, record, index) => {
              return <Row>
                <Col span={8}>
                  <Form.Item name={['tableData', index, 'sick_name_code']} style={{ marginBottom: '0px' }} >
                    <Input.Search type="number" maxLength={4} onSearch={() => this.showIntroduceLetterVariousMasterInquiry("sick_name_code")} />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item name={['tableData', index, 'sick_name']} style={{ marginBottom: '0px' }} >
                    <Input.Search maxLength={20} onSearch={() => this.showIntroduceLetterVariousMasterInquiry("sick_name_code")} />
                  </Form.Item>
                </Col>
              </Row>
            }} />
            <Table.Column title="治療" dataIndex="" render={(value, record, index) => {
              return <Row>
                <Col span={8}>
                  <Form.Item name={['tableData', index, 'treatment_code']} style={{ marginBottom: '0px' }} >
                    <Input.Search type="number" maxLength={4} onSearch={() => this.showIntroduceLetterVariousMasterInquiry("treatment_code")} />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item name={['tableData', index, 'treatment_content']} style={{ marginBottom: '0px' }} >
                    <Input.Search maxLength={20} onSearch={() => this.showIntroduceLetterVariousMasterInquiry("treatment_code")} />
                  </Form.Item>
                </Col>
              </Row>
            }} />
            <Table.Column width={80} title={<Button size='small' type='primary' icon={<PlusOutlined />} align="center" style={{ textAlign: 'center' }} onClick={() => this.handleAddNew()}  ></Button>}
              render={(text, record, index) => {
                return <>
                  <Button size='small' style={{ border: 'none' }} icon={<SaveOutlined style={{ color: 'green' }} />}
                    onClick={() => this.save(record)}
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
        <ModalDraggable
                  destroyOnClose={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2804013_ReturnInfoInput);
