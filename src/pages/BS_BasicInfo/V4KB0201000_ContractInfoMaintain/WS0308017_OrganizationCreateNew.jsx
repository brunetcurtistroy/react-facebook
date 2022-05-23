import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import PropTypes from 'prop-types';

import { Card, Form, Button, Modal, DatePicker, message, Row, Col, } from "antd";
import axios from "configs/axios";
import moment from "moment-timezone";
import  ModalDraggable  from "components/Commons/ModalDraggable";

// import WS0246001_InsurerInfoSearchQuery from "pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery.jsx";
// import WS0247001_OfficeInfoRetrievalQuery from "pages/BS_BasicInfo/V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery.jsx";

/**
* @extends {React.Component<{Li_ContractType:number.isRequired, Li_ContractOrgCode:any.isRequired, onCreated:Function}>}
*/
class WS0308017_OrganizationCreateNew extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.number.isRequired,
    Li_ContractOrgCode: PropTypes.any.isRequired,

    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "新規作成";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      isCreateSending: false,

      orgContractData: {}, 
    };

    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    this.forceUpdate();
  }

  onFinish(values) {
    this.setState({
      isCreateSending: true,
    });

    axios.post('/api/contract-info-maintain/organization-create-new/CreateBtn', {
      ContractType: this.props.Li_ContractType,
      ContractOrgCode: this.props.Li_ContractOrgCode,
      Year: values.Year,
    })
      .then(res => {
        console.log(res);

        if (this.props.onCreated) {
          this.props.onCreated(values);
        }
        if (this.props.onFinishScreen) {
          this.props.onFinishScreen(values);
        }
      })
      .catch(error => {
        const res = error.response;
        if (!res || !res.data || !res.data.message) {
          message.error('エラーが発生しました');
          return;
        }

        message.error(res.data.message);
      })
      .finally(() => {
        this.setState({
          isCreateSending: false,
        });
      });
  }

  render() {
    return (
      <div className="create-new">
        <Card title="新規作成">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              Year: moment().add(1, 'years'),
            }}
          >
            <Row gutter={5}>
              <Col>
                <Form.Item label="年度" name="Year" rules={[{ required: true }]}>
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" onChange={() => this.forceUpdate()} />
                </Form.Item>
              </Col>
              <Col>{moment(this.formRef.current?.getFieldValue('Year')).isValid() ? (moment(this.formRef.current?.getFieldValue('Year')).format('NNNNy') + '年度') : '基本契約'}</Col>
            </Row>

            <Form.Item style={{textAlign: 'right'}}>
              <Button type="primary" htmlType="submit" loading={this.state.isCreateSending}>作成</Button>
            </Form.Item>
          </Form>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => { 
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        />
      </div>
    );
  }
}

export default WS0308017_OrganizationCreateNew;
