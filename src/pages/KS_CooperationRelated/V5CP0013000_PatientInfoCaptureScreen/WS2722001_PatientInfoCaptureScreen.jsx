import React from "react";
import { connect } from "react-redux";

import { Card, Form, Button, Upload, Modal, message } from "antd";
import uploadFolder from "assets/img/uploadFolder.svg";
import { QuestionCircleOutlined, } from '@ant-design/icons';
import {
  getScreenDataPatientInfoCaptureScreenAction, captureF12PatientInfoCaptureScreenAction
} from "redux/CooperationRelated/PatientInfoCaptureScreen/PatientInfoCaptureScreen.actions";
import WS2722007_PatientInquiry from "./WS2722007_PatientInquiry";
import moment from "moment";
// import WS2725001_AcquireSettingSub from "./WS2725001_AcquireSettingSub";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import Menubar from "components/Commons/Menubar";

class WS2722001_PatientInfoCaptureScreen extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '患者情報取込[画面]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      fileList: [],
      menuItems: [
        { id: 1, label: '照会', handleClick: this.eventF11 },
        { id: 2, label: '取込', handleClick: this.onFinish },
      ],
      menus: [{ id: 1, label: '患者取込設定', handleClick: this.VariousSetting01 }]
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    this.loadData()
  }

  Capture_F12 = () => {
    let arrTemp = this.state.fileList.map(item => item.originFileObj)
    let formData = new FormData();
    for (var i = 0; i < arrTemp.length; i++) {
      formData.append('CaptureFolderName[]', arrTemp[i]);
    }
    captureF12PatientInfoCaptureScreenAction(formData)
      .then(res => {
        console.log(res)
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  loadData = () => {
    this.setState({ isLoading: true });
    getScreenDataPatientInfoCaptureScreenAction()
      .then(res => { })
      .catch()
  }

  handleUpload = ({ fileList }) => {
    this.setState({ fileList });
  };

  onFinish(values) {
    if (values.CaptureFolderName && values.CaptureFolderName.fileList.length > 0) {
      let content = `取込対象のテキストが${values.CaptureFolderName.fileList.length}件あります。\n取込を実行しますか？`
      Modal.confirm({
        content: content,
        icon: <QuestionCircleOutlined style={{ color: '#006FCA', fontSize: 30 }} />,
        okText: 'は　い',
        cancelText: 'いいえ',
        onOk: () => {
          this.Capture_F12();
          Modal.info({
            content: '取込が終了しました',
            okText: 'OK',
          });
        },
        onCancel: () => {
          Modal.warning({
            content: '取込対象がありませんでした',
            okText: 'OK',
          });
        },
      });
    } else {
      let txt = values.CaptureFolderName && values.CaptureFolderName.fileList.length === 0
        ? '取込対象のテキストが存在しません'
        : '取込元を指定してください'
      Modal.error({
        content: txt,
        okText: 'OK',
      });
    }
  }

  eventF11 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '60%',
        component: (
          <WS2722007_PatientInquiry
            Li_KanaName={''}
            Li_DateBirth={''}
            Li_Date={moment().format('YYYY/MM/DD')}
            onFinishScreen={() => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="patient-info-capture-screen" style={{ width: "50%" }}>
        <Form onFinish={this.onFinish}>
          <Card title='患者情報取込[画面]'>
            <Menubar items={this.state.menuItems} menus={this.state.menus} />
            <Form.Item name="CaptureFolderName" className='mt-3'>
              <Upload
                directory
                fileList={this.state.fileList}
                onChange={this.handleUpload}
                beforeUpload={() => false}
              >
                <img src={uploadFolder} style={{ width: '70px', height: '30px', opacity: '0.5' }} alt='uploadfolder' />
              </Upload>
            </Form.Item>
            <Button type="primary" style={{ float: 'right' }} htmlType='submit'>取　込</Button>
          </Card>
        </Form>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2722001_PatientInfoCaptureScreen);
