import React from "react";
import { connect } from "react-redux";
import { LeftOutlined, RightOutlined, MoreOutlined, DeleteOutlined, SaveOutlined, PlusOutlined } from "@ant-design/icons";
import WS2712016_UseInspect from 'pages/MS_InspectionMaintenance/V4MS0105000_ExamCmtInfoMaintain/WS2712016_UseInspect.jsx'
import WS0061015_CheckYesNoNo from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo.jsx';
import WS0061012_CheckYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061012_CheckYes.jsx';
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Table, Row, Col, Modal, Checkbox } from "antd";
const grid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class WS2712001_InspectCmtInfoMaintainSub extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Lo_CmtCode: PropTypes.any,
    Lio_CmtClassify: PropTypes.any,
    onFinishScreen: PropTypes.func
  };
  constructor(props) {
    super(props);

    // document.title = '検査コメント情報保守 SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [{ 
        Expression_29: 1,
        id: 1, exam_comment_code: '1', exam_comment_screen: 'exam', exam_comment_form: '3', Option: '10', StsEnable: 1 }],
    };
  }

  onFinish(values) {

  }
  getScreenData() {
    // call api
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  showWS2712016_UserInspect() {
    const { childModal } = this.state;
    this.setState({
      childModal: {
        ...childModal,
        visible: true,
        width: 600,
        component: (<WS2712016_UseInspect
          Li_InspectCmtCode={this.formRef?.current?.CmtClassify}
          onFinishScreen={(data) => {
            this.closeModal()
          }}
        />),
      },
    })
  }
  showCheckYes() {
    // Li_Displaymethod = 10
    const { childModal } = this.state;
    this.setState({
      childModal: {
        ...childModal,
        visible: true,
        width: 600,
        component: (<WS0061012_CheckYes
          Li_Displaymethod={10}
          Li_DisplayContent={'削除しました。'}
          onFinishScreen={(output) => {
            //Lo_Return
            this.closeModal()
          }}
        />),
      },
    })
  }
  showCheckYesNoNo() {
    // Li_Displaymethod = 1
    const { childModal } = this.state;
    this.setState({
      childModal: {
        ...childModal,
        visible: true,
        width: 600,
        component: (<WS0061015_CheckYesNoNo
          Li_Title={'一括削除確認'}
          Li_Displaymethod={1}
          Li_DisplayContent={'コメントをまとめて削除しますか？'}
          onFinishScreen={(output) => {
            //Lo_Return
            this.closeModal()
          }}
        />),
      },
    })
  }
  showCofirmMessageStandard() {
    // call api => if Li_Displaymethod = 1 => CheckYesNoNo else CheckYes
  }
  callGetScreenDataFrmEnter(event) {
    if (event.keyCode === 13) {
      this.getScreenData()
    }
  }
  onCheckStsEnabled(record, event) {
    const array = [...this.state.dataSource];
    const checked = event.target.checked ? 1 : 0;
    const index =  this.state.dataSource.findIndex(s => s.id === record.id);
    array[index].StsEnable = checked;
    this.setState({dataSource: array});
    this.forceUpdate()
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  render() {
    const Expression_29 = this.formRef?.current?.getFieldValue('Expression_29')
    return (
      <div className="inspect-cmt-info-maintain-sub">
        <Card title="検査コメント情報保守 SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row gutter={24}>
              <Col span={16}>
                <Row gutter={24}>
                  <Col span={14}>
                    <Form.Item {...grid}
                      name="CmtClassify"
                      label="コメント区分"
                    >
                      <Input type="text" onKeyUp={(event) => this.callGetScreenDataFrmEnter(event)} />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      {...grid}
                      name="exam_name"
                      label="使用検査"
                    >
                      <Input readOnly={true} style={{ border: 'none' }} type="text" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item>
                      <Button icon={(<MoreOutlined />)} onClick={() => this.showWS2712016_UserInspect()}></Button>
                    </Form.Item></Col>
                  <Col span={12}>
                    <Form.Item>
                      <Button type="primary" onClick={() => this.showCofirmMessageStandard()}>一括削除</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>

          <Table
            bordered={true}
            size='small'
            scroll={{ y: 600 }}
            dataSource={this.state.dataSource}
            pagination={false}
            rowKey={(record) => record.id}

          >
            <Table.Column width={180} title="コード" dataIndex="exam_comment_code"
              render={(value, record) => {
                if (Expression_29 == 1) {
                  return <div style={{ textAlign: 'right' }}><span>{record.exam_comment_code}</span></div>
                }
              }}
            />
            <Table.Column width={180} title="ｺﾒﾝﾄ内容" dataIndex="exam_comment_screen"
              render={(value, record) => {
                if (Expression_29 == 1) {
                  return <div>{record.exam_comment_screen}</div>
                }
              }}
            />
            <Table.Column title="出力内容" dataIndex="exam_comment_form"
              render={(value, record) => {
                if (Expression_29 == 1) {
                  return <div>{record.exam_comment_form}</div>
                }
              }} />
            <Table.Column title="オプション" dataIndex="Option"
              render={(value, record) => {
                if (Expression_29 == 1) {
                  return <div>{record.Option}</div>
                }
              }}
            />
            <Table.Column width={80} style={{ textAlign: 'center' }}
              title="✓" dataIndex="" render={(value, record) => {
                if (Expression_29 == 1) {
                  return <div style={{ textAlign: 'center' }}>
                    <Checkbox onClick={(event) => this.onCheckStsEnabled(record, event)}checked={value.StsEnable}></Checkbox></div>
                }
              }} />

          </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2712001_InspectCmtInfoMaintainSub);
