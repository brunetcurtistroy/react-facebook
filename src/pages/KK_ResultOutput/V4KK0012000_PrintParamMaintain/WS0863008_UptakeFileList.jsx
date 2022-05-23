import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Checkbox, Form, Input, Button, message, Upload, Space } from "antd";
import UptakeFileListAction from "redux/ResultOutput/PrintParamMaintain/PrintParramInputOutput/UptakeFileList.action";
import upFile from 'assets/img/uploadFile.svg';
import moment from 'moment';

class WS0863008_UptakeFileList extends React.Component {
  static propTypes = {
    Li_CaptureFolder: PropTypes.string,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '取り込みファイル一覧';

    this.state = {
      selectedFile: null,
      listFile: [],
      dataSource: [],
      fileList: []
    };
  }

  onFileUpload = () => {
    const formData = new FormData();
    const func = this.props.onSelect || this.props.onFinishScreen;
    let arrTemp = []
    this.state.listFile.forEach((item) => {
      if (item.W1_enabled_disabled) {
        arrTemp.push(item.originFileObj)
      }
    })
    let arrayFileObj = []
    for (var i = 0; i < arrTemp.length; i++) {
      if (arrTemp[i].originFileObj !== '') {
        formData.append('CaptureFolderName[]', arrTemp[i]);
        arrayFileObj.push(formData)
      }
    }
    
    UptakeFileListAction.inputexec(formData)
      .then((res) => {
        message.success('更新しました!')
        const func = this.props.onSelect || this.props.onFinishScreen;
        func({
          Lo_Message: "入力完了しました。"
        });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };
  handleUpload = ({ fileList }) => {
    let data = fileList
    if (data.length > 0) {
      let array = []
      let array_listFile = []
      let i = 0
      data.forEach((value) => {
        value.W1_enabled_disabled = true
        let item_data = {
          id: i,
          W1_enabled_disabled: value.W1_enabled_disabled,
          W1_remark: value.name,
          Expression_5: moment(value.lastModifiedDate).format("YYYY/MM/DD") ?? ''
        }
        array_listFile.push(value)
        array.push(item_data)
        i += 1
      })
      this.setState({
        listFile: array_listFile,
        dataSource: array,
      })
    }
  };
  ChangeCheck(index, e) {
    let data = [...this.state.dataSource]
    let datalistFile = [...this.state.listFile]
    data[index].W1_enabled_disabled = e.target.checked
    datalistFile[index].W1_enabled_disabled = e.target.checked
    this.setState({
      dataSource: data,
      listFile: datalistFile
    })
  }
  render() {
    return (
      <div className="uptake-file-list">
        <Card title="取り込みファイル一覧">
          <Upload style="dislay : none"
            onChange={this.handleUpload}
            accept=".txt"
            beforeUpload={() => false}
            showUploadList={false}
          >
            <Button>
              <Space>
                {/* <img src={upFile} alt="icon" width={20} /> */}
                <span>クリックしてファイルを選択してください</span>
              </Space>
            </Button>
          </Upload>
          {/* <input type="file" onChange={this.onFileChange} /> */}
          <Form
            ref={this.formRef}
            onFinish={this.handleUpload}
          >
            <div style={{ display: 'none' }}>
              <Form.Item name="StsIncorporationError"><Input /></Form.Item>
              <Form.Item name="StsEnableExists"><Input /></Form.Item>
            </div>
            <Table
              dataSource={this.state.dataSource}
              loading={false}
              pagination={false}
              rowKey={(record) => record.id}
              bordered={true}
            >
              <Table.Column title="入力" dataIndex="W1_enabled_disabled" width={80} render={(value, record, index) => {
                return <Form.Item name="W1_enabled_disabled" >
                  <Checkbox defaultChecked={record.W1_enabled_disabled}
                    onChange={(e) => this.ChangeCheck(record.id, e)}
                  ></Checkbox>
                </Form.Item>
              }} />
              <Table.Column title="ファイル名" dataIndex="W1_remark" />
              <Table.Column title="更新日付" dataIndex="Expression_5" />
            </Table>
            <Button type="primary" onClick={this.onFileUpload} style={{ float: 'right', marginTop: '1em' }}>確定</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0863008_UptakeFileList);
