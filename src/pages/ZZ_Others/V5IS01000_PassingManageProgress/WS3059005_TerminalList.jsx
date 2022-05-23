import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Modal, Button } from 'antd';

import TerminalListAction from "redux/Others/PassingManageProgress/TerminalList.action";
import WS3061001_PassingControlInspectsDisplay from '../V5IS01010_PassingControlInspectsDisplay/WS3061001_PassingControlInspectsDisplay';

class WS3059005_TerminalList extends React.Component {
  static propTypes = {
    ImplementDateChar: PropTypes.any
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    document.title = "端末項目一覧";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      terminal_num: '',
      selectedRowTableFirst: 0,
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
    };
  }

  componentDidMount() {
    this.getScreenData()
  }

  getScreenData() {
    TerminalListAction.getScreenData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
        })
      }).finally(() => this.setState({ isLoadingTable: false }))
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }


  render() {
    return (
      <div className="terminal-list">
        <Card title="端末項目一覧">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            bordered={true}
            pagination={false}
            rowKey={(record) => record.terminal_num}
            className="mb-3"
            size="small"
          >
            <Table.Column title="端末番号" dataIndex="terminal_num" />
            <Table.Column title="略式名称" dataIndex="terminal_informal_name" />
            <Table.Column title="正式名称" dataIndex="terminal_official_name" />
            <Table.Column
              width={100}
              render={(value, record) => {
                return (
                  <div style={{ textAlign: 'center' }}>
                    <Button
                      type="primary"
                      onClick={(event) => {
                        this.setState({
                          childModal: {
                            ...this.state.childModal,
                            visible: true,
                            width: 900,
                            component: (
                              <WS3061001_PassingControlInspectsDisplay
                                ImplementDateChar={this.props.ImplementDateChar}
                                terminal_num={record.terminal_num}
                                onFinishScreen={() => {
                                  this.closeModal();
                                }}
                              />
                            ),
                          }
                        });
                      }}
                    >
                      選択
                    </Button>
                  </div>
                );
              }}
            />
          </Table>
          <Modal
            footer={null}
            width={this.state.childModal.width}
            visible={this.state.childModal.visible}
            bodyStyle={{ margin: 0, padding: 0 }}
            destroyOnClose={true}
            maskClosable={false}
            onCancel={() => {
              this.closeModal();
            }}
          >
            {this.state.childModal.component}
          </Modal>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS3059005_TerminalList);
