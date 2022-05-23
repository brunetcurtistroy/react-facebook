import React from "react";
import { connect } from "react-redux";

import { Button, Card, Table } from "antd";

class WS0482010_EffectiveDateSelect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = "適用日選択";

    this.state = {};
  }

  render() {
    return (
      <div className="effective-date-select">
        <Card title="適用日選択">
          <Table
            dataSource={[
              {
                id: 1,
                W1_date: "2021/08/26",
                Expression_2: "2021/08/26開始",
              },
            ]}
            loading={false}
            rowKey={(record) => record.id}
          >
            <Table.Column title="適用日" dataIndex="W1_date" key="" />
            <Table.Column title="名称" dataIndex="Expression_2" key="" />
            <Table.Column
              title=""
              dataIndex=""
              render={(text, record, index) => (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => console.log(record)}
                >
                  選択
                </Button>
              )}
            />
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0482010_EffectiveDateSelect);
