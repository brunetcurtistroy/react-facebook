import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import PassingManageBatchExtractAction from 'redux/Others/PassingManageBatchExtract/PassingManageBatchExtract.action';
import WS2584019_PersonalInfoInquirySub from "pages/KS_CooperationRelated/V4CP0020000_InspectRequestMain/WS2584019_PersonalInfoInquirySub.jsx";
import { Form, Card, Col, Row, Table, Modal, Button, Space, DatePicker } from 'antd';

class WS3063001_PassingManageBatchExtract extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    document.title = '通過管理一括抽出';

    this.state = {
      tabNum: 1,

      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      //Selected
      selectedRowsLeftCoursesWhole: {},
      selectedRowsCourseList: {},
      selectedRowsLeftExamListWhole: {},
      selectedRowsExamListWork: {},

      //isLoadingTable
      isLoadingTable: false,

      dataSource: [],
      selectedKey: [],
      listSelectedId: [],
      stsSelectAll: false,
    };
  }

  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  componentDidMount() {
    this.getScreenData()
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
    }
  }
  getScreenData() {
    this.setState({ isLoadingTable: true })
    let param = {
      DateF: '',
      DateT: ''
    }
    PassingManageBatchExtractAction.getScreenData(param)
      .then((res) => {
        this.formRef.current?.setFieldsValue({
          DateFChar: moment(res.DateFChar),
        });
      }).finally(() => this.setState({ isLoadingTable: false }))
  }

  getExtractList() {
    let param = {
      DateF: this.formRef.current.getFieldValue('DateFChar')?._i,
      DateT: this.formRef.current.getFieldValue('DateTChar')?._i,
      StsSelectAll: this.state.stsSelectAll ? 1 : 0
    }
    console.log(param);
    PassingManageBatchExtractAction.getExtractList(param)
      .then((res) => {
        const dataRes = res ? res : []
        let checkarray = []
        dataRes.forEach((x) => {
          if (x.W1_logic_01) {
            checkarray.push(x.id)
          }
        });
        this.setState({
          dataSource: dataRes,
          selectedKey: checkarray
        })
        this.formRef.current?.setFieldsValue({ AllSelect: true })
      }).finally(() => this.setState({ isLoadingTable: false }))
  }


  getSearch() {
    this.setState({ isLoadingTable: true , stsSelectAll: true})
    let DateFChar = this.formRef.current.getFieldValue('DateFChar')?._i
    let DateTChar = this.formRef.current.getFieldValue('DateTChar')?._i
    let param = {
      DateF: DateFChar,
      DateT: DateTChar,
      StsSelectAll: 1
    }
    console.log(param)
    PassingManageBatchExtractAction.getDisplaySearch(param)
      .then((res) => {
        this.getExtractList();
      })
  }

  getBatchExtractBtn() {
    this.setState({ isLoadingTable: true })
    let DateFChar = this.formRef.current.getFieldValue('DateFChar')?._i
    let DateTChar = this.formRef.current.getFieldValue('DateTChar')?._i
    let param = {
      DateF: DateFChar,
      DateT: DateTChar ?? '',
      StsSelectAll: this.state.stsSelectAll ? 1 : 0,
      StsConfirm: 1,
      Li_SelectList: this.state.selectedKey ?? '',
    }
    console.log(param);
    PassingManageBatchExtractAction.getBatchExtractBtn(param)
      .then((res) => {
        this.getExtractList();
      })
  }

  changeDateF(event) {
    if (event === null) {
      this.formRef.current?.setFieldsValue({ DateFChar: null })
    } else {
      let date = event.format('YYYY/MM/DD')
      this.formRef.current?.setFieldsValue({ DateFChar: moment(date) })
    }
  }

  changeDateT(event) {
    if (event === null) {
      this.formRef.current?.setFieldsValue({ DateTChar: null })
    } else {
      let date = event.format('YYYY/MM/DD')
      this.formRef.current?.setFieldsValue({ DateTChar: moment(date) })
    }
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onFinish(values) {
  }

  render() {
    return (
      <div className="passing-manage-batch-extract">
        <Card title="通過管理一括抽出">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <div style={{ padding: '10px', border: '1px solid #93C8F9', height: '100%', margin: '10px 0' }} >
              <Row>
                <Col span={12} >
                  <Space>
                    <Form.Item name="DateFChar" label="受診日">
                      <DatePicker
                        disabled={this.state.isLoadingTable}
                        onChange={(event) => this.changeDateF(event)}
                        format={"YYYY/MM/DD"}
                      />
                    </Form.Item>
                    <Form.Item name="DateTChar" label="~">
                      <DatePicker
                        disabled={this.state.isLoadingTable}
                        onChange={(event) => this.changeDateT(event)}
                        format={"YYYY/MM/DD"}
                      />
                    </Form.Item>
                  </Space>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Form.Item style={{ textAlign: "right" }}>
                    <Button icon={<SearchOutlined />}
                      name="DisplayButton"
                      htmlType="submit"
                      onClick={() => {
                        if (moment(this.formRef.current.getFieldValue('DateFChar')).valueOf() > moment(this.formRef.current.getFieldValue('DateTChar')).valueOf()) 
                        {
                          let title = '「' + moment(this.formRef.current.getFieldValue('DateFChar'))?.format("YYYY/MM/DD") + '」' + ' 以降の日付を設定してください'
                          Modal.error({
                            width: 350,
                            title: title,
                            okText: 'OK'
                          })
                        } else {
                          this.getSearch()
                        }
                      }}

                      disabled={this.state.isLoadingTable}
                    >　検　　索
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
          <Table
            size='middle'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            bordered={true}
            scroll={{
              y: 'calc(100vh - (32px + 58px + 34px + 51px + 175px))'
            }}
            pagination={false}
            rowKey={(record) => record.id}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: this.state.selectedKey,
              onSelect: (record, selected, selectedRows, nativeEvent) => {
                let arrTemp = [...this.state.selectedKey];
                let idx = arrTemp.indexOf(record.id);
                if (idx === -1) {
                  arrTemp.push(record.id);
                  this.setState({ selectedKey: arrTemp });
                } else {
                  arrTemp.splice(idx, 1);
                  this.setState({ selectedKey: arrTemp });
                }
                if (arrTemp.length === this.state.dataSource.length) {
                  this.setState({ stsSelectAll: true });
                } else {
                  this.setState({ stsSelectAll: false });
                }
              },
              onSelectAll: (selected, selectedRows, changeRows) => {
                if (selected) {
                  let arrTemp = this.state.dataSource.map(item => item.id);
                  this.setState({
                    selectedKey: arrTemp,
                    initObj: {
                      ...this.state.initObj,
                      AllSelect: 1,
                    },
                    stsSelectAll: true
                  });
                } else {
                  this.setState({
                    selectedKey: [],
                    initObj: {
                      ...this.state.initObj,
                      AllSelect: 0,
                    },
                    stsSelectAll: false
                  });
                }
              }
            }}
          >
            <Table.Column
              title="受診日"
              dataIndex="visit_date_on"
            />
            <Table.Column
              title="個人番号"
              dataIndex="personal_number_id"
            />
            <Table.Column
              title="ﾒﾓ"
              dataIndex="passing_official_name"
              width="50px"
              render={(value, record) => {
                return (
                  <Button
                    icon={<MoreOutlined />}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 1500,
                          component: (
                            <Card title={"個人情報照会SUB"}>
                              <WS2584019_PersonalInfoInquirySub
                                Li_PersonalNum={record.personal_number_id}
                              />
                            </Card>
                          ),
                        },
                      });
                    }}
                  >
                  </Button>)
              }}

            />
            <Table.Column
              title="氏名"
              dataIndex="kanji_name"
              width="175px"
            />
            <Table.Column
              title="ｺｰｽ"
              dataIndex="visit_course"
              width="75px"
            />
            <Table.Column
              title="契約略称"
              dataIndex="contract_short_name"
            />
            <Table.Column
              title=""
              dataIndex=""
            />
          </Table>
          <Button
            disabled={this.state.isLoadingTable}
            name="SendButton"
            type="primary"
            htmlType="submit"
            style={{ float: "right", marginTop: "15px" }}
            onClick={() => {
              Modal.confirm({
                content: "通過管理の一括抽出を行いますか？",
                okText: "はい",
                cancelText: "いいえ",
                onOk: () => this.getBatchExtractBtn(),
              });
            }}
          >
            抽出
          </Button>
        </Card>
        <Modal
          footer={null}
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.closeModal();
          }}
        >
          {this.state.childModal.component}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS3063001_PassingManageBatchExtract);
