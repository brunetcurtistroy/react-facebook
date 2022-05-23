import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input, Select, } from "antd";

class WS1319001_InsurerInfo extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'V4-TMS01030:保険者情報';

    this.state = {
    };
  }

  render() {
    return (
      <div className="insurer-info">
        <Card title="V4-TMS01030:保険者情報">
          <Table
            dataSource={[]}
            loading={false}
            pagination={{
              defaultCurrent: 1,
              total: 1,
              pageSize: 1,
              showSizeChanger: true,
              onChange: (page, pageSize) => {},
              onShowSizeChange: (page, pageSize) => {},
            }}
            rowKey={(record) => record.id}
          >
            <Table.Column title="保険者コード" dataIndex="" key="" />
            <Table.Column title="保険者名" dataIndex="" key="" />

          </Table>
          <Form
          >
            <Form.Item
              name=""
              label="特定健診.基本.負担内誉0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="特定健診.詳細.負担内誉0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="その他.追加.負担内容_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="その他.ドック.負担内容_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="その他.ドック.保険者負担_0001"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約機関.その他.代行機"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="健診内容区分(画面)"
            >
              <Select>
                <Select.Option value="">特定健診のみ</Select.Option>
                <Select.Option value="">その他健診項目あり</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="事業主健診の有無(画面)"
            >
              <Select>
                <Select.Option value="">事業主健診を含む</Select.Option>
                <Select.Option value="">被扶養者として受診</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="基本部分(画面)"
            >
              <Select>
                <Select.Option value=""></Select.Option>
                <Select.Option value="">負担なし</Select.Option>
                <Select.Option value="">定額負担</Select.Option>
                <Select.Option value="">定率負担</Select.Option>
                <Select.Option value="">保険者上限</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="詳細部分(画面)"
            >
              <Select>
                <Select.Option value=""></Select.Option>
                <Select.Option value="">負担なし</Select.Option>
                <Select.Option value="">定額負担</Select.Option>
                <Select.Option value="">定率負担</Select.Option>
                <Select.Option value="">保険者上限</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="追加項目(画面)"
            >
              <Select>
                <Select.Option value=""></Select.Option>
                <Select.Option value="">負担なし</Select.Option>
                <Select.Option value="">定額負担</Select.Option>
                <Select.Option value="">定率負担</Select.Option>
                <Select.Option value="">保険者上限</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="人間ドック(画面)"
            >
              <Select>
                <Select.Option value=""></Select.Option>
                <Select.Option value="">負担なし</Select.Option>
                <Select.Option value="">定額負担</Select.Option>
                <Select.Option value="">定率負担</Select.Option>
                <Select.Option value="">保険者上限</Select.Option>
                <Select.Option value="">保険者上限時定率負担</Select.Option>
                <Select.Option value="">保険者上限時定額負担</Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
              name=""
              label="その他(画面)"
            >
              <Select>
                <Select.Option value="">可能</Select.Option>
                <Select.Option value="">不可</Select.Option>

              </Select>
            </Form.Item>

          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1319001_InsurerInfo);
