import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Select, } from "antd";

class WS2685001_TransmissionCaptureConfirm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '送信・取込内容確認';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="transmission-capture-confirm">
        <Card title="送信・取込内容確認">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="個人番号_ID"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="漢字氏名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="事業所名（漢字）"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="契約内容_略称"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="状態"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="生年月日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険証記号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険証番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="生年月日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険証記号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険証番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="作成ファイル名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="更新日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険者番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="生年月日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="資格有無"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険証記号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="受診日"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="追加検診(乳)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険証番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label=""
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="追加検診(子宮)"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="保険証番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">出力履歴</Button>
            </Form.Item>
            <Form.Item
              name=""
              label="出力ファイル名"
            >
              <Select>
                <Select.Option value=""></Select.Option>

              </Select>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">ファイル明細</Button>
            </Form.Item>
            <Form.Item
            >
              <Button type="primary">手動登録</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2685001_TransmissionCaptureConfirm);
