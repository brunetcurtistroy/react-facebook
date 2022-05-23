import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, DatePicker, } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from 'moment';
class WS0961005_BillingDateChange extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lio_ClaimYears: PropTypes.any,
    Lo_YearsChangePresence: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '請求年月変更';

    this.state = {
    };
  }
  CheckChange()
  {
    if(this.formRef.current.getFieldValue('ClaimYearsChar') != this.props.Lio_ClaimYears)
    {
       return true;
    }
    else{
      return false;
    }
  }
  onFinish(values) {

  }

  render() {
    return (
      <div className="billing-date-change">
        <Card title="請求年月変更">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="ClaimYearsChar"
              label="請求年月"
            >
              <VenusDatePickerCustom formRefDatePicker={this.formRef} format='YYYY/MM'/>
            </Form.Item>
            <Form.Item style={{float: 'right'}}>
              <Button type="primary"
              onClick={() => {
              let date =  moment(this.formRef.current.getFieldValue('ClaimYearsChar')).format("YYYY/MM")
                if(date=="0000/00")
                {
                  Modal.warning({
                    title: "対象データが存在しません",
                    width: 300
                  });
                }
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    Lio_ClaimYears: this.formRef.current.getFieldValue('ClaimYearsChar'),
                    Lo_YearsChangePresence: this.formRef.current.getFieldValue('ClaimYearsChar') != this.props.Lio_ClaimYears ? true : false
                  });
                }
              }}
              >完了</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0961005_BillingDateChange);
