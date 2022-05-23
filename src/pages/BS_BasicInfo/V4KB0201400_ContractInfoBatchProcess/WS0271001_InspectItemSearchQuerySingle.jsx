import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Input, Button, Table, Row, Col, Select, Checkbox, Space, Dropdown, Menu, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ModalDraggable from "components/Commons/ModalDraggable";
import { getInspectItemSearchQuerySingleSistAction } from 'redux/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.actions';

import WS2717011_InspectItem1ChangeSub from 'pages/MS_InspectionMaintenance/V4MS0103000_InspectItemInfoMaintain/WS2717011_InspectItem1ChangeSub.jsx';

const grid = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

class WS0271001_InspectItemSearchQuerySingle extends React.Component {

  static propTypes = {
    Li_SearchChar: PropTypes.any,
    Li_StsUseInspect: PropTypes.any,
    Li_Type: PropTypes.any,
    Lio_InspectItemCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '検査項目検索・照会(単品)';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      initialValues: {
        SearchChar: '',
        StsUseInspect: 1,
        Type: '',
        limit: 10,
        page: 1,
      },
      pagination: {
        // defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true,
        pageSize: 10,
        total: 1,
      },
      isLoading: true,
      data: [],
      selectedRows: {},
    };
  }

  componentDidMount = () => {
    let value = {
      SearchChar: this.props.Li_SearchChar,
      StsUseInspect:this.props.Li_StsUseInspect,
      Type: this.props.Li_Type,
    }
    this.callAPILoadData(value);
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        ...value
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      let value = {
        SearchChar: this.props.Li_SearchChar,
        StsUseInspect:this.props.Li_StsUseInspect,
        Type: this.props.Li_Type,
      }
      this.callAPILoadData(value);
      this.setState({
        initialValues: {
          ...this.state.initialValues,
          ...value
        }
      })
    }
  }

  callAPILoadData = (params) => {
    this.setState({ isLoading: true })
    getInspectItemSearchQuerySingleSistAction(params)
      .then((res) => {
        let dataRes = res?.data;
        if (dataRes)
          this.setState({
            data: dataRes.SubDisplayTable,
            pagination: {
              ...this.state.pagination,
              current: dataRes.current_page,
              total: dataRes.total,
            }
          });
      }).finally(() => this.setState({ isLoading: false }))
  }

  handleButton = () => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lio_InspectItemCode: this.state.selectedRows.test_item_code,
        Lo_exam_name: this.state.selectedRows.exam_name,
        recordData: this.state.selectedRows
      });
    };
  }

  handleSearch = (e) => {
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        SearchChar: e.target.value,
      }
    }, () => this.callAPILoadData(this.state.initialValues));
  }

  handleSelect = (option) => {
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        Type: option,
      }
    }, () => this.callAPILoadData(this.state.initialValues));
  }

  handleCheckbox = (e) => {
    this.setState({
      initialValues: {
        ...this.state.initialValues,
        StsUseInspect: e.target.checked ? 1 : 0
      }
    }, () => this.callAPILoadData(this.state.initialValues));
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  render() {
    const { initialValues, data, pagination, isLoading, childModal } = this.state;
    const rowSelection = {
      onSelect: (record, selected, selectedRows, nativeEvent) => this.setState({ selectedRows: record })
    }
    return (
      <div className="inspect-item-search-query-single">
        <Card title="検査項目検索・照会(単品)">
          <Form ref={this.formRef} {...grid} initialValues={initialValues} autoComplete='off'>
            <Row gutter={16} className="mb-3">
              <Col span={12}>
                <Form.Item name="SearchChar" label="検索" >
                  <Input onChange={this.handleSearch} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="Type" >
                  <Select name="Type" style={{ width: 120 }} onChange={this.handleSelect}>
                    <Select.Option value="" >全て</Select.Option>
                    <Select.Option value="N">定量</Select.Option>
                    <Select.Option value="X">定性</Select.Option>
                    <Select.Option value="S">所見</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="StsUseInspect" valuePropName='checked'>
                  <Checkbox onChange={this.handleCheckbox}>使用</Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Table
              size='small'
              bordered
              className="mb-3" 
              dataSource={data} 
              rowKey={record => record.test_item_code}
              locale={{ emptyText: "データがありません" }} 
              loading={isLoading}
              rowSelection={{ type: "radio", ...rowSelection }} 
              pagination={{ 
                ...pagination,
                onChange: (page, pageSize) => {
                  this.setState({
                    initialValues: {
                      ...this.state.initialValues,
                      page
                    }
                  }, () => this.callAPILoadData(this.state.initialValues))
                } 
              }}
            >
              <Table.Column title="コード" dataIndex="test_item_code" width={90}
                render={(text) => <div style={{ textAlign: 'right' }}>{text}</div>}
              />
              <Table.Column title="名　称" dataIndex="exam_name" />
              <Table.Column title="略　名" dataIndex="exam_short_name" />
              <Table.Column title="種別" dataIndex="exam_kind" />
              <Table.Column title="ﾀｲﾌﾟ" dataIndex="exam_type" align='center' />
              <Table.Column title="使用" dataIndex="StsCategoryInspectBreakdown" align='center' />
              <Table.Column align='center' width={40} render={(text, record, index) => (
                <Dropdown overlay={() => (
                  <Menu expandIcon >
                    <Menu.Item key='新規' onClick={() => {
                      this.setState({
                        childModal: {
                          ...childModal,
                          visible: true,
                          width: 600,
                          component: (<WS2717011_InspectItem1ChangeSub
                            register={0}
                            onFinishScreen={(data) => {
                              this.setState({
                                childModal: {
                                  ...childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />),
                        },
                      })
                    }}>新規</Menu.Item>
                    <Menu.Item key='変更' onClick={() => {
                      this.setState({
                        childModal: {
                          ...childModal,
                          visible: true,
                          width: 600,
                          component: (<WS2717011_InspectItem1ChangeSub
                            test_item_code={record.test_item_code}
                            onFinishScreen={(data) => {
                              this.setState({
                                childModal: {
                                  ...childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />),
                        },
                      })
                    }}>変更</Menu.Item>
                  </Menu>
                )}>
                  <Button size='small' icon={<MoreOutlined />}></Button>
                </Dropdown>
              )} />
            </Table>
            <Row gutter={16}>
              <Col span={24} className="text-end">
                <Space>
                  <Button type="primary">保 守</Button>
                  <Button type="primary" onClick={() => { this.handleButton() }}>選 択</Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Card>

        <ModalDraggable
          width={childModal.width}
          visible={childModal.visible}
          component={childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              childModal: {
                ...childModal,
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0271001_InspectItemSearchQuerySingle);
