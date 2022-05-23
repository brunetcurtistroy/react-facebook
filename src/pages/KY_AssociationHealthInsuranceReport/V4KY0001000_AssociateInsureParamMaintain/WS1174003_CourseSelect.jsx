import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS1174003_CourseSelect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'コース選択';

    this.state = {
    };
  }

  render() {
    return (
      <div className="course-select">
        <Card title="コース選択">
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
            <Table.Column title="基本コース" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="SEQ" dataIndex="" key="" />
            <Table.Column title="グループ" dataIndex="" key="" />
            <Table.Column title="セットコード" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="SEQ" dataIndex="" key="" />
            <Table.Column title="コード" dataIndex="" key="" />
            <Table.Column title="検査名称" dataIndex="" key="" />
            <Table.Column title="タイプ" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS1174003_CourseSelect);
