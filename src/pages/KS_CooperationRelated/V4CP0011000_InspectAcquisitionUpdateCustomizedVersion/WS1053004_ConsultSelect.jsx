import React from "react";
import { connect } from "react-redux";
import ConsultSelectAction from "redux/CooperationRelated/InspectAcquisitionUpdateCustomizedVersion/ConsultSelect.action";
import {
  Card,
  Table,
  Form,
  Select,
  message,
  Checkbox,
  Button,
  Row,
  Col,
} from "antd";
import moment from "moment";
import { download_file } from "helpers/CommonHelpers";
import axios from "axios";
const { Option } = Select;
class WS1053004_ConsultSelect extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = "受診選択";

    this.state = {
      dataSource: [],
      isLoading: false,
      preview: false,
    };
  }
  onFinish(values) {}
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.listData();
    }
  }
  componentDidMount() {
    this.listData();
  }
  listData() {
    this.setState({ isLoading: true });
    ConsultSelectAction.getListData()
      .then((res) => {
        const data = res.map((res) => {
          return {
            ...res,
            W1_person_num: Number(res.W1_person_num),
            W1_requested_date: moment(res.W1_requested_date).format(
              "YYYY/MM/DD"
            ),
            W1_date_selected_result: moment(res.W1_date_selected_result).format(
              "YYYY/MM/DD"
            ),
          };
        });
        this.setState({ dataSource: data });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  closeScreen() {}
  changeSelect(id, event) {
    const params = {
      id: id,
      W1_date_selected_result: event,
    };
    ConsultSelectAction.changeSelect(params).then((res) => {
      if (res) {
        this.listData();
      }
    });
  }
  changeCheked(e) {
    this.setState({ preview: e });
  }
  f12() {
    let OutputMethod = "";
    let Output = "";
    let Preview = false;

    this.setState({ isLoading: true });

    axios
      .get(
        "/api/inspect-acquisition-update-customized-version/consult-select/f12",
        {
          ...this.formRef.current.getFieldValue(),
          OutputMethod,
          Output,
          Preview,
        },
        { responseType: "blob" }
      )
      .then((res) => {
        download_file(res, this.state.preview);
      })
      .catch((error) => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => this.setState({ isLoading: false }));
  }
  render() {
    return (
      <div className="consult-select">
        <Card title="受診選択">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Table
              dataSource={this.state.dataSource}
              rowKey={(record) => record.id}
              // rowSelection={{
              //   type: 'radio',
              //   ...rowSelection,
              // }}
            >
              <Table.Column title="依頼日" dataIndex="W1_requested_date" />
              <Table.Column title="ID" dataIndex="W1_person_num" />
              <Table.Column title="漢字氏名" dataIndex="kanji_name" />
              <Table.Column title="性別" dataIndex="Expresstion_5" />
              <Table.Column
                title="受診日選択"
                dataIndex="ComboBox"
                render={(item, record, index) => {
                  return (
                    <Form.Item name="W1_date_selected_result">
                      <Select
                        defaultValue={
                          record?.W1_date_selected_result
                            ? record?.W1_date_selected_result
                            : ""
                        }
                        onChange={(event) => {
                          this.changeSelect(record.id, event);
                        }}
                      >
                        {record.ComboBox?.map((item, index) => (
                          <Select.Option
                            key={index}
                            value={moment(item.DisplayField).format(
                              "YYYY/MM/DD"
                            )}
                          >
                            {moment(item.LinkedField).format("YYYY/MM/DD")}{" "}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  );
                }}
              />
            </Table>
            <Row style={{ marginTop: "0.5em" }}>
              <Col span={22}>
                <Form.Item name="">
                  <Checkbox
                    onChange={(e) => {
                      this.changeCheked(e.target.checked);
                    }}
                    style={{ float: "right" }}
                  >
                    ﾌﾟﾚﾋﾞｭｰ
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button
                  onClick={() => {
                    this.f12();
                  }}
                  type="primary"
                  style={{ float: "right" }}
                >
                  出力
                </Button>
              </Col>
            </Row>
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
)(WS1053004_ConsultSelect);
