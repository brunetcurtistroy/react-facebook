import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, } from "antd";

class WS1538001_MedicalInstitutionNumberQuerySub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '医療機関番号照会SUB';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="medical-institution-number-query-sub">
        <Card title="医療機関番号照会SUB">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name=""
              label="[協情]医療機関コード[KENCD]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特健]送付元機関"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[協情]医療機関コード[SIBU]"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特健]作成機関"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特健]作成機関名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特健]作成機関郵便"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特健]作成機関住所"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[協請]コードＮＯ"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特健]作成機関TEL"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[協請]実施機関名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特保]送付元機関"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[支援]保健指導機関番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特保]作成機関"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[支援]保健指導機関名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特保]作成機関名"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特保]作成機関郵便"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特保]作成機関住所"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[実施]機関番号"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[特保]作成機関TEL"
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name=""
              label="[実施]漢字"
            >
              <Input type="text" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1538001_MedicalInstitutionNumberQuerySub);
