import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Radio, Button, } from "antd";

class WS0364008_HeaderInput extends React.Component {
  static propTypes = {
    Lo_HeaderInfo: PropTypes.any, 
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'ヘッダ入力';

    this.state = {
    };
  } 

  render() {
    return (
      <div className="header-input">
        <Card title="演算子">
          <Form
            ref={this.formRef}
            initialValues={{Lo_HeaderInfo:""}}
          >
            <Form.Item name="Lo_HeaderInfo">
              <Radio.Group>
                 <Radio value={"02010006"}>年齢</Radio> 
              </Radio.Group>
            </Form.Item>  
               <Button style={{float:'right', marginTop:'2em'}} type="primary" onClick={()=>{
                 if(this.props.onFinishScreen){
                   this.props.onFinishScreen({Lo_HeaderInfo: this.formRef.current?.getFieldValue("Lo_HeaderInfo")})
                 }
               }}  >決定</Button>  
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0364008_HeaderInput);
