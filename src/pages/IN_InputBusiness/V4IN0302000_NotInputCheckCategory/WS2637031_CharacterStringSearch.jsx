import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Card, Col, Form, Row, Input, Modal } from "antd";

class WS2637031_CharacterStringSearch extends React.Component {
  static propTypes = {
    Lio_SearchString: PropTypes.any,
    onFinishScreen: PropTypes.func
  };
  formRef = React.createRef(); 
  constructor(props) {
    super(props); 
    this.state = {
    };
  } 
  componentDidMount(){
    this.formRef.current?.getFieldValue({
      Lio_SearchString: this.props.Lio_SearchString
    })
  }
  componentDidUpdate(preV) {
    if (this.props != preV) {
      this.formRef.current?.getFieldValue({
        Lio_SearchString: this.props.Lio_SearchString
      })
    }
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  onFinish(values) {}
  onChange(event) {
    if(this.props.onFinishScreen && event.keyCode === 13){
      this.props.onFinishScreen({Lio_SearchString: this.isEmpty(this.formRef.current?.getFieldValue("Lio_SearchString")) ? "": 
      this.formRef.current?.getFieldValue("Lio_SearchString")})
    }
  }
  render() {
    return (
      <div className="character-string-search">
        <Card title="文字列検索">
        <Form ref={this.formRef}    onFinish={this.onFinish}>
        <Form.Item name="Lio_SearchString"  label="検索" >
          <Input maxLength={256} autoFocus={true} onKeyUp={(event)=>{
            this.onChange(event)
          }} />
        </Form.Item>
        </Form>
        </Card>
        {/* <Modal
          footer={null}
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          bodyStyle={{ margin: 0, padding: 0 }}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        >
          {this.state.childModal.component}
        </Modal> */}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2637031_CharacterStringSearch);
