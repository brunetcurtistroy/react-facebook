import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Form, Button, Upload, Modal, message, Space } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { captureF12CsvCaptureScreenAction } from "redux/CooperationRelated/InspectRequestConvertMasterMaintain/CsvCaptureScreen.actions";
import upFile from 'assets/img/uploadFile.svg';

class WS1043008_CsvCaptureScreen extends React.Component {
  static propTypes = {
    Lio_Output: PropTypes.any,
    Lo_StsOutput: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '検査依頼変換マスタ保守';

    this.state = {
      fileList: []
    };
    this.onFinish = this.onFinish.bind(this);
  }

  CaptureF12 = () => {
    let formData = new FormData();
    formData.append("FileName", this.state.fileList[0].originFileObj);
    captureF12CsvCaptureScreenAction(formData)
      .then(res => {
        if(this.props.onFinishScreen) 
          this.props.onFinishScreen({
            Lo_StsOutput: true,
            Lio_Output: ''
          })
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  handleUpload = ({ fileList }) => {
    this.setState({ fileList });
  };

  onFinish = (values) => {
    if (values.Lio_Output) {
      Modal.confirm({
        content: 'ヘッダの内容を上書きしますか？',
        icon: <QuestionCircleOutlined style={{ color: '#006DC9' }} />,
        okText: 'は　い',
        cancelText: 'いいえ',
        onOk: () => {
          this.CaptureF12();
        }
      });
    } else {
      Modal.error({
        content: '取込元を入力してください',
        okText: 'OK',
      })
    }

  }

  render() {
    return (
      <div className="inspect-request-convert-master-maintain">
        <Card title="CSV取込照会">
          <Form onFinish={this.onFinish} >
            <Form.Item name="Lio_Output" label="取込元"  >
              <Upload
                maxCount={1}
                listType="application/vnd.ms-excel"
                fileList={this.state.fileList}
                onChange={this.handleUpload}
                beforeUpload={() => false}
              >
                <Button>
                  <Space>
                    <img src={upFile} alt="icon" width={20} />
                    <span>クリックしてファイルを選択してください</span>
                  </Space>
                </Button>
              </Upload>
            </Form.Item>
            <Button style={{ float: 'right' }} htmlType='submit' type="primary">取込</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1043008_CsvCaptureScreen);
