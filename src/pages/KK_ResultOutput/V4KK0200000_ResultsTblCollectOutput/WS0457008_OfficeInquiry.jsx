import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Button } from "antd";
import OfficeInquiryAction from "redux/ResultOutput/ResultsTblCollectOutput/OfficeInquiry.action";

class WS0457008_OfficeInquiry extends React.Component {

  static propTypes = {
    Lo_OfficeCode: PropTypes.any,
    Lo_BranchStoreCode: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '事業所照会';

    this.state = {
      dataSource: [],
      selectedRows: [],
      isLoadingTable: false
    };
  }

  componentDidMount() {
    this.getDataTable()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getDataTable()
    }
  }

  getDataTable() {
    this.setState({ isLoadingTable: true })
    OfficeInquiryAction.getListData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  render() {
    return (
      <div className="office-inquiry">
        <Card title="事業所照会">
          <Table
            size="small"
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered={true}
            rowKey={(record) => record.id}
            rowSelection={{
              type: 'radio',
              onChange: async (selectedRowKeys, selectedRows) => {
                await this.setState({
                  selectedRows: selectedRows
                })
              }
            }}
          >
            <Table.Column title="コード" dataIndex="office_code" width={100}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>{value}</div>
                )
              }} />
            <Table.Column title="支社店" dataIndex="branch_store_code" width={100}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'right' }}>{value === 0 ? '' : value}</div>
                )
              }} />
            <Table.Column title="事　業　所　名" dataIndex="office_kanji_name" />
            <Table.Column align='center' width={70}
              render={(value, record, index) => {
                return (
                  <Button type="primary" 
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          Lo_OfficeCode: record.office_code,
                          Lo_BranchStoreCode: record.branch_store_code,
                          Lo_office_kanji_name: record.office_kanji_name
                        });
                      }
                    }}>選択</Button>
                )
              }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0457008_OfficeInquiry);
