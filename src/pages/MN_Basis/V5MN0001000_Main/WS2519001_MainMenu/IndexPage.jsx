import React from "react";
import { connect } from "react-redux";

import { Col, Row } from "antd";

import TodoList from "./TodoList.jsx";
import MailList from "./MailList.jsx";

class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <div style={{minHeight: 'calc(100vh - 100px - 200px)'}}>
        </div>
        <div style={{height: '200px',}}>
          <Row gutter={6}>
            <Col span={12}>
              <TodoList />
            </Col>
            <Col span={12}>
              <MailList />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({ });

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
