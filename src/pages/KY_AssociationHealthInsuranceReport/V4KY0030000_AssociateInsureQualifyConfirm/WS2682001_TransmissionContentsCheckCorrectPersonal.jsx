import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS2682001_TransmissionContentsCheckCorrectPersonal extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = '送信内容確認・修正(個人)';

    this.state = {
    };
  }

  render() {
    return (
      <div className="transmission-contents-check-correct-personal">
        <Card title="送信内容確認・修正(個人)">
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2682001_TransmissionContentsCheckCorrectPersonal);
