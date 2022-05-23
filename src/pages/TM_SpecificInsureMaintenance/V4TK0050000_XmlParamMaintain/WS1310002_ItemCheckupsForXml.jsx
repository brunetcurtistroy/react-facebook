import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Card, Table, } from "antd";
import ItemCheckupsForXmlAction from "redux/SpecificInsureMaintenance/XmlParamMaintain/ItemCheckupsForXml.action";

class WS1310002_ItemCheckupsForXml extends React.Component {

  static propTypes = {
    InkIoitemCode: PropTypes.any,
    InkIoresultIdentify: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'XML用健診項目';

    this.state = {
      dataSource: [],
      isLoadingTable: false
    };
  }

  componentDidMount() {
    if (this.props.InkIoitemCode && this.props.InkIoitemCode) {
      this.getScreenData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.InkIoitemCode && this.props.InkIoitemCode) {
        this.getScreenData();
      }
    }
  }

  getScreenData() {
    let params = {
      item_code_jlac10_15: this.props.InkIoitemCode,
      result_identification_jlac10_2: this.props.InkIoresultIdentify
    };

    this.setState({ isLoadingTable: true });

    ItemCheckupsForXmlAction.getScreenData(params)
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
      <div className="item-checkups-for-xml">
        <Card title="XML用健診項目">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}            
            pagination={true}
            rowKey={(record) => record.id}
          >
            <Table.Column title="順番号" dataIndex="order_number" />
            <Table.Column title="項目コード" dataIndex="item_code_jlac10_15" />
            <Table.Column title="結果識別" dataIndex="result_identification_jlac10_2" />
            <Table.Column title="厚労省項目名" dataIndex="ministry_item_name" />
            <Table.Column title="方法コード" dataIndex="xml_exam_method_code" />
            <Table.Column title="検査方法" dataIndex="exam_methods" />
            <Table.Column title="ＸＭＬ表示名" dataIndex="xml_display_name" />
            <Table.Column title="ﾃﾞｰﾀﾀｲﾌﾟ" dataIndex="data_type" />
            <Table.Column width={80}
              render={(value, record, index) => {
                return (
                  <Button type='primary'
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          InkIoitemCode: record.item_code_jlac10_15,
                          InkIoresultIdentify: record.result_identification_jlac10_2
                        });
                      }
                    }}
                  >選択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1310002_ItemCheckupsForXml);
