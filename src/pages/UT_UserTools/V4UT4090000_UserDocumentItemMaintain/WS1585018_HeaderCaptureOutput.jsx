import React from "react";
import { connect } from "react-redux";
import { Card, Form, Input, Button, message, Modal, Upload } from "antd";
import { WarningOutlined, UploadOutlined } from '@ant-design/icons';
import { runF10Action, runF11Action, getScreenDataAction } from "redux/UserTools/UserDocumentItemMaintain/HeaderCaptureOutput.actions";

class WS1585018_HeaderCaptureOutput extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'ヘッダ取込・出力';

    this.state = {
      fileList: []
    };
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount = () => {
    getScreenDataAction()
      .then(res => this.formRef?.current?.setFieldsValue({ TokomimotoAndOutput: res.data.TokomimotoAndOutput }))
  }

  runF10 = () => {
    let formData = new FormData();
    formData.append("TokomimotoAndOutput", this.state.fileList[0].originFileObj);
    runF10Action(formData)
      .then((res) => {
        Modal.warning({
          icon: <WarningOutlined />,
          content: '取込みを完了しました',
          okText: 'は　い',
        });
      })
      .catch((err) => message.error('エラー'))
  }

  runF11 = (params) => {
    let TokomimotoAndOutput = `${params.TokomimotoAndOutput}.csv`
    runF11Action({ TokomimotoAndOutput })
      .then((res) => {
        var FileSaver = require('file-saver');
        Modal.warning({
          icon: <WarningOutlined />,
          content: '取込みを完了しました',
          okText: 'は　い',
          onOk: () => {
            var blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
            FileSaver.saveAs(blob, TokomimotoAndOutput);
          }
        });
      })
      .catch(() => message.error('エラー'))
  }

  handleUpload = ({ fileList }) => {
    this.setState({ fileList });
  };

  onFinish(values) {
    if (this.props.F10) {
      Modal.confirm({
        content: '取込を実行しますか',
        okText: 'は　い',
        cancelText: 'いいえ',
        onOk: () => {
          this.runF10();
          this.props.onFinishScreen();
        }
      });
    } else if (this.props.F11) {
      this.runF11(values);
      this.props.onFinishScreen();
    }
  }

  render() {
    return (
      <div className="header-capture-output">
        <Card title={`ヘッダ取込・${this.props.F10 ? "取込" : "出力"}`}>
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <Form.Item name="TokomimotoAndOutput" label={this.props.F10 ? "取込元" : "出力先"} >
              {this.props.F10
                ? (
                  <Upload
                    listType="application/vnd.ms-excel"
                    fileList={this.state.fileList}
                    onChange={this.handleUpload}
                    beforeUpload={() => false}
                  >
                    <Button icon={<UploadOutlined />}>クリックしてファイルを選択してください</Button>
                  </Upload>
                )
                : <Input suffix='.csv' />
              }

            </Form.Item>
            <Form.Item style={{ float: 'right' }}>
              <Button type="primary" htmlType='submit'>{this.props.F10 ? '取込' : '出力'}</Button>
            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1585018_HeaderCaptureOutput);
