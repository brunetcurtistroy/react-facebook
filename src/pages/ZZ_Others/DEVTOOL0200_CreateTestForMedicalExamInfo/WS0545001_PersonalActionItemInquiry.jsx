import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Form, Tree } from "antd";
import { FolderFilled } from '@ant-design/icons';

import PersonalActionItemInquiryAction from "redux/Others/CreateTestForMedicalExamInfo/PersonalActionItemInquiry.action";

class WS0545001_PersonalActionItemInquiry extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Li_ConsultCourseLevel: PropTypes.any,
    Li_CategoryCode: PropTypes.any,
    Li_PatternCode: PropTypes.any,
    Li_DisplayOrder: PropTypes.any,
    Li_InspectCode: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '個人実施項目照会';

    this.state = {
      dataSource: [],
      treeData: [],
      selectedRows: [],
      selectedNodes: [],
      isLoadTree: false
    };
  }

  componentDidMount() {
    this.InspectCodeWriting();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.InspectCodeWriting();
    }
  }

  getTreeData() {
    PersonalActionItemInquiryAction.GetTreeData()
      .then((res) => {
        this.handleTree(res);
      })
  }

  InspectCodeWriting() {
    PersonalActionItemInquiryAction.InspectCodeWriting()
      .then((res) => {
        this.getTreeData()
      })
  }

  CategoryWriting() {
    PersonalActionItemInquiryAction.CategoryWriting()
      .then((res) => {
      })
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
    if (lstData.length > 0) {
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

  onFinish(values) { }

  render() {
    return (
      <div className="personal-action-item-inquiry">
        <Card title="個人実施項目照会">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <div className="scrollbar" style={{ overflow: 'auto', height: '70vh' }}>
              {this.state.isLoadTree ? this.renderTreetable() : ''}
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0545001_PersonalActionItemInquiry);
