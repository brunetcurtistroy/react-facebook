import React from "react";
import { connect } from "react-redux";

import { Card, Form, Input, Select, Button, Table, Row, Col, Tree, Space, Checkbox } from "antd";
const styleDiv = { background: '#0092ff', padding: '6px 0', textAlign: 'center', border: '1px solid #f0f0f0', marginTop: '0.1em' };
const styleInput = { width: '80%', border: 'none' }
class WS0592001_InspectChangeSetting extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '検査変動設定';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    //data test
    const treeData = [
      {
        title: 'parent 1',
        key: '0-0',
        children: [
          {
            title: 'parent 1-0',
            key: '0-0-0',
            disabled: true,
            children: [
              {
                title: 'leaf',
                key: '0-0-0-0',
                disableCheckbox: true,
              },
              {
                title: 'leaf',
                key: '0-0-0-1',
              },
            ],
          },
        ],
      },
    ];
    const dataSource = [{ id: 1, value: 'ｺｰｽ金額 　①' }, { id: 2, value: 'ｺｰｽ額調整 ②' }, { id: 3, value: 'ｺｰｽ合計 　③　(①-②)' }, { id: 4, value: '検査変更  ④' },
    { id: 5, value: '合計金額  ⑤　(③+④)' }, { id: 6, value: '請求金額' }]
    return (
      <div className="inspect-change-setting">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
        >
          <Row>
            <Col span={6}>
              <Card >
                <Row>
                  <Col span={18}>
                    <Form.Item name="" label="予約番号">
                      <span>33</span>
                    </Form.Item>
                  </Col>
                  <Col span={6} style={{ textAlign: 'right' }}>
                    <Button type="primary" style={{ width: '80px' }}>&emsp;</Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={18}>
                    <Form.Item name="" label="&emsp;受診日">
                      <span>33</span>
                    </Form.Item>
                  </Col>
                  <Col span={6} style={{ textAlign: 'right' }}>
                    <span>9</span>
                  </Col>
                </Row>
                <hr style={{ opacity: '0.5', margin: '0.5em 0 0.5em 0' }} />
                <Row>
                  <Col span={14}>
                    <Form.Item name="" label="個人番号">
                      <span>6</span>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name="">
                      <Checkbox></Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span>dd</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <span>dd</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>dd</span>
                  </Col>
                  <Col span={8}>
                    <Button type="primary" style={{ width: '80px' }}>&emsp;</Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    (<span>dd</span>) <span>###歳</span> <span>hh</span>
                  </Col>
                </Row>
                <hr style={{ opacity: '0.5', margin: '0.5em 0 0.5em 0' }} />
                <p>dd</p>
                <p>dd</p>
                <hr style={{ opacity: '0.5', margin: '0.5em 0 0.5em 0' }} />
                <Form.Item label="&emsp;保険証">
                  <span>33</span>
                </Form.Item>
                <Form.Item label="&emsp;&emsp;記号">
                  <span>33</span>
                </Form.Item>
                <Form.Item label="&emsp;&emsp;番号">
                  <span>33</span>
                </Form.Item>
                <Form.Item >
                  <span>(--)</span>
                </Form.Item>
                <Form.Item >
                  <span>60</span>
                </Form.Item>
                <Form.Item name="" style={{background:'#E8E8E8', padding:'0.2em'}} >
                  <Tree
                    checkable
                    defaultExpandedKeys={['0-0-0', '0-0-1']}
                    defaultSelectedKeys={['0-0-0', '0-0-1']}
                    defaultCheckedKeys={['0-0-0', '0-0-1']}
                    onSelect={(selectedKeys) => {
                      console.log('selected', selectedKeys)
                    }}
                    onCheck={(checkedKeys) => {
                      console.log('onCheck', checkedKeys)
                    }}
                    treeData={treeData}
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col span={18}>
              <Card style={{ marginLeft: '0.5em' }}>
                <Row>
                  <Col span={18}>
                    <span>契約情報&emsp;&emsp;</span><span>dd</span>
                  </Col>
                  <Col span={6} style={{ textAlign: 'right' }}>
                    <Space>
                      <Button type="text" style={{ background: 'blue', color: 'white' }}>集計済</Button>
                      <Button type="text" style={{ background: 'red', color: 'white' }}>入金済</Button>
                    </Space>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div style={{ padding: '6px 0' }}>&nbsp;</div>
                    <Space>
                      <Button style={{ border: '1px solid #40a9ff' }}>ｵﾌﾟｼｮﾝ</Button>
                      <Button  >追加</Button>
                      <Button  >削除</Button>
                      <Button  >全て</Button>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span="4">
                        <div style={styleDiv}>税</div>
                        <Form.Item name="" style={{ marginBottom: '0px' }}><Input /></Form.Item>
                      </Col>
                      <Col span="10">
                        <div style={styleDiv}>消費税計算</div>
                        <div><Form.Item name="" style={{ width: '60%', float: 'left', marginBottom: '0px' }} ><Input /></Form.Item>
                          <Form.Item name="" style={{ width: '40%', marginBottom: '0px' }}><Input /></Form.Item></div>
                      </Col>
                      <Col span="10">
                        <div style={styleDiv}>金額計算</div>
                        <div><Form.Item name="" style={{ width: '60%', float: 'left', marginBottom: '0px' }} ><Input /></Form.Item>
                          <Form.Item name="" style={{ width: '40%', marginBottom: '0px' }}><Input /></Form.Item></div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Table dataSource={[]}
                  pagination={false}
                  rowKey={(record) => record.id}
                  rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                      console.log('selectedRows: ', selectedRows);
                    }
                  }}
                >
                  <Table.Column title="セットコード" dataIndex="" />
                  <Table.Column title="セット名称" dataIndex="" />
                  <Table.Column title="保険者" dataIndex="" />
                  <Table.Column title="事業所" dataIndex="" />
                  <Table.Column title="他団体" dataIndex="" />
                  <Table.Column title="個人１" dataIndex="" />
                  <Table.Column title="個人２" dataIndex="" />
                  <Table.Column title="個人３" dataIndex="" />
                  <Table.Column title="合計" dataIndex="" />
                </Table>
              </Card>
              <Card style={{ margin: '0.2em 0 0 0.5em' }}>
                <Row style={{ marginBottom: '0.2em' }}>
                  <Col span={12}>
                    <Space>
                      <Button style={{ border: '1px solid #40a9ff' }}>ｵﾌﾟｼｮﾝ</Button>
                      <Button  >追加</Button>
                      <Button  >削除</Button>
                      <Button  >全て</Button>
                    </Space>
                  </Col>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="primary">追　加</Button>
                  </Col>
                </Row>
                <Table dataSource={[{ id: 1, i: 1 }]}
                  pagination={false}
                  rowKey={(record) => record.id}
                >
                  <Table.Column title="区分" dataIndex="" render={() => {
                    return <Form.Item name="" >
                      <Select>
                        <Select.Option value=""></Select.Option>
                      </Select>
                    </Form.Item>
                  }} />
                  <Table.Column title="セットコード/セット名称" dataIndex="i" />
                  <Table.Column title="保険者" dataIndex="" />
                  <Table.Column title="事業所" dataIndex="" />
                  <Table.Column title="他団体" dataIndex="" />
                  <Table.Column title="個人１" dataIndex="" />
                  <Table.Column title="個人２" dataIndex="" />
                  <Table.Column title="個人３" dataIndex="" />
                  <Table.Column title="合計" dataIndex="" />
                </Table>
              </Card>
              <Card style={{ margin: '0.2em 0 0 0.5em' }}>
                <Table dataSource={dataSource}
                  pagination={false}
                  rowKey={(record) => record.id}
                  bordered={true}
                >
                  <Table.Column title="項　目" dataIndex="value" render={(row) => {
                    return <div style={{ width: '150px' }}>{row}</div>
                  }} />
                  <Table.Column title="保険者" render={(row) => {
                    return <>
                      <Form.Item style={{ marginBottom: '0px' }} name=""><Input style={styleInput} /></Form.Item>
                      <Form.Item style={{ marginBottom: '0px', display: row.id == 6 ? 'none' : "" }} name="">(<Input style={styleInput} />)</Form.Item>
                    </>
                  }} />
                  <Table.Column title="事業所" render={(row) => {
                    return <>
                      <Form.Item style={{ marginBottom: '0px' }} name=""><Input style={styleInput} /></Form.Item>
                      <Form.Item style={{ marginBottom: '0px', display: row.id == 6 ? 'none' : "" }} name="">(<Input style={styleInput} />)</Form.Item>
                    </>
                  }} />
                  <Table.Column title="他団体" render={(row) => {
                    return <>
                      <Form.Item style={{ marginBottom: '0px' }} name=""><Input style={styleInput} /></Form.Item>
                      <Form.Item style={{ marginBottom: '0px', display: row.id == 6 ? 'none' : "" }} name="">(<Input style={styleInput} />)</Form.Item>
                    </>
                  }} />
                  <Table.Column title="個人１" render={(row) => {
                    return <>
                      <Form.Item style={{ marginBottom: '0px' }} name=""><Input style={styleInput} /></Form.Item>
                      <Form.Item style={{ marginBottom: '0px', display: row.id == 6 ? 'none' : "" }} name="">(<Input style={styleInput} />)</Form.Item>
                    </>
                  }} />
                  <Table.Column title="個人２" render={(row) => {
                    return <>
                      <Form.Item style={{ marginBottom: '0px' }} name=""><Input style={styleInput} /></Form.Item>
                      <Form.Item style={{ marginBottom: '0px', display: row.id == 6 ? 'none' : "" }} name="">(<Input style={styleInput} />)</Form.Item>
                    </>
                  }} />
                  <Table.Column title="個人３" render={(row) => {
                    return <>
                      <Form.Item style={{ marginBottom: '0px' }} name=""><Input style={styleInput} /></Form.Item>
                      <Form.Item style={{ marginBottom: '0px', display: row.id == 6 ? 'none' : "" }} name="">(<Input style={styleInput} />)</Form.Item>
                    </>
                  }} />
                  <Table.Column title="合計" style={{ border: 'none' }} render={(row, data) => {
                    return <>
                      <Form.Item style={{ marginBottom: '0px' }} name=""><Input style={styleInput} /></Form.Item>
                      <Form.Item style={{ marginBottom: '0px', display: row.id == 6 ? 'none' : "" }} name="">(<Input style={styleInput} />)</Form.Item>
                    </>
                  }} />
                </Table>
                <Row>
                  <Col span={3} style={{ textAlign: 'right' }}>
                    <label>限度額</label>
                  </Col>
                  <Col span={3} offset={1}>
                    <Form.Item name=""><Input style={styleInput} /></Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item name=""><Input style={styleInput} /></Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item name=""><Input style={styleInput} /></Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item name=""><Input style={styleInput} /></Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item name=""><Input style={styleInput} /></Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item name=""><Input style={styleInput} /></Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0592001_InspectChangeSetting);
