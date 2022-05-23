import React from "react";

import {
  Card, Table, message, Button, Form, Input, Select, Popconfirm, Space,
  Modal,
} from "antd";
import {
  PlusOutlined, DeleteOutlined
} from '@ant-design/icons';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import axios from "configs/axios";
import WS1391001_ImplementAgencyInquiry from "./WS1391001_ImplementAgencyInquiry";

class WS1406001_ImplementorMaster extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '実施者マスタ';

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
    axios.get('/api/implementor-master/implementor-master')
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
    axios.post('/api/implementor-master/implementor-master', values)
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
        <Card title="実施者マスタ">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.formRef.current?.getFieldValue('MainSource')}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => (record.id || Math.random())}
            >
              <Table.Column title="実施者コード" dataIndex="practitioner_code" render={(value, record, index) => (<>
                <Form.Item name={['MainSource', index, 'id']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'practitioner_code']}>
                  <Input />
                </Form.Item>
              </>)} />
              <Table.Column title="カナ氏名" dataIndex="kana_name" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'kana_name']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="資格" dataIndex="qualification" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'qualification']}>
                  <Select>
                    <Select.Option value={1}>医師</Select.Option>
                    <Select.Option value={2}>保健師</Select.Option>
                    <Select.Option value={3}>管理栄養士</Select.Option>
                    <Select.Option value={4}>看護師</Select.Option>
                    <Select.Option value={5}>専門知識のある者</Select.Option>
                  </Select>
                </Form.Item>
              )} />
              <Table.Column title="有効無効" dataIndex="enabled_disabled" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'enabled_disabled']}>
                  <Select>
                    <Select.Option value={1}>有効</Select.Option>
                    <Select.Option value={9}>無効</Select.Option>
                  </Select>
                </Form.Item>
              )} />
              <Table.Column title="実施機関" dataIndex="implementing_agency_code" render={(value, record, index) => (<>
                <Input.Group compact>
                  <Form.Item name={['MainSource', index, 'implementing_agency_code']}>
                    <Input.Search onSearch={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: 900,
                          component: (
                            <WS1391001_ImplementAgencyInquiry
                              onFinishScreen={(data) => {
                                this.formRef.current.setFieldsValue({
                                  [['MainSource', index, 'implementing_agency_code']]: data.ImplementPeriodCode,
                                  [['MainSource', index, 'implement_agency_masters', 'kanji_name']]: data.recordData.kanji_name,
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
                  <Form.Item name={['MainSource', index, 'implement_agency_masters', 'kanji_name']}>
                    <Input readOnly />
                  </Form.Item>
                </Input.Group>
              </>)} />
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

                    return axios.post('/api/implementor-master/implementor-master/delete', {id: record.id})
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

export default WS1406001_ImplementorMaster;
