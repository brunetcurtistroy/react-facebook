import React from "react";
import { connect } from "react-redux";

import { CarryOutOutlined } from '@ant-design/icons';

import { Card, Table, Tree, Row, Col, Form, Input } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    isParent: true,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        isParent: false,
        children: []
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        isParent: false,
        children: [],
      },
    ],
  },
];
class WS1505001_AgeManageInfoMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '年齢管理情報保守';

    this.state = {
      treeData: [],
      selectedRows: [],
      selectedNodes: [],
      defaultSelectedKeys: {},
      dataSource: [
        {
          id: 1,
          age_id_code: '10',
          age_title: 'AAAA',
          age: 18,
          enabled_disabled: true
        },
      ],
      isLoadingTable: false,

      isLoadTree: false
    };
  }

  componentDidMount() {
    this.setState({
      treeData: treeData,
      selectedNodes: [treeData[0]],
      defaultSelectedKeys: treeData[0].key,
      isLoadTree: true
    });
    this.loadData();
  }

  loadData(value) {
    this.formRef.current.setFieldsValue({
      dataTable: this.state.dataSource,
    });
  }

  onSelectNode = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info.selectedNodes, this.state.treeData[0].key);
    this.setState({
      selectedNodes: info.selectedNodes
    });
  };

  renderTreetable() {
    return (
      <Tree
        showIcon
        icon={<CarryOutOutlined />}
        treeData={this.state.treeData}
        defaultExpandedKeys={['0-0']}
        onSelect={this.onSelectNode}
        defaultSelectedKeys={[this.state.treeData[0].key]}
      />
    )
  }

  renderTableSubTitle() {
    return (
      <Table
        dataSource={this.state.dataSource}
        loading={this.state.isLoadingTable}
        pagination={this.state.dataSource?.length > 10 ? true : false}
        rowKey={(record) => record.id}
      >
        <Table.Column title="識別ｺｰﾄﾞ" dataIndex="age_id_code"
          render={(text, record, index) => {
            return (
              <Form.Item name={["dataTable", index, "age_id_code"]}>
                <Input type="text" readOnly style={{ border: 'none', background: 'transparent' }} />
              </Form.Item>
            )
          }}
        />
        <Table.Column title="タイトル" dataIndex="age_title"
          render={(text, record, index) => {
            return (
              <Form.Item name={["dataTable", index, "age_title"]}>
                <Input type="text" />
              </Form.Item>
            )
          }}
        />
      </Table>
    )
  }

  renderTableSubAge() {
    return (
      <Table
        dataSource={this.state.dataSource}
        loading={this.state.isLoadingTable}
        pagination={this.state.dataSource?.length > 10 ? true : false}
        rowKey={(record) => record.id}
      >
        <Table.Column title="年齢" dataIndex="age"
          render={(text, record, index) => {
            return (
              <Form.Item name={["dataTable", index, "age"]}>
                <Input type="text" readOnly style={{ border: 'none', background: 'transparent' }} />
              </Form.Item>
            )
          }} />
        <Table.Column title="対象" dataIndex="enabled_disabled"
          render={(text, record, index) => {
            return (
              <Form.Item name={["dataTable", index, "enabled_disabled"]}
                valuePropName="checked">
                <Checkbox></Checkbox>
              </Form.Item>
            )
          }}
        />
      </Table>
    )
  }

  render() {
    return (
      <div className="age-manage-info-maintain">
        <Card title="年齢管理情報保守">
          <Form ref={this.formRef} >
            <Row gutter={24}>
              <Col style={{ width: '250px', borderRight: '1px solid #afabab' }}>
                {this.state.isLoadTree ? this.renderTreetable() : ''}
              </Col>
              <Col style={{ width: 'calc(100% - 250px)' }}>
                {this.state.selectedNodes.length > 0 && this.state.selectedNodes[0].isParent ? this.renderTableSubTitle() : this.renderTableSubAge()}
              </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1505001_AgeManageInfoMaintain);
