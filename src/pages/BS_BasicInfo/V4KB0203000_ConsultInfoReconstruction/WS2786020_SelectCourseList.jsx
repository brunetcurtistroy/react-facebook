import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Button, Card, Table, Form, Checkbox, Spin, message } from "antd";
import SelectCourseListAction from 'redux/basicInfo/ConsultInfoReconstruction/SelectCourseList.actions'
class WS2786020_SelectCourseList extends React.Component {
  static propTypes = {
    Li_Title: PropTypes.any,
    Lio_CourseList: PropTypes.any,
    onFinishScreen: PropTypes.func
  };
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'コース一覧選択';

    this.state = {
      selectedRows: [],
      isloaddingTable: false,
      isloadFrm: false
    };
  }
  componentDidMount() {
    this.GetListData()
  }
  componentDidUpdate(PreV) { 
    if (this.props.Lio_CourseList !== PreV.Lio_CourseList) {
      this.GetListData()
    }
  } 
  GetListData() {
    this.setState({ isloaddingTable: true }); 
    SelectCourseListAction.GetListData({ CourseList: this.props.Lio_CourseList ? this.props.Lio_CourseList : "" }).then(res => {
      this.formRef.current?.setFieldsValue({ tableData: res ? res : [] })
      if(!this.isEmpty(this.props.Lio_CourseList)){  
            this.setState({selectedRows: res.filter(val => val.StsSelect === 1)})  
      }else{
        this.setState({
          selectedRows:[]
        })
      }
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => this.setState({ isloaddingTable: false }))
  } 
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  async OnChoose(e, record) {
    const check = e.target.checked;
    this.setState({ isloadFrm: true })
    let formIns = this.formRef.current?.getFieldValue("tableData") 
    for (let index = 0; index < formIns.length; index++) { 
      let value = formIns[index]
      if (record.id === value.id) {
        if (check) {
          let obj = [...this.state.selectedRows]
          obj.push(value)
          await this.setState({selectedRows: obj, isloadFrm: false}) 
          return;
        } else {
          let obj = [...this.state.selectedRows] 
          for(const objVal in obj){
            if(record.id === obj[objVal].id){
               let data = await obj.filter(val => val.id != record.id) 
               await this.setState({ selectedRows: data , isloadFrm: false }) 
               return
            }
          } 
        } 
      } 
    }

  }
  render() {
    return (
      <div className="select-course-list">
        <Card title="コース一覧選択">
          <Spin spinning={this.state.isloadFrm}>
            <Form
              ref={this.formRef}>
              <Table
                dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
                loading={this.state.isloaddingTable} scroll={{ y: 500 }}
                pagination={false} bordered={true} size="small"
                rowKey={(record) => record.id}
              >
                <Table.Column width={50} align="center" render={(value, record, index) => {
                  return <Form.Item name={['tableData', index, 'StsSelect']} valuePropName="checked" style={{ marginBottom: '0px' }}>
                    <Checkbox onChange={(e) => this.OnChoose(e, record)} ></Checkbox>
                  </Form.Item>
                }} />
                <Table.Column width={100} title="コース" dataIndex="course_code" />
                <Table.Column title="略称" dataIndex="course_name_short_name" />
                <Table.Column title="正式" dataIndex="course_name_formal" />
              </Table>
              <Button type="primary" style={{ float: 'right', marginTop: '1em' }}
                onClick={() => {  
                  if (this.props.onFinishScreen) {
                    let  output = this.state.selectedRows
                    if (output.length > 0) {
                      let data = ""
                      output.map((value, i) => {
                        if (output.length - 1 > i) {
                          data += value.course_code + ",";
                        } else {
                          data += value.course_code + ";"
                        }
                        if(output.length -1 === i){
                          this.props.onFinishScreen({Lio_CourseList: data})
                        }
                      }) 
                    }else{
                      this.props.onFinishScreen({Lio_CourseList: ""})
                    } 
                  }
                }}
              >確定</Button>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2786020_SelectCourseList);
