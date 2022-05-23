import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Col, Row, Table, Button, Modal, message } from "antd";
import WS0612001_PersonalActionItemTreeDisplay from 'pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS0612001_PersonalActionItemTreeDisplay.jsx';
import InspectChangesAction from 'redux/basicInfo/ConsultInfoReconstruction/InspectChanges.actions'
import Color from "constants/Color";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0335011_InspectChanges extends React.Component {
  static propTypes = {
    Li_InspectDifference: PropTypes.any,
    W1_reserve_num: PropTypes.any,
    W1_course_level: PropTypes.any,
    onFinishScreen: PropTypes.func
  };
  constructor(props) {
    super(props);

    // document.title = '検査変更内容';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingTable: false,
      tableData: []
    };
  }
  componentDidMount() {
    this.GetListData()
  }
  componentDidUpdate(preV) {
    if (this.props != preV) {
      this.GetListData()
    }
  }
  GetListData() {
    if (this.props.Li_InspectDifference) {
      this.setState({ isLoadingTable: true })
      InspectChangesAction.GetListData({ W1_inspect_difference: this.props.Li_InspectDifference ? this.props.Li_InspectDifference : "" }).then(res => {
        this.setState({ tableData: res ? res : [] })
      }).catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      }).finally(() => this.setState({ isLoadingTable: false }))
    }
  }
  InspectQuery_F12() {
    this.setState({ isLoadingTable: true })
    InspectChangesAction.InspectQuery_F12({
      W1_reserve_num: this.props.W1_reserve_num ? this.props.W1_reserve_num : "",
      W1_course_level: this.props.W1_course_level ? this.props.W1_course_level : ""
    }).then(res => {
      this.setState({
        childModal: {
          ...this.state.childModal,
          visible: true,
          width: 800,
          component: (
            <WS0612001_PersonalActionItemTreeDisplay
              Lio_Expansion={false}
              onFinishScreen={(output) => {
                this.closeModal()
              }}
            />
          ),
        },
      });
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isLoadingTable: false }))
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
      <div className="inspect-changes">
        <Card title="検査変更内容">
          <Table
            dataSource={this.state.tableData}
            loading={this.state.isLoadingTable}
            pagination={false} size="small" bordered={true}
            rowKey={(record) => record.id}
            className="mb-3"
          >
            <Table.Column title="区分" dataIndex="W1_option"
            render = {(value, record, index) =>{
              return(
                <span style={{color: Color(record.Expression_9)?.Foreground}}>{record.W1_option}</span>
              )
            }}
            />
            <Table.Column title="コード" dataIndex="W1_inspect_cd" />
            <Table.Column title="略名" dataIndex="exam_short_name" />
            <Table.Column title="正式" dataIndex="exam_name" />
            <Table.Column title="タイプ" dataIndex="exam_type" />
          </Table>
          <Row gutter={16}>
            <Col span={24}>
              <Button type="primary" style={{ float: "right" }}
                onClick={() => {
                  this.InspectQuery_F12()}}
              >
                検査照会
              </Button>
            </Col>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0335011_InspectChanges);
