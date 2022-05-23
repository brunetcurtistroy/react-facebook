import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";

import { Card, Col, Row, Table, Button, Modal, Space } from "antd";

import WS0638001_EscortManageMaintain from 'pages/JZ_AdvancePreparation/V4MS0061000_DocumentManageMaintain/WS0638001_EscortManageMaintain.jsx';
import WS1544002FormatQueryAction from "redux/AdvancePreparation/DocumentManageMaintain/WS1544002_FormatQuery.action";

class WS1544002_FormatQuery extends React.Component {
  static propTypes = {
    Lio_Format: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'フォーマット照会';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSourceQuery: [],
      isLoadingQuery: true,
      rowSelectedTableQuery: [],
      selectedRowKeysQuery: [],

      dataSourceContent: [],
      isLoadingContent: true,
      rowSelectedTableContent: [],
      selectedRowKeysContent: []
    };
  }

  componentDidMount() {
    this.getDataFormatQuery();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataFormatQuery();
    }
  }

  getDataFormatQuery() {
    this.setState({ isLoadingQuery: true });

    let params = {
      Format: this.props.Lio_Format
    }

    WS1544002FormatQueryAction.getDataFormatQuery(params)
      .then(async (res) => {
        let index = 0;
        if (res && this.props.Lio_Format) {
          let inx = res.findIndex(x => x.W1_FORMAT === this.props.Lio_Format);
          index = inx === -1 ? 0 : inx
        }
        await this.setState({
          dataSourceQuery: res ? res : [],
          isLoadingQuery: false,
          rowSelectedTableQuery: res && res.length > 0 ? [res[index]] : [],
          selectedRowKeysQuery: res && res.length > 0 ? [res[index].id] : []
        });

        if (res && res.length > 0) {
          this.getDataFormatContent();
        }
      })
      .finally(() => this.setState({ isLoadingQuery: false }))
  }

  getDataFormatContent() {
    let params = {
      W1_FORMAT: this.state.rowSelectedTableQuery[0].W1_FORMAT
    }

    this.setState({ isLoadingContent: true });

    WS1544002FormatQueryAction.getDataFormatContent(params)
      .then((res) => {
        this.setState({
          dataSourceContent: res ? res : [],
          isLoadingContent: false,
          rowSelectedTableContent: res && res.length > 0 ? [res[0]] : [],
          selectedRowKeysContent: res && res.length > 0 ? [res[0].id] : []
        })
      })
      .finally(() => this.setState({ isLoadingContent: false }))
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
      <div className="format-query">
        <Card title="フォーマット照会">
          <Row gutter={24} className="mb-3">
            <Col span={5} style={{ paddingRight: 0 }}>
              <Table
                size='small'
                style={{ cursor: 'pointer' }}
                rowClassName={(record, index) => record.id === this.state.rowSelectedTableQuery[0]?.id ? 'table-row-light' : ''}
                dataSource={this.state.dataSourceQuery}
                loading={this.state.isLoadingQuery}
                pagination={false}
                bordered={true}
                rowKey={(record) => record.id}
                scroll={{ y: 600 }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: async () => {
                      await this.setState({
                        rowSelectedTableQuery: [record],
                        selectedRowKeysQuery: [record.id],
                      });
                      this.getDataFormatContent()
                    }
                  };
                }}
              >
                <Table.Column title="ﾌｫｰﾏｯﾄ" dataIndex="W1_FORMAT" />
              </Table>
            </Col>

            <Col span={19}>
              <Table
                size='small'
                bordered={true}
                dataSource={this.state.dataSourceContent}
                loading={this.state.isLoadingContent}
                pagination={false}
                rowKey={(record) => record.id}
                scroll={{ y: 700 }}
              // rowSelection={{
              //   type: "radio",
              //   selectedRowKeys: this.state.selectedRowKeysContent,
              //   onSelect: (record, selected, selectedRows) => {
              //     this.setState({
              //       rowSelectedTableContent: selectedRows,
              //       selectedRowKeysContent: selectedRows.map(x => x.id),
              //     });
              //   },
              // }}
              >
                <Table.Column title="健診ｺｰｽ"
                  render={(value, record, index) => {
                    return (
                      <div>
                        <span>{record.medical_exam_course}</span>
                        <span>{record.expression_4}</span>
                      </div>
                    )
                  }}
                />
                <Table.Column title="内容"
                  render={(value, record, index) => {
                    return (
                      <div>
                        <span>{record.escort_code}</span>
                        <span>{record.escort_name}</span>
                      </div>
                    )
                  }}
                />
                <Table.Column title="書式" dataIndex="format_name" />
              </Table>
            </Col>
          </Row>
          <hr />
          <Space style={{ float: "right" }}>
            <Button type="primary"
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 800,
                    component: (
                      <WS0638001_EscortManageMaintain
                        Li_Format={this.state.rowSelectedTableQuery[0].W1_FORMAT}
                        onFinishScreen={() => {
                          this.getDataFormatContent()
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                });
              }}
            >保守</Button>
            <Button type="primary"
              onClick={() => {
                if (this.props.onFinishScreen) {
                  this.props.onFinishScreen({
                    Lio_Format: this.state.rowSelectedTableQuery[0].W1_FORMAT,
                    recordDataContent: this.state.rowSelectedTableContent[0]
                  });
                }
              }}
            >選択</Button>
          </Space>

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
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1544002_FormatQuery);
