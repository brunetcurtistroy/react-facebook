import React from "react";
import { connect } from "react-redux";

import { Button, Card, Col, Row, Table, Modal } from "antd";
import WS1107001_SettingOcrCapture from 'pages/KS_CooperationRelated/V4CP0030000_OcrCaptureStartUp/WS1107001_SettingOcrCapture.jsx';
import ProcessSelectQueryAction from "redux/CooperationRelated/OcrCaptureStartUp/ProcessSelectQuery.action";
import ModalDraggable from "components/Commons/ModalDraggable";

class WS3108008_ProcessSelectQuery extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '処理選択照会';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getData();
    }
  }

  getData() {
    this.setState({ isLoadingTable: true })
    ProcessSelectQueryAction.getListData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  render() {
    return (
      <div className="process-select-query">
        <Card title="処理選択照会">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            scroll={{x: 300, y: 600}}
            rowKey={(res) => res.id}
            className="mb-3"
            bordered={true}
          >
            <Table.Column title="処  理  選  択  項  目" dataIndex="ProcessSelectName" />
            <Table.Column width={60}
              render={(text, record, index) => {
                return <div style={{ textAlign: "center" }}>
                  <Button type='primary'
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          recordData: record
                        });
                      }
                    }}
                  >選  択
                  </Button>
                </div>;
              }}
            />
          </Table>

          <Row gutter={16}>
            <Col span={24}>
              <Button type="primary" style={{ float: 'right', marginRight: '10px' }}
                onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '95%',
                      component:
                        <WS1107001_SettingOcrCapture
                          onClickedCreate={() => {
                            this.setState({
                              childModal: {
                                ...this.state.childModal,
                                visible: false,
                              },
                            });
                          }}
                        />
                      ,
                    },
                  });
                }}
              >設定</Button>
            </Col>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS3108008_ProcessSelectQuery);
