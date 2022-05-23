import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Card, Table } from "antd";
import TypeQueryAction from "redux/InputBusiness/NotInputCheckCategory/TypeQuery.action";

class WS0743010_TypeQuery extends React.Component {
  static propTypes = {
    Lo_Type: PropTypes.any,
    Lo_Remark: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "種別照会";

    this.state = {
      dataSource: [],
      isLoadingTable: false
    };
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getData()
    }
  }

  getData() {
    this.setState({ isLoadingTable: true })
    TypeQueryAction.getData()
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
      <div className="type-query">
        <Card title="種別照会">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered
            rowKey={(record) => record.id}
            scroll={{ x: 300 }}
          >
            <Table.Column title="種別" dataIndex="Type" width={60}/>
            <Table.Column title="名称" dataIndex="remarks" />
            <Table.Column width={80} align='center'
              render={(value, record) => {
                return (
                  <Button size="small" type="primary"
                  onClick={() => {
                    if (this.props.onFinishScreen) {
                      this.props.onFinishScreen({
                        Lo_Type: record.Type,
                        Lo_Remark: record.remarks,
                        recordData: record
                      });
                    }
                  }}
                  >
                    選択
                  </Button>
                );
              }}
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
)(WS0743010_TypeQuery);
