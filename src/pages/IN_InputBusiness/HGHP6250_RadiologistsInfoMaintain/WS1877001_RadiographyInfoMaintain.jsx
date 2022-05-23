import React from "react";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import {
  Card, Table, message, Button, Form, Input, Modal, Checkbox,
} from "antd";

import axios from "configs/axios";

class WS1877001_RadiographyInfoMaintain extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '読影者情報保守';

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
    axios.get('/api/radiologists-info-maintain/radiography-info-maintain')
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
    axios.post('/api/radiologists-info-maintain/radiography-info-maintain', values)
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
        <Card title="読影者情報保守">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.formRef.current?.getFieldValue('MainSource')}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => (record.id || Math.random())}
              size="small"
            >
              <Table.Column title="健診ID" dataIndex="username" render={(value, record, index) => (<>
                <Form.Item name={['MainSource', index, 'id']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'username']}>
                  <Input readOnly />
                </Form.Item>
              </>)} />
              <Table.Column title="ユーザー名" dataIndex="name" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'name']}>
                  <Input readOnly />
                </Form.Item>
              )} />
              <Table.Column title="読影ｺｰﾄﾞ" key="doctor_code" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'radiography_doctors', 'doctor_code']}>
                  <Input />
                </Form.Item>
              )} />
              <Table.Column title="区分" key="interpretation_division" render={(value, record, index) => (
                <Form.Item name={['MainSource', index, 'radiography_doctors', 'interpretation_division']}>
                  <Input type="number" maxLength="2" />
                </Form.Item>
              )} />
              <Table.Column title="技師" key="status" render={(value, record, index) => (<>
                <Form.Item name={['MainSource', index, 'radiography_doctors', 'status']} valuePropName="checked">
                  <Checkbox />
                </Form.Item>
              </>)} />
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

export default WS1877001_RadiographyInfoMaintain;
