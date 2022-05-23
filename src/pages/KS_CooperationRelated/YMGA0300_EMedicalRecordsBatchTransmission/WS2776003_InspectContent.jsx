import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, } from "antd";
import InspectContentAction from "redux/CooperationRelated/EMedicalRecordsBatchTransmission/InspectContent.action";

class WS2776003_InspectContent extends React.Component {
  static propTypes = {
    number_of_exam_items: PropTypes.any,
    exam_item_num: PropTypes.any,
    exam_content: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // document.title = '検査内容';

    this.state = {
      dataSource: [],
      isLoadingTable: true,
    };
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getData()
    }
  }

  getData() {
    let params = {
      number_of_exam_items: this.props.number_of_exam_items ? this.props.number_of_exam_items : '',
      exam_item_num: this.props.exam_item_num ? this.props.exam_item_num : '',
      exam_content: this.props.exam_content ? this.props.exam_content : '',
    }

    this.setState({ isLoadingTable: true })

    InspectContentAction.getListData(params)
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
      <div className="inspect-content">
        <Card title='検査内容'>
          <Table
            size="small"
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            rowKey={(record) => record.id}
          >
            <Table.Column title="ｺｰﾄﾞ" dataIndex="W1_set_cd" />
            <Table.Column title="検査名称" dataIndex="W1_set_name" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2776003_InspectContent);
