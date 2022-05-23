import React from "react";
import { connect } from "react-redux";

import { Button, Card, Col, Row } from "antd";
import { CheckSquareOutlined } from "@ant-design/icons";

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
    };
  }

  render() {
    return (
      <Card
        title={<><CheckSquareOutlined /> Todoリスト</>}
        size="small"
        extra={(
          <Button
            type="primary"
            size="small"
          >作成</Button>
        )}
      >
        {this.state.todoList.map((v, i) => (
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

const mapStateToProps = ({ userReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
