import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Input, Modal, Button, Space, message } from "antd";

import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import CourseBasedDetermineByStyleSettingAction from "redux/ResultOutput/ResultsTblCollectOutput/CourseBasedDetermineByStyleSetting/CourseBasedDetermineByStyleSetting.action";
import WS0061015_CheckYesNoNo from "pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061015_CheckYesNoNo";
import WS0458004_StyleSetting from 'pages/KK_ResultOutput/V4KK0200000_ResultsTblCollectOutput/WS0458004_StyleSetting.jsx';
import WS0458010_PattanCopy from "./WS0458010_PattanCopy";

class WS0458001_CourseBasedDetermineByStyleSetting extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = 'コース別様式設定[拡張';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      dataSource: [],
      isLoadingTable: true,
      selectedRowKeys: [],
      rowSelected: [],
      indexTable: 0,
    };

    this.handleAddRowTable = this.handleAddRowTable.bind(this);
  }

  componentDidMount() {
    this.getScreenData(true);
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.getScreenData(true);
    }
  }

  getScreenData(reload) {
    this.setState({ isLoadingTable: true })
    CourseBasedDetermineByStyleSettingAction.getListData()
      .then((res) => {
        let data = res ? res : [];
        let index = reload ? 0 : this.state.indexTable
        this.setState({
          dataSource: data,
          isLoadingTable: false,

          rowSelected: data.length > 0 ? [data[index]] : [],
          selectedRowKeys: data.length > 0 ? [data[index].id] : [],
          indexTable: index,
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  updateRecordData(index) {
    let params = { ...this.state.dataSource[index] }
    if (this.checkDuplicateCode()) {
      message.warning('複製 !!');
    } else {
      CourseBasedDetermineByStyleSettingAction.saveData(params)
        .then((res) => {
          console.log(res)
          message.success('更新しました!')
          this.getScreenData(false)
        })
        .catch((err) => {
          const res = err.response;
          if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
          }
          message.error(res.data.message);
        });
    }
  }

  deleteData(id) {
    let params = {
      id: id
    }
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 300,
        component:
          <WS0061015_CheckYesNoNo
            Li_Message={'削除を実行しますか ?'}
            onFinishScreen={(ouput) => {
              if (ouput.Lio_StsReturn) {
                CourseBasedDetermineByStyleSettingAction.deleteData(params)
                  .then(res => {
                    message.success('正常に削除されました!');
                    this.getScreenData(true)
                  })
                  .catch((err) => {
                    const res = err.response;
                    if (!res || !res.data || !res.data.message) {
                      message.error("エラーが発生しました");
                      return;
                    }
                    message.error(res.data.message);
                  });
              }
              this.closeModal()
            }} />
      },
    });
  }

  updateDatasource(index, field, value) {
    let data = [...this.state.dataSource];

    data[index][field] = value;

    this.setState({
      dataSource: data
    });
  }

  findIndexByID = (arrayData, recordID) => {
    return arrayData.findIndex((item) => recordID === item.id);
  };

  // check id null
  checkIdTemp(id) {
    if (id === '') {
      return true
    }
    return false;
  }

  checkAddItem() {
    if (this.state.dataSource.length > 0) {
      let index = this.state.dataSource.findIndex(x => !x.PatternClassify && !x.item);
      if (index === -1) {
        return false;
      }
      return true
    }
  }

  checkDisabledBtnAdd() {
    if (this.state.rowSelected.length > 0) {
      if (this.checkAddItem() || this.checkIdTemp(this.state.rowSelected[0].id)) {
        return true;
      } return false;
    } return false;
  }

  // add new record
  async handleAddRowTable() {
    let newRow = { id: '' };

    let data = [...this.state.dataSource];

    data.unshift(newRow);

    await this.setState({
      dataSource: data,
      rowSelected: [newRow],
      selectedRowKeys: [newRow.id],
      indexTable: 0
    });

    this.forceUpdate();
  }


  // check selected record while add new
  changeRow(index) {
    let data = [...this.state.dataSource];

    let idTemp = false;
    data.forEach(item => {
      if (this.checkIdTemp(item.id)) {
        idTemp = true;
        return idTemp;
      }
    })

    if (idTemp) {
      this.setState({
        rowSelected: [data[0]],
        selectedRowKeys: [data[0].id],
        indexTable: 0
      });
    } else {
      this.setState({
        indexTable: index
      });
    }
  }

  handleDeleteRowTable() {
    let data = [...this.state.dataSource];
    data.splice(0, 1);
    this.setState({
      dataSource: data,
      indexTable: 0,
      rowSelected: data.length > 0 ? [data[0]] : [],
      selectedRowKeys: data.length > 0 ? [data[0].id] : []
    });
  }

  /////
  checkDuplicateCode() {
    let lstData = [];
    lstData = [...this.state.dataSource];
    const uniqueValues = new Set(lstData.map(v => (v.PatternClassify + '_' + v.item)));

    if (uniqueValues.size < lstData.length) {
      return true;
    } return false;
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="course-specific-style-setting-extend">
        <Card title="コース別様式設定[拡張">
          <Space>
            <Button
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 400,
                    component:
                      <WS0458010_PattanCopy
                        Li_PatternClassify={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].PatternClassify : null}
                        Li_Item={this.state.rowSelected.length > 0 ? this.state.rowSelected[0].item : null}
                        onFinishScreen={(ouput) => {
                          this.getScreenData()
                          this.closeModal()
                        }} />
                  },
                });
              }}>
              標準取込
            </Button>
          </Space>
          <hr style={{ margin: '15px 0' }} />
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={false}
            rowKey={(record) => record.id}
            scroll={{ x: 500, y: 400 }}
            bordered
            rowSelection={{
              type: "radio",
              selectedRowKeys: this.state.selectedRowKeys,
              onSelect: (record, selected, selectedRows) => {
                let index = this.state.dataSource.findIndex(x => x.id === record.id)
                this.setState({
                  rowSelected: selectedRows,
                  selectedRowKeys: selectedRows.map(x => x.id),
                  indexTable: index
                });
                this.changeRow(index)
              },
            }}
          >
            <Table.Column title="区分" dataIndex="PatternClassify" align="center" width={150}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'left' }}>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id)?
                      <span style={{ paddingLeft: 8 }}>{record.PatternClassify}</span>
                      :
                      <Input value={record.PatternClassify} maxLength={4}
                        onChange={(event) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "PatternClassify", event.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column title="名　　称" dataIndex="item" align="center"
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: 'left' }}>
                    {this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) ?
                      <span style={{ paddingLeft: 8 }}>{record.item}</span>
                      :
                      <Input value={record.item} maxLength={20}
                        onChange={(event) => {
                          this.updateDatasource(this.findIndexByID(this.state.dataSource, record.id), "item", event.target.value)
                        }}
                      />
                    }
                  </div>
                )
              }}
            />
            <Table.Column width={70}
              title={
                <div style={{ textAlign: "center" }}>
                  <Button size='small'
                    disabled={this.checkDisabledBtnAdd()}
                    onClick={this.handleAddRowTable}
                    type="primary" icon={<PlusOutlined />}>
                  </Button>
                </div>
              }
              render={(text, record, index) => {
                return <div style={{ textAlign: "center" }}>
                  <Button size='small'
                    hidden={this.state.indexTable !== this.findIndexByID(this.state.dataSource, record.id) || this.checkAddItem() ||
                      (!(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].PatternClassify) &&
                        !(this.state.dataSource[this.state.indexTable] && this.state.dataSource[this.state.indexTable].item))}
                    onClick={() => { this.updateRecordData(this.findIndexByID(this.state.dataSource, record.id)) }}
                    style={{ color: '#42b10b', border: 'none', marginRight: '5px' }}
                    icon={<SaveOutlined />} >
                  </Button>
                  <Button size='small' style={{ border: 'none' }}
                    onClick={() => {
                      this.checkIdTemp(record.id) ? this.handleDeleteRowTable() : this.deleteData(record.id)
                    }}
                    danger
                    icon={<DeleteOutlined />}
                  >
                  </Button>
                </div>;
              }}
            />
            <Table.Column align='center' width={90}
              render={(value, record, index) => {
                return (
                  <Button type='primary'
                    hidden={!record.id}
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "80%",
                          component: (
                            <WS0458004_StyleSetting
                              PatternClassify={record.PatternClassify}
                              onFinishScreen={(output) => {
                                this.closeModal();
                              }}
                            />
                          ),
                        },
                      })
                    }}
                  >様式設定</Button>
                )
              }}
            />
          </Table>

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

export default connect(mapStateToProps, mapDispatchToProps)(WS0458001_CourseBasedDetermineByStyleSetting);
