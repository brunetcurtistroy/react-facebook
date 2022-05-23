import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from 'react';
import PropTypes from 'prop-types';

import { Card, Form, Radio, Button, DatePicker, Modal, Input, message, } from 'antd';
import WS0247001_OfficeInfoRetrievalQuery from '../V4MS0002000_OfficeInfoMaintainDirectly/WS0247001_OfficeInfoRetrievalQuery';
import WS0246001_InsurerInfoSearchQuery from '../V4MS0001000_InsurerInfoMaintain/WS0246001_InsurerInfoSearchQuery';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import axios from "configs/axios";

/**
* @extends {React.Component<{Li_ContractType:number.isRequired, Li_ContractOrgCode:any.isRequired, onFinishScreen:Function}>}
*/
class WS0306011_CreateNew extends React.Component {
  static propTypes = {
    Li_ContractType: PropTypes.number,
    Li_ContractOrgCode: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '新規作成';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      isCreateSending: false,
    };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.formRef.current.resetFields();
      this.forceUpdate();
    }
  }

  onFinish = values => {
    this.setState({
      isCreateSending: true,
    });

    axios.post('/api/contract-info-maintain/create-new/CreateBtn', {
      ContractType: values.ContractType,
      ContractOrgCode: values.ContractOrgCode,
      Year: values.YearChar,
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
  };

  render() {
    const action = 'create';
    
    return (
      <div className="create-new">
        <Card title="新規作成">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{
              ContractType: this.props.Li_ContractType || 0,
              ContractOrgCode: this.props.Li_ContractOrgCode || (!this.props.Li_ContractType ? 0 : null),
            }}
          >
            <Form.Item name="ContractType">
              <Radio.Group onChange={(e) => {
                this.formRef.current.setFieldsValue({
                  ContractOrgCode: e.target.value === 0 ? 0 : null,
                });
                this.forceUpdate();
              }}>
                <Radio value={2}>事業所</Radio>
                <Radio value={1}>保険者</Radio>
                <Radio value={0}>共通</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="団体" name="ContractOrgCode" style={{maxWidth: 200}}>
              <Input.Search
                disabled={this.formRef.current?.getFieldValue('ContractType') === 0}
                onSearch={() => {
                  const ContractType = this.formRef.current.getFieldValue('ContractType');
                  let component = null;
                  if (ContractType === 1) {
                    component = (<WS0246001_InsurerInfoSearchQuery
                      onFinishScreen={(output) => {
                        this.formRef.current.setFieldsValue({
                        ContractOrgCode: output.Lo_InsurerCode,
                        Expression_8: output.recordData.insurer_kanji_name,
                      });

                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: false,
                        }
                      });
                    }}
                  />);
                  } else if (ContractType === 2) {
                    component = (<WS0247001_OfficeInfoRetrievalQuery
                      onFinishScreen={(output) => {
                        this.formRef.current.setFieldsValue({
                          ContractOrgCode: output.Lio_OfficeCode,
                          Expression_8: output.recordData.office_kanji_name,
                        });
                            
                        this.setState({		
                          childModal: {	
                            ...this.state.childModal,
                            visible: false,
                          }	
                        });		
                      }}			
                    />);				
                  }					
                            
                  if (component) {					
                    this.setState({				
                      childModal: {			
                        ...this.state.childModal,		
                        width: 800,		
                        visible: true,		
                        component: component,		
                      }			
                    });				
                  }					
                }}
              />
            </Form.Item>

            <Form.Item label="年度" name="YearChar">
              <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" style={{ width: 200 }} />
            </Form.Item>

            <Form.Item style={{ float: "right" }}>
              <Button type="primary" htmlType="submit" loading={this.state.isCreateSending}>{ action === "create" ? "作成" : "年度"}</Button>
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

export default WS0306011_CreateNew;
