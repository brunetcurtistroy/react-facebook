import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import GetImage from "constants/Images";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Button, Modal, Pagination, Table, } from "antd";

import { MoreOutlined } from "@ant-design/icons";
import InspectChangeQuerySubAction from "redux/CounterBusiness/Counter/InspectChangeQuerySub.action";
import WS0333001_SetIncludesQuery from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS0333001_SetIncludesQuery";

class WS2587021_InspectChangeQuerySub extends React.Component {
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Li_DataClassify: PropTypes.any,
    Li_Course: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // document.title = '検査変動照会SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: false,

      current_page: 1,
      totalItem: 1,
      totalPage: 1,
      pageSize: 10,
    };
  }

  componentDidMount() {
    this.setState({
      current_page: 1,
      totalItem: 1,
      totalPage: 1,
      pageSize: 10,
    })
    this.getDataTable(1, 10);
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      await this.setState({
        current_page: 1,
        totalItem: 1,
        totalPage: 1,
        pageSize: 10,
      })
      this.getDataTable(1, 10);
    }
  }

  getDataTable(current_page, limit) {
    let params = {
      ReserveNum: this.props.Li_ReserveNum ? this.props.Li_ReserveNum : '',
      DataClassify: this.props.Li_DataClassify ? this.props.Li_DataClassify : '',
      page: current_page,
      limit: limit
    }

    if (this.props.Li_ReserveNum) {
      this.setState({
        isLoadingTable: true,
        dataSource: []
      })
      InspectChangeQuerySubAction.GetDataTable(params)
        .then(async res => {
          await this.setState({
            dataSource: res ? res.data.InspectChangeQuerySub : [],
            current_page: res ? res.data.current_page : 1,
            totalItem: res ? res.data.total : 0,
            totalPage: res ? res.data.last_page : 1,
            pageSize: res ? res.data.per_page : 10,
            isLoadingTable: false
          })
        })
    }
  }

  changePage = async (page, pageSize) => {
    await this.getDataTable(page, pageSize);
    await this.setState({
      current_page: page
    })
  }

  changePageSize = async (current, pageSize) => {
    await this.setState({
      current_page: 1,
      pageSize: pageSize
    })
    await this.getDataTable(1, pageSize);
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  renderPagination() {
    return (
      <Pagination
        size='small'
        hideOnSinglePage={this.state.dataSource.length > 10 ? false : true}
        style={{ margin: '10px 0', textAlign: 'right' }}
        current={this.state.current_page}
        defaultPageSize={this.state.pageSize}
        total={this.state.totalItem}
        showLessItems={true}
        onChange={this.changePage}
        onShowSizeChange={this.changePageSize}
      />
    )
  }

  render() {
    return (
      <div className="inspect-change-query-sub">
        <Table
          size='small'
          bordered
          dataSource={this.state.dataSource}
          loading={this.state.isLoadingTable}
          pagination={false}
          rowKey={(record) => record.id}
        >
          <Table.Column title="" dataIndex="Expression_7" align='center' width={40}
            render={(text, record, index) => {
              let numImg = '';
              switch (text) {
                case 40:
                case 50:
                case 60: numImg = <img src={GetImage(record.Expression_7)} alt="icon" />
                  break;
                default: numImg = ''
                  break;
              }
              return numImg;
            }} />
          <Table.Column title="名称" dataIndex="set_short_name" />
          <Table.Column title="金額" dataIndex="Expression_8" align='center'
            render={(value, record, index) => {
              return (
                <div style={{ textAlign: 'right' }}>{value == 0 ? '' : value?.toLocaleString()}</div>
              )
            }}
          />
          <Table.Column width={30} align='center'
            render={(value, record) => {
              return (
                <Button size="small" icon={<MoreOutlined />}
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      childModal: {
                        width: 800,
                        visible: true,
                        component: (
                          <WS0333001_SetIncludesQuery
                            Li_StartDate={this.props.Li_ContractStartDate}
                            Li_SetCode={record.set_and_exam_code}
                            Li_CourseCode={this.props.Li_Course}
                            onFinishScreen={() => {
                              this.closeModal();
                            }}
                          />
                        ),
                      },
                    });
                  }}
                >
                </Button>
              );
            }}
          />
        </Table>

        {this.state.dataSource.length > 0 ? this.renderPagination() : ''}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2587021_InspectChangeQuerySub);
