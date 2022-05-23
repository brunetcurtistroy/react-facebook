import React from "react";

import {
  Card, Table, message, Button, Form, Input, Select, Popconfirm, Space,
  Modal,
} from "antd";
import {
  ReloadOutlined, PlusOutlined, DeleteOutlined
} from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import axios from "configs/axios";
import WS1390001_ImplementClassifyInquiry from "./WS1390001_ImplementClassifyInquiry";

class WS1405001_ImplementLocationMaster extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '実施場所マスタ';

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
    axios.get('/api/implementation-location-master/implement-location-master')
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
    axios.post('/api/implementation-location-master/implement-location-master', values)
      .then(res => {
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
        <Card title="実施場所マスタ">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.formRef.current?.getFieldValue('MainSource')}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => (record.id || Math.random())}
            >
              <Table.Column title="実施場所コード" dataIndex="implement_location_code" render={(value, record, index) => (<>
                <Form.Item name={['MainSource', index, 'id']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'implement_location_code']}>
                  <Input />
                </Form.Item>
              </>)} />
              <Table.Column title="実施場所" dataIndex="implement_location" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'implement_location']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="実施区分" dataIndex="implement_division" render={(value, record, index) => (<>
                <Input.Group compact>
                  <Form.Item name={['MainSource', index, 'implement_division']}>
                    <Input.Search onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 900,
                          component: (
                            <WS1390001_ImplementClassifyInquiry
                              onFinishScreen={(data) => {
                                this.formRef.current.setFieldsValue({
                                  [['MainSource', index, 'implement_division']]: data.ImplementLocationClassify,
                                  [['MainSource', index, 'implement_division_masters', 'implement_division']]: data.recordData.implement_division,
                                });

                                this.setState({
                                  childModal: {
                                    ...this.state.childModal,
                                    visible: false,
                                  },
                                });
                              }}
                            />
                          ),
                        },
                      });
                    }} />
                  </Form.Item>
                  <Form.Item name={['MainSource', index, 'implement_division_masters', 'implement_division']}>
                    <Input readOnly />
                  </Form.Item>
                </Input.Group>
              </>)} />
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

                    return axios.post('/api/implementation-location-master/implement-location-master/delete', {id: record.id})
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

export default WS1405001_ImplementLocationMaster;
