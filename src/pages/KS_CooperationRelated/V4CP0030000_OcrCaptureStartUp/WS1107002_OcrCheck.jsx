import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Table, Row, Col, Button, Form, Input, Checkbox, message, Modal } from "antd";
// import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import OcrCheckAction from "redux/CooperationRelated/OcrCaptureStartUp/OcrCheck.action";
import WS0451001_UserParamQuery from "pages/KK_ResultOutput/V4MS9901100_CsvCreateParamMaintain/WS0451001_UserParamQuery";
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1107002_OcrCheck extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_Format: PropTypes.any,
    ReadId: PropTypes.any,
    SpecifiedId: PropTypes.any,
    Id: PropTypes.any,
    Li_TextFile: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'OCRチェック';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      dataSource0: [],
      isLoadingTable0: false,
      rowSelected0: [],
      selectedRowKeys0: [],
      indexTable0: 0,
      old_W1_serial_num_the_primary_key: null,

      dataSource1: [],
      isLoadingTable1: false,
      rowSelected1: [],
      selectedRowKeys1: [],
      indexTable1: 0,

      StsAll: 0,
    };
  }

  componentDidMount = () => {
    this.formRef.current?.setFieldsValue({
      Format: this.props.Li_Format,
      StsAll: false,
    });
    this.getDataOcrCheck()
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.formRef.current?.setFieldsValue({
        Format: this.props.Li_Format,
        StsAll: false,
      });
      this.getDataOcrCheck()
    }
  };

  getDataOcrCheck() {
    let params = {
      ReadId: this.props.ReadId ? this.props.ReadId : '',
      SpecifiedId: this.props.SpecifiedId ? this.props.SpecifiedId : '',
      Id: this.props.Id ? this.props.Id : '',
      Ocr: this.props.Li_TextFile ? this.props.Li_TextFile : '',
    }

    this.setState({ isLoadingTable0: true })

    OcrCheckAction.getDataOcrCheck(params)
      .then(async (res) => {
        let data = res ? res : []
        await this.setState({
          dataSource0: res ? res : [],
          isLoadingTable0: false,
          rowSelected0: res && data.length > 0 ? [data[0]] : [],
          selectedRowKeys0: res && data.length > 0 ? [data[0].id] : [],
          indexTable0: 0,
          old_W1_serial_num_the_primary_key: res && data.length > 0 ? data[0].W1_serial_num_the_primary_key : null,
        })

        this.getDataContent()
      })
      .finally(() => this.setState({ isLoadingTable0: false }))
  }

  getDataContent() {
    let params = {
      Format: this.formRef.current?.getFieldValue('Format'),
      StsAll: this.formRef.current?.getFieldValue('StsAll') ? 1 : 0,
      W1_remark: this.state.rowSelected0[0]?.W1_remark,
    }

    OcrCheckAction.getDataContent(params)
      .then((res) => {
        let data = res ? res : []
        this.setState({
          dataSource1: res ? res : [],
          isLoadingTable1: false,
          rowSelected1: res && data.length > 0 ? [data[0]] : [],
          selectedRowKeys1: res && data.length > 0 ? [data[0].id] : [],
          indexTable1: 0,
        })
      })
  }

  fileAcquisition_F12() {
    let params = {
      Ocr: this.props.Li_TextFile ? this.props.Li_TextFile : ''
    }

    OcrCheckAction.fileAcquisition_F12(params)
      .then((res) => {
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen({})
        }
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

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  checkDisabledBtnAdd() {
    if (this.state.rowSelected0.length > 0) {
      if (this.checkIdTemp(this.state.rowSelected0[0].id) ||
        (!this.checkIdTemp(this.state.rowSelected0[0].id) &&
          this.state.rowSelected0[0].W1_serial_num_the_primary_key !== this.state.old_W1_serial_num_the_primary_key)) {
        return true;
      } return false;
    } return false;
  }

  // add new record
  async handleAddRowTable() {
    let newRow = { id: '' };

    let data = [];
    newRow = { ...newRow }
    data = [...this.state.dataSource0]
    data.unshift(newRow);
    await this.setState({
      dataSource0: data,
      rowSelected0: [newRow],
      selectedRowKeys0: [newRow.id],
      indexTable0: 0,
    });
    this.forceUpdate();
  }


  // check selected record while add new
  changeRow(index) {
    let data = [...this.state.dataSource0]

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
        selectedRowKeys0: [data[0].id],
        indexTable0: 0
      });
    } else {
      this.setState({
        indexTable0: index
      });
    }
  }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource0]

    data[index][field] = value;

    this.setState({
      dataSource0: data
    });
  }

  async handleDeleteRowTable() {
    let data = [...this.state.dataSource0]

    data.splice(0, 1);
    await this.setState({
      dataSource0: data,
      indexTable0: 0,
      rowSelected0: data.length > 0 ? [data[0]] : [],
      selectedRowKeys0: data.length > 0 ? [data[0].id] : [],
      old_W1_serial_num_the_primary_key: data.length > 0 ? data[0].W1_serial_num_the_primary_key : null
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
      <div className="ocr-check">
        <Card title="OCRチェック">
          <Form ref={this.formRef} >
            <Row gutter={24} style={{ marginBottom: 15 }}>
              <Form.Item name="Format" label="ﾌｫｰﾏｯﾄ" style={{ margin: '0 10px 15px 15px' }}>
                <Input.Search
                  onSearch={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 600,
                        component:
                          <WS0451001_UserParamQuery
                            Lio_Format={this.formRef.current?.getFieldValue('Format')}
                            onFinishScreen={({ Lio_Format }) => {
                              this.formRef.current?.setFieldsValue({
                                Format: Lio_Format
                              })
                              this.closeModal()
                            }}
                          />
                        ,
                      },
                    });
                  }}
                />
              </Form.Item>
              <Form.Item name="StsAll" valuePropName='checked'>
                <Checkbox
                  onChange={() => {
                    this.getDataOcrCheck()
                  }}
                >全表示</Checkbox>
              </Form.Item>
            </Row>
          </Form>
          <Table
            style={{ marginBottom: 15 }}
            size='small'
            dataSource={this.state.dataSource0}
            loading={this.state.isLoadingTable0}
            pagination={false}
            rowKey={(res) => res.id}
            bordered={true}
            rowSelection={{
              type: 'radio',
              selectedRowKeys: this.state.selectedRowKeys0,
              onSelect: async (record, selected, selectedRows) => {
                let index = this.state.dataSource0.findIndex(x => x.id === record.id)
                await this.setState({
                  rowSelected0: selectedRows,
                  selectedRowKeys0: selectedRows.map(x => x.id),
                  indexTable0: index,
                  old_W1_serial_num_the_primary_key: record.W1_serial_num_the_primary_key
                });
                this.getDataContent()
              },
            }}
          >
            <Table.Column title="No" dataIndex="W1_serial_num_the_primary_key" width={70}
              render={(value, record, index) => {
                return (
                  <div>{record.W1_serial_num_the_primary_key}</div>
                  // <div>
                  //   {this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) ?
                  //     <div style={{ textAlign: "right" }}>{record.W1_serial_num_the_primary_key}</div>
                  //     :
                  //     <Input value={record.No} maxLength={2} style={{ textAlign: 'right' }}
                  //       onChange={(event) => {
                  //         this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "W1_serial_num_the_primary_key", event.target.value)
                  //       }}
                  //     />
                  //   }
                  // </div>
                )
              }}
            />
            <Table.Column title="OCRﾃｷｽﾄ内容" dataIndex="W1_remark"
              render={(value, record, index) => {
                return (
                  <div>
                    <span>{record.W1_remark}</span>
                  </div>
                  // <div>
                  //   {this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id) ?
                  //     <span>{record.W1_remark}</span>
                  //     :
                  //     <Input value={record.W1_remark}
                  //       onChange={(event) => {
                  //         this.updateDatasource(this.findIndexByID(this.state.dataSource0, record.id), "W1_remark", event.target.value)
                  //       }}
                  //     />
                  //   }
                  // </div>
                )
              }} />
            {/* <Table.Column width={90} hidden
              title={
                <div style={{ textAlign: "center" }}>
                  <Button
                    disabled={this.checkDisabledBtnAdd()}
                    onClick={() => this.handleAddRowTable()}
                    type="primary" icon={<PlusOutlined />}>
                  </Button>
                </div>
              }
              render={(text, record, index) => {
                return <div style={{ textAlign: "center" }}>
                  <Button
                    hidden={this.state.indexTable0 !== this.findIndexByID(this.state.dataSource0, record.id)
                      || !(this.state.dataSource0[this.state.indexTable0] && this.state.dataSource0[this.state.indexTable0].W1_serial_num_the_primary_key)}
                    // onClick={() => { this.saveDataOrcCapture(this.findIndexByID(this.state.dataSource0, record.id), true) }}
                    style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                    icon={<SaveOutlined />} >
                  </Button>
                  <Button style={{ border: 'none' }}
                    onClick={() => {
                      // this.checkIdTemp(record.id) ? this.handleDeleteRowTable() : this.deleteDataOrcCapture(record.id)
                      this.handleDeleteRowTable()
                    }}
                    danger
                    icon={<DeleteOutlined />}
                  >
                  </Button>
                </div>;
              }}
            /> */}
          </Table>

          <Table
            size='small'
            pagination={true}
            dataSource={this.state.dataSource1}
            loading={this.state.isLoadingTable1}
            bordered={true}
            rowKey={(res) => res.id}
            className="mb-3"
          >
            <Table.Column title="順" dataIndex="seq" align="center" width={80}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: "right" }}>
                    {record.seq}
                  </div>
                )
              }} />
            <Table.Column title="種別" dataIndex="kind" align="center"
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: "left", color: Color(211).Foreground }}>
                    {record.kind}
                  </div>
                )
              }} />
            <Table.Column title="名称" dataIndex="remarks" align="center"
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: "left" }}>
                    {record.remarks}
                  </div>
                )
              }} />
            <Table.Column title="位置" dataIndex="position" align="center" width={60}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: "right" }}>
                    {record.position}
                  </div>
                )
              }} />
            <Table.Column title="桁数" dataIndex="number_of_digits" align="center" width={70}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: "right" }}>
                    {record.number_of_digits}
                  </div>
                )
              }} />
            <Table.Column title="取得内容" dataIndex="GetContent" align="center"
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: "left" }}>
                    {record.GetContent}
                  </div>
                )
              }} />
          </Table>
          <Row gutter={16}>
            <Col span={24}>
              <Button type="primary" style={{ float: 'right' }}
                onClick={() => {
                  this.fileAcquisition_F12()
                }}
              >ﾌｧｲﾙ取得</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1107002_OcrCheck);
