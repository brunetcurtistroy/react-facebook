import React from "react";
import { connect } from "react-redux";
import { Card, Form, Input, Checkbox, Table, Button, Row, Col, Space, message, Menu, Dropdown, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { ModalCustom } from "components/Commons/ModalCustom";
import { ModalConfirm } from "components/Commons/ModalConfirm";
import WS2705001_AnotherInspectItemSettingCategory from "../V4KB0011000_AnotherInspectItemSettingCategory/WS2705001_AnotherInspectItemSettingCategory";
import WS0268001_SiteClassifySearchQuery from "./WS0268001_SiteClassifySearchQuery";
import WS0351001_SiteFindingsCopySub from 'pages/MS_InspectionMaintenance/V4MS0104000_SiteFindingsMasterMaintain/WS0351001_SiteFindingsCopySub.jsx';
import {
  getCategoryMasterMaintainAction, getSiteFindingsAction, saveAndUpdateCategoryMasterMaintainAction,
  deleteCategoryMasterMaintainAction, deleteOpinionCategoryMasterMaintainAction, deletePartCategorMasterMaintainAction,
  updateOrCreatePartCategoryMasterMaintainAction, updateOrCreateOpinionCategoryMasterMaintainAction, eventF7CategoryMasterMaintainAction
} from "redux/InspectionMaintenance/CategoryMasterMaintain/CategoryMasterMaintain.action";
import Color from "constants/Color";
import Menubar from "components/Commons/Menubar";

class WS2704001_CategoryMasterMaintain extends React.Component {

  formRefSub = React.createRef();

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = 'ｶﾃｺﾞﾘｰﾏｽﾀ保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      initParams: {
        SearchChar: '',
        StsUse: 0
      },
      site_classification: '',
      common_category_code: '',
      Lio_SiteFindingClassify: '',
      Lio_CommonCategory: '',

      dataSourceMain: [],
      isLoadingMain: false,
      rowSelectMain: {},

      dataSourcePart: [],
      isLoadingPart: false,
      rowSelectPart: {},

      dataSourceOpinion: [],
      isLoadingOpinion: false,
      rowSelectOpinion: {},

      isAddRow: false,
      menuItems: [{ id: 1, label: 'ｶﾃｺﾞﾘｰ別検査設定', handleClick: this.F7 }]
    };
  }

  componentDidMount = () => {
    this.loadDataSUB(this.state.initParams);
  }

  loadDataSUB = (params) => {
    this.setState({ isLoadingMain: true });
    getCategoryMasterMaintainAction(params)
      .then(res => {
        let dataRes = res?.data;
        if (dataRes.length > 0) {
          this.setState({
            dataSourceMain: dataRes,
            rowSelectMain: this.state.rowSelectMain.id ? this.state.rowSelectMain : dataRes[0]
          });
          this.loadDataSiteFindings({
            site_classification: this.state.rowSelectMain.site_classification,
            common_category_code: this.state.rowSelectMain.common_category_code,
          });
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoadingMain: false }))
  }

  loadDataSiteFindings = (params) => {
    this.setState({
      isLoadingPart: true,
      isLoadingOpinion: true,
    });
    getSiteFindingsAction(params)
      .then(res => {
        if (res) {
          this.setState({
            Lio_SiteFindingClassify: res.data.Lio_SiteFindingClassify,
            Lio_CommonCategory: res.data.Lio_CommonCategory,
            dataSourcePart: res.data.Part,
            dataSourceOpinion: res.data.Opinion
          });
          this.formRef.current.setFieldsValue({
            ...res.data,
            Lio_SiteFindingClassify: res.data.Lio_SiteFindingClassify === 0 || res.data.Lio_SiteFindingClassify === '0'
              ? null
              : res.data.Lio_SiteFindingClassify,
          })
        }
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => {
        this.setState({
          isLoadingPart: false,
          isLoadingOpinion: false,
        })
      })
  }

  updateOrCreateDataSUB = (record) => {
    if (record.isNew) delete record.id

    let params = {
      id: record.id,
      category_code: record.category_code,
      category_name: record.category_name,
      site_classification: record.site_classification || 0,
      common_category_code: record.common_category_code || 0,
    }
    saveAndUpdateCategoryMasterMaintainAction(params)
      .then(res => this.loadDataSUB(this.state.initParams))
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .then(() => this.setState({ isAddRow: false }))
  }

  updateOrCreateDataPart = (record) => {
    if (record.isNew) delete record.id

    let params = {
      id: record.id,
      Lio_SiteFindingClassify: this.state.Lio_SiteFindingClassify,
      site_code: record.site_code,
      search_short_name: record.search_short_name,
      site_name: record.site_name
    }
    updateOrCreatePartCategoryMasterMaintainAction(params)
      .then(() => message.success('成功'))
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .then(() => this.setState({ isAddRow: false }))
  }

  updateOrCreateDataOpinion = (record) => {
    if (record.isNew) delete record.id

    let params = {
      id: record.id,
      Lio_SiteFindingClassify: this.state.Lio_SiteFindingClassify,
      findings_code: record.findings_code,
      search_short_name: record.search_short_name,
      findings_name: record.findings_name,
      judgment_value: record.judgment_value || ''
    }
    updateOrCreateOpinionCategoryMasterMaintainAction(params)
      .then(() => message.success('成功'))
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .then(() => this.setState({ isAddRow: false }))
  }

  deleteData = (record, index, select) => {
    if (record.id && !record.isNew) {
      switch (select) {
        case 'dataSourceMain':
          deleteCategoryMasterMaintainAction({ id: record.id })
            .then(res => {
              message.success('成功');
              this.loadDataSUB(this.state.initParams);
            })
            .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
          break;
        case 'dataSourcePart':
          deletePartCategorMasterMaintainAction({ id: record.id })
            .then(res => {
              message.success('成功');
              this.loadDataSiteFindings({
                site_classification: this.state.site_classification,
                common_category_code: this.state.common_category_code
              });
            })
            .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
          break;
        case 'dataSourceOpinion':
          deleteOpinionCategoryMasterMaintainAction({ id: record.id })
            .then(res => {
              message.success('成功');
              this.loadDataSiteFindings({
                site_classification: this.state.site_classification,
                common_category_code: this.state.common_category_code
              });
            })
            .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
          break;
        default: break;
      }
    }
    let nameRowSelect = '';
    if (select === 'dataSourceMain') {
      nameRowSelect = 'rowSelectMain'
    } else if (select === 'dataSourcePart') {
      nameRowSelect = 'rowSelectPart'
    } else if (select === 'dataSourceOpinion') {
      nameRowSelect = 'rowSelectOpinion'
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
      case 'dataSourceMain': this.updateOrCreateDataSUB(record); break;
      case 'dataSourcePart': this.updateOrCreateDataPart(record); break;
      case 'dataSourceOpinion': this.updateOrCreateDataOpinion(record); break;
      default: break;
    }
  }

  handleSearchAndCheckbox = (objChange) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        ...objChange
      }
    }, () => this.loadDataSUB(this.state.initParams))
  }

  addRow = (nameData, nameRowSelect) => {
    this.setState({ isAddRow: true })
    if (!this.state.isAddRow) {
      let obj = {
        id: Math.round(Math.random() * 1000),
        isNew: true,
        Use: "〇",
        category_code: 0
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
    } else if (select === 'dataSourcePart') {
      rowSelect = this.state.rowSelectPart
    } else {
      rowSelect = this.state.rowSelectOpinion
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

  onChangeInput = (objChange, code, record) => {
    let objTemp = {
      ...record,
      ...objChange
    }
    switch (code) {
      case 1: {
        let arrTemp = [...this.state.dataSourceMain];
        let index = arrTemp.findIndex(item => item.id === record.id);
        if (index !== -1) {
          arrTemp[index] = objTemp
          this.setState({ dataSourceMain: arrTemp })
        }
        break;
      }
      case 2: {
        let arrTemp = [...this.state.dataSourcePart];
        let index = arrTemp.findIndex(item => item.id === record.id);
        if (index !== -1) {
          arrTemp[index] = objTemp
          this.setState({ dataSourcePart: arrTemp })
        }
        break;
      }
      case 3: {
        let arrTemp = [...this.state.dataSourceOpinion];
        let index = arrTemp.findIndex(item => item.id === record.id);
        if (index !== -1) {
          arrTemp[index] = objTemp
          this.setState({ dataSourceOpinion: arrTemp })
        }
        break;
      }
      default: break;
    }
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  F7 = () => {
    eventF7CategoryMasterMaintainAction()
      .then(() => {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: '70%',
            component: (
              <WS2705001_AnotherInspectItemSettingCategory
                onFinishScreen={() => {
                  this.closeModal()
                }}
              />
            ),
          },
        });
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
  }

  render() {
    return (
      <div className="category-master-maintain">
        <Card title="ｶﾃｺﾞﾘｰﾏｽﾀ保守" >
          <Form ref={this.formRef} initialValues={this.state.initParams} autoComplete='off'>
            <Menubar items={this.state.menuItems} />
            <Row gutter={24} className='mt-3 mb-3'>
              <Col span={18}>
                <Form.Item name="SearchChar" label="検索" >
                  <Input onChange={(e) => this.handleSearchAndCheckbox({ SearchChar: e.target.value })} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="StsUse" label="使用" valuePropName="checked" >
                  <Checkbox onChange={(e) => this.handleSearchAndCheckbox({ StsUse: e.target.checked ? 1 : 0 })} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={6} style={{ borderRight: '1px solid #F0F0F0' }}>
                <Table
                  size='small'
                  bordered
                  scroll={{ y: '75vh' }}
                  className='scrollbar'
                  dataSource={this.state.dataSourceMain}
                  loading={this.state.isLoadingMain}
                  pagination={false}
                  rowKey={(record) => record.id}
                  onRow={(record, index) => ({
                    onClick: event => {
                      this.loadDataSiteFindings({
                        site_classification: record.site_classification,
                        common_category_code: record.common_category_code
                      });
                      this.setState({
                        site_classification: record.site_classification,
                        common_category_code: record.common_category_code,
                        rowSelectMain: record
                      });
                    },
                  })}
                >
                  <Table.Column title="コード" dataIndex="category_code" width={60} className='scrollbar' render={(text, record, index) => (
                    <Input
                      maxLength={5}
                      value={text}
                      readOnly={!(record.isNew || record.CodeChanges)}
                      bordered={record.id === this.state.rowSelectMain.id}
                      style={{ textAlign: 'right', color: Color(record.expression_12)?.Foreground }}
                      onChange={(e) => this.onChangeInput({ category_code: e.target.value }, 1, record)}
                    />
                  )} />
                  <Table.Column title="カテゴリ名称" dataIndex="category_name" render={(text, record, index) => (
                    <Input
                      maxLength={30}
                      value={text}
                      bordered={record.id === this.state.rowSelectMain.id}
                      style={{ color: Color(record.expression_12)?.Foreground }}
                      onChange={(e) => this.onChangeInput({ category_name: e.target.value }, 1, record)}
                    />
                  )} />
                  <Table.Column align='center' title="使用" dataIndex="Use" width={50} />
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
              <Col span={18}>
                <Row style={{ padding: '10px' }}>
                  <Col span={16}>
                    <Space>
                      <Form.Item name="Lio_SiteFindingClassify" label="部位・所見分類">
                        <InputNumber
                          maxLength={5}
                          style={{ width: '80px' }}
                          value={this.state.Lio_SiteFindingClassify === 0 ? null : this.state.Lio_SiteFindingClassify}
                          onChange={(value) => {
                            this.formRef.current?.setFieldsValue({ site_classification_name: '' })
                            this.setState({ Lio_SiteFindingClassify: value })
                          }}
                          onDoubleClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 500,
                                component: (
                                  <WS0268001_SiteClassifySearchQuery
                                    Lo_SiteClassifyCode={this.state.Lio_SiteFindingClassify}
                                    onFinishScreen={({ Lo_SiteClassifyCode, recordData }) => {
                                      this.formRef.current?.setFieldsValue({
                                        Lio_SiteFindingClassify: Lo_SiteClassifyCode,
                                        site_classification_name: recordData.site_classification_name
                                      })
                                      this.setState({ Lio_SiteFindingClassify: Lo_SiteClassifyCode })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary"
                          onClick={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: true,
                                width: 450,
                                component: (
                                  <WS0351001_SiteFindingsCopySub
                                    Lio_SiteClassify={this.state.Lio_SiteFindingClassify}
                                    Lio_SiteClassifyName={this.formRef.current?.getFieldValue('site_classification_name')}
                                    onFinishScreen={(output) => {
                                      this.formRef.current?.setFieldsValue({
                                        Lio_SiteFindingClassify: output.Lio_SiteClassify,
                                        site_classification_name: output.Lio_SiteClassifyName
                                      })
                                      this.setState({ Lio_SiteFindingClassify: output.Lio_SiteClassify })
                                      this.closeModal();
                                    }}
                                  />
                                ),
                              },
                            });
                          }}
                        >複写</Button>
                      </Form.Item>
                      <Form.Item name="site_classification_name">
                        <Input readOnly bordered={false} />
                      </Form.Item>
                    </Space>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="Lio_CommonCategory" label="地域老人保健分類" style={{ float: 'right' }}>
                      <Input style={{ width: '80px', textAlign: 'right' }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row >
                  <Col span={10} style={{ borderRight: '1px solid #F0F0F0' }}>
                    <Table
                      size='small'
                      bordered
                      scroll={{ y: '70vh' }}
                      className='scrollbar'
                      dataSource={this.state.dataSourcePart}
                      loading={this.state.isLoadingPart}
                      pagination={false}
                      rowKey={(record) => record.id}
                      onRow={(record, index) => ({ onClick: event => this.setState({ rowSelectPart: record }) })}
                    >
                      <Table.Column title="ｺｰﾄﾞ" dataIndex="site_code" width={70} render={(text, record, index) => (
                        <InputNumber
                          value={text === 0 ? null : text}
                          maxLength={5}
                          bordered={record.id === this.state.rowSelectPart.id}
                          onChange={(value) => this.onChangeInput({ site_code: value }, 2, record)}
                        />
                      )} />
                      <Table.Column title="検索略名" dataIndex="search_short_name" render={(text, record, index) => (
                        <Input
                          value={text}
                          maxLength={30}
                          bordered={record.id === this.state.rowSelectPart.id}
                          onChange={(e) => this.onChangeInput({ search_short_name: e.target.value }, 2, record)}
                        />
                      )} />
                      <Table.Column title="部位名称" dataIndex="site_name" width={'50%'} render={(text, record, index) => (
                        <Input
                          value={text}
                          maxLength={30}
                          bordered={record.id === this.state.rowSelectPart.id}
                          onChange={(e) => this.onChangeInput({ site_name: e.target.value }, 2, record)}
                        />
                      )} />
                      <Table.Column align='center' width={70} render={(text, record, index) => this.renderSaveAndDeleteRecord(record, index, 'dataSourcePart')}
                        title={<Button
                          size='small'
                          type='primary'
                          icon={<PlusOutlined />}
                          onClick={() => this.addRow('dataSourcePart', 'rowSelectPart')}
                          disabled={this.state.isAddRow}
                        />}
                      />
                    </Table>
                  </Col>

                  <Col span={14}>
                    <Table
                      size='small'
                      bordered
                      scroll={{ y: '70vh' }}
                      className='scrollbar'
                      dataSource={this.state.dataSourceOpinion}
                      loading={this.state.isLoadingOpinion}
                      pagination={false}
                      rowKey={(record) => record.id}
                      onRow={(record, index) => ({ onClick: event => this.setState({ rowSelectOpinion: record }) })}
                    >
                      <Table.Column title="ｺｰﾄﾞ" dataIndex="findings_code" width={70} render={(text, record, index) => (
                        <InputNumber
                          value={text === 0 ? null : text}
                          maxLength={5}
                          bordered={record.id === this.state.rowSelectOpinion.id}
                          onChange={(value) => this.onChangeInput({ findings_code: value }, 3, record)}
                        />
                      )} />
                      <Table.Column title="検索略名" dataIndex="search_short_name" render={(text, record, index) => (
                        <Input
                          value={text}
                          maxLength={30}
                          bordered={record.id === this.state.rowSelectOpinion.id}
                          onChange={(e) => this.onChangeInput({ search_short_name: e.target.value }, 3, record)}
                        />
                      )} />
                      <Table.Column title="所見名称" dataIndex="findings_name" render={(text, record, index) => (
                        <Input
                          value={text}
                          maxLength={60}
                          bordered={record.id === this.state.rowSelectOpinion.id}
                          onChange={(e) => this.onChangeInput({ findings_name: e.target.value }, 3, record)}
                        />
                      )} />
                      <Table.Column title="判定" dataIndex="judgment_value" width={70} render={(text, record, index) => (
                        <Input
                          value={text}
                          maxLength={3}
                          bordered={record.id === this.state.rowSelectOpinion.id}
                          onChange={(e) => this.onChangeInput({ judgment_value: e.target.value }, 3, record)}
                        />
                      )} />
                      <Table.Column align='center' width={70}
                        render={(text, record, index) => this.renderSaveAndDeleteRecord(record, index, 'dataSourceOpinion')}
                        title={<Button
                          size='small'
                          type='primary'
                          icon={<PlusOutlined />}
                          disabled={this.state.isAddRow}
                          onClick={() => this.addRow('dataSourceOpinion', 'rowSelectOpinion')}
                        />}
                      />
                    </Table>
                  </Col>
                </Row>
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
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2704001_CategoryMasterMaintain);
