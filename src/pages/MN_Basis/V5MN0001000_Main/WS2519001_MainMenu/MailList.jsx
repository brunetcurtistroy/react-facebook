import React from "react";
import { connect } from "react-redux";

import { Button, Card, Col, Row, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";

class MailList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mailList: [],
    };
  }

  render() {
    return (
      <Card
        title={<><MailOutlined /> メール</>}
        size="small"
        extra={(
          <Space>
            <Button
              type="primary"
              size="small"
            >履歴</Button>
            <Button
              type="primary"
              size="small"
            >作成</Button>
          </Space>
        )}
      >
        {this.state.mailList.map((v, i) => (
          <Row>
            <Col span={12}>
            </Col>
            <Col span={12}>
            </Col>
          </Row>
        ))}
      </Card>
    );
  }
}

const mapStateToProps = () => ({ });

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MailList);
