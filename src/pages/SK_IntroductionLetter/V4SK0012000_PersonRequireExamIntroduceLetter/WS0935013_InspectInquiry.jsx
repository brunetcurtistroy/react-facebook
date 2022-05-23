import React from "react";
import { connect } from "react-redux";

import { Button, Card, Table, } from "antd";
import Color from "constants/Color";
import PropTypes from "prop-types";

class WS0935013_InspectInquiry extends React.Component {
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Li_JudgeLevel: PropTypes.any,
    Lo_InspectCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = '検査照会';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {}
    };
  }

  componentDidMount = () => {

  }

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {

    }
  }

  returnValue = (obj) => {
    if (this.props.onFinishScreen)
      this.props.onFinishScreen({
        Lo_InspectCode: obj.exam_code,
        recordData: obj
      })
  }

  render() {
    return (
      <div className="inspect-inquiry">
        <Card title="検査照会">
          <Table
            bordered
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={{
              ...this.state.pagination,
              hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
            }}
            rowKey={(record) => record.id}
            rowClassName={(record, index) => record.id === this.state.rowSelect.id ? 'hightlight-row-selected' : ''}
            onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
          >
            <Table.Column title="検査ｺｰﾄﾞ" dataIndex="exam_code" render={(text, record) => (
              <div style={{ textAlign: 'right' }}>{text}</div>
            )} />
            <Table.Column title="名称" dataIndex="exam_name" />
            <Table.Column title="結果値" dataIndex="Expression_3" />
            <Table.Column title="判定" dataIndex="Expression_3" align='center' render={(text, record) => (
              <div style={{ color: Color(record?.Expression_7)?.Foreground }}>{text}</div>
            )} />
            <Table.Column width={70} align='center' render={(text, record) => (
              <Button type='primary' onClick={() => this.returnValue(record)}>選択</Button>
            )} />
          </Table>

          <Button
            hidden={true}
            className='mt-3'
            style={{ float: 'right' }}
            type='primary'
            onClick={() => this.returnValue(this.state.rowSelect)}
          >選択</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0935013_InspectInquiry);
