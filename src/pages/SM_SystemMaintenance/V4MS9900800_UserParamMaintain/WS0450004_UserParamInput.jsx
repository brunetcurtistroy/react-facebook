import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS0450004_UserParamInput extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'ユーザーパラメータ入力';

    this.state = {
    };
  }

  render() {
    return (
      <div className="user-param-input">
        <Card title="ユーザーパラメータ入力">
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
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0450004_UserParamInput);
