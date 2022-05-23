import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Button, Table, Row, Col, message } from "antd";
import PropTypes from "prop-types";
import IntroduceLetterSubjectCmtInquiryService from "services/IntroductionLetter/IntroduceLetterExtract/IntroduceLetterSubjectCmtInquiry";

class WS0888026_IntroduceLetterSubjectCmtInquiry extends React.Component {
  static propTypes = {
    Lo_CmtCode: PropTypes.any,
  };
  formRef = React.createRef();

  constructor(props) {
    super(props);
    // document.title = "紹介状対象コメント照会";

    this.state = {
      loading: false,
      tableData: [],
      selectedRowKeys: [],
      selectedRows: []
    };
  }
  componentDidMount() {
    this.getScreenData({ SearchKey: "" })
  }
  onSearch = (value) => {
    this.setState({
      loading: true,
    })
    this.getScreenData({ SearchKey: value })
  }
  getScreenData = (params) => {
    IntroduceLetterSubjectCmtInquiryService.onGetScreenData(params)
      .then(res => {
        this.setState({
          tableData: res.data,
          selectedRowKeys: [],
          selectedRows: [],
        })
      })
      .catch(error => {
        message.error(error)
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }



  passDataToFinishScreen = () => {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lo_CommentCode: this.state.selectedRows[0]?.Lo_CommentCode,
        recordData: this.state.selectedRows[0]
      })
    }
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRows: selectedRows
    })
  };
  onFinish(values) {

  }
  render() {
    const rowSelection = {
      onChange:  this.onSelectChange,
    };
    return (
      <div className="introduce-letter-subject-cmt-inquiry">
        <Card title="紹介状対象コメント照会">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Col span={4}>
              <Form.Item name="SearchKey" label="検索key">
                <Input.Search type="text" onSearch={this.onSearch} />
              </Form.Item>
            </Col>

            <Table
              size="small"
              bordered
              dataSource={this.state.tableData}
              loading={this.state.loading}
              // scroll={{ y: 700 }}
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: 10,
                hideOnSinglePage:true,
              }}
              rowKey={(record) => record.id}
              rowSelection={{
                type: "radio",
                ...rowSelection,
              }}
            >
              <Table.Column
                width={100}
                title="コード"
                dataIndex="comment_code"
                key=""
                render={(value, record, index) => {
                  return (
                    <Form.Item name={['tableData', index, 'comment_code']} style={{textAlign:'right'}}>
                      <span>
                        {record.comment_code}
                      </span>
                    </Form.Item>
                  )
                }}
              />
              <Table.Column
                width={100}
                title="検索key"
                dataIndex="search_key"
                key=""
                render={(value, record, index) => {
                  return (
                    <Form.Item name={['tableData', index, 'search_key']}>
                      <span>
                        {record.search_key}
                      </span>
                    </Form.Item>
                  )
                }}
              />
              <Table.Column
                title="コメント内容　／　備　　　考"
                dataIndex=""
                key=""
                render={(value, record, index) => (
                  <>
                    <Row>
                      <Form.Item
                        className="w-50"
                        span={12}
                        style={{ marginBottom: "-5px" }}
                        name={['tableData', index, 'FL_comment_content']}
                      >
                        <span>{record.FL_comment_content}</span>
                      </Form.Item>

                      <Form.Item
                        className="w-50"
                        span={12}
                        style={{ marginBottom: "-5px" }}
                        name={['tableData', index, 'remarks']}
                      >
                        <span>{record.remarks}</span>
                      </Form.Item>
                    </Row>
                    <Form.Item
                      style={{ marginBottom: "-5px" }}
                      name={['tableData', index, 'FP_comment_content']}>
                      <span>{record.FP_comment_content}</span>
                    </Form.Item>
                  </>
                )}
              />
            </Table>
            <Button
              type="primary"
              style={{ marginTop: "10px", float: "right" }}
              onClick={this.passDataToFinishScreen}
              disabled={this.state.selectedRowKeys[0] ? false : true}
            >
              選　択
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0888026_IntroduceLetterSubjectCmtInquiry);
