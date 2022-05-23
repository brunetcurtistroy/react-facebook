import React from "react";
import { connect } from "react-redux";
import axios from 'configs/axios';
import { Button, Card, Col, Row, Table, Modal, } from "antd";
import WS2704001_CategoryMasterMaintain from 'pages/MS_InspectionMaintenance/V4MS0102000_CategoryMasterMaintain/WS2704001_CategoryMasterMaintain.jsx';
import CategoryListSettingSubAction from 'redux/InputBusiness/NotInputCheckCategory/CategoryListSettingSub.action'
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0267001_CategorySearchQuerySingle extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'ｶﾃｺﾞﾘ検索・照会(単体)';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: [],
      isLoading: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadData()
    }
  }
 
  componentDidMount() {
    this.loadData()
  }
  loadData() {
    const params = {
      Lio_CategoryCode: this.props.Lio_CategoryCode,
      Li_UnusedInspectDisplay: this.props.Li_UnusedInspectDisplay
    }
    this.setState({ isLoading: true })
    CategoryListSettingSubAction.GetCategorySearchQuery(params).then((res => {
      const data = res ? res : []
      const record = data.find(s => s.category_code === this.props.Lio_CategoryCode)
      const arrId = record && record.id ? [record.id] : []
      this.setState({ dataSource: res, selectedRowKeys: arrId })
    })).finally(() => { this.setState({ isLoading: false }) })
  }
  render() {
    return (
      <div className="category-search-query-single">
        <Card title="ｶﾃｺﾞﾘ検索・照会(単体)">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={false}
            bordered={true}
            scroll={{ y: 500 }}
            size="small"
            className="mb-3"
            rowKey={(record) => record.id}

          // rowSelection={{
          //   type: 'radio',
          //   selectedRowKeys: this.state.selectedRowKeys,
          //   onChange: async (selectedRowKeys, selectedRows) => {
          //     await this.setState({ selectedRows: selectedRows?.[0], selectedRowKeys })
          //   }
          // }}
          >
            <Table.Column title="ｺｰﾄﾞ" width={90}
              dataIndex="category_code" render={(item, record, index) => {
                return <div style={{ float: 'right' }}><span>{record.category_code}</span></div>
              }} />
            <Table.Column title="名  称" dataIndex="category_name" width={200} />
            <Table.Column title="" render={(value, record, index) => {
              return <div>
                <Button type="primary" style={{ float: "right" }} onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({ recordData: record, Lio_CategoryCode: record.category_code })

                  }
                }} >選択</Button>
                <Button type="primary" style={{ float: "right", marginRight: "10px" }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 800,
                        component:
                          <WS2704001_CategoryMasterMaintain
                            onFinishScreen={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />
                        ,
                      },
                    });
                  }}
                >保守</Button>
              </div>
            }} />
          </Table>

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0267001_CategorySearchQuerySingle);
