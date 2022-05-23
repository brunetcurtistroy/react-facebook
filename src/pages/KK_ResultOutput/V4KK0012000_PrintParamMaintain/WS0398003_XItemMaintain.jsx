import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Form, Input, Checkbox } from "antd";
const { TextArea } = Input;
class WS0398003_XItemMaintain extends React.Component {
  static propTypes = {
    Li_Format: PropTypes.string,
    Li_IndicationDivision: PropTypes.string,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'x項目保守';

    this.state = {
    };
  }
  onFinish(values) {

  }
  render() {
    return (
      <div className="x-item-maintain p-td">
        <Card title="x項目保守">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <div style={{display:'none'}}>
              <Form.Item name="DivisionList"><Input /></Form.Item>
            </div>
            <Table
              dataSource={[{ id: 1 }]}
              loading={false}
              pagination={false}
              bordered = {true}
              rowKey={(record) => record.id}
            >

              <Table.Column dataIndex="enabled_disabled" render={(value, record, index) => {
                return <Form.Item name="enabled_disabled" style={{ marginBottom: '0px'}}>
                  <Checkbox></Checkbox>
                </Form.Item>
              }}></Table.Column>
              <Table.Column title="指示" dataIndex="instruction_division" render={(value, record, index) => {
                return <Form.Item name="" style={{ marginBottom: '0px' }}>
                  <Input style={{ border: '0px' }} />
                </Form.Item>
              }}
              ></Table.Column>
              <Table.Column title="項　目" dataIndex="item" render={(value, record, index) => {
                return <Form.Item name="" style={{ marginBottom: '0px' }}>
                  <Input style={{ border: '0px' }} />
                </Form.Item>
              }}
              ></Table.Column>
              <Table.Column title=" 名　称" dataIndex="name" render={(value, record, index) => {
                return <Form.Item name="" style={{ marginBottom: '0px' }}>
                  <Input style={{ border: '0px' }} />
                </Form.Item>
              }}
              ></Table.Column>
            </Table>
            <Form.Item name="remarks" style={{ marginTop: '0.3em' }}>
              <TextArea rows={4} />
            </Form.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0398003_XItemMaintain);
