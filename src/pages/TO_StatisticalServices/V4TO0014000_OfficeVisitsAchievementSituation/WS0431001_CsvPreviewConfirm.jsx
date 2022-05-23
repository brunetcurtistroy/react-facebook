import React from "react";
import PropTypes from 'prop-types';

import { Card, Form, Button, Row, Col, Modal, } from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import {
  PrinterOutlined ,FileSearchOutlined, DownloadOutlined,
} from "@ant-design/icons";

import WS0432001_CsvConfirm from 'pages/TO_StatisticalServices/V2MS0140_PersonalInfoCsvOutput/WS0432001_CsvConfirm';

class WS0431001_CsvPreviewConfirm extends React.Component {
  static propTypes = {
    Lio_OutputMethod: PropTypes.any,
    Lio_Output: PropTypes.any,
    Lio_Preview: PropTypes.any,

    onFinishScreen: PropTypes.any,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = 'CSV・プレビュー確認';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  render() {
    const btnStyle = {
      fontSize: '30px',
      padding: '5px',
    };
    return (
      <div className="csv-preview-confirm">
        <Card title="CSV・プレビュー確認">
          <Form ref={this.formRef}>
            <Row gutter={10}>
              <Col span={8}>
                <Button type="primary" size="large" block style={{ height: 'auto' }} ghost onClick={() => {
                  this.props.onFinishScreen({
                    Lio_Preview: false,
                    Lio_OutputMethod: '0',
                  });
                }}>
                  <PrinterOutlined style={btnStyle} /><div>印刷</div>
                </Button>
              </Col>
              <Col span={8}>
                <Button type="primary" size="large" block style={{ height: 'auto' }} ghost onClick={() => {
                  this.props.onFinishScreen({
                    Lio_Preview: true,
                    Lio_OutputMethod: '0',
                  });
                }}>
                  <FileSearchOutlined style={btnStyle} /><div>プレビュー</div>
                </Button>
              </Col>
              <Col span={8}>
                <Button type="primary" size="large" block style={{ height: 'auto' }} ghost onClick={() => {
                  var StsOutput = false;
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      width: 400,
                      visible: true,
                      component: (<WS0432001_CsvConfirm
                        Lio_Output={this.props.Lio_Output}
                        onFinishScreen={(output) => {
                          StsOutput = output.Lo_StsOutput;

                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: false,
                            }
                          }, () => {
                            if (StsOutput) {
                              this.props.onFinishScreen({
                                Lio_OutputMethod: '1',
                                Lio_Output: output.Lio_Output,
                              });
                            }
                          });
                        }}
                      />),
                    }
                  });
                }}>
                  <DownloadOutlined style={btnStyle} /><div>CSV</div>
                </Button>
              </Col>
            </Row>
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

export default WS0431001_CsvPreviewConfirm;
