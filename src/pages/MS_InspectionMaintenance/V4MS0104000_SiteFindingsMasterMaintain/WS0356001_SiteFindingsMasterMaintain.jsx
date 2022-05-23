import React from "react";
import { connect } from "react-redux";

import { Col, Input, Row, Table, Modal, Form, Button, message, Space, Dropdown, Menu, Card, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import WS0356005_CategoryYouAreUsing from 'pages/MS_InspectionMaintenance/V4MS0104000_SiteFindingsMasterMaintain/WS0356005_CategoryYouAreUsing.jsx';
import {
  getDataSiteFindingsMasterMaintainAction, getSiteTableAndFindingsTableAction,
  saveAndUpdateSiteFindingsMasterMaintainAction, deleteSiteFindingsMasterMaintainAction, deleteSiteTableAction, deleteFindingsTableAction
} from "redux/InspectionMaintenance/SiteFindingsMasterMaintain/SiteFindingsMasterMaintain.actions";
import Color from "constants/Color";
import { ModalCustom } from "components/Commons/ModalCustom";
import { ModalConfirm } from "components/Commons/ModalConfirm";
import Menubar from "components/Commons/Menubar";
import WS0351001_SiteFindingsCopySub from "./WS0351001_SiteFindingsCopySub";

const styleDiv = {
  textAlign: 'right',
  padding: '7px 0',
  color: '#14468C',
  fontWeight: 'bold',
  background: '#C8DCF5',
}
const styleCol = {
  borderRight: '1px solid #F0F0F0'
}
class WS0356001_SiteFindingsMasterMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '部位所見マスタ保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      classificationCode: '',

      dataSourceMain: [],
      rowSelectMain: {},
      isLoadingTableMain: false,

      dataSourceSubSite: [],
      rowSelectSubSite: {},
      isLoadingTableSubSite: false,

      dataSourceSubFinding: [],
      rowSelectSubFinding: {},
      isLoadingTableSubFinding: false,

      isAddRow: false,
      menuItems: [{ id: 1, label: '複写', handleClick: this.eventF9 }]
    };
  }

  componentDidMount = () => {
    this.loadDataMainTable();
  }

  loadDataMainTable = () => {
    getDataSiteFindingsMasterMaintainAction()
      .then(res => {
        if (res?.data) {
          this.setState({ 
            dataSourceMain: res.data,
            rowSelectMain: this.state.rowSelectMain.id ? this.state.rowSelectMain : res.data[0]
          });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoadingTableMain: false }))
  }

  loadDataSubTable(site_classification_code) {
    this.setState({
      isLoadingTableSubSite: true,
      isLoadingTableSubFinding: true
    })
    getSiteTableAndFindingsTableAction({ site_classification_code })
      .then(res => {
        if (res) {
          this.setState({
            dataSourceSubSite: res.data.SiteTable,
            dataSourceSubFinding: res.data.FindingsTable
          });
        }
      })
      .catch()
      .finally(() => this.setState({
        isLoadingTableSubSite: false,
        isLoadingTableSubFinding: false
      }))
  }

  updateOrCreateDataMain = (record) => {
    let params = {
      id: record.isNew ? '' : record.id,
      site_classification_code: record.site_classification_code,
      site_classification_name: record.site_classification_name,
      SiteTable: [],
      FindingsTable: []
    }
    this.saveAndUpdateSiteFindingsMasterMaintain(params);
  }

  updateOrCreateDataSite = (record) => {
    const { rowSelectMain } = this.state;
    let params = {
      id: rowSelectMain.id,
      site_classification_code: rowSelectMain.site_classification_code,
      site_classification_name: rowSelectMain.site_classification_name,
      SiteTable: [
        {
          id: record.isNew ? '' : record.id,
          site_code: record.site_code,
          search_short_name: record.search_short_name,
          site_name: record.site_name,
          expression_8: ''
        }
      ],
      FindingsTable: []
    }
    this.saveAndUpdateSiteFindingsMasterMaintain(params);
  }

  updateOrCreateDataFinding = (record) => {
    const { rowSelectMain } = this.state;
    let params = {
      id: rowSelectMain.id,
      site_classification_code: rowSelectMain.site_classification_code,
      site_classification_name: rowSelectMain.site_classification_name,
      SiteTable: [],
      FindingsTable: [
        {
          id: record.isNew ? '' : record.id,
          findings_code: record.findings_code,
          search_short_name: record.search_short_name,
          findings_name: record.findings_name,
          judgment_value: record.judgment_value
        }
      ]
    }
    this.saveAndUpdateSiteFindingsMasterMaintain(params);
  }

  saveAndUpdateSiteFindingsMasterMaintain = (params) => {
    this.setState({
      isLoadingTableMain: true,
      isLoadingTableSubSite: true,
      isLoadingTableSubFinding: true
    });
    saveAndUpdateSiteFindingsMasterMaintainAction(params)
      .then(res => {
        message.success('成功');
        this.loadDataMainTable();
      })
      .catch(err => {
        message.error(err.response.data.message)
      })
      .finally(() => this.setState({
        isLoadingTableMain: false,
        isLoadingTableSubSite: false,
        isLoadingTableSubFinding: false,
        isAddRow: false
      }))
  }

  deleteData = (record, index, select) => {
    if (record.id && !record.isNew) {
      switch (select) {
        case 'dataSourceMain':
          deleteSiteFindingsMasterMaintainAction({ id: record.id })
            .then(res => {
              message.success('成功');
              this.loadDataMainTable();
            })
            .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
          break;
        case 'dataSourceSubSite':
          deleteSiteTableAction({ id: record.id })
            .then(res => {
              message.success('成功');
              this.loadDataSubTable(this.state.classificationCode);
            })
            .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
          break;
        case 'dataSourceSubFinding':
          deleteFindingsTableAction({ id: record.id })
            .then(res => {
              message.success('成功');
              this.loadDataSubTable(this.state.classificationCode);
            })
            .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
          break;
        default: break;
      }
    }
    let nameRowSelect = '';
    if (select === 'dataSourceMain') {
      nameRowSelect = 'rowSelectSubSite'
    } else if (select === 'dataSourceSubSite') {
      nameRowSelect = 'rowSelectSubSite'
    } else if (select === 'dataSourceSubFinding') {
      nameRowSelect = 'rowSelectSubFinding'
    }
    let arrTemp = [...this.state[select]];
    arrTemp.splice(index, 1);
    this.setState({
      [select]: arrTemp,
      [nameRowSelect]: arrTemp.length > 0 ? arrTemp[0] : {},
      isAddRow: false
    });
  }

  saveOrUpdateData = (record, select) => {
    switch (select) {
      case 'dataSourceMain': this.updateOrCreateDataMain(record); break;
      case 'dataSourceSubSite': this.updateOrCreateDataSite(record); break;
      case 'dataSourceSubFinding': this.updateOrCreateDataFinding(record); break;
      default: break;
    }
  }

  onChangeInput = (objChange, nameDataTable, record) => {
    let objTemp = {
      ...record,
      ...objChange
    }
    let arrTemp = [...this.state[nameDataTable]];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      arrTemp[index] = objTemp
      this.setState({ [nameDataTable]: arrTemp })
    }
  }

  addRow = (nameData, nameRowSelect) => {
    this.setState({ isAddRow: true })
    if (!this.state.isAddRow) {
      let obj = {
        id: Math.round(Math.random() * 1000),
        isNew: true,
        site_classification_code: 0
      };
      let arr = [...this.state[nameData]];
      let index = arr.findIndex(item => item.id === this.state[nameRowSelect].id);
      arr.splice(index + 1, 0, obj);
      this.setState({ [nameData]: arr, [nameRowSelect]: obj })
    }
  }

  renderSaveAndDeleteRecord = (record, index, select) => {
    let rowSelect = {};
    if (select === 'dataSourceMain') {
      rowSelect = this.state.rowSelectMain
    } else if (select === 'dataSourceSubSite') {
      rowSelect = this.state.rowSelectSubSite
    } else {
      rowSelect = this.state.rowSelectSubFinding
    }
    return (
      <div key={`saveanddelete${Math.random() * 1000}`}>
        <Button
          size='small'
          hidden={!(record.id === rowSelect.id)}
          style={{ border: 'none', marginRight: '5px' }}
          icon={<SaveOutlined style={{ color: 'green' }} />}
          onClick={() => this.saveOrUpdateData(record, select)}
        />
        <Button
          size='small'
          hidden={!(record.id === rowSelect.id)}
          style={{ border: 'none', }}
          danger icon={<DeleteOutlined />}
          onClick={() => {
            ModalConfirm({
              content: '消去してもよろしいですか？',
              okText: 'は　い',
              cancelText: 'いいえ',
              onOk: () => this.deleteData(record, index, select)
            })
          }}
        />
      </div>
    )
  }

  eventF9 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 400,
        component: (
          <WS0351001_SiteFindingsCopySub
            Lio_SiteClassify={this.state.rowSelectMain.site_classification_code}
            onFinishScreen={(output) => {
              this.closeModal();
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
      },
    });
  }

  render() {
    return (
      <div className="site-findings-master-maintain">
        <Card>
          <Form ref={this.formRef} autoComplete='off'>
            <Menubar items={this.state.menuItems} />
            <Row className='mt-2'>
              <Col span={6}>
                <div style={styleDiv}>【 部位分類 】</div>
              </Col>
              <Col span={8}>
                <div style={styleDiv}>【 部 位 】</div>
              </Col>
              <Col span={10}>
                <div style={styleDiv}>【 所 見 】</div>
              </Col>
            </Row>
            <Row >
              <Col span={6} style={styleCol}>
                <Table
                  size='small'
                  bordered
                  scroll={{ y: '85vh' }}
                  rowKey={record => record.id}
                  dataSource={this.state.dataSourceMain}
                  loading={this.state.isLoadingTableMain}
                  pagination={false}
                  onRow={(record, index) => ({
                    onClick: event => {
                      if (this.state.classificationCode !== record.site_classification_code && this.state.classificationCode) {
                        this.loadDataSubTable(record.site_classification_code);
                      } else if (!this.state.classificationCode) {
                        this.loadDataSubTable(record.site_classification_code);
                      }
                      this.setState({
                        rowSelectMain: record,
                        classificationCode: record.site_classification_code
                      })
                    }
                  })}
                >
                  <Table.Column title="ｺｰﾄﾞ" dataIndex="site_classification_code" width={100} render={(text, record, index) => (
                    <InputNumber
                      value={text}
                      maxLength={5}
                      bordered={record.id === this.state.rowSelectMain.id}
                      style={{ color: Color(record.expression_11)?.Foreground }}
                      onChange={(value) => this.onChangeInput({ site_classification_code: value }, 'dataSourceMain', record)}
                      onDoubleClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 400,
                            component: (
                              <WS0356005_CategoryYouAreUsing
                                Li_SiteClassify={record.site_classification_code}
                                onFinishScreen={(output) => {
                                  this.closeModal();
                                }}
                              />
                            ),
                          },
                        });
                      }}
                    />
                  )} />
                  <Table.Column title="部位分類名称ﾞ" dataIndex="site_classification_name" render={(text, record, index) => (
                    <Input
                      value={text}
                      maxLength={30}
                      bordered={record.id === this.state.rowSelectMain.id}
                      style={{ color: Color(record.expression_11)?.Foreground }}
                      onChange={(e) => this.onChangeInput({ site_classification_name: e.target.value }, 'dataSourceMain', record)}
                    />
                  )} />
                  <Table.Column align='center' width={70}
                    render={(text, record, index) => this.renderSaveAndDeleteRecord(record, index, 'dataSourceMain')}
                    title={<Button
                      size='small'
                      type='primary'
                      icon={<PlusOutlined />}
                      disabled={this.state.isAddRow}
                      onClick={() => this.addRow('dataSourceMain', 'rowSelectMain')}
                    />}
                  />
                </Table>
              </Col>
              <Col span={8} style={styleCol}>
                <Table
                  size='small'
                  bordered
                  scroll={{ y: '85vh' }}
                  dataSource={this.state.dataSourceSubSite}
                  loading={this.state.isLoadingTableSubSite}
                  rowKey={(record) => record.id}
                  pagination={false}
                  onRow={(record, index) => ({ onClick: event => this.setState({ rowSelectSubSite: record }) })}
                >
                  <Table.Column title="ｺｰﾄﾞ" dataIndex="site_code" width={100} render={(text, record, index) => (
                    <InputNumber
                      value={text === 0 ? null : text}
                      maxLength={5}
                      bordered={record.id === this.state.rowSelectSubSite.id}
                      onChange={(value) => this.onChangeInput({ site_code: value }, 'dataSourceSubSite', record)}
                    />
                  )} />
                  <Table.Column title="検索略名" dataIndex="search_short_name" render={(text, record, index) => (
                    <Input
                      value={text}
                      maxLength={30}
                      bordered={record.id === this.state.rowSelectSubSite.id}
                      onChange={(e) => this.onChangeInput({ search_short_name: e.target.value }, 'dataSourceSubSite', record)}
                    />
                  )} />
                  <Table.Column title="部位名称" dataIndex="site_name" render={(text, record, index) => (
                    <Input
                      value={text}
                      maxLength={record.expression_8 || 30}
                      bordered={record.id === this.state.rowSelectSubSite.id}
                      onChange={(e) => this.onChangeInput({ site_name: e.target.value }, 'dataSourceSubSite', record)}
                    />
                  )} />
                  <Table.Column align='center' width={70}
                    render={(text, record, index) => this.renderSaveAndDeleteRecord(record, index, 'dataSourceSubSite')}
                    title={<Button
                      size='small'
                      type='primary'
                      icon={<PlusOutlined />}
                      disabled={this.state.isAddRow}
                      onClick={() => this.addRow('dataSourceSubSite', 'rowSelectSubSite')}
                    />}
                  />
                </Table>
              </Col>
              <Col span={10}>
                <Table
                  size='small'
                  bordered
                  scroll={{ y: '85vh' }}
                  dataSource={this.state.dataSourceSubFinding}
                  loading={this.state.isLoadingTableSubFinding}
                  rowKey={(record) => record.id}
                  pagination={false}
                  onRow={(record, index) => ({ onClick: event => this.setState({ rowSelectSubFinding: record }) })}
                >
                  <Table.Column title="ｺｰﾄﾞ" dataIndex="findings_code" width={100} render={(text, record, index) => (
                    <InputNumber
                      value={text === 0 ? null : text}
                      maxLength={5}
                      bordered={record.id === this.state.rowSelectSubFinding.id}
                      onChange={(value) => this.onChangeInput({ findings_code: value }, 'dataSourceSubFinding', record)}
                    />
                  )} />
                  <Table.Column title="検索略名" dataIndex="search_short_name" width={'20%'} render={(text, record, index) => (
                    <Input
                      value={text}
                      maxLength={30}
                      bordered={record.id === this.state.rowSelectSubFinding.id}
                      onChange={(e) => this.onChangeInput({ search_short_name: e.target.value }, 'dataSourceSubFinding', record)}
                    />
                  )} />
                  <Table.Column title="所見名称" dataIndex="findings_name" width={'40%'} render={(text, record, index) => (
                    <Input
                      value={text}
                      maxLength={60}
                      bordered={record.id === this.state.rowSelectSubFinding.id}
                      onChange={(e) => this.onChangeInput({ findings_name: e.target.value }, 'dataSourceSubFinding', record)}
                    />
                  )} />
                  <Table.Column title="判定値" dataIndex="judgment_value" width={100} render={(text, record, index) => (
                    <Input
                      value={text}
                      maxLength={3}
                      bordered={record.id === this.state.rowSelectSubFinding.id}
                      onChange={(e) => this.onChangeInput({ judgment_value: e.target.value }, 'dataSourceSubFinding', record)}
                    />
                  )} />
                  <Table.Column align='center' width={70}
                    render={(text, record, index) => this.renderSaveAndDeleteRecord(record, index, 'dataSourceSubFinding')}
                    title={<Button
                      size='small'
                      type='primary'
                      icon={<PlusOutlined />}
                      disabled={this.state.isAddRow}
                      onClick={() => this.addRow('dataSourceSubFinding', 'rowSelectSubFinding')}
                    />}
                  />
                </Table>
              </Col>
            </Row>
          </Form>
        </Card>
        {ModalCustom({
          width: this.state.childModal.width,
          visible: this.state.childModal.visible,
          component: this.state.childModal.component,
          destroyOnClose: false,
          onCancel: this.closeModal
        })}
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0356001_SiteFindingsMasterMaintain);
