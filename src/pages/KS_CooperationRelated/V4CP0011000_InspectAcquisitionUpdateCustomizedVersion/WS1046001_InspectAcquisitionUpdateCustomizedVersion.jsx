import React from "react";
import { QuestionCircleOutlined, } from '@ant-design/icons';
import { Card, Form, Input, Button, Upload, Space, Modal, message, Table } from "antd";
import { DeleteOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadOutlined } from "@ant-design/icons";
import Cookie from 'js-cookie';
import WS1053004_ConsultSelect from 'pages/KS_CooperationRelated/V4CP0011000_InspectAcquisitionUpdateCustomizedVersion/WS1053004_ConsultSelect.jsx'
import WS0262001_LogDisplay from 'pages/ZZ_Others/V4DS0230000_LogDisplay/WS0262001_LogDisplay.jsx'
import WS1050001_AcquireSettingSub from 'pages/KS_CooperationRelated/V4CP0011000_InspectAcquisitionUpdateCustomizedVersion/WS1050001_AcquireSettingSub.jsx';
import WS0810025_PrintSub from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS0810025_PrintSub.jsx';
import InspectAcquisitionUpdateCustomizedVersionAction from 'redux/CooperationRelated/InspectAcquisitionUpdateCustomizedVersion/InspectAcquisitionUpdateCustomizedVersion.action'
import ModalDraggable from "components/Commons/ModalDraggable";


const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class WS1046001_InspectAcquisitionUpdateCustomizedVersion extends React.Component {
  formRef = React.createRef();
  name = '取込対象のテキストファイルをアップロードする（複数選択可）'
  constructor(props) {
    super(props);

    // document.title = '検査取込更新[ｶｽﾀﾏｲｽﾞ版]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      fileList: [],
      FilterList: '',
      Upload: {},
      dataSource: [{ id: 1, CaptureFolderName: '', color: '' }],
      fileUpload: [],
      defaultF12: true,
      disableUpload: true,
      count: 1001,
      index: 0,
    };
  }

  componentDidMount() {
    InspectAcquisitionUpdateCustomizedVersionAction.getScreenData().then(res => {
      const data = res && res.FilterList ? res.FilterList : '';
      const convertList = data.split('|')
      this.setState({ ...this.state, FilterList: convertList })
    })
    this.formRef.current.setFieldsValue({
      fileUpload: "",
    })
  }

  onFinish = (values) => {
    const folder =
      this.state && this.state.Upload && this.state.Upload.folder ?
        this.state.Upload.folder : '';
    const path = this.state && this.state.Upload && this.state.Upload.path ?
      this.state.Upload.path : '';
    const params = {
      CaptureFolderName: folder
    }
    // F12
    if (params.CaptureFolderName === '') {
      Modal.error({ content: '取込元を指定してください', okText: 'は　い' })
    } else {
      InspectAcquisitionUpdateCustomizedVersionAction.captureF12(params)
        .then(res => {
          Modal.confirm({
            content: res.data.message,
            okText: 'は　い',
            cancelText: 'いいえ',
            onOk: () => {
              this.captureF12Print(res.data.variables)
            }
          })
        })
        .catch(error => {
          const res = error.response;
          if (!res || !res.data || !res.data.message) {
            message.error('エラーが発生しました');
            return;
          }
          message.error(res.data.message);
        })
        .finally(() => { });
    }
  }
  captureF12Print(data) {
    let params = {
      FolderInTextList: data.FolderInTextList,
      TextGetErrorNum: data.TextGetErrorNum,
      CaptureFolderName: data.CaptureFolderName
    }
    InspectAcquisitionUpdateCustomizedVersionAction.captureF12Print(params)
      .then(res => {
        if (res.data.message) {
          this.showWS1053004_ConsultSelect(res.data.variables)
        } else {
          Modal.warning({
            content: res.data.warrring,
            okText: 'は　い',
            onOk: () => {
              this.captureF12PrintAfter(res.data.variables,false)
            }
          })
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => { });
  }

  captureF12PrintAfter(data,value) {
    let params = {
      TextGetErrorNum: data.TextGetErrorNum,
      print_success : value
    }
    InspectAcquisitionUpdateCustomizedVersionAction.captureF12PrintAfter(params)
      .then(res => {
        // Modal.warning({
        //   content: res.data.message,
        //   okText: 'は　い',
        // })
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => { });
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  printF11() {
    InspectAcquisitionUpdateCustomizedVersionAction.printF11()
      .then(res => {
        this.showPrintSub()
      }).catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }
  showWS0262001_LogDisplay() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1000,
        component: (
          <WS0262001_LogDisplay />
        ),
      },
    })
  }
  showPrintSub() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component:
          <WS0810025_PrintSub
            onFinishScreen={(ouput) => {

              this.closeModal()
            }} />
      },
    });
  }
  showWS1053004_ConsultSelect(data) {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 600,
        component:
          <WS1053004_ConsultSelect
            onFinishScreen={(ouput) => {
              this.captureF12PrintAfter(data,true)
              this.closeModal()
            }} />
      },
    });
  }
  handleUpload = (fileList) => {
    fileList = this.state.dataSource.map(s => s)
    const convertTypeFile = (name) => name && name.length > 0 ? name.split('.')[1] : '';
    let filterList = [];
    const arr = this.state && this.state.FilterList ? this.state.FilterList : []
    if (arr.some(s => s === '*.*')) {
      filterList = fileList;
    } else {
      filterList = fileList.filter((f, i) => {
        const name = f && f.originFileObj && f.originFileObj.name;
        const typeFile = '.' + convertTypeFile(name)
        if (typeFile === '.dat') {
          if (arr.includes(name)) {
            return f
          }
        }
        if (arr.some(item => item === typeFile)) {
          return f
        }
      })
    }
    if (filterList.length === 0) {
      filterList = [{ CaptureFolderName: '', originFileObj: '', color: '' }]
    }
    this.setState({ fileUpload: filterList });

  };
  addRow() {
    const { count } = this.state
    let dataSource = this.state.dataSource.map(s => s)
    const params = { id: count, CaptureFolderName: '', isNew: true, originFileObj: '', color: '' }
    dataSource.push(params);
    this.forceUpdate()
    this.setState({ count: count + 1, dataSource: dataSource, fileList: dataSource })

  }
  remove(index) {
    let dataSource = this.state.dataSource.map(s => s)
    let fileList = this.state.fileList.map(s => s)
    dataSource = dataSource.filter((s, i) => i !== index)
    if (this.state.dataSource.length === 1) { return }
    else {
      fileList = fileList.filter((s, i) => {
        if (dataSource.some(v => v.name === s.name)) { return s }
      })
      this.setState({ dataSource: dataSource, fileList })
    }
    const nameFile = dataSource.map(s => (s && s.originFileObj && s.originFileObj?.name))
    const checkEmptyFile = nameFile.filter(s => s !== undefined)
    if (!checkEmptyFile.length > 0) {
      this.setState({ Upload: {}, defaultF12: true, disableUpload: true })
    }
  }
  uploadFile = () => {
    let arrTemp = this.state.fileUpload.map(item => item.originFileObj)
    let formData = new FormData();
    for (var i = 0; i < arrTemp.length; i++) {
      if (arrTemp[i].originFileObj !== '') {
        formData.append('files[]', arrTemp[i]);
      }
    }

    InspectAcquisitionUpdateCustomizedVersionAction.upload(formData).then(res => {
      this.setState({ Upload: res, defaultF12: false })
    }).catch(error => {
      const res = error.response;
      if (!res || !res.data || !res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
      message.error(res.data.message);
    })

  }
  checkUpload(event) {
    const convertTypeFile = (name) => name && name.length > 0 ? name.split('.')[1] : '';
    let dataS = this.state.dataSource.map(s => s);
    const arr = this.state && this.state.FilterList ? this.state.FilterList : [];
    if (arr.some(s => s === '*.*')) {
      dataS[this.state.index].originFileObj = event;
      this.setState({ disableUpload: false });
    } else {
      const name = event && event.name;
      const typeFile = '.' + convertTypeFile(name).trim()
      if (typeFile === '.dat') {
        if (arr.includes(name)) {
          dataS[this.state.index].originFileObj = event
          this.setState({ disableUpload: false });
        }
      }
      if (arr.some(item => item === typeFile)) {
        dataS[this.state.index].originFileObj = event
        this.setState({ disableUpload: false });
      }
    }
    this.setState({ dataSource: dataS });
  }
  browseResult(e) {
    var fileselector = document.getElementById('fileselector');
  }
  render() {
    return (
      <div className="inspect-acquisition-update-customized-version">
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Card title="検査取込更新">
            <Space>
              <Button onClick={() => this.showWS0262001_LogDisplay()} >ログ</Button>
              <Button onClick={() => this.printF11()} >印刷</Button>
              <Button htmlType='submit' >取込</Button>
              <Button
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: 600,
                      component: (
                        <WS1050001_AcquireSettingSub
                          onFinishScreen={() => {
                            this.closeModal()
                          }}
                        />
                      ),
                    },
                  })
                }}
              >ﾊﾟﾀｰﾝ設定</Button>
            </Space>
            <hr style={{ margin: '10px 0 20px 0' }} />
            {/* <div style={{ float: 'right', margin: '15px 0px 10px 0px' }}><Button type="primary" onClick={() => this.addRow() }>+</Button></div> */}
            <Table
              pagination={false}
              showHeader={false}
              // scroll={{ x: 350, y: 650 }}
              bordered={false}
              rowKey={(record) => record.id}
              dataSource={this.state.dataSource}>
              <Table.Column
                dataIndex="CaptureFolderName"
                render={(item, record, index) => {
                  return <Form.Item {...grid}  >
                    <Input type="text"
                      value={record?.originFileObj?.name}
                      addonAfter={<div>
                        <UploadOutlined style={{ color: '#096dd9' }}
                          onClick={(e) => {
                            this.setState({ index })
                            document.getElementById("idUpload1").click()
                          }} />

                      </div>
                      }
                    />

                    <div hidden>
                      <Upload id="idUpload1"
                        listType="text"
                        onChange={this.handleUpload}
                        headers={{
                          'X-XSRF-TOKEN': Cookie.get('XSRF-TOKEN'),
                        }}
                        beforeUpload={(event) => {
                          this.checkUpload(event)
                        }}
                      ><span hidden></span>
                      </Upload>

                    </div>

                  </Form.Item>
                }}>

              </Table.Column>
            </Table>

            <Form.Item style={{ float: 'right' }} className='mt-3'>
              <Space>
                <Button disabled={this.state.disableUpload} onClick={this.uploadFile} type="primary" >アップロード</Button>
                <Button disabled={this.state.defaultF12} type="primary" htmlType="submit"  >実行</Button>
              </Space>
            </Form.Item>

          </Card>
        </Form>
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

export default WS1046001_InspectAcquisitionUpdateCustomizedVersion;
