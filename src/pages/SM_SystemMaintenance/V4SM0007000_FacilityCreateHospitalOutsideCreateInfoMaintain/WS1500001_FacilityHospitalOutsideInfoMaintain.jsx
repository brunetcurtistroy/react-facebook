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

class WS1500001_FacilityHospitalOutsideInfoMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '施設(院内/外)情報保守';

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
    axios.get('/api/facility-create-hospital-outside-create-info-maintain/facility-hospital-outside-info-maintain')
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
    axios.post('/api/facility-create-hospital-outside-create-info-maintain/facility-hospital-outside-info-maintain', values)
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
        <Card title="施設(院内/外)情報保守">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.formRef.current?.getFieldValue('MainSource')}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => (record.id || Math.random())}
            >
              <Table.Column title="区分" dataIndex="facility_type" render={(value, record, index) => (<>
                <Form.Item name={['MainSource', index, 'id']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'facility_type']}>
                  <Input />
                </Form.Item>
              </>)} />
              <Table.Column title="施設名称" dataIndex="facility_name" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'facility_name']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="院内/外区分" dataIndex="conditions_in_out_hospital" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'conditions_in_out_hospital']}>
                  <Select>
                    <Select.Option value={1}>院内</Select.Option>
                    <Select.Option value={2}>院外</Select.Option>
                  </Select>
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

                    return axios.post('/api/facility-create-hospital-outside-create-info-maintain/facility-hospital-outside-info-maintain/delete', {id: record.id})
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
          afterClose={this.state.childModal.afterClose}
          destroyOnClose={true}
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

export default WS1500001_FacilityHospitalOutsideInfoMaintain;
