import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Card,Spin, Form, Input, Select, Button, Table, Row, Col, } from "antd";
import LeadershipMatterSearchSubAction from "redux/InputBusiness/RadiographyFindingInput/LeadershipMatterSearchSub.action"
import { debounce } from "lodash";
class WS1865001_LeadershipMatterSearchSub extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '指導事項検索 SUB';

    this.state = {
      selectedRowTableFirst: [],
      dataSource: [],
      dataForm: {},
      isLoadingForm: true,
      isLoadingTable: true,
      Li_InspectClassifyCode: null,
      CategoryCode:'全て'
    };
  }
  componentDidMount(){
    this.getScreenData();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getScreenData();
    }
  }
  getScreenData(){
    this.setState({ isLoadingForm: true });
    const data={
      Li_PatternCode: this.props.Li_PatternCode ?this.props.Li_PatternCode:"0000-000",
      Li_CategoryCode: this.props.Li_CategoryCode?this.props.Li_CategoryCode: 0,
      Li_IdentifyCode: this.props.Li_IdentifyCode?this.props.Li_IdentifyCode:"S",
      Li_InspectClassifyCode: this.props.Li_InspectClassifyCode,
      LnkOutCmtCode: 0
    }
    LeadershipMatterSearchSubAction.getScreenDataAction(data)
      .then((res) => {
        if (res) {
          this.setState({ dataForm: res , Li_InspectClassifyCode:this.props.Li_InspectClassifyCode});
          this.getListGuideItemInfoTableDisplay();
        }
      })
      .finally(() => {
        this.setState({ isLoadingForm: false });
      });
  }
  getListGuideItemInfoTableDisplay(change){
    console.log(change);
    console.log(this.state.Li_InspectClassifyCode);
    this.setState({ isLoadingTable: true });
    const data={
      Li_CategoryCode: change? change.CategoryCode: 0,
      Li_IdentifyCode: this.props.Li_IdentifyCode ? this.props.Li_IdentifyCode: "S",
      Li_InspectClassifyCode: this.state.Li_InspectClassifyCode ,
      Li_Search: change? change.Search: "",
      Li_GuideContentKeyword:  change ? change.GuideContentKeyword :""
    }
    LeadershipMatterSearchSubAction.getListGuideItemInfoTableDisplayAction(data)
      .then((res) => {
        if (res) {
          console.log(res);
          this.setState({ dataSource: res.Result });
        }
      })
      .finally(() => {
        this.setState({ isLoadingTable: false });
      });
  }
  onFinish(values) {}

  handleSelectRowsTableFirst = selectedRowTableFirst => {
    console.log(selectedRowTableFirst);
    this.setState({ selectedRowTableFirst });
  };
  selectDataDisplay(comment_code){
    const data={
      Li_CategoryCode: this.props.Li_CategoryCode? this.props.Li_CategoryCode : 0,
      comment_code: comment_code
    }
    LeadershipMatterSearchSubAction.selectDataDisplayAction(data)
    .then((res) => {
      if (res) {
        console.log(res)
      }
    })
    .finally(() => {
    });
  }

  onChangeInput(e, name){
    let change = {
      Search:'',
      GuideContentKeyword:'',
      CategoryCode:''
    };
    change[name] = e;
    if(change.CategoryCode > 0){
      this.getListGuideItemInfoTableDisplayCategory(change);
    }else{
      this.getListGuideItemInfoTableDisplay(change);
    }
  }
  getListGuideItemInfoTableDisplayCategory(change){
    this.setState({ isLoadingTable: true });
    const data={
      Li_CategoryCode: change.CategoryCode? change.CategoryCode: 0,
      Li_IdentifyCode: this.props.Li_IdentifyCode ? this.props.Li_IdentifyCode: "S",
      Li_Search: change.Search? change.Search: "",
      Li_GuideContentKeyword: change.GuideContentKeyword ? change.GuideContentKeyword :""
    }
    LeadershipMatterSearchSubAction.getListGuideItemInfoTableDisplayCategoryAction(data)
      .then((res) => {
        if (res) {
          this.setState({ dataSource: res });
        }
      })
      .finally(() => {
        this.setState({ isLoadingTable: false });
      });
  }


  render() {
    const { selectedRowTableFirst } = this.state

    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst
    }
    const dataSource = this.state.dataSource
    const dataForm = this.state.dataForm
    return (
      <div className="leadership-matter-search-sub">
        <Card title="指導事項検索 SUB">
          <Spin spinning={this.state.isLoadingForm}>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            initialValues={{CategoryCode: this.state.CategoryCode}}
          >
            <Row gutter={24} className="mb-3">
              <Col span={8}>
                <Form.Item
                  name="Search"
                  label="検索ｷｰﾜｰﾄﾞ"
                >
                  <Input onChange={(e) =>(this.onChangeInput(e.target.value, "Search"))} type="text" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="GuideContentKeyword"
                  label="内容"
                >
                  <Input onChange={(e) =>this.onChangeInput(e.target.value, "GuideContentKeyword")} type="text" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="CategoryCode"
                  label="検査区分"
                >
                  <Select onChange={(e) =>this.onChangeInput(e,"CategoryCode")}>
                    {dataForm.Expression_2_3 && dataForm.Expression_2_3.map((res) =>{
                      return(
                        <Select.Option key={res.id} value={res.id} >{res.name}</Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          </Spin>

          <Table className="mb-3 custom-th"
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            rowKey={(record) => record.id}
            // rowSelection={{ type: "radio", ...rowSelectionTableFirst }}
            scroll={{ y: '600px' }}
          >
            <Table.Column width={100} title="ｺﾒﾝﾄｺｰﾄﾞ" dataIndex="comment_code"
               render={(row, record, index) => {
                return (
                  <Form.Item
                    style={{ marginBottom: "0px", textAlign:"center" }}
                    name="comment_code"
                  >
                    <span>{record.comment_code}</span>
                  </Form.Item>
                );
              }}
            />
            <Table.Column width={150} title="検索キー" dataIndex="search_key" />
            <Table.Column width={600} title="コメント内容" dataIndex="comment_content" />
            <Table.Column width={100} title="優先度" dataIndex="priority"
                render={(row, record, index) => {
                  return (
                    <Form.Item
                      style={{ marginBottom: "0px", textAlign:"center" }}
                      name="priority"
                    >
                      <span>{record.priority}</span>
                    </Form.Item>
                  );
                }}
            />
            <Table.Column width={100} style={{textAlign: 'end'}} title="使用回数" dataIndex="number_of_times_of_use"
                render={(row, record, index) => {
                  return (
                    <Form.Item
                      style={{ marginBottom: "0px", textAlign:"center" }}
                      name="number_of_times_of_use"
                    >
                      <span>{record.number_of_times_of_use}</span>
                    </Form.Item>
                  );
                }}
            />
            <Table.Column width={150} title="最終使用日" dataIndex="last_used_on"
                render={(row, record, index) => {
                  return (
                    <Form.Item
                      style={{ marginBottom: "0px", textAlign:"center" }}
                      name="last_used_on"
                    >
                      <span> {record.last_used_on}</span>
                    </Form.Item>
                  );
                }}
            />
            <Table.Column  
                render={(value, record) => {
                  return (
                    <Button type="primary"
                      onClick={() => {
                        this.selectDataDisplay(record.comment_code);
                        if (this.props.onFinishScreen) {
                          this.props.onFinishScreen({
                            Lo_CommentContent: record.comment_content,
                            Lo_CommentCode: record.comment_code,
                          });
                        }
                      }}
                    >選択</Button>
                  )
                }} />
          </Table>
          {/* <Row gutter={24}>
            <Col span={24}>
              <Button type="primary" style={{ float: "right" }}>選択</Button>
            </Col>
          </Row> */}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1865001_LeadershipMatterSearchSub);
