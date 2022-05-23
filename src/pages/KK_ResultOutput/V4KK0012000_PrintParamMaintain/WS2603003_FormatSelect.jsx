import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Form, Input, Button, Space } from "antd";
import FormatSelectAction from 'redux/ResultOutput/PrintParamMaintain/FormatSelect.action'
class WS2603003_FormatSelect extends React.Component {
  static propTypes = {
    Li_FormatListCsvFormat: PropTypes.string,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '書式選択';

    this.state = {
    };
  }

  render() {
    return (
      <div className="format-select p-td">
        <Card title="書式選択">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          <Table
            loading={false}
            dataSource={[{id:1}]}
            rowKey="id"
            pagination={false}
            bordered={true}
            scroll={{y:800}}
            showHeader={false}
          >
            <Table.Column  dataIndex="W1_remark" render={(value, record, index)=>{
              return <Form.Item name="W1_remark" style={{marginBottom:'0px'}}>
                <Input style={{border:'none'}} />
              </Form.Item> 
            }} />
            <Table.Column  dataIndex="Expression_1" />
          </Table>
          <Space style={{float:'right', marginTop:'1em'}}>
            <Button type="primary" onClick={()=>{
              FormatSelectAction.OpenFolder().then(res=>{
                console.log(res)
              })
            }}>VREPORT</Button>
            <Button type="primary" onClick={()=>{
              FormatSelectAction.BackupCreate("data").then(res=>{
                console.log(res)
              })
            }}>BackUp</Button>
            <Button type="primary" onClick={()=>{
              FormatSelectAction.OpeningAFile().then(res=>{
                console.log(res)
              })
            }}>開く</Button>
          </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2603003_FormatSelect);
