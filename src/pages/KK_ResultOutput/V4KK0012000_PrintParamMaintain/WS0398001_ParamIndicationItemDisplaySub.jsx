import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Select, Button, Table, Input } from "antd";
import ParamIndicationItemDisplaySubAction from "redux/ResultOutput/PrintParamMaintain/ParamIndicationItemDisplaySub.action"
import { random } from "lodash";
const { TextArea } = Input;
class WS0398001_ParamIndicationItemDisplaySub extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = 'ﾊﾟﾗﾒｰﾀ指示明細照会 SUB';

    this.state = {
      screenData: [],
      listIndicationDivision: [],
      IndicationDivision: "",
      parramScreeenData: {
        Li_Format: "",
        Li_IndicationDivision: ""
      },
    };
  }
  componentDidMount() {
    this.state.parramScreeenData.Li_Format = this.props.Li_Format
    this.state.parramScreeenData.Li_IndicationDivision = this.props.Li_IndicationDivision
    this.getScreenData(true)
    this.getScreenDataTable(true)
  }
  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.state.parramScreeenData.Li_Format = this.props.Li_Format
      this.state.parramScreeenData.Li_IndicationDivision = this.props.Li_IndicationDivision
      this.getScreenData(true);
      this.getScreenDataTable(true)
    }
  }

  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    ParamIndicationItemDisplaySubAction.getScreenData(this.state.parramScreeenData)
      .then((res) => {
        let data = { Display: '', Linked: "全て" }
        let array_data = [...res.IndicationDivisionOption]
        array_data.unshift(data)
        this.setState({
          listIndicationDivision: array_data,
          IndicationDivision: res.IndicationDivision
        })
        this.formRef.current?.setFieldsValue({
          IndicationDivision: res ? res.IndicationDivision : '',
        })
      })
      .finally()
  }
  getScreenDataTable(reload) {
    this.setState({ isLoadingTable: true })
    ParamIndicationItemDisplaySubAction.getListData(this.state.parramScreeenData)
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
        this.formRef.current?.setFieldsValue({
          remarks: data_table.length > 0 ? data_table[index].remarks : '',
        })
      })
      .finally()
  }

  onFinish(values) { }

  onSelectCBB(value) {
    this.state.parramScreeenData.Li_IndicationDivision = value
    this.getScreenDataTable(true)
  }

  changeRow(index) {
    this.setState({
      indexTable: index
    });
  }

  render() {
    return (
      <div className="param-indication-item-display-sub">
        <Card title="ﾊﾟﾗﾒｰﾀ指示明細照会 SUB">
          <Form
            initialValues={{ IndicationDivision: true }}
            ref={this.formRef}
            onFinish={this.getScreenData}
          >
            <Form.Item
              name="IndicationDivision"
              label="識別"
            >
              <Select
                style={{ width: 200 }}
                defaultValue={this.state.IndicationDivision}
                onChange={(value) => this.onSelectCBB(value)}
              >
                {this.state.listIndicationDivision.map(item => (
                  <Select.Option key={item.Display} value={item.Display}>
                    {item.Linked}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Table dataSource={this.state.dataSource}
              loading={false}
              pagination={this.state.pagination}
              bordered={true}
              scroll={{ x: 500, y: 400 }}
              rowKey={(record) => record.id}
              rowSelection={{
                type: "radio",
                selectedRowKeys: this.state.selectedRowKeys,
                onSelect: (record, selected, selectedRows) => {
                  let index = this.state.dataSource.findIndex(x => x.id === record.id)
                  this.setState({
                    rowSelected: selectedRows,
                    selectedRowKeys: selectedRows.map(x => x.id),
                    indexTable: index
                  });
                  this.formRef.current?.setFieldsValue({
                    remarks: record.remarks
                  })
                  this.changeRow(index)
                },
              }}>
              <Table.Column title="指示" dataIndex="instruction_division" />
              <Table.Column title="項　目" dataIndex="item" />
              <Table.Column title="名　称" dataIndex="name" />
              {/* <Table.Column width={85}
                render={(text, record, index) => {
                  return <div style={{ textAlign: "center" }}>
                    <Button style={{ float: 'right', marginTop: '1em' }} type="primary"
                      onClick={() => {
                        const func = this.props.onSelect || this.props.onFinishScreen;
                        func({
                          Lo_Item: record.item,
                        });
                      }}>選択</Button>
                  </div>;
                }}
              /> */}
            </Table>
            <Form.Item name="remarks" style={{ marginTop: '0.3em' }}>
              <TextArea disabled={true} rows={4} />
            </Form.Item>
          </Form>

        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0398001_ParamIndicationItemDisplaySub);
