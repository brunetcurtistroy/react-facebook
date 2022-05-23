import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Table, Modal, Button, message, Input, Form } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import {
  getPrintParamMaintainAction, deletePrintParamMaintainAction, savePrintParamMaintainAction, itemF12Action, stsChangeAction, printf10
} from "redux/ResultOutput/PrintParamMaintain/PrintParamMaintain.actions";
import WS0855009_PrintParamInput from "./WS0855009_PrintParamInput";
import WS0855028_StyleCopy from "./WS0855028_StyleCopy";
import WS0863001_PrintParamInputOutput from "./WS0863001_PrintParamInputOutput";
import WS0434016_PrinterDesignScreenResultTbl from "./WS0434016_PrinterDesignScreenResultTbl";
import WS0434022_PrinterDesignScreenReserveRelated from "./WS0434022_PrinterDesignScreenReserveRelated";
import WS0857001_OldItem from "./WS0857001_OldItem";
import Color from "constants/Color";
import Menubar from "components/Commons/Menubar";
import WSFileManager_FileManager from "pages/ZZ_Others/CUSTOMIZE_Custom/WSFileManager_FileManager";

const styleFormItem = {
  margin: 0
}
class WS0855001_PrintParamMaintain extends React.Component {
  static propTypes = {
    Li_MenuOption: PropTypes.any,
    Li_MenuAdminRights: PropTypes.any,
    Li_MenuAuthority: PropTypes.any,
    Li_SubjectNotBeChangedMode: PropTypes.any,
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // document.title = '印刷パラメータ保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 13,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      isAddRow: false,
      menuItems: [
        { id: 1, label: '複写', handleClick: this.eventF7 },
        { id: 2, label: '入出力', handleClick: this.eventF9 },
        { id: 3, label: '印刷', handleClick: this.eventF10 },
        { id: 4, label: '旧明細', handleClick: this.eventF11 },
        { id: 5, label: '明細', handleClick: this.eventF12 },
      ],
      menus: [{ id: 1, label: 'VREPORTフォルダ', handleClick: this.VariousSetting01 }]
    };
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = () => {
    this.setState({ isLoading: true });
    getPrintParamMaintainAction()
      .then(res => {
        if (res) {
          this.setState({
            dataSource: res.data,
            rowSelect: res.data.length > 0 ? res.data[0] : {}
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  createOrUpdateRecord = (record) => {
    const params = {
      style_code: record.style_code,
      format_name: record.format_name
    }
    savePrintParamMaintainAction(params)
      .then(res => {
        message.success('成功');
        this.loadData();
        this.setState({ isAddRow: false })
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  deleteRecord = (record, index) => {
    if (record.id && !record.isNew) {
      deletePrintParamMaintainAction({ id: record.id })
        .then(res => {
          message.success('成功');
          this.loadData();
        })
        .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
    }
    let arrTemp = [...this.state.dataSource];
    arrTemp.splice(index, 1);
    this.setState({
      dataSource: arrTemp,
      rowSelect: arrTemp.length > 0 ? arrTemp[0] : {},
      isAddRow: false
    });
  }

  onChangeInput = (event, record) => {
    let { value, name } = event.target;
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      }
      arrTemp[index] = objTemp
      this.setState({ dataSource: arrTemp })
    }
  }

  findIndexByID = (arrayData, recordID) => arrayData.findIndex((item) => recordID === item.id);

  addRow = () => {
    this.setState({ isAddRow: true })
    if (!this.state.isAddRow) {
      let obj = {
        // id: Math.round(Math.random() * 1000),
        isNew: true,
      };
      let arr = [...this.state.dataSource];
      let index = arr.findIndex(item => item.id === this.state.rowSelect.id);
      arr.splice(index + 1, 0, obj); // array.splice(startIndex, deleteCount, itemsNew)
      this.setState({ dataSource: arr, rowSelect: obj })
    }
  }

  renderSaveAndDeleteRecord = (record, index) => (
    <>
      <Button
        size='small'
        style={{ border: 'none', display: record.id ? 'none' : '' }}
        icon={<SaveOutlined style={{ color: 'green' }} />}
        onClick={() => this.createOrUpdateRecord(record)}
      />
      <Button
        size='small'
        style={{ border: 'none', }}
        danger icon={<DeleteOutlined />}
        onClick={() => {
          Modal.confirm({
            content: '消去してもよろしいですか？',
            okText: 'は　い',
            cancelText: 'いいえ',
            onOk: () => this.deleteRecord(record, index)
          })
        }}
      />
    </>
  )

  ReturnComponent = (component) => {
    let components = {
      WS0855009_PrintParamInput,
      WS0855028_StyleCopy,
      WS0863001_PrintParamInputOutput,
      WS0434016_PrinterDesignScreenResultTbl,
      WS0434022_PrinterDesignScreenReserveRelated,
      WS0857001_OldItem,
    };
    return components[component];
  }

  callModal = (props, width, nameScreen) => {
    let Component = this.ReturnComponent(nameScreen);
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: width,
        component: (
          <Component
            {...props}
            onFinishScreen={({ Lo_StsChange }) => {
              if (nameScreen === 'WS0855009_PrintParamInput') {
                stsChangeAction({ style_code: this.state.rowSelect.style_code, StsChange: Lo_StsChange })
                  .then()
                  .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }

  eventF7 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '400px',
        component: (
          <WS0855028_StyleCopy
            Li_FormatName={this.state.rowSelect.format_name}
            Li_StyleCode={this.state.rowSelect.style_code}
            onFinishScreen={(output) => {
              this.loadData()
              this.closeModal()
            }}
          />
        ),
      },
    })
  }

  eventF9 = () => {
    let props = {
      Li_WindowType: 1,
      Li_StyleCode: this.state.rowSelect.style_code,
      Li_FormatName: this.state.rowSelect.format_name
    }
    this.callModal(props, 400, 'WS0863001_PrintParamInputOutput')
  }

  eventF10 = () => {
    printf10({ style_code: this.state.rowSelect.style_code, StsListFormat: this.state.rowSelect.StsListFormat })
      .then(res => {
        if (res.data.message == "WS0434016_PrinterDesignScreenResultTbl") {
          let props = {
            Li_TextFile: res.data.variables.Li_TextFile,
            Li_Printer: 1,
            Li_Preview: res.data.variables.Lo_Preview,
            Li_ReserveRelatedAndResultsTabl: 1,
            Li_StyleCodeResultTable: this.state.rowSelect.style_code,
            Li_FormatList: res.data.variables.Li_FormatList
          }
          this.callModal(props, 400, 'WS0434016_PrinterDesignScreenResultTbl')
        }
        if (res.data.message == "WS0434022_PrinterDesignScreenReserveRelated") {
          let props = {
            Li_TextFile: res.data.variables.Li_TextFile,
            Li_Printer: 1,
            Li_Preview: res.data.variables.Lo_Preview,
            Li_ReserveRelatedAndResultsTabl: 1,
            Li_StyleCodeResultTable: this.state.rowSelect.style_code,
            Li_FormatList: res.data.variables.Li_FormatList
          }
          this.callModal(props, 400, 'WS0434022_PrinterDesignScreenReserveRelated')
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  eventF11 = () => {
    let props = {
      Li_StyleCode: this.state.rowSelect.style_code,
      Li_StsListFormat: this.state.rowSelect.StsListFormat,
    }
    this.callModal(props, '80%', 'WS0857001_OldItem')
  }

  eventF12 = () => {
    this.setState({ isLoading: true })
    itemF12Action({ style_code: this.state.rowSelect.style_code, StsListFormat: this.state.rowSelect.StsListFormat })
      .then(res => {
        let props = {
          Li_StyleCode: this.state.rowSelect.style_code,
          Li_StsListFormat: this.state.rowSelect.StsListFormat,
          Lo_StsChange: false,
        }
        this.callModal(props, '80%', 'WS0855009_PrintParamInput')
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  VariousSetting01 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 700,
        component: <WSFileManager_FileManager Li_Directory= {'VREPORT'} />,
      },
    });
  }

  render() {
    return (
      <div className="print-param-maintain">
        <Card title='印刷ﾊﾟﾗﾒｰﾀ保守'>
          <Form>
            <Menubar items={this.state.menuItems} menus={this.state.menus} />
            <Table
              className='mt-3'
              bordered
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
              }}
              rowKey={(record) => record.id}
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
            >
              <Table.Column title="様式" width={50} dataIndex="style_code"
                render={(text, record, index) => (
                  <Form.Item style={styleFormItem}>
                    <Input
                      maxLength={3}
                      value={record.style_code}
                      readOnly={record.id}
                      name='style_code'
                      bordered={record.id === this.state.rowSelect.id}
                      onChange={(e) => this.onChangeInput(e, record)} />
                  </Form.Item>
                )}
              />
              <Table.Column title="様式名称" dataIndex="format_name"
                render={(text, record, index) => (
                  <Form.Item style={styleFormItem}>
                    <Input
                      maxLength={40}
                      value={record.format_name}
                      readOnly={record.id}
                      name='format_name'
                      bordered={record.id === this.state.rowSelect.id}
                      onChange={(e) => this.onChangeInput(e, record)} />
                  </Form.Item>
                )}
              />
              <Table.Column title="区分" dataIndex="expression_16" width={70} align='center'
                render={(text, record) => <div style={{ color: Color(record?.expression_17)?.Foreground }}>{text}</div>}
              />
              <Table.Column title="ファイル名" dataIndex="expression_14" />
              <Table.Column
                align='center'
                width={70}
                title={<Button size='small' type='primary' disabled={this.state.isAddRow} icon={<PlusOutlined />} onClick={this.addRow} />}
                render={(text, record, index) => this.renderSaveAndDeleteRecord(record, index)}
              />
            </Table>
          </Form>
        </Card >
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
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0855001_PrintParamMaintain);
