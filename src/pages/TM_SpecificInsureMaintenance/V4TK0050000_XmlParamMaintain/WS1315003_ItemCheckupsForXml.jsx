import React from "react";
import { connect } from "react-redux";

import { Button, Card, Table, } from "antd";
import ItemCheckupsForXml1315003Action from "redux/SpecificInsureMaintenance/XmlParamMaintain/WS1315003_ItemCheckupsForXml.action";

class WS1315003_ItemCheckupsForXml extends React.Component {
  constructor(props) {
    super(props);

    // document.title = 'XML用健診項目';

    this.state = {
      dataSource: [],
      isLoadingTable: false,
      rowSelected: [],
      selectedRowKeys: []
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
    this.setState({ isLoadingTable: true });

    ItemCheckupsForXml1315003Action.getScreenData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false,
          rowSelected: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeys: res && res.length > 0 ? [res[0].id] : []
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  render() {
    return (
      <div className="item-checkups-for-xml">
        <Card title="XML用健診項目">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered
            rowKey={(record) => record.id}
            rowSelection={{
              type: "radio",
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (record, selected, selectedRows) => {
                this.setState({
                  rowSelected: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                });
              },
            }}
          >
            <Table.Column title="順番号" dataIndex="order_number" />
            <Table.Column title="項目コード" dataIndex="item_code_jlac10_15" />
            <Table.Column title="結果識別" dataIndex="result_identification_jlac10_2" />
            <Table.Column title="厚労省項目名" dataIndex="ministry_item_name" />
            <Table.Column title="方法コード" dataIndex="xml_exam_method_code" />
            <Table.Column title="検査方法" dataIndex="exam_methods" />
            <Table.Column title="ＸＭＬ表示名" dataIndex="xml_display_name" />
            <Table.Column title="ﾃﾞｰﾀﾀｲﾌﾟ" dataIndex="data_type" />
          </Table>
          <div style={{ textAlign: 'right' }}>
            <Button type='primary'
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    recordData: this.state.rowSelected[0]
                  });
                }
              }}
            >選択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1315003_ItemCheckupsForXml);
