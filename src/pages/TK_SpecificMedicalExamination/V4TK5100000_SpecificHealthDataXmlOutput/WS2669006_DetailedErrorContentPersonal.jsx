import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS2669006_DetailedErrorContentPersonal extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'エラー内容詳細(個人)';

    this.state = {
    };
  }

  render() {
    return (
      <div className="detailed-error-content-personal">
        <Card title="エラー内容詳細(個人)">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2669006_DetailedErrorContentPersonal);
