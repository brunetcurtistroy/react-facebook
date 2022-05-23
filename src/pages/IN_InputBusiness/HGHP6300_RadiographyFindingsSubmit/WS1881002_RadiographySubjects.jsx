import React from "react";
import { connect } from "react-redux";

import {
  Card,
  Col,
  Row,
  Table,
  message,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
} from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import WS1881003_RadiographyContentsOfQuery from "pages/IN_InputBusiness/HGHP6300_RadiographyFindingsSubmit/WS1881003_RadiographyContentsOfQuery.jsx";
import RadiographySubjectsAction from "redux/InputBusiness/RadiographyFindingsSubmit/RadiographySubjects.action";
class WS1881002_RadiographySubjects extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "読影対象者";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRowTableFirst: [],
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      selectedRows: {},
      selectedRowKeys: [],
    };
  }

  handleSelectRowsTableFirst = (selectedRowTableFirst) => {
    console.log(selectedRowTableFirst);
    this.setState({ selectedRowTableFirst });
  };
  componentDidMount() {
    this.radiographySubject();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.radiographySubject();
    }
  }
  radiographySubject() {
    this.setState({ isLoading: true });
    const data = {
      Li_ReserveNum: this.props.Li_ReserveNum,
      Li_InterpretationInspectItems: this.props.Li_InterpretationInspectItems,
    };
    RadiographySubjectsAction.radiographySubjectAction(data)
      .then((res) => {
        const data = res ? res : [];
        const lastSelected = res?.find(
          (elmt) => elmt.id === this.state.selectedRows.id
        );
        const selected = lastSelected ? lastSelected : res[0] || {};
        this.setState({
          dataSource: data,
          selectedRows: selected,
          selectedRowKeys: [selected.id],
          rowSelect: selected,
        });
        this.formRef.current?.setFieldsValue({
          record: selected,
        });
        this.formRef.current.setFieldsValue({
          tableData: data,
        });
      })
      .catch((error) => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  handleChangeInput = (record, value, name) => {
    console.log(record);
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.indexOf(record);
    if (index !== -1) {
      let objTemp;
      switch (name) {
        default:
          objTemp = {
            ...record,
            [name]: value,
          };
          break;
      }
      arrTemp[index] = objTemp;
      this.setState({
        dataSource: arrTemp,
        rowSelect: objTemp,
      });
      this.formRef.current.setFieldsValue({ dataSource: arrTemp });
    }
  };

  render() {
    const { selectedRowTableFirst } = this.state;
    const { rowSelect } = this.state;
    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst,
    };
    return (
      <div className="radiography-subjects">
        <Card title="読影対象者">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              pagination={false}
              loading={this.state.isLoading}
              dataSource={this.state.dataSource}
              rowKey={(record) => record.id}
              className="mb-2"
              bordered={true}
              rowSelection={{
                type: "radio",
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                  const selected = selectedRows[0];
                  console.log(34343434343, selected);
                  this.setState({
                    selectedRowKeys: [selected.id],
                    selectedRows: selected,
                    rowSelect: selected,
                  });
                  this.formRef.current?.setFieldsValue({
                    record: selected,
                  });
                },
                onSelect: (record, selected) => {
                  this.setState({ rowSelect: record });
                  this.formRef.current?.setFieldsValue({
                    record: record,
                  });
                },
              }}
            >
              <Table.Column title="読影者ｺｰﾄﾞ" dataIndex="doctor_code" />
              <Table.Column title=" 読影者名" dataIndex="user_name" />
              <Table.Column
                title="技師"
                dataIndex="expression_5"
                align="center"
                width={100}
                render={(text, record, index) => {
                  return (
                    <Form.Item
                      name={["tableData", index, "expression_5"]}
                      valuePropName="Checkbox"
                    >
                      <Checkbox
                        checked={record.expression_5}
                        name="expression_5"
                      ></Checkbox>
                    </Form.Item>
                  );
                }}
              />
              <Table.Column title="区分" dataIndex="interpretation_division" />
              <Table.Column
                title="更新日"
                dataIndex="renewal_date_on"
                render={(text, record, index) => (
                  <Form.Item name="">
                    <span>{record.renewal_date_on}</span>
                  </Form.Item>
                )}
              />
              <Table.Column
                title="送信日"
                dataIndex="send_date_on"
                render={(text, record, index) => (
                  <Form.Item name="">
                    <span>{record.send_date_on}</span>
                  </Form.Item>
                )}
              />
              <Table.Column title="判定" dataIndex="judgement" />
            </Table>

            <Form.Item name={["record", "Note"]}>
              <Input.TextArea readOnly type="text" rows={5} />
            </Form.Item>
            <Row gutter={24}>
              <Col span={24}>
                <Button
                  type="primary"
                  style={{ float: "right", marginRight: "10px" }}
                  onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 800,
                        component: (
                          <WS1881003_RadiographyContentsOfQuery
                            Li_DoctorCode={this.state.rowSelect.doctor_code}
                            Li_ReserveNum={this.props.Li_ReserveNum}
                            Li_InterpretationInspectItemCod={
                              this.props.Li_InterpretationInspectItems
                            }
                            onClickedCreate={() => {
                              this.setState({
                                childModal: {
                                  ...this.state.childModal,
                                  visible: false,
                                },
                              });
                            }}
                          />
                        ),
                      },
                    });
                  }}
                >
                  内容
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS1881002_RadiographySubjects);
