import React from "react";
import { connect } from "react-redux";

import { Card, Table, } from "antd";
import { getDataCompiledSelectAction } from "redux/SpecificInsureMaintenance/ContractCompiledMaintain/ContractCompiledMaintain.actions";

class WS1305004_CompiledSelect extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '取りまとめ選択';

    this.state = {
      dataSource: [],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.getDataCompiledSelect();
  }

  getDataCompiledSelect = () => {
    this.setState({ isLoading: true });
    getDataCompiledSelectAction()
      .then(res => {
        if (res) {
          this.setState({dataSource: res.data})
        }
      })
      .catch()
      .finally(() => this.setState({ isLoading: false }))
  }

  render() {
    return (
      <div className="compiled-select" style={{width: 500}}>
        <Card title="取りまとめ選択">
          <Table
            size='small'
            showHeader={false}
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            rowKey={(record) => record.id}
            onRow={(record, index) => ({ 
              onDoubleClick: event => this.props?.onFinishScreen(record) 
            })}
          >
            <Table.Column dataIndex="name" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1305004_CompiledSelect);
