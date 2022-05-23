import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS0417001_MasterListOutputInspectValueJudgeInfo extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'マスタ一覧出力[検査値判定情報]';

    this.state = {
    };
  }

  render() {
    return (
      <div className="master-list-output-inspect-value-judge-info">
        <Card title="マスタ一覧出力[検査値判定情報]">
          <Table
            columns={[]}
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
          />

          <Table>
            <Table.Column title="内部検査コード" dataIndex="" key="" />
            <Table.Column title="検査略名" dataIndex="" key="" />
            <Table.Column title="検査名称" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="コード" dataIndex="" key="" />
            <Table.Column title="略名" dataIndex="" key="" />
            <Table.Column title="名称" dataIndex="" key="" />
            <Table.Column title="タイプ" dataIndex="" key="" />
            <Table.Column title="判定コード" dataIndex="" key="" />
            <Table.Column title="コメント" dataIndex="" key="" />
            <Table.Column title="単位" dataIndex="" key="" />
            <Table.Column title="内部コード" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="判定レベル" dataIndex="" key="" />
            <Table.Column title="略名称" dataIndex="" key="" />
            <Table.Column title="名称" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="適用開始日" dataIndex="" key="" />
            <Table.Column title="名称" dataIndex="" key="" />

          </Table>

          <Table>
            <Table.Column title="性別" dataIndex="" key="" />
            <Table.Column title="下限値" dataIndex="" key="" />
            <Table.Column title="上限値" dataIndex="" key="" />
            <Table.Column title="判定" dataIndex="" key="" />
            <Table.Column title="コード" dataIndex="" key="" />
            <Table.Column title="指導コメント" dataIndex="" key="" />
            <Table.Column title="基準値文字" dataIndex="" key="" />
            <Table.Column title="優先" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0417001_MasterListOutputInspectValueJudgeInfo);
