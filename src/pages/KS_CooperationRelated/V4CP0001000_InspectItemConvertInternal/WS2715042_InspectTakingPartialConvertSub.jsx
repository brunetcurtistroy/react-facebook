import React from "react";

import { Card, Table, Select, Form, message, Button, Space, Input, Popconfirm } from "antd";
import {
  PlusOutlined,
} from '@ant-design/icons';

import axios from 'configs/axios';

class WS2715042_InspectTakingPartialConvertSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査取込部分変換';

    this.state = {
      isLoadingList: false,
    };

    this.loadList = this.loadList.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.loadList();
  }

  loadList() {
    this.setState({ isLoadingList: true });
    axios.get('/api/inspect-item-convert-internal/inspect-taking-partial-convert-sub')
      .then(res => {
        // this.setState({ inspectList: res.data });
        this.formRef.current.setFieldsValue({
          tableData: res.data,
        });
        // this.forceUpdate();
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingList: false });
      });
  }

  onFinish(values) {
    this.setState({ isLoadingList: true });
    axios.post('/api/inspect-item-convert-internal/inspect-taking-partial-convert-sub', values)
      .then(res => {
        // this.setState({ inspectList: res.data });
        // this.formRef.current.setFieldsValue({
        //   tableData: res.data,
        // });
        // this.forceUpdate();
        message.success('保存完了！');
        this.loadList();
      })
      .catch(error => {
        const res = error.response;
        this.setState({ isLoadingList: false });
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => {
      });
  }

  render() {
    return (
      <div className="inspect-taking-partial-convert-sub">
        <Card title="検査取込部分変換">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.formRef.current?.getFieldValue('tableData')}
              loading={this.state.isLoadingList}
              pagination={false}
              rowKey={(record) => record.id || Math.random()}
            //  rowSelection={{
            //    type: 'radio',
            //    onChange: (selectedRowKeys, selectedRows) => {
            //      console.log('selectedRows: ', selectedRows);
            //    }
            //  }}
            >
              <Table.Column title="結果" dataIndex="conversion_before" render={(vlaue, record, index) => (
                <Form.Item name={['tableData', index, "conversion_before"]}>
                  <Input maxLength={10} />
                </Form.Item>
              )} />
              <Table.Column title="位置" dataIndex="conversion_before_position" render={(row, record, index) => (
                <Form.Item name={['tableData', index, "conversion_before_position"]}>
                  <Select>
                    <Select.Option value=""></Select.Option>
                    <Select.Option value="B">前</Select.Option>
                    <Select.Option value="A">後</Select.Option>
                  </Select>
                </Form.Item>
              )} />
              <Table.Column title="" key="move-to" render={() => (
                <div style={{ textAlign: 'center' }}>→</div>
              )} />
              <Table.Column title="結果" dataIndex="conversion_after" render={(vlaue, record, index) => (
                <Form.Item name={['tableData', index, "conversion_after"]}>
                  <Input maxLength={10} />
                </Form.Item>
              )} />
              <Table.Column title="位置" dataIndex="conversion_after_position" render={(row, record, index) => (
                <Form.Item name={['tableData', index, "conversion_after_position"]}>
                  <Select>
                    <Select.Option value=""></Select.Option>
                    <Select.Option value="B">前</Select.Option>
                    <Select.Option value="A">後</Select.Option>
                  </Select>
                </Form.Item>
              )} />
              <Table.Column
                title={() => (
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                    const formIns = this.formRef.current;
                    const insurer_specials_form = formIns.getFieldValue('tableData');

                    console.log(insurer_specials_form);

                    formIns.setFieldsValue({
                      tableData: [
                        ...insurer_specials_form,
                        {}
                      ],
                    });
                    this.forceUpdate();
                  }} />
                )}
                key="action"
                render={(text, record, index) => (
                  <Popconfirm title="削除処理を実行しますか？"
                    onConfirm={() => {
                      const formInstance = this.formRef.current;
                      const newLst = Object.assign([], formInstance.getFieldValue('tableData'));
                      newLst.splice(index, 1);
                      formInstance.setFieldsValue({
                        tableData: newLst
                      });
                      this.forceUpdate();
                    }}
                  >
                    <Button type="default" htmlType="button" size="small">削除</Button>
                  </Popconfirm>
                )}
              />
            </Table>
            <Space style={{ float: 'right' }} className="mt-3">
              <Button type="primary" htmlType="submit" loading={this.state.isLoadingList}>保存</Button>
            </Space>
          </Form>
        </Card>
      </div>
    );
  }
}

export default WS2715042_InspectTakingPartialConvertSub;
