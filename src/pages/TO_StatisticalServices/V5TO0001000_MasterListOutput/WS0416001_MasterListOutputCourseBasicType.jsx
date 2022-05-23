import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Table, } from "antd";

class WS0416001_MasterListOutputCourseBasicType extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'マスタ一覧出力[コース基本種別]';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="master-list-output-course-basic-type">
        <Card title="マスタ一覧出力[コース基本種別]">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="コースコード[F]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="コースコード[T]"
            >
              <Input type="text" />
            </Form.Item>

          </Form>

          <Table>
            <Table.Column title="コースコード" dataIndex="" key="" />
            <Table.Column title="コース名称(略/正)" dataIndex="" key="" />
            <Table.Column title="予約表示項目" dataIndex="" key="" />
            <Table.Column title="検体ラベル" dataIndex="" key="" />
            <Table.Column title="日数" dataIndex="" key="" />
            <Table.Column title="パターン名称/判定レベル" dataIndex="" key="" />
            <Table.Column title="オプション" dataIndex="" key="" />
            <Table.Column title="コース料金(現/改)" dataIndex="" key="" />

          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0416001_MasterListOutputCourseBasicType);
