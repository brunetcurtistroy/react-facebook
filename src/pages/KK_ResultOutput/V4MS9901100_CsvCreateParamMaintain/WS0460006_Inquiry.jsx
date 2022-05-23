import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Button, message } from "antd";
import InquiryAction from "redux/ResultOutput/CsvCreateParamMaintain/Inquiry.action";
class WS0460006_Inquiry extends React.Component {

  static propTypes = {
    Lo_No: PropTypes.any,
    Lo_DocumentName: PropTypes.any,
    Lo_Csvfile: PropTypes.any,
    Lo_Format: PropTypes.any,
    Lo_MedicalExamCourse: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '照会';

    this.state = {
      dataSource: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.getListData()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getListData()
    }
  }

  getListData() {
    this.setState({ isLoading: true })
    InquiryAction.getListData()
      .then((res) => {
        this.setState({
          dataSource: res ? res.data : [],
          isLoading: false
        })
      })
      .catch((err) => {
        this.setState({ isLoading: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  selectData(record) {
    let params = {
      No: record.No,
      DocumentName: record.DocumentName,
      Fd: record.Fd,
      Format: record.Format,

    }
    InquiryAction.selectData(params)
      .then((res) => { 
        if (res?.data) {
          if (this.props.onFinishScreen) {
            this.props.onFinishScreen({
              Lo_No: res?.data?.No,
              Lo_DocumentName: res?.data?.Title,
              Lo_Csvfile: res?.data?.Csvfile,
              Lo_Format: res?.data?.Format,
              Lo_MedicalExamCourse: res?.data?.MedicalExamCourse,
            });
          }
        } else {
          if (this.props.onFinishScreen) {
            this.props.onFinishScreen({});
          }
        }

      })
      .catch((err) => {
        this.setState({ isLoading: false })
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }

  render() {
    return (
      <div className="inquiry">
        <Card title="照会">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={true}
            bordered={true}
            rowKey={(record) => record.id}
          >
            <Table.Column title="NO" dataIndex="No" width={40} />
            <Table.Column title="タイトル" dataIndex="DocumentName" />
            <Table.Column title="ＣＳＶファイル名" dataIndex="Fd" />
            <Table.Column title="区　分" dataIndex="Format" width={120} />
            <Table.Column width={60} align='center'
              render={(value, record, index) => {
                return (
                  <Button type="primary"
                    onClick={() => {
                      this.selectData(record)
                    }}>選択</Button>
                )
              }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0460006_Inquiry);
