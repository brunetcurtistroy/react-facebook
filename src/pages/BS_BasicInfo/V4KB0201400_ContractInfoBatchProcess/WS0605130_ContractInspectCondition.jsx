import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContractInspectConditionAction } from "redux/basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.actions";

import { Card, Form, Input, Row, Col, Space } from "antd";

class WS0605130_ContractInspectCondition extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.any,
    Li_ContractOrgCode: PropTypes.any,
    Li_ContractStartDate: PropTypes.any,
    Li_ContractNum: PropTypes.any,
    Li_SetCode: PropTypes.any,
    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '契約検査条件';

    this.state = {
      objContractInspectCondition: {},
    };
  }
  componentDidMount = () => {
    if(this.props){
      const { Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate, Li_ContractNum, Li_SetCode } = this.props;
      const params = {
        Li_ContractType: Li_ContractType,
        Li_ContractOrgCode: Li_ContractOrgCode,
        Li_ContractStartDate: Li_ContractStartDate,
        Li_ContractNum: Li_ContractNum,
        Li_SetCode: Li_SetCode
      }
      this.callAPILoadData(params);
    }
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps !== this.props){
      const { Li_ContractType, Li_ContractOrgCode, Li_ContractStartDate, Li_ContractNum, Li_SetCode } = this.props;
      const params = {
        Li_ContractType: Li_ContractType,
        Li_ContractOrgCode: Li_ContractOrgCode,
        Li_ContractStartDate: Li_ContractStartDate,
        Li_ContractNum: Li_ContractNum,
        Li_SetCode: Li_SetCode
      }
      this.callAPILoadData(params);
    }
  }

  callAPILoadData = (params) => {
    getContractInspectConditionAction(params)
      .then(res => {
        if(res){
          this.setState({ objContractInspectCondition: res[0]});
          this.formRef.current.setFieldsValue(this.state.objContractInspectCondition);
        }
      })
  }

  render() {
    return (
      <div className="contract-inspect-condition" >
        <Card title="契約検査条件">
          <Form ref={this.formRef} >
            <Form.Item name="Expression_7" label="案件" >
              <Input type="text" maxLength="2" style={{ width: '130px' }} />
            </Form.Item>
            <Row >
              <Space>
                <Form.Item name="Expression_8" label="性別">
                  <Input />
                </Form.Item>
                <Form.Item name="Expression_10" label="続柄">
                  <Input />
                </Form.Item>
                <Form.Item name="Expression_11" label="院内">
                  <Input />
                </Form.Item>
                <Form.Item name="Expression_9" label="時間区">
                  <Input />
                </Form.Item>
                <Form.Item name="Expression_12" label="スクリーニング">
                  <Input />
                </Form.Item>
              </Space>
            </Row>
            <Row gutter={16}>
              <Col xl={15} lg={20} >
                <Form.Item name="Expression_14" label="年齢" >
                  <Input maxLength="50" />
                </Form.Item>
              </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0605130_ContractInspectCondition);
