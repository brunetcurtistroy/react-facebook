import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Form, Checkbox, Dropdown, Menu , Modal, Input} from "antd";
import { MoreOutlined, } from '@ant-design/icons';
import WS0406004_PrintParam from 'pages/KK_ResultOutput/V4KK0012000_PrintParamMaintain/WS0406004_PrintParam.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0406003_MasterHistorySelect extends React.Component {
  static propTypes = {
    Li_ManageDivision: PropTypes.string,
    Li_DataClassify: PropTypes.string,
    Li_LainspectHistory: PropTypes.string,
    Lo_History: PropTypes.string,
    onFinishScreen: PropTypes.func
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'マスタ履歴選択';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  render() {
    return (
      <div className="master-history-select">
        <Card title="マスタ履歴選択">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <div style={{display:'none'}}>
              <Form.Item name="Date"><Input /></Form.Item>
              <Form.Item name="Time"><Input /></Form.Item>
            </div>
            <Table
              dataSource={[{ id: 1 }]}
              loading={false}
              pagination={false}
              rowKey={(record) => record.id}
            >
              <Table.Column title="" dataIndex="Expression_7" />
              <Table.Column title="日付" dataIndex="Date" />
              <Table.Column title="時間" dataIndex="Time" />
              <Table.Column title="備考" dataIndex="remarks" />
              <Table.Column title="保護" dataIndex="protection" render={(value, record, index) => {
                return <Form.Item name="protection" valuePropName="checked">
                  <Checkbox></Checkbox>
                </Form.Item>
              }} />
              <Table.Column render={(row) => (
                <Dropdown.Button
                  icon={<MoreOutlined />}
                  style={{
                    display: "inline-block", marginTop: '-1em'
                  }} overlay={() => (
                    <Menu >
                      <Menu.Item key='1' onClick={() => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: '60%',
                            component: (
                              <WS0406004_PrintParam
                               Li_StyleCode = {this.formRef.current.getFieldValue("data_division")}
                               Li_History = {this.formRef.current.getFieldValue("history_info")}
                                onFinishScreen={(output) => {

                                }}
                              />
                            ),
                          }
                        })
                      }} >
                        Item 1
                      </Menu.Item>
                    </Menu>
                  )}></Dropdown.Button>
              )}
              />
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0406003_MasterHistorySelect);
