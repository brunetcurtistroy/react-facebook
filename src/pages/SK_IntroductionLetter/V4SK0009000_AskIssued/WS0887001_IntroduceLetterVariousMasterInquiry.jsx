import React from "react";
import { connect } from "react-redux";
import PropTypes, { number } from 'prop-types'; 
import { Card, Form, Input, Button, Table, Row, Col, Space } from "antd";

class WS0887001_IntroduceLetterVariousMasterInquiry extends React.Component {
  static propTypes = {
    Li_ManageCode: PropTypes.any,
    Li_SearchKey: PropTypes.any,
    Li_SearchChar: PropTypes.any,  
    Lo_VariousCodes:PropTypes.any,

    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '紹介状各種マスタ照会';
    this.state = {
      isLoadding: false,
      selectedRow : {}
    };
  }

  onFinish(values) {
  }

  render() {
    return (
      <div className="introduce-letter-various-master-inquiry">
        <Card title="紹介状各種マスタ照会">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Row>
              <Col span={6}>
                <Form.Item name="SearchKey" label="検索キー">
                  <Input maxLength={8} />
                </Form.Item>
              </Col>
              <Col span={12} offset={1}>
                <Form.Item name="SearchChar" label="文字検索">
                  <Input maxLength={500} />
                </Form.Item>
              </Col>
            </Row>
            <Table dataSource={[{ id: 2,various_codes:"2000", findings_content:'検査内容' }]}
              loading={this.state.isLoadding}
              pagination={false}
              rowKey={(record) => record.id}
              size="small" bordered={true}
              rowSelection={{
                type: 'radio',
                onChange: (selectedRowKeys, selectedRows) => { 
                  this.setState({...this.state.selectedRow, selectedRow: selectedRows[0]})
                }
              }}>
              <Table.Column title="コード" dataIndex="various_codes" />
              <Table.Column title="検索key" dataIndex="search_key" />
              <Table.Column title="検　査　内　容" dataIndex="findings_content" />
              <Table.Column title="備　　　　　　　　　考" dataIndex="remarks" />
            </Table>
            <Row style={{ float: 'right', marginTop: '1em' }} >
              <Space>
                <Button type="primary">設　定</Button>
                <Button type="primary" onClick={()=>{
                  if(this.props.onFinishScreen){
                    this.props.onFinishScreen({Lo_VariousCodes: this.state.selectedRow?.various_codes , recordData:this.state.selectedRow })
                  }
                }} >選　択</Button>
              </Space>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0887001_IntroduceLetterVariousMasterInquiry);
