import React from "react";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import {
  Card, Table, message, Button, Form, Input, Select, Popconfirm, Space,
  Modal,
} from "antd";
import {
  PlusOutlined, DeleteOutlined
} from '@ant-design/icons';

import axios from "configs/axios";

class WS1401001_InspectCmtMaster extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査コメントマスタ';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        afterClose: null,
        width: 0,
      },

      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadMainSource();
  }

  loadMainSource = () => {
    this.setState({ isLoading: true });
    axios.get('/api/inspect-cmt-master/inspect-cmt-master')
      .then(res => {
        console.log(res.data.MainSource);
        this.formRef.current.setFieldsValue({
          MainSource: res.data.MainSource,
        });
      })
      .catch(error => {
        console.log(error);

        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  onFinish = (values) => {
    this.setState({ isLoading: true });
    axios.post('/api/inspect-cmt-master/inspect-cmt-master', values)
      .then(res => {
        message.success('保存完了');
        this.loadMainSource();
      })
      .catch(error => {
        console.log(error);

        this.setState({ isLoading: false });

        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      });
  }

  render() {
    return (
      <div className="insure-guide-course">
        <Card title="検査コメントマスタ">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.formRef.current?.getFieldValue('MainSource')}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => (record.id || Math.random())}
            >
              <Table.Column title="コメント区分" dataIndex="comment_division" render={(value, record, index) => (<>
                <Form.Item name={['MainSource', index, 'id']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'comment_division']}>
                  <Input />
                </Form.Item>
              </>)} />
              <Table.Column title="コメントコード" dataIndex="exam_comment_code" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'exam_comment_code']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="画面内容" dataIndex="screen_content" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'screen_content']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="帳票内容" dataIndex="document_content" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'document_content']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="オプション" dataIndex="options" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'options']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column
                key="action"
                title={(
                  <Button type="primary" size="small" icon={<PlusOutlined />} loading={this.state.isLoadingInsurersList} onClick={() => {
                    this.formRef.current.setFieldsValue({
                      MainSource: [
                        ...this.formRef.current.getFieldValue('MainSource'),
                        {},
                      ]
                    });
                    this.forceUpdate();
                  }} />
                )}
                render={(value, record) => (<Space>
                  <Popconfirm title="削除しますか？" onConfirm={() => {
                    this.setState({ isLoading: true });

                    return axios.post('/api/inspect-cmt-master/inspect-cmt-master/delete', {id: record.id})
                      .then(() => this.loadMainSource())
                      .catch(error => {
                        console.log(error);
                        this.setState({ isLoading: false });
                        const res = error.response;
                        if (!res || !res.data || !res.data.message) {
                          message.error('エラーが発生しました');
                          return;
                        }

                        message.error(res.data.message);
                      });
                  }}>
                    <Button type="primary" size="small" danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>)}
              />
            </Table>

            <Form.Item
              className="mt-3"
              style={{textAlign: 'right'}}
            >
              <Button type="primary" htmlType="submit" loading={this.state.isLoading}>保存</Button>
            </Form.Item>
          </Form>
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

export default WS1401001_InspectCmtMaster;
