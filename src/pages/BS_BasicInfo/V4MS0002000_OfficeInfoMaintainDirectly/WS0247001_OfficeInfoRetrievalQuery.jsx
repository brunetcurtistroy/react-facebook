import React from 'react';
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { Card, Form, Input, Checkbox, Button, Table, Row, Col } from 'antd';
import { MoreOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined } from "@ant-design/icons";
import WS2585001_OfficeInfoInquirySub from 'pages/YK_ReservationBusiness/V5YK0002000_GroupBookings/WS2585001_OfficeInfoInquirySub.jsx';
import { getAllOfficeInfoRetrievalQueryAction } from 'redux/basicInfo/OfficeInfoMaintain/OfficeInfoMaintain.action'
class WS0247001_OfficeInfoRetrievalQuery extends React.Component {
  static propTypes = {
    Li_NewlyRegisteredPresence: PropTypes.any,
    Lio_OfficeCode: PropTypes.any,
    Lio_BranchStoreCode: PropTypes.any,
    Li_1HeadOffice2BranchShop: PropTypes.any,
    Lo_Kanji_Name: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);
    // document.title = '事業所情報検索・照会';
    this.state = {
      dataSource: [],
      isLoading: true,
      rowSelect: {},
      initialValues: {
        Li_NewlyRegisteredPresence: '',
        OfficeCode: '',
        BranchStoreCodeF: '',
        Li_1HeadOffice2BranchShop: 1,
        KannaSearch: '',
        PhoneNumSearch: '',
        InsuranceCardSymbolSearch: '',
        SearchMethodsOp: 0,
        page: 1,
        limit: 10,
      },
      pagination: {
        size: 'small',
        showQuickJumper: true
      },
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
    this.handleSearch = debounce(this.handleSearch, 200);
  }

  componentDidMount() {
    this.loadData(this.state.initialValues);
  }

  handleSearch = (value, name) => {
    this.setState(prevState => ({
      initialValues: {
        ...prevState.initialValues,
        [name]: value
      }
    }), () => this.loadData(this.state.initialValues))
  }

  loadData = (params) => {
    this.setState({ isLoading: true })
    getAllOfficeInfoRetrievalQueryAction(params)
      .then((res) => {
        let dataRes = res?.data;
        if (dataRes) {
          this.setState({
            dataSource: dataRes.data,
            pagination: {
              ...this.state.pagination,
              current: dataRes.current_page,
              pageSize: dataRes.per_page,
              total: dataRes.total,
            }
          })
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  handleRowSelected = (rowSelect) => {
    const { getOfficeByOfficeCodeAndBranch, getDataOfficeByOfficeCodeAndBranch, getDataOfficeInfoRetrievalQuery, onFinishScreen } = this.props;
    const { office_code, branch_store_code, office_kanji_name } = rowSelect;

    // WS0247001_OfficeInfoRetrievalQuery -> WS0341001_OfficeInfoMaintain
    if (getOfficeByOfficeCodeAndBranch)
      getOfficeByOfficeCodeAndBranch({ Li_OfficeCode: office_code, Li_BranchStoreCode: branch_store_code });

    // WS0247001_OfficeInfoRetrievalQuery -> WS0341009_BranchStoreGenerated
    if (getDataOfficeByOfficeCodeAndBranch)
      getDataOfficeByOfficeCodeAndBranch(rowSelect);

    // WS0247001_OfficeInfoRetrievalQuery -> WS0335001_ConsultInfoReconstruction
    if (getDataOfficeInfoRetrievalQuery) {
      getDataOfficeInfoRetrievalQuery({
        office_code,
        branch_store_code,
        office_kanji_name
      })
    }

    if (onFinishScreen) {
      onFinishScreen({
        Lio_OfficeCode: office_code,
        Lio_BranchStoreCode: branch_store_code,
        Lo_Kanji_Name: office_kanji_name,
        recordData: rowSelect,
      });
    }
  }

  handleCreateOffice = () => {
    const { createNewOffice } = this.props;
    createNewOffice();
  }

  renderImpotant = (record) => {
    let icon = "";
    switch (record.importance) {
      case 1:
        icon = <InfoCircleOutlined style={{ color: "#1890ff" }} />
        break;
      case 3:
        icon = <WarningOutlined style={{ color: "#faad14" }} />
        break;
      case 5:
        icon = <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
        break;
      default:
        icon = <Button size='small' icon={<MoreOutlined />} />;
    }
    return (
      <Form.Item style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => {
        this.setState({
          childModal: {
            ...this.state.childModal,
            visible: true,
            width: 1200,
            component: (
              <WS2585001_OfficeInfoInquirySub
                Li_OfficeCode={record.office_code}
                Li_BranchCode={record.branch_store_code}
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: false,
                    },
                  });
                }}
              />
            ),
          },
        })

      }}>{icon}</Form.Item>
    )
  }

  render() {
    const { initialValues, isLoading, dataSource, rowSelect, pagination } = this.state;

    return (
      <div className="office-info-retrieval-query">
        <Card title="事業所情報検索・照会">
          <Form onFinish={this.onFinish} initialValues={initialValues} autoComplete="off">
            <Row gutter={24}>
              <Col span={9}>
                <Form.Item name="KanaSearch" label="検索">
                  <Input onChange={(e) => this.handleSearch(e.target.value, 'KanaSearch')} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="PhoneNumSearch" label="電話番号">
                  <Input onChange={(e) => this.handleSearch(e.target.value, 'PhoneNumSearch')} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="InsuranceCardSymbolSearch" label="保険証記号">
                  <Input onChange={(e) => this.handleSearch(e.target.value, 'InsuranceCardSymbolSearch')} />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item name="SearchMethodsOp" label="曖昧検索" valuePropName="checked">
                  <Checkbox onChange={(e) => this.handleSearch(e.target.checked, 'SearchMethodsOp')} />
                </Form.Item>
              </Col>
            </Row>
            <Table
              size='small'
              bordered
              scroll={{ x: 1000, y: 700 }}
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
              pagination={{
                ...pagination,
                pageSizeOptions: [10],
                onChange: (page, pageSize) => {
                  this.setState({
                    initialValues: {
                      ...this.state.initialValues,
                      page
                    }
                  }, () => this.loadData(this.state.initialValues))
                }
              }}
              dataSource={dataSource}
              loading={isLoading}
              rowKey={record => record.id}
            >
              <Table.Column title="コード" dataIndex="office_code" width={90} 
               render={(text, record) => {
                 return (
                   <div style={{textAlign: 'right'}}>
                     {text === 0 || text === '0' ? '' : text}
                   </div>
                 )
               }}
              />
              <Table.Column title="枝番" dataIndex="branch_store_code" width={70} 
                 render={(text, record) => {
                  return (
                    <div style={{textAlign: 'right'}}>
                      {text === 0 || text === '0' ? '' : text}
                    </div>
                  )
                }}
              />
              <Table.Column title="メモ"  align='center' width={40}
              render={(text, record, index) => this.renderImpotant(record)} />
              <Table.Column title="カナ名称" dataIndex="office_kana_name"  width={100}/>
              <Table.Column title="漢字名称" dataIndex="office_kanji_name" />
              <Table.Column title="電話番号" dataIndex="phone_number"  width={110}/>
              <Table.Column title="保険証記号" dataIndex="insurer_card_symbol"  width={100}/>
              <Table.Column title="保険者" dataIndex="insurer_kanji_name" />
              <Table.Column title="契約" dataIndex="ContractPresence"  width={70}/>
              <Table.Column  align='center' width={70} fixed='right'
              render={(text, record, index) => (
                <Button type="primary" size='small' onClick={() => this.handleRowSelected(record)}>選択</Button>
              )} />
            </Table>
          </Form>
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

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0247001_OfficeInfoRetrievalQuery);
