import React from "react";
import ModalDraggable from "components/Commons/ModalDraggable";

import {
  Card, Table, message, Button, Form, Input, Popconfirm, Space,
  Modal, Checkbox, InputNumber
} from "antd";
import {
  PlusOutlined, DeleteOutlined
} from '@ant-design/icons';

import axios from "configs/axios";

class WS1876001_RadiographyJudgeMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '読影判定保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        afterClose: null,
        width: 0,
      },

      selectedRow: {},
      selectedRowKeys: [],

      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadMainSource();
  }

  loadMainSource = () => {
    this.setState({ isLoading: true });
    axios.get('/api/radiography-judge-maintain/radiography-judge-maintain')
      .then(res => {
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
    axios.post('/api/radiography-judge-maintain/radiography-judge-maintain', values)
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
      <div className="radiography-judge-maintain">
        <Card title="読影判定保守">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.formRef.current?.getFieldValue('MainSource')}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => record.id}
              size="small"
              rowSelection={{
                type: 'radio',
                onSelect: (record) => {
                  this.setState({
                    selectedRow: record,
                    selectedRowKeys: [record?.id],
                  });
                },
                selectedRowKeys: this.state.selectedRowKeys,
              }}
              onRow={(record) => {
                return {
                  onClick: () => {
                    this.setState({
                      selectedRow: record,
                      selectedRowKeys: [record?.id],
                    });
                  },
                };
              }}
            >
              <Table.Column title="判定ﾚﾍﾞﾙ" dataIndex="judgment_level" render={(value, record, index) => (<>
                <Form.Item name={['MainSource', index, 'id']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'judgment_level']}>
                  <InputNumber />
                </Form.Item>
              </>)} />
              <Table.Column title="読影判定" dataIndex="interpretation_judgment_result" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'interpretation_judgment_result']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="健診判定" dataIndex="medical_exam_judgment_result" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'medical_exam_judgment_result']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="正常" width={40} dataIndex="normal_value_flag" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'normal_value_flag']} valuePropName="checked">
                  <Checkbox />
                </Form.Item>
              )} />
              <Table.Column title="重さ" key="judgment_weight" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'judgment_level_conversion_master', 'judgment_weight']}>
                  <InputNumber readOnly />
                </Form.Item>
              )} />
              <Table.Column
                width={30}
                key="action"
                title={(
                  <Button type="primary" size="small" icon={<PlusOutlined />} loading={this.state.isLoadingInsurersList} onClick={() => {
                    this.formRef.current.setFieldsValue({
                      MainSource: [
                        ...this.formRef.current.getFieldValue('MainSource'),
                        { id: `n-${Math.random()}` },
                      ]
                    });
                    this.forceUpdate();
                  }} />
                )}
                render={(value, record) => (<Space>
                  <Popconfirm title="削除しますか？" onConfirm={() => {
                    this.setState({ isLoading: true });

                    return axios.post('/api/radiography-judge-maintain/radiography-judge-maintain/delete', { id: record.id })
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
            {this.formRef.current?.getFieldValue('MainSource')?.map((value, index) => (<>
              <Form.Item name={['MainSource', index, 'options']} hidden={(value.id !== this.state.selectedRow.id)} className="mt-3">
                <Input.TextArea />
              </Form.Item>
            </>))}

            <Form.Item className="mt-3" style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" loading={this.state.isLoading}>保存</Button>
            </Form.Item>
          </Form>
        </Card>
        <ModalDraggable
          afterClose={this.state.childModal.afterClose}
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

export default WS1876001_RadiographyJudgeMaintain;
