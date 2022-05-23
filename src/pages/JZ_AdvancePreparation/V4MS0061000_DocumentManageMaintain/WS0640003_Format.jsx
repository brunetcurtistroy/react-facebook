import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Input, Modal } from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS0642003_DocumentManageO from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS0642003_DocumentManageO.jsx';
import FormatAction from "redux/AdvancePreparation/DocumentManageMaintain/Format.action";

import Color from "constants/Color";

class WS0640003_Format extends React.Component {
  static propTypes = {
    Li_EscortCode: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'FORMAT';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: false,

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
      escort_code: this.props.Li_EscortCode
    }

    this.setState({ isLoadingTable: true })

    FormatAction.getScreenData(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  render() {
    let titleCd = this.props.Li_EscortCode ? '[' + this.props.Li_EscortCode +'] ': ''
    return (
      <div className="format">
        <Card title={ titleCd + 'を使用中のﾌｫｰﾏｯﾄ'}>
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            rowKey={(record) => record.id}
            scroll={{ x: 550 }}
            bordered
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: "60%",
                      component: (
                        <WS0642003_DocumentManageO
                          Li_Format={record.format}
                          onFinishScreen={(output) => {
                            this.closeModal();
                          }}
                        />
                      ),
                    },
                  });
                },
              };
            }}
          >
            <Table.Column title="ﾌｫｰﾏｯﾄ" width={'20%'} dataIndex="format"
              render={(value, record, index) => {
                return (
                  <div style={{ cursor: 'pointer', color: Color(record.expression_6).Foreground }}>{record.format}</div>
                )
              }}
            />
            <Table.Column title="コース" width={90} dataIndex="medical_exam_course"
              render={(value, record, index) => {
                return (
                  <div style={{ cursor: 'pointer',  color: Color(record.expression_6).Foreground }}>{record.medical_exam_course}</div>
                )
              }}
            />
            <Table.Column title="書式名称" dataIndex="format_name"
              render={(value, record, index) => {
                return (
                  <div style={{ cursor: 'pointer', color: Color(record.expression_6).Foreground }}>{record.format_name}</div>
                )
              }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0640003_Format);
