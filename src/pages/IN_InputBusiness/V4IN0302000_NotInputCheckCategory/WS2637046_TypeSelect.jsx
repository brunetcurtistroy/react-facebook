import React from "react";
import { connect } from "react-redux";

import { Card, Form, Button, Row, Col, List, Input, Table } from "antd";

class WS2637046_TypeSelect extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '種別選択';

    this.state = {
      dataSource: [],
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
    };
  }
  componentDidUpdate(prevProps) {

    if (this.props !== prevProps) {
       this.getListData()
    }
  }
  setFormFieldValue(namePath, value) {
    this.formRef?.current?.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  componentDidMount() {
   this.getListData()
  }
  getListData() {
    const {Li_TypeSelectList} = this.props;
    const dataSource = Li_TypeSelectList.split(',');
    this.setFormFieldValue('Type',  this.props.Lio_Type);
    const Type = this.formRef?.current?.getFieldValue('Type')
    const selectedKey = dataSource.find(s => s === Type);
    const index = dataSource.findIndex(s => s === Type);
    this.setState({
      dataSource: ['', ...dataSource],
      selectedRowKeys: selectedKey ? [selectedKey.id] : [],
      rowSelected: selectedKey ? [selectedKey] : [],
      indexTable: index !== -1 ? index : 0
    })
  }
  onFinish = (values) => {
    if (this.props.onScreenFinish) {
      this.props.onScreenFinish({ stsSelect: true, Lio_Type: this.state.rowSelected[0] })
    }
  }

  render() {
    return (

      <div className="type-select">
        <Card title="種別選択">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Table
              showHeader={false}
              size='small'
              bordered
              style={{height: 300, cursor: 'pointer'}}
              pagination={false}
              scroll={{y: 600}}
              rowClassName={(record, index) => record === this.state.rowSelected[0] ? 'table-row-light' : ''}
              dataSource={this.state.dataSource}
              onRow={(record, rowIndex) => {
                return {
                  onClick: async () => {
                    let index = this.state.dataSource.findIndex(x => x === record)
                    await this.setState({
                      rowSelected: [record],
                      selectedRowKeys: [record.id],
                      indexTable: index
                    });
                  }
                }
              }}
              >
              <Table.Column render={(item, record, index) => { 
                  return record !== '' ? <span>{record}</span> : <div style={{height: '15px'}}></div>
              }}>
                  
              </Table.Column>
            </Table>
            <Row gutter={24}>
              <Col span={24}>
                <Button type="primary" htmlType="submit" style={{ float: "right" }}>選択</Button>
              </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2637046_TypeSelect);
