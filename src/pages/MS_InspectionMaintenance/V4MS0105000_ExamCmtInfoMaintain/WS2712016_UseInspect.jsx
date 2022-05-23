import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";
import PropTypes from 'prop-types';

class WS2712016_UseInspect extends React.Component {
  static propTypes = {
    Li_InspectCmtCode: PropTypes.any,
  };
  constructor(props) {
    super(props);

    // document.title = '使用検査';

    this.state = {
      dataSource: [{id: 1, test_item_code: '5', exam_name: '30'}]
    };
  }
  componentDidMount() {
    if(!!this.props?.Li_InspectCmtCode) {
      this.getListData(this.props?.Li_InspectCmtCode)
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props != prevProps) {
      this.getListData(this.props?.Li_InspectCmtCode)
    }
  }
  getListData(props) {
    // api
  }
  render() {
    return (
      <div className="use-inspect">
        <Card title="使用検査">
          <Table
            dataSource={this.state.dataSource}
            pagination={false}
            bordered
            size='small'
            scroll={{ y: 500}}
            loading={false}
            rowKey={(record) => record.id}
          >
            <Table.Column width={110} title="検査ｺｰﾄﾞ" dataIndex="test_item_code"
              render={(value, record, index) => { return <div style={{ textAlign: 'right' }}><span>{record.test_item_code}</span></div> }} />
            <Table.Column title="名称" dataIndex="exam_name" />

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

export default connect(mapStateToProps, mapDispatchToProps)(WS2712016_UseInspect);
