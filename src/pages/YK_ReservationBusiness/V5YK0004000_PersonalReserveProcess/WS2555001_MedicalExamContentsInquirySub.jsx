import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";

import { Card, Button, Tree, message, Spin, Tooltip } from "antd";
import { FolderFilled } from '@ant-design/icons';

import WS2555012_List from "pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2555012_List.jsx";
import MedicalExamContentsInquirySubAction from 'redux/ReservationBusiness/PersonalReserveProcess/MedicalExamContentsInquirySub.actions'
class WS2555001_MedicalExamContentsInquirySub extends React.Component {
  static propTypes = {
    Li_CourseCode: PropTypes.any,
    Li_JInspectGCategory: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '健診内容照会SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      treeData: [],
      selectedRows: [],
      selectedNodes: [],
      isLoadTree: false,
      isSpinning: true
    };
  }
  componentDidMount() {
    this.GetScreenData()
  }

  componentDidUpdate(preV) {
    if (this.props !== preV) {
      this.GetScreenData()
    }
  }

  GetScreenData() {
    this.setState({ isLoadingTree: true })
    let data = {
      Li_CourseCode: this.props.Li_CourseCode ? this.props.Li_CourseCode : "",
      Li_JInspectGCategory: this.props.Li_JInspectGCategory ? this.props.Li_JInspectGCategory : "",
    }
    MedicalExamContentsInquirySubAction.GetScreenData(data)
      .then(res => {
        this.setState({ isSpinning: false });
        if (res && res.length > 0) {
          this.handleTree(res);
        }
      }).catch(error => {
        this.setState({ isSpinning: false });
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      })
      .finally(() => this.setState({ isLoadingTree: false }))
  }

  handleTree(lstData) {
    if (lstData?.length > 0) {
      let lstRoot = lstData.filter(item => item.W1_parent_node_id === "Root");
      let result = [];
      lstRoot.forEach(root => {
        result.push(this.handleNode(root, lstData));
      });

      this.setState({
        treeData: result,
        isLoadTree: true
      });
    }
  }

  handleNode(data, lstData) {
    let node = this.convertNode(data);
    let lstChild = lstData.filter(item => item.W1_parent_node_id?.toString() === data.W1_node_id?.toString());
    lstChild.forEach(child => {
      node.children.push(this.handleNode(child, lstData));
    });
    return node;
  }

  convertNode(data) {
    const node = {
      title: <Tooltip placement="topLeft" title={data.W1_display_name}>
        <span> {data.W1_parent_node_id === "Root" ? <FolderFilled style={{ color: "#e6d606" }} /> : ''} {data.DisplayName}</span>
      </Tooltip>,
      key: data.id,
      node_id: data.id,
      display_name: data.W1_display_name,
      name: data.DisplayName,
      node_id_data: data.W1_node_id,
      parent_node_id: data.W1_parent_node_id,
      children: []
    }
    return node
  }

  renderTreetable() {
    return (
      <Tree
        defaultExpandAll
        showLine
        treeData={this.state.treeData}
        defaultSelectedKeys={[this.state.treeData[0].key]}
      />
    )
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
      <div className="medical-exam-contents-inquiry-sub">
        <Card title="健診内容照会SUB">
          <Spin spinning={this.state.isSpinning} >
            <div className="scrollbar" style={{ overflow: 'auto', height: '70vh' }}>
              {this.state.isLoadTree ? this.renderTreetable() : ''}
            </div>
          </Spin>
          <Button style={{ float: "right", margin: "10px" }} type="primary"
            onClick={() => {
              this.setState({
                childModal: {
                  ...this.state.childModal,
                  visible: true,
                  width: 600,
                  component:
                    <WS2555012_List
                      onFinishScreen={() => {
                        this.closeModal()
                      }}
                    />
                },
              });
            }}
          >一覧</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2555001_MedicalExamContentsInquirySub);
