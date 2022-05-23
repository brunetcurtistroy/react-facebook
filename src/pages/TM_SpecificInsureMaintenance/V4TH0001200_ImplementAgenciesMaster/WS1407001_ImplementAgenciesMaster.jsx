import React from "react";

import {
  Card, Table, message, Button, Form, Input, Popconfirm, Space, Checkbox,
  Modal,
} from "antd";
import {
  PlusOutlined, DeleteOutlined
} from '@ant-design/icons';

import axios from "configs/axios";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS1407001_ImplementAgenciesMaster extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '実施機関マスタ';

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
    axios.get('/api/implement-agencies-master/implement-agencies-master')
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
    axios.post('/api/implement-agencies-master/implement-agencies-master', values)
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
        <Card title="実施機関マスタ">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.formRef.current?.getFieldValue('MainSource')}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => (record.id || Math.random())}
            >
              <Table.Column title="実施機関コード" dataIndex="implementing_agency_code" render={(value, record, index) => (<>
                <Form.Item name={['MainSource', index, 'id']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'implementing_agency_code']}>
                  <Input />
                </Form.Item>
              </>)} />
              <Table.Column title="機関番号" dataIndex="institution_number" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'institution_number']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="カナ／機関名" key="name" render={(value, record, index) => (<>
                <Form.Item name={['MainSource', index, 'kana_name']}>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'kanji_name']}>
                  <Input />
                </Form.Item>
              </>)} />
              <Table.Column title="個別A" dataIndex="support_form_individual_a" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'support_form_individual_a']} valuePropName="checked">
                  <Checkbox />
                </Form.Item>
              )} />
              <Table.Column title="個別B" dataIndex="support_form_individual_b" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'support_form_individual_b']} valuePropName="checked">
                  <Checkbox />
                </Form.Item>
              )} />
              <Table.Column title="ｸﾞﾙｰﾌﾟ" dataIndex="support_form_group" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'support_form_group']} valuePropName="checked">
                  <Checkbox />
                </Form.Item>
              )} />
              <Table.Column title="電話A" dataIndex="support_form_telephone_a" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'support_form_telephone_a']} valuePropName="checked">
                  <Checkbox />
                </Form.Item>
              )} />
              <Table.Column title="電話B" dataIndex="support_form_phone_b" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'support_form_phone_b']} valuePropName="checked">
                  <Checkbox />
                </Form.Item>
              )} />
              <Table.Column title="ﾒｰﾙA" dataIndex="support_form_email_a" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'support_form_email_a']} valuePropName="checked">
                  <Checkbox />
                </Form.Item>
              )} />
              <Table.Column title="ﾒｰﾙB" dataIndex="support_form_email_b" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'support_form_email_b']} valuePropName="checked">
                  <Checkbox />
                </Form.Item>
              )} />
              <Table.Column title="オプション" dataIndex="option_remark" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'option_remark']}>
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

                    return axios.post('/api/implement-agencies-master/implement-agencies-master/delete', {id: record.id})
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
          afterClose={this.state.childModal.afterClose}
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

export default WS1407001_ImplementAgenciesMaster;
