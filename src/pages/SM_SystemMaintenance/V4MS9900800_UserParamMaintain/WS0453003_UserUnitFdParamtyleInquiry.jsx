import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";

class WS0453003_UserUnitFdParamtyleInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'ユーザ単位FDパラメータ様式照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="user-unit-fd-paramtyle-inquiry">
        <Card title="ユーザ単位FDパラメータ様式照会">
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
            <Table.Column title="ＦＯＲＭＡＴ" dataIndex="" key="" />
            <Table.Column title="備　　考" dataIndex="" key="" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0453003_UserUnitFdParamtyleInquiry);
