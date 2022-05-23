import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";
import { Card, Space, Table, Button, Modal } from "antd";
import WS0640001_EscortMaintain from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS0640001_EscortMaintain.jsx';
import EscortInquiryAction from "redux/AdvancePreparation/DocumentManageMaintain/EscortInquiry.action";
class WS0638013_EscortInquiry extends React.Component {
  static propTypes = {
    Lio_EscortCode: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'エスコート照会';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: false,
      selectedRowKeys: [],
      rowSelected: [],
    };
  }

  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  }

  getScreenData() {
    let params = {
      escort_code: this.props.Lio_EscortCode
    }

    this.setState({ isLoadingTable: true })

    EscortInquiryAction.getScreenData(params)
      .then((res) => {
        let index = (res && this.props.Lio_EscortCode) ? res.findIndex(x => x.escort_code === this.props.Lio_EscortCode) : 0
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,
          rowSelected: res && res.length > 0 ? [res[index]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[index].id] : [],
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
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
      <div className="escort-inquiry">
        <Card title="エスコート照会">
          <Table
            size='small'
            style={{ cursor: 'pointer' }}
            rowClassName={(record, index) => record.id === this.state.rowSelected[0]?.id ? 'table-row-light' : ''}
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            scroll={{ y: 700 }}
            bordered
            rowKey={(record) => record.id}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  this.setState({
                    rowSelected: [record],
                    selectedRowKeys: [record.id],
                  });
                }
              };
            }}
          >
            <Table.Column title="コード" dataIndex="escort_code" width={80} align='center'
              render={(value, record, index) => {
                return (
                  <span>{record.escort_code?.toString().substr(0, 1)}-{record.escort_code?.toString().substr(1, 2)}</span>
                )
              }}
            />
            <Table.Column title="エスコート名称" dataIndex="escort_name" />
            <Table.Column width={120} align="center"
              render={(value, record, index) => {
                return (
                  <Space>
                    <Button type="primary"
                      onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '95%',
                            component: (
                              <WS0640001_EscortMaintain
                                Li_EscortCode={record.escort_code}
                              />
                            ),
                          },
                        })
                      }}>保守</Button>
                    <Button type="primary"
                      onClick={() => {
                        if (this.props.onFinishScreen) {
                          this.props.onFinishScreen({
                            Lio_EscortCode: record.escort_code,
                            recordData: record
                          });
                        }
                      }}
                    >選択</Button>
                  </Space>
                )
              }}
            />
          </Table>

          {/* <div style={{ marginTop: '1em', textAlign: 'right' }}>
            <Space>
              <Button type="primary"
                disabled={this.state.dataSource.length === 0}
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '95%',
                      component: (
                        <WS0640001_EscortMaintain
                          Li_EscortCode={this.state.rowSelected[0].escort_code}
                        />
                      ),
                    },
                  })
                }}>保守</Button>
              <Button type="primary"
                disabled={this.state.dataSource.length === 0}
                onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      Lio_EscortCode: this.state.rowSelected[0].escort_code,
                      recordData: this.state.rowSelected[0]
                    });
                  }
                }}
              >選択</Button>
            </Space>
          </div> */}
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.getScreenData()
            this.closeModal()
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0638013_EscortInquiry);
