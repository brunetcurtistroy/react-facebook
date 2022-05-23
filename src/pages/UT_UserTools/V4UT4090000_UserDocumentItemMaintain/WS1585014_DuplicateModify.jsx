import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Space, Select, Button, message } from "antd";
import { extractBtnAction } from "redux/UserTools/UserDocumentItemMaintain/DuplicateModify.actions";
import Checkbox from "antd/lib/checkbox/Checkbox";

const styleSelect = {
  width: 100
}
class WS1585014_DuplicateModify extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '重複修正';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: true,
      rowSelect: {}
    };
    this.onFinish = this.onFinish.bind(this);
  }

  extractBtn = (params) => {
    this.setState({isLoading: true});
    extractBtnAction(params)
      .then(res => {
        if (res){
          this.setState({ dataSource: res.data });
          this.formRef?.current.setFieldValue({'dataSource': res.data});
        }
      })
      .catch(() => message.error('エラー'))
      .finally(() => this.setState({ isLoading: false }))
  }

  onFinish = (values) => {
    const params = {
      ValidOnly: values.ValidOnly,
      Classify: values.Classify
    }
    this.extractBtn(params);
  }

  render() {
    return (
      <div className="duplicate-modify">
        <Card title="重複修正">
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{ ValidOnly: '0', Classify: '' }} >
            <Space>
              <Form.Item name='ValidOnly' label='有効'>
                <Select style={styleSelect}>
                  <Select.Option value='0'>全て</Select.Option>
                  <Select.Option value='1'>有効のみ</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name='Classify' label='分類'>
                <Select style={styleSelect}>
                  <Select.Option value=''>全て</Select.Option>
                  <Select.Option value='D'>検査</Select.Option>
                  <Select.Option value='H'>ﾍｯﾀﾞ</Select.Option>
                  <Select.Option value='T'>ﾀｸﾞ</Select.Option>
                </Select>
              </Form.Item>
            </Space>
            <Form.Item style={{ float: 'right' }}>
              <Button type='primary' htmlType='submit'>抽出</Button>
            </Form.Item>

            <Table
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={this.state.pagination}
              rowKey={(record) => record.id}
            >
              <Table.Column title="" dataIndex="W1_enabled_disabled" 
                render={(text, record, index) => (
                  <Form.Item valuePropName='checked' name={['dataSource', index, 'W1_enabled_disabled']} style={{margin: 0}}>
                    <Checkbox />
                  </Form.Item>
                )}
              />
              <Table.Column title="分類" dataIndex="W1_sect_cd" />
              <Table.Column title="コード" dataIndex="W1_item_cd" />
              <Table.Column title="項目名称" dataIndex="W1_item_name" />
              <Table.Column title="変数名称" dataIndex="W1_variable_name" />
              <Table.Column title="所属" dataIndex="Expression_7" />
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1585014_DuplicateModify);
