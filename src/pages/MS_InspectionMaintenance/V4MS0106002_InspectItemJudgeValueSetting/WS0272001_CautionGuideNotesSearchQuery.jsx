import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Card, Form, Input, Select, Button, Table, Row, Col, Space, message, Modal } from "antd";
import CautionGuideNotesSearchQueryAction from 'redux/InspectionMaintenance/InspectItemJudgeValueSetting/CautionGuideNotesSearchQuery.actions'
import WS2701001_CautionGuideMatterCmtMaintain from 'pages/MS_InspectionMaintenance/V4MS0107000_CautionGuideMatterCmtMaintain/WS2701001_CautionGuideMatterCmtMaintain.jsx';
class WS0272001_CautionGuideNotesSearchQuery extends React.Component {
  static propTypes = {
    Li_PatternCode: PropTypes.any,
    Li_CategoryCode: PropTypes.any,
    Li_IdentifyCode: PropTypes.any,
    LnkOutCmtCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '注意・指導事項検索・照会';

    this.state = {
      CategoryCode: [],
      selectedRow: {},
      isloadding: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  componentDidMount() {
    CautionGuideNotesSearchQueryAction.GetScreenData().then(res => {
      this.setState({
        CategoryCode: res?.CategoryCode
      })
      this.formRef.current?.setFieldsValue({
        CategoryCode: res?.CategoryCode?.[0]?.LinkedField
      })
      this.GetDataList()
    })
  }
  GetDataList() {
    this.setState({ isloadding: true })
    let obj = {
      Li_IdentifyCode: this.props.Li_IdentifyCode, Search: this.formRef.current?.getFieldValue("Search"),
      Li_CategoryCode: this.formRef.current?.getFieldValue("CategoryCode"), GuidanceContentKeyword: this.formRef.current?.getFieldValue("GuideContentKeyword")
    }
    CautionGuideNotesSearchQueryAction.GetDataDetail(obj).then(res => {
      this.formRef.current?.setFieldsValue({
        tableData: res
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }

    }).finally(() => this.setState({ isloadding: false }))
  }
  ShowCautionGuideMatterCmtMaintain() {
    this.setState({
      ...this.state,
      childModal: {
        width: '70%',
        visible: true,
        component: (<WS2701001_CautionGuideMatterCmtMaintain
          onFinishScreen={(output) => {
            this.closeModal()
          }}
        />)
      }
    });
  }
  render() {
    return (
      <div className="caution-guide-notes-search-query">
        <Card title="注意・指導事項検索・照会" className="mb-1">
          <Form
            ref={this.formRef}
            autoComplete="off"
            initialValues={{ Search: "", CategoryCode: "", GuideContentKeyword: "" }}
          >
            <Row>
              <Col span={6}>
                <Form.Item name="Search" label="検索キー">
                  <Input maxLength={20} onBlur={() => this.GetDataList()} />
                </Form.Item>
              </Col>
              <Col span={6} offset={1}>
                <Form.Item name="GuideContentKeyword" label="内容">
                  <Input maxLength={20} onBlur={() => this.GetDataList()} />
                </Form.Item>
              </Col>
              <Col span={5} offset={6}>
                <Form.Item name="CategoryCode">
                  <Select onChange={() => this.GetDataList()} >
                    {this.state.CategoryCode?.map(value => (
                      <Select.Option key={"CategoryCode-" + Math.random()} value={value.LinkedField} >{value.DisplayField}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row> 
            <Table
              dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
              loading={this.state.isloadding}
              size="small" bordered={true}
              pagination={false}
              rowKey={(record) => record.id}
              scroll={{ y: '60vh' }}
              rowSelection={{
                type: 'radio',
                onChange: async (selectedRowKeys, selectedRows) => {
                  await this.setState({
                    ...this.state.selectedRow,
                    selectedRow: selectedRows?.[0]
                  })
                }
              }}>
              <Table.Column title="コード" width={100} dataIndex="comment_code" />
              <Table.Column title="検索キー" width={120} dataIndex="search_key" />
              <Table.Column title="コメント内容" dataIndex="comment_content" />
              <Table.Column title="使用回数" width={100} dataIndex="number_of_times_of_use" />
              <Table.Column title="最終使用日" width={100} dataIndex="last_used_on" />
            </Table>
            <Space style={{ float: 'right', marginTop: '1em' }}>
              <Button type="primary" onClick={() => this.ShowCautionGuideMatterCmtMaintain()} >保守</Button>
              <Button type="primary" onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    Lo_LnkOutCmtCode: this.state.selectedRow?.comment_code ,
                    Lo_recordData: this.state.selectedRow
                  })
                }
              }} >選択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0272001_CautionGuideNotesSearchQuery);
