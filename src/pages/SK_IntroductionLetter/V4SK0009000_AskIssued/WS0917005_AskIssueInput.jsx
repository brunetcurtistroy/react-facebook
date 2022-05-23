import React from "react";
import { connect } from "react-redux";

import { Card,Table,Form,Checkbox } from "antd";  
class WS0917005_AskIssueInput extends React.Component { 
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'おたずね発行[入力]';

    this.state = {
      isLoadding: false,
    };
  }

  render() {
    return (
      <div className="ask-issue-input">
        <Card title="おたずね発行[入力]">
        <Form
            ref={this.formRef} 
          >
          <Table
            dataSource={[{id: 2}]}
            loading={this.state.isLoadding}
            pagination={ false}
            rowKey={(record) => record.id}
            size="small" bordered={true}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectedRows) => {
                console.log('selectedRows: ', selectedRows);
              }
            }}
  
          >
            <Table.Column title="受診日" dataIndex="W1_consult_date"  />
            <Table.Column title="受付No" dataIndex="W1_receipt_no"  />
            <Table.Column title="氏　　　　　　名" dataIndex="personal_number_id" render={(value,record,index)=>{
              return  <span>{value}&emsp;{record.kanji_name}</span>
            }} />
            <Table.Column title="診療科" dataIndex="W1_depart" render={(value,record,index)=>{
              return  <span>{value}&emsp;{record.department_name}</span>
            }} />
            <Table.Column title="受診コース" dataIndex="visit_course"   render={(value,record,index)=>{
              return  <span>{value}&emsp;{record.contract_short_name}</span>
            }} />
            <Table.Column title={<Form.Item name="StsAll"  style={{marginBottom: '0px'}}>
              <Checkbox></Checkbox>
            </Form.Item>}
             dataIndex="W1_instruction_flg" render={(value,record,index)=>{
              return <Form.Item name={['tableData',index,'W1_instruction_flg']} style={{marginBottom: '0px'}}>
                 <Checkbox></Checkbox>
              </Form.Item>
            }}/> 
          </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0917005_AskIssueInput);
