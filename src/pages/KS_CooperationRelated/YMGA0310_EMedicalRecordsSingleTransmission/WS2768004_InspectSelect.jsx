import React from "react";
import { connect } from "react-redux";

import { Card, Table, Button, message } from "antd";
import PropTypes from "prop-types";
import InspectSelectService from "services/CooperationRelated/EMedicalRecordsSingleTransmission/InspectSelectService";
class WS2768004_InspectSelect extends React.Component {
  static propTypes = {
    Lio_InspectCode: PropTypes.any,
  };
  constructor(props) {
    super(props);

    // document.title = "検査選択";

    this.state = {
      dataSource: [],
      isLoadingTable: false,
    };
  }

  componentDidMount = () => {
    this.setState({ isLoadingTable: true });
    InspectSelectService.getDataListService()
      .then((res) => {
        this.setState({ dataSource: res.data });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({ isLoadingTable: false });
      });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      InspectSelectService.getDataListService()
        .then((res) => {
          this.setState({ dataSource: res.data });
        })
        .catch((err) => {
          const res = err.response;
          if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
          }
          message.error(res.data.message);
        })
        .finally(() => {
          this.setState({ isLoadingTable: false });
        });
    }
  };

  handleRowSelected = (selectedRows) => {
    if (this.props.onFinishScreen && selectedRows) {
      this.props.onFinishScreen({
        Lio_InspectCode: selectedRows.W1_set_cd,
        recordData: selectedRows,
      });
    }
  };
  render() {
    return (
      <div className="inspect-select">
        <Card title="検査選択">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            rowKey={(record) => record.id}
            size="small"
          >
            <Table.Column title="コード" dataIndex="W1_set_cd" key="" />
            <Table.Column title="検査名称" dataIndex="official" key="" />
            <Table.Column
              title=""
              dataIndex=""
              render={(text, record, index) => (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => this.handleRowSelected(record)}
                >
                  選択
                </Button>
              )}
            />
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS2768004_InspectSelect);
