import React from "react";
import { connect } from "react-redux";

import { Card, Checkbox, Table, Button} from "antd";
import PropTypes from "prop-types";
import Color from "constants/Color";

class WS0932008_InspectInquiry extends React.Component {
  static propTypes = {
    Li_CourseLevel: PropTypes.any,
    Li_ReserveNum: PropTypes.any,
    Li_Department: PropTypes.any,
    Li_JudgeLevel: PropTypes.any,
    Lo_StsEnter: PropTypes.any,
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
        Lo_InspectCode: obj.W1_inspect_cd,
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
            <Table.Column render={(text, record) => (
              <Checkbox checked={record.W1_valid_invalid_1} />
            )} />
            <Table.Column title="検査ｺｰﾄﾞ" dataIndex="W1_inspect_cd" render={(text, record) => (
              <div style={{ textAlign: 'right' }}>{text}</div>
            )} />
            <Table.Column title="名称" dataIndex="InspectName" />
            <Table.Column title="結果値" dataIndex="ResultValue" />
            <Table.Column title="判定" dataIndex="JudgeValue" align='center' render={(text, record) => (
              <div style={{ color: Color(record?.Expression_1)?.Foreground }}>{text}</div>
            )} />
            <Table.Column width={70} align='center' render={(text, record) => (
              <Button type='primary' onClick={() => this.returnValue(record)}>確　定</Button>
            )} />
          </Table>

          <Button
            hidden={true}
            className='mt-3'
            style={{ float: 'right' }}
            type='primary'
            onClick={() => this.returnValue(this.state.rowSelect)}
          >確　定</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0932008_InspectInquiry);
