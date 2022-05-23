import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, } from "antd";
import DocumentManageOAction from "redux/AdvancePreparation/DocumentManageMaintain/DocumentManageO.action";

class WS0642003_DocumentManageO extends React.Component {
  static propTypes = {
    Li_Format: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '資料管理O';

    this.state = {
      dataSource: [],
      isLoadingTable: false,
    };
  }

  componentDidMount() {
    this.getScreenData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  }

  getScreenData() {
    let params = {
      Format: this.props.Li_Format
    }

    this.setState({ isLoadingTable: true })

    DocumentManageOAction.getScreenData(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }


  render() {
    return (
      <div className="document-manage-o">
        <Card title="資料管理O">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            rowKey={(record) => record.id}
            scroll={{ x: 500 }}
            bordered
          >
            <Table.Column title="管理番号" width={'30%'} dataIndex="document_management_number" />
            <Table.Column title="名称"  dataIndex="document_title" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0642003_DocumentManageO);
