import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { SearchOutlined, MoreOutlined } from "@ant-design/icons";

import { Card, Form, Input, Select, Button, Table, Row, Col, DatePicker, Space, TimePicker, } from "antd";
import TextArea from "antd/lib/input/TextArea";

const style = {
  grid: {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  },
  gridSM: {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  },
  formBtm: {
    marginBottom: 0
  },
  inputRead: {
    border: 'none',
    background: 'transparent'
  }
}

class WS0262001_LogDisplay extends React.Component {
  formSearch = React.createRef();
  formTable = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'ログ照会';

    this.state = {
      dataSource: [],
      isLoadingTable: false
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="log-display">
        <Form
          ref={this.formSearch}
          onFinish={this.onFinish}
        >
          <Card title="ログ照会" className="mb-3">
            <Row gutter={24}>
              <Col span={7} style={{ marginRight: '10px', borderRight: '1px solid #9dc2e8' }}>
                <Form.Item name="RecordingDateFChar" label="記録日" {...style.grid}>
                  <Space>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/YY" />
                    <label>~</label>
                    <Form.Item name="RecordingDateTChar" style={style.formBtm}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/YY" />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item name="RecordingTimeF" label="時　間" {...style.grid}>
                  <Space>
                    <TimePicker />
                    <label>~</label>
                    <Form.Item name="RecordingTimeT" style={style.formBtm}>
                      <TimePicker />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item name="Searches" label="検　索" {...style.grid}>
                  <Input type='text' />
                </Form.Item>
              </Col>
              <Col span={7} style={{ marginRight: '10px', marginleft: '10px', borderRight: '1px solid #9dc2e8' }}>
                <Form.Item name="DateF" label="受診日" {...style.grid}>
                  <Space>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/YY" />
                    <label>~</label>
                    <Form.Item name="DateT" style={style.formBtm}>
                      <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/YY" />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item name="PersonalNum" label="個人番号" {...style.grid}>
                  <Space>
                    <Input type='text' />
                    <Form.Item name="kanji_name" style={style.formBtm}>
                      <Input type='text' readOnly style={style.inputRead} />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item name="ReserveNum" label="予約番号" {...style.grid}>
                  <Input type='text' style={{ width: '170px' }} />
                </Form.Item>
              </Col>
              <Col span={7} style={{ marginleft: '10px' }}>
                <Form.Item name="Programid" label="公開名" {...style.grid}>
                  <Space>
                    <Input type='text' />
                    <Form.Item name="description" style={style.formBtm}>
                      <Input type='text' readOnly style={style.inputRead} />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item name="User" label="ユーザー" {...style.grid}>
                  <Space>
                    <Input type='text' />
                    <Form.Item name="user_name" style={style.formBtm}>
                      <Input type='text' readOnly style={style.inputRead} />
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item name="LogType" label="ログ種別" {...style.grid}>
                  <Select style={{ width: '50%' }}>
                    <Select.Option value={0}>通常</Select.Option>
                    <Select.Option value={1}>検査取込</Select.Option>
                    <Select.Option value={2}>全て</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={22} style={{ textAlign: 'right' }}>
                <Form.Item>
                  <Button icon={<SearchOutlined />} >　検　　索</Button>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>

        <Row gutter={24}>
          <Col span={14}>
            <Card>
              <Table
                loading={this.state.isLoadingTable}
                dataSource={this.state.dataSource}
                pagination={true}
                rowKey={record => record.id}>
                <Table.Column title="Lv" dataIndex="Expression_7" />
                <Table.Column title="日付" dataIndex="recording_date" />
                <Table.Column title="時間" dataIndex="RecordingTime" />
                <Table.Column title="ユーザー" dataIndex="user_name" />
                <Table.Column title="カテゴリ" dataIndex="Expression_27" />
                <Table.Column title="発生プログラム" dataIndex="Expression_24" />
                <Table.Column title="内容" dataIndex="title" />
                <Table.Column title="受診日" dataIndex="consult_date" />
                <Table.Column title="個人番号" dataIndex="person_num" />
              </Table>
            </Card>
          </Col>
          <Col span={10}>
            <Card>
              <Form ref={this.formTable} >
                <div style={{ padding: '10px', border: '1px solid #9dc2e8', marginBottom: '10px' }}>
                  <Form.Item name="Expression_27" label="カテゴリ" {...style.gridSM}>
                    <Input type='text' style={{ width: '70%' }} />
                  </Form.Item>
                  <Form.Item name="Expression_22" label="起動プログラム" {...style.gridSM}>
                    <Input type='text' />
                  </Form.Item>
                  <Form.Item name="Expression_23" label="発生プログラム" {...style.gridSM}>
                    <Input type='text' style={{ width: '70%' }} />
                  </Form.Item>
                </div>
                <div style={{ padding: '10px', border: '1px solid #9dc2e8', marginBottom: '10px' }}>
                  <Form.Item name="version" label="バージョン" {...style.gridSM}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/YY" />
                  </Form.Item>
                  <Form.Item name="host_name" label="コンピュータ" {...style.gridSM}>
                    <Input type='text' style={{ width: '70%' }} />
                  </Form.Item>
                  <Form.Item name="Expression_25" label="ユーザー" {...style.gridSM}>
                    <Input type='text' style={{ width: '70%' }} />
                  </Form.Item>
                </div>
                <div style={{ padding: '10px', border: '1px solid #9dc2e8', marginBottom: '10px' }}>
                  <Form.Item name="Expression_32" label="受診日" {...style.gridSM}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/YY" />
                  </Form.Item>
                  <Form.Item name="Expression_33" label="個人番号" {...style.gridSM}>
                    <Space>
                      <Input type='text' />
                      <Button icon={<MoreOutlined />}></Button>
                      <Form.Item name="kanji_name" style={style.formBtm}>
                        <Input type='text' readOnly style={style.inputRead} />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                </div>
                <div style={{ padding: '10px', border: '1px solid #9dc2e8', marginBottom: '10px' }}>
                  <Form.Item name="Expression_26" label="内容" {...style.gridSM}>
                    <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/YY" />
                  </Form.Item>
                  <Form.Item name="recorded_content" label="明細" {...style.gridSM}>
                    <TextArea rows={10} />
                  </Form.Item>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0262001_LogDisplay);
