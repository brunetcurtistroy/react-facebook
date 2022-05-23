import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS2628002_MultipleSelectOffice extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = '事業所複数選択';

    this.state = {
    };
  }

  render() {
    return (
      <div className="multiple-select-office">
        <Card title="事業所複数選択">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2628002_MultipleSelectOffice);
