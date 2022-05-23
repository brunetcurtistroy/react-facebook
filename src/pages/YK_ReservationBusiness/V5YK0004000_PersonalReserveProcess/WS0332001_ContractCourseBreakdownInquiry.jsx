import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Tree, Spin, message } from "antd";
import { FolderFilled } from '@ant-design/icons';

import ContractCourseBreakdownInquiryAction from "redux/ReservationBusiness/PersonalReserveProcess/ContractCourseBreakdownInquiry.action.js";

class WS0332001_ContractCourseBreakdownInquiry extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    Li_CourseCode: PropTypes.any,
    Li_CourseInspectItemsMax1000: PropTypes.any,

    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);

    // document.title = '契約コース内訳照会';

    this.state = {
      treeData: [],
      selectedRows: [],
      selectedNodes: [],
      isLoadTree: false,
      isSpinning: true,
    };
  }

  componentDidMount() {
    this.getTreeData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getTreeData();
    }
  }

  getTreeData() {
    let params = {
      Li_ContractType: this.props.Li_ContractType ? this.props.Li_ContractType : 0,
      Li_ContractOrgCode: this.props.Li_ContractOrgCode ? this.props.Li_ContractOrgCode : 0,
      Li_ContractStartDate: this.props.Li_ContractStartDate ? this.props.Li_ContractStartDate : '',
      Li_ContractNum: this.props.Li_ContractNum ? this.props.Li_ContractNum : 0,
      Li_CourseCode: this.props.Li_CourseCode ? this.props.Li_CourseCode : '',
      Li_CourseInspectItemsMax1000: this.props.Li_CourseInspectItemsMax1000 ? this.props.Li_CourseInspectItemsMax1000 : ''
    }

    ContractCourseBreakdownInquiryAction.GetTreeData(params)
      .then((res) => {
        this.setState({
          isSpinning: false
        });
        if (res && res.data.length > 0) {
          this.handleTree(res.data);
        }
      })
      .catch((err) => {
        this.setState({
          isSpinning: false
        });
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  convertNode(data) {
    const key = data.id;
    const node = {
      title: <span> {data.W1_parent_node_id === "Root" ? <FolderFilled style={{ color: "#e6d606" }} /> : ''} {data.W1_display_name}</span>,
      key,
      node_id: data.id,
      node_id_data: data.W1_node_id,
      parent_node_id: data.W1_parent_node_id,
      children: []
    }
    return node
  }

  handleNode(data, lstData) {
    let node = this.convertNode(data);
    let lstChild = lstData.filter(item => item.W1_parent_node_id?.toString() === data.W1_node_id?.toString());
    lstChild.forEach(child => {
      node.children.push(this.handleNode(child, lstData));
    });
    return node;
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
        isLoadTree: true,
      });
    }
  }

  renderTreetable() {
    return (
      <Tree
        // defaultExpandAll
        showLine
        treeData={this.state.treeData}
        defaultSelectedKeys={[this.state.treeData[0].key]}
      />
    )
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="contract-course-breakdown-inquiry">
        <Card title="契約ｺｰｽ内訳照会">
          <Spin spinning={this.state.isSpinning} >
            <div className="scrollbar" style={{ overflow: 'auto', height: '70vh' }}>
              {this.state.isLoadTree ? this.renderTreetable() : ''}
            </div>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0332001_ContractCourseBreakdownInquiry);
