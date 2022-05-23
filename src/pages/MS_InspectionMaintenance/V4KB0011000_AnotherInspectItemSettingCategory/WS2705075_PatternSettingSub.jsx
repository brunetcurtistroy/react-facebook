import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Table, Input, Button, Modal, message } from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {
  getDataPatternSettingSubAction, saveDataPatternSettingSubAction, deleteDataPatternSettingSubAction
} from "redux/InspectionMaintenance/AnotherInspectItemSettingCategory/PatternSettingSub.actions";
import WS2705076_CopyPattern from "./WS2705076_CopyPattern";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS2705075_PatternSettingSub extends React.Component {
  static propTypes = {
    Lo_PatternCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = ' ﾊﾟﾀｰﾝ設定SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: true,
      rowSelect: {},
      isAddRow: false
    };
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = () => {
    this.setState({ isLoading: true });
    getDataPatternSettingSubAction()
      .then(res => {
        if (res?.data)
          this.setState({
            dataSource: res.data,
            rowSelect: res.data.length > 0 ? res.data[0] : {}
          })
      })
      .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
      .finally(() => this.setState({ isLoading: false }))
  }

  createOrUpdateRecord = (record) => {
    if (!record.pattern_code) {
      Modal.error({
        content: 'ｺｰﾄﾞに空白は設定できません',
        icon: <CloseCircleOutlined style={{ color: 'red', fontSize: '30px' }} />
      })
    } else {
      if(record.isNew) delete record.id
      saveDataPatternSettingSubAction(record)
        .then(res => {
          message.success('成功');
          this.loadData();
          this.setState({ isAddRow: false })
        })
        .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
    }
  }

  deleteRecord = (record, index) => {
    if (record.id && !record.isNew) {
      deleteDataPatternSettingSubAction({ id: record.id })
        .then(res => {
          message.success('成功');
          this.loadData();
        })
        .catch(err => message.error(err?.response?.data?.message || "エラーが発生しました"))
    }
    let arrTemp = [...this.state.dataSource];
    arrTemp.splice(index, 1);
    this.setState({
      dataSource: arrTemp,
      rowSelect: arrTemp.length > 0 ? arrTemp[0] : {},
      isAddRow: false
    });
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  Copy_F07 = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 550,
        component: (
          <WS2705076_CopyPattern
            dataSource={this.state.dataSource}
            Li_CopySourcePatternCode={this.state.rowSelect.pattern_code}
            pattern_name={this.state.rowSelect.pattern_name}
            onFinishScreen={(isLoad) => {
              if (isLoad) {
                this.loadData();
              }
              this.closeModal()
            }}
          />
        ),
      },
    });
  }

  addRow = () => {
    this.setState({ isAddRow: true })
    if (!this.state.isAddRow) {
      let obj = {
        id: Math.round(Math.random() * 1000),
        isNew: true,
      };
      let arr = [...this.state.dataSource];
      let index = arr.findIndex(item => item.id === this.state.rowSelect.id);
      arr.splice(index + 1, 0, obj);
      this.setState({ dataSource: arr, rowSelect: obj })
    }
  }

  renderSaveAndDeleteRecord = (record, index) => (
    <>
      <Button
        size='small'
        style={{ border: 'none' }}
        icon={<SaveOutlined style={{ color: 'green' }} />}
        onClick={() => this.createOrUpdateRecord(record)}
      />
      <Button
        size='small'
        style={{ border: 'none', }}
        danger icon={<DeleteOutlined />}
        onClick={() => {
          Modal.confirm({
            content: '消去してもよろしいですか？',
            okText: 'は　い',
            cancelText: 'いいえ',
            onOk: () => this.deleteRecord(record, index)
          })
        }}
      />
    </>
  )

  onChangeInput = (value, name, record) => {
    let arrTemp = [...this.state.dataSource];
    let index = arrTemp.findIndex(item => item.id === record.id);
    if (index !== -1) {
      let objTemp = {
        ...record,
        [name]: value
      };
      arrTemp[index] = objTemp;
      this.setState({
        dataSource: arrTemp,
        rowSelect: objTemp
      });
    }
  }

  componentWillUnmount = () => {
    if (this.props.onFinishScreen)
      this.props.onFinishScreen({
        Lo_PatternCode: this.state.rowSelect.pattern_code,
        recordData: this.state.rowSelect
      })
  }

  render() {
    return (
      <div className="pattern-setting-sub">
        <Card title=" ﾊﾟﾀｰﾝ設定SUB">
          <Table
            size='small'
            bordered
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={{
              ...this.state.pagination,
              hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
            }}
            rowKey={(record) => record.id}
            onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
          >
            <Table.Column title="ﾊﾟﾀｰﾝ" dataIndex="pattern_code" width={300} render={(text, record) => (
              <Input
                maxLength={8}
                bordered={record.id === this.state.rowSelect.id}
                onChange={(e) => this.onChangeInput(e.target.value, 'pattern_code', record)}
                value={text}
              />
            )} />
            <Table.Column title="ﾊﾟﾀｰﾝ名称" dataIndex="pattern_name" render={(text, record) => (
              <Input
                maxLength={80}
                bordered={record.id === this.state.rowSelect.id}
                onChange={(e) => this.onChangeInput(e.target.value, 'pattern_name', record)}
                value={text}
              />
            )} />
            <Table.Column
              align='center'
              width={70}
              title={<Button size='small' type='primary' disabled={this.state.isAddRow} icon={<PlusOutlined />} onClick={this.addRow} />}
              render={(text, record, index) => this.renderSaveAndDeleteRecord(record, index)}
            />
          </Table>
          <div className='mt-3' style={{ float: 'right' }}>
            <Button type='primary' onClick={this.Copy_F07}>複写登録</Button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2705075_PatternSettingSub);
