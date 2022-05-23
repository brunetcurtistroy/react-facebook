import { Button, Card, Col, Form, message, Modal, Row, Spin, Tree } from "antd";
import WS0612002_CharacterStringSearch from 'pages/BS_BasicInfo/V4KB0203000_ConsultInfoReconstruction/WS0612002_CharacterStringSearch.jsx';
import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import PersonalActionItemTreeDisplayAction from 'redux/basicInfo/ConsultInfoReconstruction/PersonalActionItemTreeDisplay.actions';
class WS0612001_PersonalActionItemTreeDisplay extends React.Component {
  static propTypes = {
    Lio_Expansion: PropTypes.any,
    onFinishScreen: PropTypes.func
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = '個人実施項目ツリー表示';
    this.state = {
      dataTable: [],
      isLoadingTree: false,
      treeData: [],
      node: {},
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      defaultNode: "",
      defaultValue:null,
    };
  }
  componentDidMount() {
    this.GetListData(null)
  }
  GetListData() {
    this.setState({ isLoadingTree: true}) 
    PersonalActionItemTreeDisplayAction.GetListData().then(res => {
      this.setState({
        dataTable: res,
      })
      this.checkTree(res)
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isLoadingTree: false }))

  }
  componentDidUpdate(preV) {
    if (this.props != preV) {
      this.GetListData()
    }
  }
  checkTree(dataTree) {
    if (dataTree && dataTree.length > 0) {
      let parent = [];
      let count = 0;
      dataTree.map((value, index) => {
        count = index
        if (value.W1_parent_node_id === "Root") {
          parent.push(value)
        }
      })
      if (dataTree.length - 1 === count) {
        let treeData = []
        if (parent.length > 0) {
          parent.map((value) => {
            treeData.push({
              key: value.id,
              title: value.W1_display_name,
              W1_node_id: value.W1_node_id,
              children: this.findChildren(value)
            })
          })
          if (treeData.length === parent.length) {
            this.setState({
              isLoadingTree: false,
              treeData: treeData,
              defaultNode: this.state.defaultValue? this.state.defaultValue :""
            }) 
            
          }
        }
      }
    } else {
      this.setState({ isLoadingTree: false })
    }
  }
  findChildren(parent) {
    let parentChil = [];
    let dem = 0
    this.state.dataTable.map((value, index) => {
      dem = index;
      if (parent.W1_node_id === value.W1_parent_node_id) {
        parentChil.push({
          key: value.id,
          title: value.W1_display_name,
          W1_node_id: value.W1_node_id,
          children: this.findChildren(value)
        })
      }
    })
    if (dem === this.state.dataTable.length - 1) {
      return parentChil
    }
  }
  ShowWS0612002_CharacterStringSearch() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 800,
        component: (
          <WS0612002_CharacterStringSearch
            onFinishScreen={(output) => {
              this.NodeMovement(output?.Lio_SearchString)
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  NodeMovement(value) {
    this.setState({ isLoadingTree: true })
    PersonalActionItemTreeDisplayAction.NodeMovement({ CharStringSearch: value }).then(res => {
      this.setState({defaultValue: res?.NodeId})
      this.GetListData()
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isLoadingTree: false }))
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  onSelect = (selectedKeys, { selected, selectedNodes, node, event }) => {
    this.setState({ node: node })
  }
  render() {
    return (
      <div className="personal-action-item-tree-display">
        <Spin spinning={this.state.isLoadingTree}>
          <Card title={<Button onClick={() => this.ShowWS0612002_CharacterStringSearch()} >検索</Button>}>
            <Form ref={this.formRef} >
              <Row  >
                <Col span={24}>
                  <div style={{ height: '700px', overflow: 'auto', width: '98%' }}>
                    <Tree.DirectoryTree
                      defaultExpandAll 
                      showLine={true}
                      defaultSelectedKeys={[this.state.defaultNode]} 
                      onSelect={this.onSelect}
                      treeData={this.state.treeData}
                    />
                  </div>
                </Col>
              </Row>
            </Form>
          </Card>
        </Spin>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0612001_PersonalActionItemTreeDisplay);
