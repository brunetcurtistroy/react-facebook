import React from "react";
import { connect } from "react-redux";
import ModalDraggable from "components/Commons/ModalDraggable";

import { Card, Table, Form, Input, Row, Col, Checkbox, Modal, Button, Upload, InputNumber, message, Space, Spin } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import WS0451001_UserParamQuery from 'pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0451001_UserParamQuery.jsx';
import "./WS1107001_SettingOcrCapture.scss";
import SettingOcrCaptureAction from "redux/CooperationRelated/OcrCaptureStartUp/SettingOcrCapture.action";
import WS1107002_OcrCheck from "./WS1107002_OcrCheck";
import WS0397001_ParamPromptedQuerySub from "pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0397001_ParamPromptedQuerySub";


const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const smGrid = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
class WS1107001_SettingOcrCapture extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '設定[OCR取込]';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource0: [],
      isLoadingTable0: false,
      selectedRowKeys0: [],
      rowSelected0: [],
      indexTable0: 0,
      old_No: null,

      dataSource1: [],
      isLoadingTable1: false,
      selectedRowKeys1: [],
      rowSelected1: [],
      indexTable1: 0,
      old_seq: null,

      dataSource2: [],
      isLoadingTable2: false,
      selectedRowKeys2: [],
      rowSelected2: [],
      indexTable2: 0,

      isSpinForm: false,
    };
  }

  componentDidMount() {
    this.getDataCapture(true);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataCapture(true);
    }
  }

  getDataCapture(reload) {
    this.setState({
      isLoadingTable0: reload ? true : false,
      isSpinForm: true
    })

    SettingOcrCaptureAction.getDataOrcCapture()
      .then(async (res) => {
        let data = res ? res.data : []
        let index = reload ? 0 : this.state.indexTable0
        await this.setState({
          dataSource0: data,
          dataSourceOld: data,
          isLoadingTable0: false,

          rowSelected0: res && data.length > 0 ? [data[index]] : [],
          selectedRowKeys0: res && data.length > 0 ? [data[index].id] : [],
          indexTable0: index,
          old_No: res && data.length > 0 ? data[index].No : null,
        })

        if (data.length > 0) {
          this.getDataOrcFormat()
        }
      })
      .catch((err) => {
        this.setState({
          isLoadingTable0: false,
          isSpinForm: false
        })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTable0: false }))
  }

  saveDataOrcCapture(index) {
    let params = {
      ...this.state.dataSource0[index],
    }
    if (this.checkDuplicateCode('Capture')) {
      message.warning('No 複製 !!');
    } else {
      SettingOcrCaptureAction.saveDataOrcCapture(params)
        .then((res) => {
          message.success('更新しました。!')
          this.getDataCapture(true)
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
  }

  deleteDataOrcCapture(id) {
    let params = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        SettingOcrCaptureAction.deleteDataOrcCapture(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.getDataCapture(true);
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
    })
  }

  // 
  getDataOrcFormat(reload) {
    let params = {
      ReadId: this.state.rowSelected0[0]?.ReadId,
      SpecifiedId: this.state.rowSelected0[0]?.SpecifiedId,
      Id: this.state.rowSelected0[0]?.Id,
    }
    this.setState({ isSpinForm: true })
    SettingOcrCaptureAction.getDataOrcFormat(params)
      .then(async (res) => {
        let data = res ? res.data : []
        let index = reload ? 0 : this.state.indexTable1
        await this.setState({
          dataSource1: data,

          rowSelected1: res && data.length > 0 ? [data[index]] : [],
          selectedRowKeys1: res && data.length > 0 ? [data[index].id] : [],
          indexTable1: index,
          old_seq: res && data.length > 0 ? data[index].seq : null,
        })

        this.getDataAdvanceSetting();
      })
      .catch((err) => {
        this.setState({ isSpinForm: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTable1: false }))
  }

  saveDataOrcFormat(index, reload) {
    let params = {
      ...this.state.dataSource1[index],
      Id: this.state.rowSelected0[0]?.Id
    }
    if (this.checkDuplicateCode('FormatOption')) {
      message.warning('順 複製 !!');
    } else {
      SettingOcrCaptureAction.saveDataOrcFormat(params)
        .then((res) => {
          message.success('更新しました。!')
          this.getDataOrcFormat(reload)
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
  }

  deleteDataOrcFormat(id) {
    let params = {
      id: id
    }
    Modal.confirm({
      width: "250px",
      content: "削除を実行しますか ?",
      okText: 'は　い',
      cancelText: 'いいえ',
      onOk: () => {
        SettingOcrCaptureAction.deleteDataOrcFormat(params)
          .then(res => {
            message.success('正常に削除されました !');
            this.getDataOrcFormat(true);
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
    })
  }

  //
  getDataAdvanceSetting() {
    let params = {
      kind: this.state.rowSelected1[0]?.kind,
      option_remark: this.state.rowSelected1[0]?.option_remark,
      set_pattern: this.state.rowSelected1[0]?.set_pattern,
      error_checking: this.state.rowSelected1[0]?.error_checking,
      attribute: this.state.rowSelected1[0]?.attribute,
    }

    this.setState({ isLoadingTable2: this.state.isSpinForm ? false : true })

    SettingOcrCaptureAction.getDataAdvanceSetting(params)
      .then((res) => {
        this.formRef.current?.setFieldsValue(res?.data)
        this.getDataOptionInput()
      })
      .catch((err) => {
        this.setState({
          isLoadingTable2: false,
          isSpinForm: false
        })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  saveDataAdvanceSetting(index) {
    let params = {
      id: this.state.rowSelected1[0]?.id,
      Lio_Attribute: this.formRef.current?.getFieldValue('Lio_Attribute'),
      Lio_SetPattern: this.formRef.current?.getFieldValue('Lio_SetPattern'),
      Lio_ErrorCheck: this.formRef.current?.getFieldValue('Lio_ErrorCheck'),
    }

    SettingOcrCaptureAction.saveDataAdvanceSetting(params)
      .then((res) => {
        message.success("更新しました。");
        this.getDataOrcFormat(false)
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

  getDataOptionInput() {
    let params = {
      kind: this.state.rowSelected1[0]?.kind,
      option_remark: this.state.rowSelected1[0]?.option_remark,
    }
    this.setState({ isLoadingTable2: this.state.isSpinForm ? false : true })
    SettingOcrCaptureAction.getDataOptionInput(params)
      .then((res) => {
        this.setState({
          dataSource2: res ? res : [],
          isLoadingTable2: false,
          isSpinForm: false,

          rowSelected2: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys2: res && res.length > 0 ? [res[0]?.id] : [],
          indexTable2: 0,
        })
      })
      .finally(() =>
        this.setState({
          isLoadingTable2: false,
          isSpinForm: false
        }))
  }

  updateOptionInput() {
    let data = [...this.state.dataSource2]
    let remark = ''
    for (let i = 0; i < data.length; i++) {
      if (data[i].W1_item && data[i].W1_content) {
        remark = remark + '//' + data[i].W1_item + '=' + data[i].W1_content;
      }
    }

    this.updateDatasource(this.state.indexTable1, "option_remark", remark, 'FormatOption')

    this.saveDataOrcFormat(this.state.indexTable1, false)

  }

  /////
  checkDuplicateCode(type) {
    let lstData = [];
    if (type === 'Capture') {
      lstData = [...this.state.dataSource0];
      const uniqueValues = new Set(lstData.map(v => v.No));

      if (uniqueValues.size < lstData.length) {
        return true;
      } return false;
    }

    if (type === 'FormatOption') {
      lstData = [...this.state.dataSource1];
      const uniqueValues = new Set(lstData.map(v => v.seq));

      if (uniqueValues.size < lstData.length) {
        return true;
      } return false;
    }

    if (type === 'FormatSetting') {
      lstData = [...this.state.dataSource2];
      const uniqueValues = new Set(lstData.map(v => v.W1_serial_num));

      if (uniqueValues.size < lstData.length) {
        return true;
      } return false;
    }
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  checkAddItem(type) {
    if (type === 'Capture') {
      if (this.state.dataSource0.length > 0) {
        let index = this.state.dataSource0.findIndex(x => !x.No);
        if (index === -1) {
          return false;
        }
        return true
      }
    }

    if (type === 'FormatOption') {
      if (this.state.dataSource1.length > 0) {
        let index = this.state.dataSource1.findIndex(x => !x.seq);
        if (index === -1) {
          return false;
        }
        return true
      }
    }

    if (type === 'FormatSetting') {
      if (this.state.dataSource2.length > 0) {
        let index = this.state.dataSource2.findIndex(x => !x.W1_serial_num);
        if (index === -1) {
          return false;
        }
        return true
      }
    }
  }

  checkDisabledBtnAdd(type) {
    if (type === 'Capture') {
      if (this.state.rowSelected0.length > 0) {
        if (this.checkAddItem(type) || this.checkIdTemp(this.state.rowSelected0[0]?.id) ||
          (!this.checkIdTemp(this.state.rowSelected0[0]?.id) &&
            this.state.rowSelected0[0]?.No !== this.state.old_No)) {
          return true;
        } return false;
      } return false;
    }

    if (type === 'FormatOption') {
      if (this.state.rowSelected1.length > 0) {
        if (this.checkAddItem(type) || this.checkIdTemp(this.state.rowSelected1[0]?.id) ||
          (!this.checkIdTemp(this.state.rowSelected1[0]?.id) &&
            this.state.rowSelected1[0]?.seq !== this.state.old_seq)) {
          return true;
        } return false;
      } return false;
    }
  }

  // add new record
  async handleAddRowTable(type) {
    let newRow = { id: '' };

    let data = [];

    if (type === 'Capture') {
      newRow = { ...newRow }
      data = [...this.state.dataSource0]
      data.unshift(newRow);
      await this.setState({
        dataSource0: data,
        rowSelected0: [newRow],
        selectedRowKeys0: [newRow.id],
        indexTable0: 0,

        dataSource1: [],
        isLoadingTable1: false,
        selectedRowKeys1: [],
        rowSelected1: [],
        indexTable1: 0,
        old_seq: null,

        dataSource2: [],
        isLoadingTable2: false,
        selectedRowKeys2: [],
        rowSelected2: [],
        indexTable2: 0,
      });

      this.formRef.current?.setFieldsValue({
        Lio_Attribute: null,
        Lio_SetPattern: null,
        Lio_ErrorCheck: null,
      })
    }

    if (type === 'FormatOption') {
      data = [...this.state.dataSource1]
      data.unshift(newRow);
      await this.setState({
        dataSource1: data,
        rowSelected1: [newRow],
        selectedRowKeys1: [newRow.id],
        indexTable1: 0,

        dataSource2: [],
        isLoadingTable2: false,
        selectedRowKeys2: [],
        rowSelected2: [],
        indexTable2: 0,
      });
      this.formRef.current?.setFieldsValue({
        Lio_Attribute: null,
        Lio_SetPattern: null,
        Lio_ErrorCheck: null,
      })
    }

    if (type === 'FormatSetting') {
      data = [...this.state.dataSource2]
      data.unshift(newRow);
      await this.setState({
        dataSource2: data,
        rowSelected2: [newRow],
        selectedRowKeys2: [newRow.id],
        indexTable2: 0
      });
    }
    this.forceUpdate();
  }


  // check selected record while add new
  changeRow(index, type) {
    let data = [];
    if (type === 'Capture') {
      data = [...this.state.dataSource0]

      let idTemp = false;
      data.forEach(item => {
        if (this.checkIdTemp(item.id)) {
          idTemp = true;
          return idTemp;
        }
      })

      if (idTemp) {
        this.setState({
          rowSelected0: [data[0]],
          selectedRowKeys0: [data[0]?.id],
          indexTable0: 0
        });
      } else {
        this.setState({
          indexTable0: index
        });
      }
    }

    if (type === 'FormatOption') {
      data = [...this.state.dataSource1]

      let idTemp = false;
      data.forEach(item => {
        if (this.checkIdTemp(item.id)) {
          idTemp = true;
          return idTemp;
        }
      })

      if (idTemp) {
        this.setState({
          rowSelected1: [data[0]],
          selectedRowKeys1: [data[0]?.id],
          indexTable1: 0
        });
      } else {
        this.setState({
          indexTable1: index
        });
      }
    }

    if (type === 'FormatSetting') {
      data = [...this.state.dataSource2]

      let idTemp = false;
      data.forEach(item => {
        if (this.checkIdTemp(item.id)) {
          idTemp = true;
          return idTemp;
        }
      })

      if (idTemp) {
        this.setState({
          rowSelected2: [data[0]],
          selectedRowKeys2: [data[0]?.id],
          indexTable2: 0
        });
      } else {
        this.setState({
          indexTable2: index
        });
      }
    }
  }

  updateDatasource(index, field, value, type) {
    let data = [];

    if (type === 'Capture') {
      data = [...this.state.dataSource0]

      data[index][field] = value;

      this.setState({
        dataSource0: data
      });
    }

    if (type === 'FormatOption') {
      data = [...this.state.dataSource1]

      data[index][field] = value;

      this.setState({
        dataSource1: data
      });
    }

    if (type === 'FormatSetting') {
      data = [...this.state.dataSource2]

      data[index][field] = value;

      this.setState({
        dataSource2: data
      });
    }
  }

  async handleDeleteRowTable(type, index) {
    let data = [];

    if (type === 'Capture') {
      data = [...this.state.dataSource0]

      await data.splice(0, 1);
      await this.setState({
        dataSource0: data,
        indexTable0: 0,
        rowSelected0: data.length > 0 ? [data[0]] : [],
        selectedRowKeys0: data.length > 0 ? [data[0]?.id] : [],
        old_No: data.length > 0 ? data[0]?.No : null
      });
      this.getDataOrcFormat(true)
    }

    if (type === 'FormatOption') {
      data = [...this.state.dataSource1]

      await data.splice(0, 1);
      await this.setState({
        dataSource1: data,
        indexTable1: 0,
        rowSelected1: data.length > 0 ? [data[0]] : [],
        selectedRowKeys1: data.length > 0 ? [data[0]?.id] : [],
        old_seq: data.length > 0 ? data[0]?.seq : null
      });
      this.getDataAdvanceSetting()
    }

    if (type === 'FormatSetting') {
      data = [...this.state.dataSource2]

      await data.splice(index, 1);
      await this.setState({
        dataSource2: data,
        indexTable2: 0,
        rowSelected2: data.length > 0 ? [data[0]] : [],
        selectedRowKeys2: data.length > 0 ? [data[0]?.id] : [],
      });
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

  render() {
    return (
      <div className="setting-ocr-capture">
        <Card title='設定[OCR取込]'>
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 800,
                    component:
                      <WS1107002_OcrCheck
                        ReadId={this.state.rowSelected0[0]?.ReadId}
                        SpecifiedId={this.state.rowSelected0[0]?.SpecifiedId}
                        Id={this.state.rowSelected0[0]?.Id}
                        Li_Format={this.state.rowSelected0[0]?.ReadId === 1 ? this.state.rowSelected0[0]?.SpecifiedId : this.state.rowSelected0[0]?.Id}
                        Li_TextFile={'OCR\\' + this.state.rowSelected0[0]?.Ocr}
                        onFinishScreen={() => {
                          this.closeModal()
                        }}
                      />
                    ,
                  },
                });
              }}
            >チェック</Button>
          </Space>
          <hr style={{ margin: '20px 0' }} />
          <Row gutter={24}>
            <Col span={7} style={{ borderRight: '1px solid #0761c1' }}>
              <div>
                <Table
                  size='small'
                  style={{ cursor: 'pointer' }}
                  rowClassName={(record, index) => record.id === this.state.rowSelected0[0]?.id ? 'table-row-light' : ''}
                  dataSource={this.state.dataSource0}
                  loading={this.state.isLoadingTable0}
                  pagination={false}
                  scroll={{ x: 350, y: 650 }}
                  bordered
                  rowKey={(res) => res.id}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: async () => {
                        let index = this.state.dataSource0.findIndex(x => x.id === record.id)
                        await this.setState({
                          rowSelected0: [record],
                          selectedRowKeys0: [record.id],
                          indexTable0: index,
                          old_No: record.No
                        });
                        await this.changeRow(index, 'Capture')
                        this.getDataOrcFormat(true)
                      }
                    };
                  }}
                >
                  <Table.Column title="No" dataIndex="No" width={50} align="center"
                    render={(value, record, index) => {
                      return (
                        <div>
                          {this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) ?
                            <span>{record.No}</span>
                            :
                            <Input value={record.No} maxLength={2} style={{ textAlign: 'center' }}
                              onChange={(event) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "No", event.target.value, 'Capture')
                              }}
                            />
                          }
                        </div>
                      )
                    }} />
                  <Table.Column title="帳票名" dataIndex="Identifier"
                    render={(value, record, index) => {
                      return (
                        <div>
                          {this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) ?
                            <div style={{ paddingLeft: 7 }}>{record.Identifier}</div>
                            :
                            <Input value={record.Identifier}
                              onChange={(event) => {
                                this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "Identifier", event.target.value, 'Capture')
                              }}
                            />
                          }
                        </div>
                      )
                    }}
                  />
                  <Table.Column width={70}
                    title={
                      <div style={{ textAlign: "center" }}>
                        <Button size='small'
                          disabled={this.checkDisabledBtnAdd('Capture')}
                          onClick={() => this.handleAddRowTable('Capture')}
                          type="primary" icon={<PlusOutlined />}>
                        </Button>
                      </div>
                    }
                    render={(text, record, index) => {
                      return <div style={{ textAlign: "center" }}
                        hidden={this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id)}>
                        <Button size='small'
                          hidden={this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) || this.checkAddItem('Capture')
                            || !(this.state.dataSource0[this.state.indexTable0] && this.state.dataSource0[this.state.indexTable0].No)}
                          onClick={() => { this.saveDataOrcCapture(this.findIndexByID(this.state.dataSource0, record.id), true) }}
                          style={{ color: 'green', marginRight: '5px' }}
                          icon={<SaveOutlined />} >
                        </Button>
                        <Button size='small'
                          onClick={() => {
                            this.checkIdTemp(record.id) ? this.handleDeleteRowTable('Capture') : this.deleteDataOrcCapture(record.id)
                          }}
                          style={{ color: 'red' }}
                          icon={<DeleteOutlined />}
                        >
                        </Button>
                      </div>;
                    }}
                  />
                </Table>
              </div>
            </Col>
            <Col span={17}>
              <Spin spinning={this.state.isSpinForm}>
                <Form ref={this.formRef}>
                  <Row gutter={24} className="mb-1" style={{ marginLeft: '-8px', paddingBottom: 10, borderBottom: '1px solid #0761c1' }}>
                    <Col span={8}>
                      <Form.Item {...smGrid} label="ID混在" valuePropName='checked'>
                        <Checkbox checked={this.state.rowSelected0[0]?.ReadId === 1}
                          onChange={(e) => {
                            this.updateDatasource(this.state.indexTable0, "ReadId", e.target.checked ? 1 : 0, 'Capture')
                          }}
                        ></Checkbox>
                      </Form.Item>
                      <Form.Item {...smGrid} label="二次取込" valuePropName='checked'>
                        <Checkbox checked={this.state.rowSelected0[0]?.SecondaryCapture === 1}
                          onChange={(e) => {
                            this.updateDatasource(this.state.indexTable0, "SecondaryCapture", e.target.checked ? 1 : 0, 'Capture')
                          }}
                        ></Checkbox>
                      </Form.Item>
                      <Form.Item {...smGrid} label="ﾌｫｰﾏｯﾄ">
                        <Input.Search type="text" value={this.state.rowSelected0[0]?.Id}
                          onSearch={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 800,
                                component:
                                  <WS0451001_UserParamQuery
                                    Lio_Format={this.state.rowSelected0[0]?.Id}
                                    onFinishScreen={({ Lio_Format }) => {
                                      this.updateDatasource(this.state.indexTable0, "Id", Lio_Format, 'Capture')
                                      this.closeModal()
                                    }}
                                  />
                                ,
                              },
                            });
                          }}
                          onChange={(e) => {
                            this.updateDatasource(this.state.indexTable0, "Id", e.target.value, 'Capture')
                          }} />
                      </Form.Item>
                      <Form.Item label={this.state.rowSelected0[0]?.ReadId === 1 ? this.state.rowSelected0[0]?.Expression_34 ? this.state.rowSelected0[0]?.Expression_34 : ' ' : ' '} {...smGrid}>
                        {this.state.rowSelected0[0]?.ReadId === 1 ?
                          <Input.Search value={this.state.rowSelected0[0]?.SpecifiedId}
                            onSearch={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: true,
                                  width: 800,
                                  component:
                                    <WS0451001_UserParamQuery
                                      Lio_Format={this.state.rowSelected0[0]?.SpecifiedId}
                                      onFinishScreen={({ Lio_Format }) => {
                                        this.updateDatasource(this.state.indexTable0, "SpecifiedId", Lio_Format, 'Capture')
                                        this.closeModal()
                                      }}
                                    />
                                  ,
                                },
                              });
                            }}
                            onChange={(e) => {
                              this.updateDatasource(this.state.indexTable0, "SpecifiedId", e.target.value, 'Capture')
                            }}
                          />
                          :
                          <Input readOnly />
                        }

                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item {...grid} label="取込ﾃｷｽﾄ" >
                        <Input type="text" value={this.state.rowSelected0[0]?.Ocr}
                          onChange={(e) => {
                            this.updateDatasource(this.state.indexTable0, "Ocr", e.target.value, 'Capture')
                          }}

                          addonAfter={<UploadOutlined style={{ color: '#096dd9' }}
                            onClick={() => {
                              document.getElementById("idUpload1").click()
                            }}
                          />}
                        />
                        <div hidden>
                          <Upload id="idUpload1"
                            accept=".txt,.csv"
                            beforeUpload={(file) => {
                              return new Promise(resolve => {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                  this.updateDatasource(this.state.indexTable0, "Ocr", file.name, 'Capture')
                                };
                              });
                            }}><span hidden></span>
                          </Upload>
                        </div>
                      </Form.Item>
                      <Form.Item {...grid} label="ﾘﾈｰﾑﾃｷｽﾄ" >
                        <Input type="text" value={this.state.rowSelected0[0]?.Rename}
                          onChange={(e) => {
                            this.updateDatasource(this.state.indexTable0, "Rename", e.target.value, 'Capture')
                          }}

                          addonAfter={<UploadOutlined style={{ color: '#096dd9' }}
                            onClick={() => {
                              document.getElementById("idUpload2").click()
                            }}
                          />}
                        />
                        <div hidden>
                          <Upload id="idUpload2"
                            accept=".txt,.csv"
                            beforeUpload={(file) => {
                              return new Promise(resolve => {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                  this.updateDatasource(this.state.indexTable0, "Rename", file.name, 'Capture')
                                };
                              });
                            }}><span hidden></span>
                          </Upload>
                        </div>
                      </Form.Item>
                      <Form.Item {...grid} label="健診ﾃｷｽﾄ" >
                        <Input type="text" value={this.state.rowSelected0[0]?.MedicalExam}
                          onChange={(e) => {
                            this.updateDatasource(this.state.indexTable0, "MedicalExam", e.target.value, 'Capture')
                          }}

                          addonAfter={<UploadOutlined style={{ color: '#096dd9' }}
                            onClick={() => {
                              document.getElementById("idUpload3").click()
                            }}
                          />}
                        />
                        <div hidden>
                          <Upload id="idUpload3"
                            accept=".txt,.csv"
                            beforeUpload={(file) => {
                              return new Promise(resolve => {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                  this.updateDatasource(this.state.indexTable0, "MedicalExam", file.name, 'Capture')
                                };
                              });
                            }}><span hidden></span>
                          </Upload>
                        </div>

                      </Form.Item>
                      <Form.Item {...grid} label="ｴﾗｰ ﾃｷｽﾄ" >
                        <Input type="text" value={this.state.rowSelected0[0]?.Error}
                          onChange={(e) => {
                            this.updateDatasource(this.state.indexTable0, "Error", e.target.value, 'Capture')
                          }}

                          addonAfter={<UploadOutlined style={{ color: '#096dd9' }}
                            onClick={() => {
                              document.getElementById("idUpload4").click()
                            }}
                          />}
                        />
                        <div hidden>
                          <Upload id="idUpload4"
                            accept=".txt,.csv"
                            beforeUpload={(file) => {
                              return new Promise(resolve => {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                  this.updateDatasource(this.state.indexTable0, "Error", file.name, 'Capture')
                                };
                              });
                            }}><span hidden></span>
                          </Upload>
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24} style={{ marginBottom: '15px', marginTop: '15px' }}>
                    <Col span={14}>
                      <Table
                        size='small'
                        style={{ cursor: 'pointer' }}
                        rowClassName={(record, index) => record.id === this.state.rowSelected1[0]?.id ? 'table-row-light' : ''}
                        dataSource={this.state.dataSource1}
                        loading={this.state.isLoadingTable1}
                        pagination={false}
                        scroll={{ x: 600, y: 500 }}
                        bordered
                        rowKey={(res) => res.id}
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: async () => {
                              let index = this.state.dataSource1.findIndex(x => x.id === record.id)
                              await this.setState({
                                rowSelected1: [record],
                                selectedRowKeys1: [record.id],
                                indexTable1: index,
                                old_seq: record.seq
                              });
                              await this.changeRow(index, 'FormatOption')
                              this.getDataAdvanceSetting()
                            }
                          };
                        }}
                      // rowSelection={{
                      //   type: 'radio',
                      //   fixed: 'left',
                      //   selectedRowKeys: this.state.selectedRowKeys1,
                      //   onSelect: async (record, selected, selectedRows) => {
                      //     let index = this.state.dataSource1.findIndex(x => x.id === record.id)
                      //     await this.setState({
                      //       rowSelected1: selectedRows,
                      //       selectedRowKeys1: selectedRows.map(x => x.id),
                      //       indexTable1: index,
                      //       old_seq: record.seq
                      //     });

                      //     this.getDataAdvanceSetting()
                      //   },
                      // }}
                      >
                        <Table.Column title="順" dataIndex="seq" width={70}
                          render={(value, record, index) => {
                            return (
                              <div>
                                {this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) ?
                                  <div style={{ textAlign: 'right', marginRight: 7 }}>{record.seq > 0 ? record.seq : ''}</div>
                                  :
                                  <InputNumber maxLength={8} value={record.seq > 0 ? record.seq : ''}
                                    onChange={(value) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "seq", value, 'FormatOption')
                                    }}
                                  />
                                }
                              </div>
                            )
                          }}
                        />
                        <Table.Column title="種別" dataIndex="kind"
                          render={(value, record, index) => {
                            return (
                              <div>
                                {this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) ? 
                                  <div style={{ paddingLeft: 7, color: '#0707da' }}>{record.kind}</div>
                                  :
                                  <Input.Search maxLength={10} value={record.kind}
                                    style={{ color: '#0707da' }}
                                    onSearch={() => {
                                      this.setState({
                                        childModal: {
                                          ...this.state.childModal,
                                          visible: true,
                                          width: 800,
                                          component: (
                                            <WS0397001_ParamPromptedQuerySub
                                              Li_Format={'0'}
                                              Li_IndicationDivision={record.kind}
                                              instruction_division={record.kind}
                                              Lio_Name={record.remarks}
                                              Lio_Option={record.option_remark}
                                              onFinishScreen={(output) => {
                                                this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "kind", output.Lo_IndicationDivision, 'FormatOption')
                                                this.closeModal()
                                              }}
                                            />
                                          ),
                                        },
                                      });
                                    }}
                                    onChange={(e) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "kind", e.target.value, 'FormatOption')
                                    }}
                                  />
                                }
                              </div>
                            )
                          }} />
                        <Table.Column title="名称" dataIndex="remarks"
                          render={(value, record, index) => {
                            return (
                              <div>
                                {this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) ?
                                  <div style={{ paddingLeft: 7 }}>{record.remarks}</div>
                                  :
                                  <Input maxLength={20} value={record.remarks}
                                    onChange={(e) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "remarks", e.target.value, 'FormatOption')
                                    }}
                                  />
                                }
                              </div>
                            )
                          }} />
                        <Table.Column title="位置" dataIndex="position" width={60}
                          render={(value, record, index) => {
                            return (
                              <div>
                                {this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) ?
                                  <div style={{ textAlign: 'right', paddingRight: 7 }}>{record.position > 0 ? record.position : ''}</div>
                                  :
                                  <InputNumber maxLength={4} value={record.position > 0 ? record.position : ''}
                                    onChange={(value) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "position", value, 'FormatOption')
                                    }}
                                  />
                                }
                              </div>
                            )
                          }}
                        />
                        <Table.Column title="桁数" dataIndex="number_of_digits" width={60}
                          render={(value, record, index) => {
                            return (
                              <div>
                                {this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) ?
                                  <div style={{ textAlign: 'right', paddingRight: 7 }}>{record.number_of_digits > 0 ? record.number_of_digits : ''}</div>
                                  :
                                  <InputNumber maxLength={5} value={record.number_of_digits > 0 ? record.number_of_digits : ''}
                                    onChange={(value) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource1, record.id), "number_of_digits", value, 'FormatOption')
                                    }}
                                  />
                                }
                              </div>
                            )
                          }} />
                        <Table.Column width={70}
                          title={
                            <div style={{ textAlign: "center" }}>
                              <Button size='small'
                                disabled={this.checkDisabledBtnAdd('FormatOption')}
                                onClick={() => this.handleAddRowTable('FormatOption')}
                                type="primary" icon={<PlusOutlined />}>
                              </Button>
                            </div>
                          }
                          render={(text, record, index) => {
                            return <div style={{ textAlign: "center" }}
                              hidden={this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id)}>
                              <Button size='small'
                                hidden={this.state.indexTable1 !== this.findIndexByID(this.state.dataSource1, record.id) || this.checkAddItem('FormatOption')
                                  || !(this.state.dataSource1[this.state.indexTable1] && this.state.dataSource1[this.state.indexTable1].seq)}
                                onClick={() => { this.saveDataOrcFormat(this.findIndexByID(this.state.dataSource1, record.id), true) }}
                                style={{ color: 'green', marginRight: '5px' }}
                                icon={<SaveOutlined />} >
                              </Button>
                              <Button size='small'
                                onClick={() => {
                                  this.checkIdTemp(record.id) ? this.handleDeleteRowTable('FormatOption') : this.deleteDataOrcFormat(record.id)
                                }}
                                style={{ color: 'red' }}
                                icon={<DeleteOutlined />}
                              >
                              </Button>
                            </div>;
                          }}
                        />
                      </Table>
                    </Col>
                    <Col span={10}>
                      <Row gutter={16} style={{ marginBottom: 15 }}>
                        <label>設定</label>
                        <Form.Item {...smGrid} name="Lio_SetPattern">
                          <Input maxLength={5} style={{ width: 60, marginRight: 10, marginLeft: 5 }} />
                        </Form.Item>
                        <label>属性</label>
                        <Form.Item  {...smGrid} name="Lio_Attribute" >
                          <Input maxLength={1} style={{ width: 30, marginRight: 10, marginLeft: 5 }} />
                        </Form.Item>
                        <label>ｴﾗｰ</label>
                        <Form.Item {...smGrid} name="Lio_ErrorCheck">
                          <Input maxLength={1} style={{ width: 30, marginRight: 10, marginLeft: 5 }} />
                        </Form.Item>
                        <Button
                          disabled={!this.state.rowSelected1[0]?.id}
                          style={{ color: '#42b10b', marginRight: '5px', padding: 0, width: 25, border: '1px solid', borderRadius: 5 }}
                          icon={<SaveOutlined />}
                          onClick={() => {
                            this.saveDataAdvanceSetting()
                          }}
                        >
                        </Button>
                      </Row>
                      <Table
                        size='small'
                        style={{ cursor: 'pointer' }}
                        rowClassName={(record, index) => record.id === this.state.rowSelected2[0]?.id ? 'table-row-light' : ''}
                        dataSource={this.state.dataSource2}
                        loading={this.state.isLoadingTable2}
                        pagination={false}
                        scroll={{ x: 400, y: 500 }}
                        bordered
                        rowKey={(res) => res.id}
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: async () => {
                              let index = this.state.dataSource2.findIndex(x => x.id === record.id)
                              await this.setState({
                                rowSelected2: [record],
                                selectedRowKeys2: [record.id],
                                indexTable2: index,
                                old_W1_serial_num: record.W1_serial_num
                              });
                            }
                          };
                        }}
                      >
                        <Table.Column title="連番" dataIndex="W1_serial_num" width={50}
                          render={(value, record, index) => {
                            return (
                              <div>
                                {this.state.indexTable2 !== this.findIndexByID(this.state.dataSource2, record.id) ?
                                  <div style={{ textAlign: 'right', paddingRight: 7 }}>{record.W1_serial_num > 0 ? record.W1_serial_num : ''}</div>
                                  :
                                  <InputNumber maxLength={2} value={record.W1_serial_num > 0 ? record.W1_serial_num : ''}
                                    onChange={(value) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource2, record.id), "W1_serial_num", value, 'FormatSetting')
                                    }}
                                  />
                                }
                              </div>
                            )
                          }} />
                        <Table.Column title="項目" dataIndex="W1_item"
                          render={(value, record, index) => {
                            return (
                              <div>
                                {this.state.indexTable2 !== this.findIndexByID(this.state.dataSource2, record.id) ?
                                   <div style={{ paddingLeft: 7 }}>{record.W1_item}</div>
                                  :
                                  <Input value={record.W1_item}
                                    onChange={(e) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource2, record.id), "W1_item", e.target.value, 'FormatSetting')
                                    }}
                                  />
                                }
                              </div>
                            )
                          }} />
                        <Table.Column title="内容" dataIndex="W1_content"
                          render={(value, record, index) => {
                            return (
                              <div>
                                {this.state.indexTable2 !== this.findIndexByID(this.state.dataSource2, record.id) ?
                                  <div style={{ paddingLeft: 7 }}>{record.W1_content}</div>
                                  :
                                  <Input value={record.W1_content}
                                    onChange={(e) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource2, record.id), "W1_content", e.target.value, 'FormatSetting')
                                    }}
                                  />
                                }
                              </div>
                            )
                          }} />
                        <Table.Column title="備考" dataIndex="Remarks"
                          render={(value, record, index) => {
                            return (
                              <div>
                                {this.state.indexTable2 !== this.findIndexByID(this.state.dataSource2, record.id) ?
                                 <div style={{ paddingLeft: 7 }}>{record.Remarks}</div>
                                  :
                                  <Input value={record.Remarks}
                                    onChange={(e) => {
                                      this.updateDatasource(this.findIndexByID(this.state.dataSource2, record.id), "Remarks", e.target.value, 'FormatSetting')
                                    }}
                                  />
                                }
                              </div>
                            )
                          }}
                        />
                        <Table.Column width={80}
                          title={
                            <div style={{ textAlign: "center" }}>
                              <Space>
                                <Button size='small'
                                  disabled={!this.state.rowSelected1[0]?.id}
                                  onClick={() => this.handleAddRowTable('FormatSetting')}
                                  type="primary" icon={<PlusOutlined />}>
                                </Button>
                                <Button size='small'
                                  disabled={this.state.dataSource2.length === 0 || !this.state.rowSelected1[0]?.id}
                                  onClick={() => { this.updateOptionInput() }}
                                  style={{ color: '#42b10b', marginRight: '5px', padding: 0, width: 25, border: '1px solid', borderRadius: 4 }}
                                  icon={<SaveOutlined />} >
                                </Button>
                              </Space>
                            </div>
                          }
                          render={(text, record, index) => {
                            return <div style={{ textAlign: "center" }}
                              hidden={this.state.rowSelected2[0]?.id !== record.id}>
                              <Button size='small'
                                onClick={() => {
                                  this.handleDeleteRowTable('FormatSetting', index)
                                }}
                                style={{ color: 'red' }}
                                icon={<DeleteOutlined />}
                              >
                              </Button>
                            </div>;
                          }}
                        />
                      </Table>
                    </Col>

                  </Row>
                  <Form.Item >
                    <Input.TextArea rows={2} readOnly value={this.state.rowSelected1[0]?.option_remark} />
                  </Form.Item>
                </Form>
              </Spin>
            </Col>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1107001_SettingOcrCapture);
