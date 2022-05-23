import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Button, Modal } from "antd";
import { InfoCircleOutlined, WarningOutlined, CloseCircleOutlined, } from "@ant-design/icons";
import WS0252001_OfficeSpecialMaintain from './WS0252001_OfficeSpecialMaintain';
import { getOfficeSpecialDisplayAction } from "redux/basicInfo/PersonalNumberMigration/PersonalNumberMigration.actions";
import moment from "moment-timezone";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0251003_OfficeSpecialDisplay extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '事業所特記表示';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      data: [],
      loadingTable: false,
      importance: "",
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
    };
  }

  loadTableData = () => {
    this.setState({ loadingTable: true });
    getOfficeSpecialDisplayAction({ OfficeCode: this.props.Li_OfficeCode, BranchStoreCode: this.props.Li_BranchStoreCode })
      .then(res => {
        this.setState({ data: res })
        if (this.props.onChangeData) {
          this.props.onChangeData({ importance: res && res.length > 0 ? res[0].importance : null })
        }
      })
      .finally(() => this.setState({ loadingTable: false }));
  }

  componentDidMount = () => {
    this.loadTableData();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.loadTableData();
    }
  }
  render() {
    return (
      <div className="office-special-display">
        <Card title="事業所特記表示">
          <Form ref={this.formRef}>
            <Table
              className='mb-3'
              dataSource={this.state.data}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.data.length > 10 ? false : true
              }}
              loading={this.state.loadingTable}
              rowKey={(record) => record.id}
              size='small'
              bordered
            >
              <Table.Column title="" dataIndex="Expression_7" width={70} align='center' render={(text, record) => {
                let icon = '';
                switch (record.importance) {
                  case 1:
                    icon = (<InfoCircleOutlined style={{ color: '#1890ff' }} />)
                    break;
                  case 3:
                    icon = (<WarningOutlined style={{ color: '#faad14' }} />)
                    break;
                  case 5:
                    icon = (<CloseCircleOutlined style={{ color: '#ff4d4f' }} />)
                    break;
                  default: 
                };
                return (<div style={{ fontSize: 20 }}>{icon}</div>)
              }} />
              <Table.Column title="特記内容" dataIndex="content" />
              <Table.Column title="記載日" dataIndex="recording_date_on"
                render={(text, record, index) => <div>{moment(text).format('YYYY/MM/DD')}</div>}
              />
            </Table>
            <Form.Item style={{ float: 'right' }}>
              <Button type='primary' onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: '60%',
                    component: (
                      <WS0252001_OfficeSpecialMaintain
                        Li_OfficeCode={this.props.Li_OfficeCode}
                        Li_BranchStoreCode={this.props.Li_BranchStoreCode}
                        onFinishScreen={(output) => {
                          this.setState({
                            childModal: {
                              ...this.state.childModal,
                              visible: false,
                            },
                            importance: output?.importance
                          });

                          if (this.props.onChangeData) {
                            this.props.onChangeData({ importance: output?.importance })
                          }

                          // if (this.props.onFinishScreen) {
                          //   this.props.onFinishScreen({ importance: output?.importance })
                          // }
                          this.loadTableData();
                        }}
                      />
                    ),
                  },
                })
              }}>
                登録画面
              </Button>
            </Form.Item>
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
            this.loadTableData()
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0251003_OfficeSpecialDisplay);
