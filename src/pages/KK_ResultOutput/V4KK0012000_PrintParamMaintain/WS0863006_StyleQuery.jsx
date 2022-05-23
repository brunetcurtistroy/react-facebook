import React from "react";
import { connect } from "react-redux";

import { Button, Card, Table } from "antd";
import StyleQueryAction from "redux/ResultOutput/PrintParamMaintain/PrintParramInputOutput/StyleQuery.action";

class WS0863006_StyleQuery extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '様式照会';

    this.state = {
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
    };
  }
  componentDidMount() {
    this.getScreenData(true)
  }
  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.getScreenData(true);
    }
  }

  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    StyleQueryAction.getScreenData()
      .then((res) => {
        let data_table = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: data_table ? data_table : [],
          isLoadingTable: false,
          rowSelected: data_table.length > 0 ? [data_table[index]] : [],
          selectedRowKeys: data_table.length > 0 ? [data_table[index].id] : [],
          indexTable: index,
        })
      })
      .finally()
  }

  changeRow(index) {
    this.setState({
      indexTable: index
    });
  }

  render() {
    return (
      <div className="style-query">
        <Card title="様式照会">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            rowKey={(record) => record.id}
            scroll={{ x: 500, y: 400 }}
            bordered
          >
            <Table.Column title="様式" dataIndex="style_code" width={100} />
            <Table.Column title="様　式　名" dataIndex="format_name" />
            <Table.Column title="" width={50} dataIndex=""
              render={(text, record, index) => (
                <Button type="primary" style={{ float: 'right', marginTop: '1em' }}
                  onClick={() => {
                    const func = this.props.onSelect || this.props.onFinishScreen;
                    func({
                      Lo_StyleQuery: record.style_code,
                      Lo_FormatName: record.format_name,
                      // recordData: record,
                    });
                  }}
                >選　択</Button>
              )}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0863006_StyleQuery);
