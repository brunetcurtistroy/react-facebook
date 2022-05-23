import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";


class WS0578001_CourseMultipleExtractScreenSub extends React.Component {
  
  constructor(props) {
    super(props);

    // document.title = 'コース複数抽出画面SUB';

    this.state = {
    };
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log( 'selectedRows: ', selectedRows);
      }}
    return (
      <div className="course-multiple-extract-screen-sub">
        <Card title="コース複数抽出画面SUB">
          <Table
            dataSource={[]}
            rowKey={(record) => record.id}
            rowSelection={{
              type: 'radio',
              ...rowSelection,
            }}
          >
             <Table.Column title="コース" dataIndex="1" />
             <Table.Column title="△" dataIndex="" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0578001_CourseMultipleExtractScreenSub);
