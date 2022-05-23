import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";

import { Card, Form, Input, Select, Table, Row, Col, DatePicker, Button, message, Tag } from "antd";

import axios from 'configs/axios';
import moment from "moment";
import { debounce } from "lodash";

class WS0371001_InspectRefValueSetting extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査基準値設定';

    this.state = {
      screenData: {},

      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadScreenData();
  }

  loadScreenData = () => {
    axios.get('/api/inspect-ref-value-setting/inspect-ref-value-setting/get-screen-data')
      .then(res => {
        this.setState({
          screenData: res.data,
        });

        this.loadTableData();
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
      .finally(() => 1)
  }

  loadTableData = () => {
    this.setState({isLoading: true});
    axios.get('/api/inspect-ref-value-setting/inspect-ref-value-setting/', {
      params: {
        Li_SearchChar: this.formRef.current.getFieldValue('SearchChar'),
        Li_SpecifiedDate: this.formRef.current.getFieldValue('SpecifiedDateChar'),
        Li_Use: true,
        Li_AlreadySet: true,
        Li_JudgeLevel: this.formRef.current.getFieldValue('JudgeLevel'),
      },
    })
      .then(res => {
        this.formRef.current.setFieldsValue(res.data);
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
      .finally(() => this.setState({isLoading: false}));
  }

  onFinish = (values) => {
    this.setState({isLoading: true});
    axios.post('/api/inspect-ref-value-setting/inspect-ref-value-setting/', {
      ...values,
      Li_JudgeLevel: values.JudgeLevel
    })
      .then(res => {
        message.success('保存完了');
        this.loadTableData();
      })
      .catch(error => {
        this.setState({isLoading: false});

        console.log(error);
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      // .finally(() => this.setState({isLoading: false}));
  }

  render() {
    return (
      <div className="inspect-ref-value-setting">
        <Card title="検査基準値設定">
          <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{
            JudgeLevel: 0,
            SpecifiedDateChar: moment(),
          }}>
            <Input.Group>
              <Row gutter={8}>
                <Col span={5}>
                  <Form.Item name="SearchChar" label="検索">
                    <Input onChange={debounce(this.loadTableData, 300)} />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="JudgeLevel" label="判定レベル">
                    <Select onChange={() => this.loadTableData}>
                      {this.state.screenData.JudgeLevel?.map((value, index) => (
                        <Select.Option value={value.condition_2}>{value.item}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="SpecifiedDateChar" label="指指定日付">
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" onChange={() => this.loadTableData} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="NormalJudge" hidden><Input /></Form.Item>
            </Input.Group>

            <Table
              dataSource={this.formRef.current?.getFieldValue('MainSource')}
              loading={this.state.isLoading}
              pagination={false}
              rowKey={(record) => (record.id || Math.random())}
              scroll={{ y: '60vh' }}
              size="small"
            >
              <Table.Column title="コード" dataIndex="test_item_code" />
              <Table.Column title="検査名称" dataIndex="exam_name" />
              <Table.Column title="タイプ" dataIndex="exam_type" />
              <Table.Column title="単位" dataIndex="unit" />
              <Table.Column title="性別" key="gender" render={() => (<>
                <Form.Item>
                  <Tag color="blue">男性</Tag>
                </Form.Item>
                <Form.Item>
                  <Tag color="red">女性</Tag>
                </Form.Item>
              </>)} />
              <Table.Column title="基準値" key="val" render={(value,record) => (<>
                <Form.Item>{record.Expression_9}</Form.Item>
                <Form.Item>{record.Expression_10}</Form.Item>
              </>)} />
              <Table.Column title="出力用" key="NormalPattern" render={(value, record, index) => (<>
                <Form.Item name={['MainSource', index, 'id']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'judgment_code']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'ivj_man', 'start_date_on']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'NormalPatternM']}>
                  <Input />
                </Form.Item>
                <Form.Item name={['MainSource', index, 'NormalPatternF']}>
                  <Input />
                </Form.Item>
              </>)} />
            </Table>
            <Form.Item style={{textAlign:'right'}} className="mt-3">
              <Button type="primary" htmlType="submit" loading={this.state.isLoading}>保存</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default WS0371001_InspectRefValueSetting;
