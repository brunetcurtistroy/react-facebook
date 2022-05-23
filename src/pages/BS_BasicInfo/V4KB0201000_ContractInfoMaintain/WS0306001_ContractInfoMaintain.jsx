import React from "react";

import {
  Card, Form, Input, Select, Table, Row, Col, Dropdown, Menu, Popconfirm, Button,
  message,
  Tag,
} from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS0307008_ContractHistorySub from './WS0307008_ContractHistorySub';
import WS0306011_CreateNew from './WS0306011_CreateNew';
import WS0316001_CopyContractSelect from './WS0316001_CopyContractSelect'

import axios from 'configs/axios';
import { debounce } from "lodash";
import moment from "moment";
import WS0426001_MasterListOutputContractInfo from "./WS0426001_MasterListOutputContractInfo";
import Color from "constants/Color";
import MagicXpaFunc from "helpers/MagicXpaFunc";
import Menubar from "components/Commons/Menubar";
import { ModalConfirm } from "components/Commons/ModalConfirm";
// import WS0308017_OrganizationCreateNew from "./WS0308017_OrganizationCreateNew";

class WS0306001_ContractInfoMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '契約情報登録';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      isLoadingTableData: false,

      tableData: [],

      selectedRows: {},
      selectedRowKeys: [],
      menuItems: [
        { id: 1, label: '新規', handleClick: this.eventF4 },
        { id: 2, label: '出力', handleClick: this.eventF9 },
        { id: 3, label: '再展開', handleClick: this.eventF11 },
      ],
    };
  }

  componentDidMount() {
    this.loadContracts();
  }

  loadContracts = () => {
    this.setState({ isLoadingTableData: true });
    axios.get('/api/contract-info-maintain/contract-info-maintain', {
      params: {
        Li_ContractType: this.formRef.current.getFieldValue('ContractType'),
        Lio_SearchName: this.formRef.current.getFieldValue('SearchChar'),
      }
    })
      .then(res => {
        const lastSelected = res.data?.find(elmt => elmt.id === this.state.selectedRows.id);
        const selected = lastSelected ? lastSelected : (res.data[0] || {});
        this.setState({
          tableData: res.data,
          selectedRows: selected,
          selectedRowKeys: [selected.id],
        });
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoadingTableData: false }));
  }

  onFinish(values) {

  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  eventF4 = () => {
    this.setState({
      ...this.state,
      childModal: {
        width: 500,
        visible: true,
        component: ( // WS0308017_OrganizationCreateNew
          <WS0306011_CreateNew
            Li_ContractType={this.state.selectedRows?.contract_type}
            Li_ContractOrgCode={this.state.selectedRows?.contract_organization_code}
            onFinishScreen={() => {
              this.loadContracts();
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: false,
                },
              });
            }}
          />
        )
      }
    });
  }

  eventF9 = () => {
    this.setState({
      ...this.state,
      childModal: {
        width: 800,
        visible: true,
        component: (
          <WS0426001_MasterListOutputContractInfo
            Li_ContractType={this.state.selectedRows?.contract_type}
            Li_ContractOrgCode={''}
            Li_ContractStartDate={''}
            Li_ContractNum={''}
            Li_StsContractType={this.state.selectedRows?.contract_type || ''}
            Li_StsContractOrgCode={false}
            Li_StsContractStartDate={false}
            Li_StsContractNum={false}
            onFinishScreen={() => {
              this.loadContracts();
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: false,
                },
              });
            }}
          />
        )
      }
    });
  }

  eventF11 = () => {
    ModalConfirm({
      content: '契約情報の内容を再展開しますか',
      styleIconModal: { color: '#006CC9' },
      okText: 'いいえ',
      cancelText: 'はい',
      onCancel: () => {
        this.setState({ isLoadingTableData: true });
        axios.post('/api/contract-info-maintain/contract-info-maintain/f11', { StsConfirm : 6 })
          .then(() => this.loadContracts())
          .catch(err => message.error( err?.response?.data?.message || "エラーが発生しました"))
      }
    })
  }

  render() {

    return (
      <div className="contract-info-maintain">
        <Card className="mb-2">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              ContractType: '',
            }}
          >
            <Menubar items={this.state.menuItems} />
            <Row gutter={5} className='mt-3'>
              <Col span={3}>
                <Form.Item name="ContractType" label="種別" style={{maxWidth: '120px'}}>
                  <Select onChange={() => this.loadContracts()} size="small">
                    <Select.Option value="">全　て</Select.Option>
                    <Select.Option value={0}>共　通</Select.Option>
                    <Select.Option value={1}>保険者</Select.Option>
                    <Select.Option value={2}>事業所</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10} offset={3}>
                <Form.Item name="SearchChar" label="検索">
                  <Input onChange={debounce(() => this.loadContracts(), 300)} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Row gutter={5}>
          <Col span={6}>
            <Table
              size="small"
              scroll={(this.state.tableData.length >= 15) ? {y: 'calc(100vh - (32px + 52px + 50px))'} : {}}
              dataSource={this.state.tableData}
              loading={this.state.isLoadingTableData}
              pagination={false}
              rowSelection={{
                type: 'radio',
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                  const selected = selectedRows[0];
                  this.setState({
                    selectedRowKeys: [selected.id],
                    selectedRows: selected,
                  });
                },
              }}
              rowKey={record => record.id}
              onRow={(record) => {
                return {
                  onClick: () => {
                    const selected = record;
                    this.setState({
                      selectedRowKeys: [selected.id],
                      selectedRows: selected,
                    })
                  },
                };
              }}
            >
              <Table.Column width={50} title="種別" dataIndex="contract_type" render={(value) => (
                <Tag color={Color(MagicXpaFunc.CASE(value, 1,297,2,298,295)).Background} style={{color:'#000', width: '100%', textAlign:'center', padding:0}}>{MagicXpaFunc.CASE(value, 1,'保険者',2,'事業所','共通')}</Tag>
              )} />
              <Table.Column title="団体名" dataIndex="contract_name" ellipsis />
              <Table.Column width={80} title="契約年度" dataIndex="ContractStartDate" render={(value) => (moment(value).isValid() ? moment(value).format('YYYY年MM月') : value)} />
              <Table.Column width={25} key="action"
                render={(row) => {
                  return (
                    <Dropdown 
                      overlay={() => (
                        <Menu>
                          <Menu.Item onClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: 500,
                                visible: true,
                                component: (<WS0306011_CreateNew
                                  Li_ContractType={row.contract_type}
                                  // Li_ContractOrgCode={}
                                  onFinishScreen={() => {
                                    this.loadContracts();

                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />)
                              }
                            });
                          }}>新規</Menu.Item>

                          <Menu.Item onClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: 800,
                                visible: true,
                                component: (<WS0426001_MasterListOutputContractInfo
                                  Li_ContractType={row.contract_type}
                                  Li_ContractOrgCode={row.contract_organization_code}
                                  // Li_ContractStartDate={ }
                                  // Li_ContractNum={ }
                                  Li_StsContractType={true}
                                  Li_StsContractOrgCode={true}
                                  Li_StsContractStartDate={false}
                                  Li_StsContractNum={false}
                                  onFinishScreen={() => {
                                    this.loadContracts();

                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />)
                              }
                            });
                          }}>出力</Menu.Item>

                          <Menu.Item>
                            <Popconfirm title="Confirm delete operation?" onConfirm={() => {
                              this.setState({isLoadingTableData: true});
                              return axios.post('/api/contract-info-maintain/contract-info-maintain/DeleteLine', {
                                id: row.id,
                              })
                                .then(res => {
                                  this.loadContracts();
                                })
                                .catch(error => {
                                  this.setState({isLoadingTableData: false});
                                  const res = error.response;
                                  if (!res || !res.data || !res.data.message) {
                                    message.error('エラーが発生しました');
                                    return;
                                  }

                                  message.error(res.data.message);
                                });
                            }}><div>削除</div></Popconfirm>
                          </Menu.Item>
                          <Menu.Item onClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: 500,
                                visible: true,
                                component: (<WS0306011_CreateNew
                                  Li_ContractType={row.contract_type}
                                  Li_ContractOrgCode={row.contract_organization_code}
                                  onFinishScreen={() => {
                                    this.loadContracts();

                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                  }}
                                />)
                              }
                            });
                          }}>
                            <div>年度更新</div>
                          </Menu.Item>
                          <Menu.Item>
                            <Popconfirm title="Confirm delete operation?" onConfirm={() => {
                              this.setState({isLoadingTableData: true});

                              return axios.post('/api/contract-info-maintain/contract-info-maintain/DeleteHistoryContract', {
                                ...row
                              })
                                .then(res => {
                                  this.loadContracts();
                                })
                                .catch(error => {
                                  this.setState({isLoadingTableData: false});
                                  const res = error.response;
                                  if (!res || !res.data || !res.data.message) {
                                    message.error('エラーが発生しました');
                                    return;
                                  }

                                  message.error(res.data.message);
                                });
                            }}>
                              <div>年度削除</div>
                            </Popconfirm>
                          </Menu.Item>
                          <Menu.Item onClick={() => {
                            this.setState({
                              ...this.state,
                              childModal: {
                                width: '80vw',
                                visible: true,
                                component: (<WS0316001_CopyContractSelect
                                  Li_ContractType={row.contract_type}
                                  Li_ContractOrgCode={row.contract_organization_code}
                                  Li_ContractStartDate={row.ContractStartDate}

                                  onFinishScreen={() => {
                                    this.setState({
                                      childModal: {
                                        ...this.state.childModal,
                                        visible: false,
                                      },
                                    });
                                    this.loadContracts();
                                  }}
                                />)
                              }
                            });
                          }}>
                            <div>複写</div>
                          </Menu.Item>
                        </Menu>
                      )}
                    >
                      <Button size="small">:</Button>
                    </Dropdown>
                  )
                }} />
            </Table>
          </Col>
          <Col span={18}>
            {this.state.selectedRows.ContractStartDate?.length ? (
              <WS0307008_ContractHistorySub
                Li_ContractType={this.state.selectedRows.contract_type}
                Li_ContractOrgCode={this.state.selectedRows.contract_organization_code}
                Li_ContractStartDate={this.state.selectedRows.ContractStartDate}
              />
            ) : false}
          </Col>
        </Row>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => { 
            this.closeModal()
          }}
        />
      </div>
    );
  }
}

export default WS0306001_ContractInfoMaintain;
