import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Button, Space, Row, Col, Modal } from "antd";
import WS0272001_CautionGuideNotesSearchQuery from "pages/MS_InspectionMaintenance/V4MS0106002_InspectItemJudgeValueSetting/WS0272001_CautionGuideNotesSearchQuery";
import WS0176001_QueryCategoryInfo from "pages/TO_StatisticalServices/V4TO0003000_CategoryDeterminingClassifyTbl/WS0176001_QueryCategoryInfo";
class WS0920010_CopyingProcess extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '複写処理';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      }
    };
  }
  componentDidMount() {
    const { comment_code, search_key, comment_content, remarks, regional_insurer_group_classifi } = this.props;
    this.formRef.current.setFieldsValue({
      comment_code, search_key, comment_content, remarks, regional_insurer_group_classifi
    })
  }
  CautionGuideNotesSearchQuery = (condition = null) => {
    this.setState({
      childModal: {
        visible: true,
        width: '80%',
        component: <WS0272001_CautionGuideNotesSearchQuery
          onFinish={(output) => {
            this.setDataOutput(condition, output);
            this.closeModal();
          }}
        />
      }
    })
  }
  QueryCategoryInfo = (condition = null) => {
    this.setState({
      childModal: {
        visible: true,
        width: '80%',
        comopnent: <WS0176001_QueryCategoryInfo
          onFinish={(output) => {
            this.setDataOutput(condition, output);
            this.closeModal()
          }}
        />
      }
    })
  }
  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      }
    })
  }
  
  handleFinish = () => {
    if (this.props.onFinishScreen) {
      console.log('handle Finish');
      this.props.onFinishScreen({
        // Data
      })
    }
  }
  onFinish(values) {

  }

  render() {
    const { comment_code, search_key, comment_content, remarks, regional_insurer_group_classifi } = this.props;
    return (
      <div className="copying-process">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          <Card title="複写処理">
            {/**Row 1 */}
            <Card className="mb-3" style={{ maxWidth: 600, width: 'auto' }}>
              <Space>
                <Space style={{ minWidth: 70, width: 'auto' }}>
                  <Form.Item label="複写元" />
                </Space>
                <Space direction="vertical" size={0}>
                  <Row>
                    <Col span={6}>
                      <Form.Item name={'comment_code'} >
                        <Input type="number" readOnly />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="search_key" style={{ paddingLeft: 5 }}>
                        <Input readOnly />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item name="comment_content">
                        <Input readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col offset={6} span={13} style={{ paddingLeft: 5 }}>
                      <Form.Item name="remarks">
                        <Input readOnly />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item name="regional_insurer_group_classifi" >
                        <Input type="number" readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item name="comment_content">
                        <Input readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                </Space>
              </Space>
            </Card>

            <Card className="mb-3" style={{ maxWidth: 600, width: 'auto' }}>
              <Space>
                <Space style={{ minWidth: 70, width: 'auto' }}>
                  <Form.Item label="複写元" />
                </Space>
                <Space direction="vertical" size={0}>
                  <Row>
                    <Col span={6}>
                      <Form.Item name="" >
                        <Input.Search type="number" onSearch={this.CautionGuideNotesSearchQuery} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="G2SearchKey">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item name="G2CmtContent" >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col offset={6} span={13}>
                      <Form.Item name="G2Remarks">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item name="G2GroupCode" >
                        <Input.Search type="number" onSearch={this.QueryCategoryInfo} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item name="G2GeneralCmt">
                        <Input readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                </Space>
              </Space>
            </Card>

            <Space>
              <Form.Item
              >
                <Button type="primary">閉じる</Button>
              </Form.Item>
              <Form.Item
              >
                <Button type="primary"> </Button>
              </Form.Item>
              <Form.Item
              >
                <Button type="primary"> </Button>
              </Form.Item>
              <Form.Item
              >
                <Button type="primary"> </Button>
              </Form.Item>
              <Form.Item
              >
                <Button type="primary"> </Button>
              </Form.Item>
              <Form.Item
              >
                <Button type="primary">検　索</Button>
              </Form.Item>
              <Form.Item
              >
                <Button type="primary">広域表示</Button>
              </Form.Item>
              <Form.Item
              >
                <Button type="primary"> </Button>
              </Form.Item>
              <Form.Item
              >
                <Button type="primary"> </Button>
              </Form.Item>

            </Space>
          </Card>
        </Form>
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
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0920010_CopyingProcess);
