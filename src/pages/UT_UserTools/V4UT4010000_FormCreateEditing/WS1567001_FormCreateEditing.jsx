import React from "react";
import { connect } from "react-redux";

import { Card, Form, message, Select, Space, Table } from "antd";
import FormCreateEditingService from "services/UserTools/FormCreateEditing/FormCreateEditingService";

class WS1567001_FormCreateEditing extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "帳票作成・編集";

    this.state = {
      isLoadingTable: false,
    };
  }

  componentDidMount = () => {
    this.searchData();
  };

  searchData = () => {
    this.setState({ isLoadingTable: true });
    FormCreateEditingService.getTableDataService({
      Extension: this.formRef.current.getFieldValue("Expression_7"),
    })
      .then((res) => {
        this.formRef.current.setFieldsValue({
          getTableDataDisplayList: res.data,
        });
        this.forceUpdate();
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

  render() {
    return (
      <div className="form-create-editing">
        <Card title="帳票作成・編集">
          <Form ref={this.formRef} initialValues={{ Expression_7: ".csv" }}>
            <Form.Item name="Expression_7" label="拡張子">
              <Select
                style={{ width: "150px" }}
                onSelect={() => this.searchData()}
              >
                <Select.Option value=".xlsx">通常</Select.Option>
                <Select.Option value=".csv">CSV</Select.Option>
              </Select>
            </Form.Item>

            <Table
              dataSource={
                this.formRef.current
                  ? this.formRef.current.getFieldValue(
                      "getTableDataDisplayList"
                    )
                  : []
              }
              rowKey={(record) => record.id}
              loading={this.state.isLoadingTable}
              onRow={(record, rowIndex) => {
                return {
                  // double click row
                  onDoubleClick: () => {
                    console.log("record", record);
                  },
                };
              }}
            >
              <Table.Column title="帳票名" dataIndex="W1_file_name" />
              <Table.Column title="サイズ" dataIndex="W1_size_display" />
              <Table.Column
                title="作成日時"
                dataIndex=""
                render={(text, record, index) => (
                  <Space>
                    {record.W1_date_creation}
                    {record.W1_creation_time}
                  </Space>
                )}
              />
              <Table.Column
                title="更新日時"
                dataIndex=""
                render={(text, record, index) => (
                  <Space>
                    {record.W1_update_date}
                    {record.W1_update_time}
                  </Space>
                )}
              />
              <Table.Column title="ＣＳＶ出力先" dataIndex="W1_output_destination" />
            </Table>
          </Form>
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
)(WS1567001_FormCreateEditing);
