/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Card,
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Space,
  Row,
  Col,
  message,
} from "antd";
import PrintSubService from "services/ResultOutput/ResultsTblCollectOutput/PrintSubService";

const { Option } = Select;

const grid = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const smGrid = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
class WS0810025_PrintSub extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Style: PropTypes.any,
    PrinterNo: PropTypes.any,
    Preview: PropTypes.any,
    NumOfCopies: PropTypes.any,
    Groups: PropTypes.any,
    Division: PropTypes.any,
    StsL2: PropTypes.any,
    StsL3: PropTypes.any,
    StsScreenControl: PropTypes.any,
    StsSubmission: PropTypes.any,
    Lo_StsRun: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "印刷SUB";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: [],
      screenData: {},
      dataSource: [
        {
          id: 1,
          Code: "1-00",
          DocumentName: 80,
        },
      ],
    };
  }

  componentDidMount = () => {
    this.getScreenData();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  };

  getScreenData = () => {
    PrintSubService.getScreenDataService()
      .then((res) => {
        console.log("res: ", res.data);
        const {
          Style,
          PrinterNo,
          Preview,
          NumOfCopies,
          Groups,
          Division,
          StsL2,
          StsL3,
          StsScreenControl,
          StsSubmission,
        } = this.props;
        this.setState({ screenData: res.data });
        let ComboBox_PrinterNo = res?.data?.ComboBox_PrinterNo
        let PrinterNo_Check = ComboBox_PrinterNo.find(x => x.LinkedField == PrinterNo) 
        this.formRef.current.setFieldsValue({
          Style,
          PrinterNo: PrinterNo_Check ? PrinterNo : '',
          Preview,
          NumOfCopies,
          Groups,
          Division,
          StsL2,
          StsL3,
          StsScreenControl,
          StsSubmission,
        });
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  };

  render() {
    return (
      <div className="print-sub">
        <Card title="印刷SUB">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="NumOfCopies" label="部数" {...grid}>
              <Input type="number" style={{ width: "150px" }} />
            </Form.Item>
            <Form.Item name="Groups" label="団体向" {...grid}>
              <Select style={{ width: "150px" }}>
                {this.state.screenData.ComboBox_Groups
                  ? this.state.screenData.ComboBox_Groups.map((item, index) => {
                      return (
                        <Select.Option value={item.LinkedField} key={index}>
                          {item.DisplayField}
                        </Select.Option>
                      );
                    })
                  : null}
              </Select>
            </Form.Item>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="Division" label="コメント" {...smGrid}>
                  <Select style={{ width: "150px", marginLeft: "3px" }}>
                    <Select.Option value="0">通常</Select.Option>
                    <Select.Option value="1">シークレット</Select.Option>
                    <Select.Option value="2">全て</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item name="StsL2" label="" valuePropName="checked">
                  <Checkbox>L2</Checkbox>
                </Form.Item>
              </Col>
              <Col span={2}>
                <Form.Item name="StsL3" label="" valuePropName="checked">
                  <Checkbox>L3</Checkbox>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name="StsScreenControl"
                  label="画面制御"
                  valuePropName="checked"
                >
                  <Checkbox></Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="StsSubmission"
              label="提出用"
              valuePropName="checked"
              {...grid}
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name="Preview"
              label="ﾌﾟﾚﾋﾞｭｰ"
              valuePropName="checked"
              {...grid}
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item name="PrinterNo" label="ﾌﾟﾘﾝﾀｰ" {...grid}>
              <Select>
                {this.state.screenData.ComboBox_PrinterNo
                  ? this.state.screenData.ComboBox_PrinterNo.map(
                      (item, index) => {
                        return (
                          <Select.Option value={item.LinkedField} key={index}>
                            {item.DiplayField}
                          </Select.Option>
                        );
                      }
                    )
                  : null}
              </Select>
            </Form.Item>
            <Form.Item style={{ float: "right" }}>
              <Button
                type="primary"
                onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      Lo_StsRun: true,
                      ...this.formRef.current?.getFieldsValue(true),
                    });
                  }
                }}
              >
                印刷
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WS0810025_PrintSub);
