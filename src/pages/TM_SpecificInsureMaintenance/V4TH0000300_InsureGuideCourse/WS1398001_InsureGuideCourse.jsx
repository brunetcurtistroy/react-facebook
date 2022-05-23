import React from "react";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import {
  Card, Table, message, Button, Form, Input, Select, Popconfirm, Space,
  Modal,
} from "antd";
import {
  ReloadOutlined, PlusOutlined, DeleteOutlined
} from '@ant-design/icons';

import axios from "configs/axios";
import WS1398010_InsureGuideCourseDetail from "./WS1398010_InsureGuideCourseDetail";

class WS1398001_InsureGuideCourse extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '保健指導コース';

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
    axios.get('/api/insure-guide-course/insure-guide-course')
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
    axios.post('/api/insure-guide-course/insure-guide-course', values)
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
        <Card title="保健指導コース">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.formRef.current?.getFieldValue('MainSource')}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => (record.id || Math.random())}
            >
              <Table.Column title="コースコード" dataIndex="insure_guide_course_code" render={(value, record, index) => (<>
                <Form.Item name={['MainSource', index, 'id']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'insure_guide_course_code']}>
                  <Input />
                </Form.Item>
              </>)} />
              <Table.Column title="略称名" dataIndex="short_name" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'short_name']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="コース名称" dataIndex="course_name" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'course_name']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="保健指導区分" dataIndex="insure_guide_division" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'insure_guide_division']}>
                  <Select>
                    <Select.Option value="1">動機付支援</Select.Option>
                    <Select.Option value="2">積極的支援</Select.Option>
                    <Select.Option value="3">動機付相当</Select.Option>
                    <Select.Option value="4">モデル実施</Select.Option>
                  </Select>
                </Form.Item>
              )} />
              <Table.Column title="支援A" dataIndex="SupportATotalPoints" />
              <Table.Column title="支援B" dataIndex="SupportBTotalPoints" />
              <Table.Column title="合計" key="Expression_13" render={(value, record) => record.id ? (record.SupportATotalPoints+record.SupportBTotalPoints) : null} />
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
                  <Button type="primary" size="small" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 900,
                        afterClose: () => {
                          this.loadMainSource();
                        },
                        component: (
                          <WS1398010_InsureGuideCourseDetail
                            Li_CourseCode={record.insure_guide_course_code}
                          />
                        ),
                      },
                    });
                  }} disabled={!record.id}>詳細</Button>
                  <Popconfirm title="削除しますか？" onConfirm={() => {
                    this.setState({ isLoading: true });

                    return axios.post('/api/insure-guide-course/insure-guide-course/delete', {id: record.id})
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

export default WS1398001_InsureGuideCourse;
