import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SpecifiedValueConfirmAction from 'redux/InputBusiness/NotInputCheckCategory/SpecifiedValueConfirm.action'
import { Button, Card, Col, Row, Table, Form, Input, Modal } from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS2713014_NormalValueSetting from 'pages/MS_InspectionMaintenance/V4MS9901300_NormalValueSettingMaintain/WS2713014_NormalValueSetting.jsx';

class WS2644008_SpecifiedValueConfirm extends React.Component {
  static propTypes = {
    Lo_StsSelect: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_PatternCode: PropTypes.any,
    Li_JungleLevel: PropTypes.any,

  };


  constructor(props) {
    super(props);

    // document.title = '規定値確認';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoading: false,
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: [],
      indexTable: 0,
    };
  }
  showWS2713014_NormalValueSetting() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS2713014_NormalValueSetting
            onFinishScreen={(obj) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  settingBtn() {
    SpecifiedValueConfirmAction.SettingBtn().then((res) => {
      this.showWS2713014_NormalValueSetting()
    })
  }
  okButtonEvent() {
    const { Li_ReserveNum, Li_PatternCode, Li_JungleLevel, onFinishScreen } = this.props
    const params = {
      W1_reserve_num: Li_ReserveNum,
      PatternCode: Li_PatternCode,
      Li_JungleLevel,
      StsAllCasesSpecifiedValue: 1
    }
    SpecifiedValueConfirmAction.OKbtn(params).then(res => {
      if (onFinishScreen) {
        onFinishScreen({ Lo_StsSelect: true })
      }
    }).finally(() => {
    })
  }
  okButton() {
    this.okButtonEvent()
  }
  getListData() {
    this.setState({ isLoading: true });
    SpecifiedValueConfirmAction.getListData().then(res => {
      this.setState({ dataSource: res })
    }).finally(() => {
      this.setState({ isLoading: false });
    })
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getListData()
    }
  }
  componentDidMount() {
    this.getListData()
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
      <div className="specified-value-confirm">
        <Card title="規定値確認">
          <p style={{ marginBottom: "10px" }}>以下の検査に規定値を設定しますか？</p>
          <Form>
            <Table
              dataSource={this.state.dataSource}
              className="mb-3"
              loading={this.state.isLoading}
              pagination={false}
              scroll={{ y: '500px' }}
              rowKey={(record) => record.id}
              rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
              size="small"
              onRow={(record, rowIndex) => {
                return {
                  onClick: async (event) => {
                    const nodeName = event.target && event.target.nodeName
                    let index = this.state.dataSource.findIndex(x => x.id === record.id)
                    if (nodeName !== 'svg') {
                      await this.setState({
                        selectedRows: [record],
                        selectedRowKeys: [record.id],
                        indexTable: index
                      })
                    }

                  }
                }
              }}
            >
              <Table.Column title="検査ｺｰﾄﾞ" dataIndex="W1_inspect_cd"
              />
              <Table.Column title="検査略名" dataIndex="exam_short_name"
              />
              <Table.Column title="規定値" dataIndex="Expresstion_5"
              />

            </Table>
            <Row gutter={24}>
              <Col span={24}>
                <Button type="primary" style={{ float: "right" }} onClick={() => { this.okButton() }}>OK</Button>
                <Button type="primary" style={{ float: "right", marginRight: "10px" }} onClick={() => { this.settingBtn() }} >設定</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2644008_SpecifiedValueConfirm);
