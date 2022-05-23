import React from "react";
import { connect } from "react-redux";

import { Button, Card, Table, } from "antd";
import { getScreenDataUserOptionsInquiryAction } from "redux/SystemMaintenance/UserOptionInfoMaintain/UserOptionsInquiry.actions";

class WS1523007_UserOptionsInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'ユーザーオプション照会';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 13,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      rowSelect: {},
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.loadData({Li_TypeCode: this.props.Li_TypeCode});
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps !== this.props){
      this.loadData({Li_TypeCode: this.props.Li_TypeCode});
    }
  }

  loadData = (params) => {
    this.setState({ isLoading: true });
    getScreenDataUserOptionsInquiryAction(params)
      .then(res => {
        if (res) {
          this.setState({ dataSource: res.data });
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  onSelectRecord = (record) => {
    if(this.props.onFinishScreen){
      this.props.onFinishScreen({
        Lio_OptionCode: record.option_code,
        Lio_IdentifyName: record.identification_name,
        Lio_OptionItem: record.optional_items,
        recordData: record
      })
    }
  }

  render() {
    return (
      <div className="user-options-inquiry">
        <Card title="ユーザーオプション照会">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={{
              ...this.state.pagination,
              hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
            }}
            rowKey={(record) => record.id}
            onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
          >
            <Table.Column title="コード" dataIndex="option_code" />
            <Table.Column title="名称" dataIndex="optional_items" />
            <Table.Column render={(text, record) => <Button type='primary' size='small' onClick={() => this.onSelectRecord(record)}>選択</Button>} />
          </Table>
          <div className='mt-3' style={{float: 'right', display: 'none'}}>
            <Button type='primary' onClick={this.onSelectRecord}>選択</Button>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1523007_UserOptionsInquiry);
