import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Button } from "antd";
import ParamPromptedQueryContentAction from "redux/AdvancePreparation/DocumentManageMaintain/ParamPromptedQueryContent.action";
class WS2592016_ParamPromptedQueryContent extends React.Component {
  static propTypes = {
    Li_Format: PropTypes.any,
    Li_IndicationDivision: PropTypes.any,
    Li_content: PropTypes.any,
    Lo_Item: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'パラメータ指示照会(内容)';

    this.state = {
      dataSource: [],
      isLoadingTable: true,
      rowSelected: [],
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.getDataScreen();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataScreen();
    }
  }

  getDataScreen() {
    this.setState({ isLoadingTable: true });

    let params = {
      Format: this.props.Li_Format,
      W1_item: this.props.Li_IndicationDivision,
      W1_content: this.props.Li_content
    }

    ParamPromptedQueryContentAction.getDataScreen(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,
          rowSelected: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : []
        });
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  render() {
    return (
      <div className="param-prompted-query-content">
        <Card title="パラメータ指示照会(内容)">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            scroll={{ y: 600 }}
            rowSelection={{
              type: "radio",
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: async (record, selected, selectedRows) => {
                await this.setState({
                  rowSelected: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                });
              },
            }}
          >
            <Table.Column title="項　目" dataIndex="item" />
            <Table.Column title="名　称" dataIndex="name" />
            <Table.Column align='center' width={90}
              render={(value, record, index) => {
                return (
                  <Button type="primary" 
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          Lo_Item: record.item,
                          recordData: record
                        });
                      }
                    }}
                  >選　択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2592016_ParamPromptedQueryContent);
