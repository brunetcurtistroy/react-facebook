import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Input, } from "antd";

class WS1464003_ListProcess extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '一覧処理';

    this.state = {
      data: this.props.dataListProcess ?? {}
    };
  }

  render() {
    return (
      <div className="list-process">
        <Card title="一覧処理">
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
            <Table.Column title="" dataIndex="" key="" />
            <Table.Column title="受診日/ＩＤ" dataIndex="" key="" />
            <Table.Column title="カナ氏名／漢字氏名" dataIndex="" key="" />
            <Table.Column title="性別" dataIndex="" key="" />
            <Table.Column title="続柄" dataIndex="" key="" />
            <Table.Column title="生年月日/年齢" dataIndex="" key="" />
            <Table.Column title="保険者番号" dataIndex="" key="" />
            <Table.Column title="契約番号" dataIndex="" key="" />
            <Table.Column title="契約名" dataIndex="" key="" />

          </Table>
          <Form
          >
            <Form.Item
              name=""
              label="契約番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約年度"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約名称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="動機付け単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="動機付け金額・％01"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="動機付金額・％04"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="動機付け金額・％02"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="積極的単価"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="積極的金額・％01"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="積極的金額・％04"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="積極的金額・％02"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="積極的金額・％03"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="積極定支援実施ポイント"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="その他.ドック.負担内容"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="その他.ドック.保険者負担上限額"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="管掌名（漢字）"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="利用券整理番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診券整理番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="交付年月日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="有効期限"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者番号"
            >
              <Input type="text" />
            </Form.Item>

          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataListProcess: state.SpecificInsureGuideSettleProcessListReducer.dataListProcess
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1464003_ListProcess);
