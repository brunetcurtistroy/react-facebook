import React from "react";
import { connect } from "react-redux";

import { Card, Form, Button, message } from "antd";
import BatchCaptureService from "services/InputBusiness/SpreadInput/BatchCaptureService";
import PropTypes from "prop-types";

class WS0456005_BatchCapture extends React.Component {
  static propTypes = {
    Li_Seq: PropTypes.any,
    Li_Item: PropTypes.any,
    StsDocumentFields: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "一括取込";

    this.state = {};
  }
  batchCapture = () => {
    const { Li_Seq, Li_Item, StsDocumentFields, onFinishScreen } = this.props;
    console.log(" Li_Seq, Li_Item", Li_Seq, Li_Item, StsDocumentFields);
    BatchCaptureService.BatchCaptureService({
      Li_Seq: Li_Seq,
      Li_Item: Li_Item,
      StsDocumentFields: StsDocumentFields,
    })
      .then((res) => {
        console.log("res: ", res);
        if (onFinishScreen) {
          onFinishScreen();
        }
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

  onFinish = () => {
    this.batchCapture();
  };

  render() {
    return (
      <div className="batch-capture" style={{ maxWidth: "300px" }}>
        <Card title="一括取込">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <div>検査を一括で取込ますか?</div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ float: "right", marginTop: "1em" }}
            >
              実 行
            </Button>
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
)(WS0456005_BatchCapture);
