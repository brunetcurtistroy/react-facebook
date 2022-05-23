import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Space, Modal } from "antd";
import WS0271001_InspectItemSearchQuerySingle from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0271001_InspectItemSearchQuerySingle";
import WS0267001_CategorySearchQuerySingle from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0267001_CategorySearchQuerySingle.jsx';

class WS0640002_Retrieval extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lio_Searches: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '検索';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  onFinish(values) { }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="retrieval">
        <Card title="検索">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item name="Searches">
              <Input type="text" />
            </Form.Item>

            <Space style={{ float: "right" }}>
              <Button type='primary'
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '75%',
                      component: (
                        <WS0267001_CategorySearchQuerySingle
                          Lio_CategoryCode={this.formRef.current.getFieldValue('Searches')}
                          onFinishScreen={(output) => {
                            this.formRef.current?.setFieldsValue({
                              Searches: output.Lio_CategoryCode
                            })

                            this.closeModal();
                          }}
                        />),
                    },
                  })
                }}
              >カテゴリ検索</Button>
              <Button type='primary'
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '75%',
                      component: (
                        <WS0271001_InspectItemSearchQuerySingle
                          Lio_InspectItemCode={this.formRef.current.getFieldValue('Searches')}
                          onFinishScreen={(output) => {
                            this.formRef.current?.setFieldsValue({
                              Searches: output.Lio_InspectItemCode
                            })

                            this.closeModal();
                          }}
                        />),
                    },
                  })
                }}
              >ｶﾃｺﾞﾘ</Button>
              <Button type='primary'
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '75%',
                      component: (
                        <WS0271001_InspectItemSearchQuerySingle
                          Lio_InspectItemCode={this.formRef.current.getFieldValue('Searches')}
                          onFinishScreen={(output) => {
                            this.formRef.current?.setFieldsValue({
                              Searches: output.Lio_InspectItemCode
                            })

                            this.closeModal();
                          }}
                        />),
                    },
                  })
                }}
              >検　査</Button>
              <Button type='primary'
                onClick={() => {
                  if (this.props.onFinishScreen) {
                    this.props.onFinishScreen({
                      Lio_Searches: this.formRef.current?.getFieldValue('Searches'),
                    });
                  }
                }}
              >実　行</Button>
            </Space>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0640002_Retrieval);
