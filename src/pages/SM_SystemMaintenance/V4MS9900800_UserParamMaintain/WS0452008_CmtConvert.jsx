import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS0452008_CmtConvert extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'コメント変換';

    this.state = {
    };
  }

  render() {
    return (
      <div className="cmt-convert">
        <Card title="コメント変換">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0452008_CmtConvert);
