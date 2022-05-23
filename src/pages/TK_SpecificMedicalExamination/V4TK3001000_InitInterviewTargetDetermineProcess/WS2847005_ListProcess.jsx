import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Form, Modal, message, Button, Space } from "antd";
import InitInterviewTargetDetermineProcessAction from 'redux/SpecificMedicalExamination/InitInterviewTargetDetermineProcess/InitInterviewTargetDetermineProcess.actions'
import WS2537001_PersonalReserveProcess from 'pages/YK_ReservationBusiness/V5YK0004000_PersonalReserveProcess/WS2537001_PersonalReserveProcess.jsx';
import WS2637001_OverallResultDisplayInput from 'pages/IN_InputBusiness/V4IN0302000_NotInputCheckCategory/WS2637001_OverallResultDisplayInput.jsx';
import WS0061009_CheckYesNoYes from 'pages/IN_InputBusiness/V4DS0212000_ProgressSetting/WS0061009_CheckYesNoYes.jsx';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import moment from 'moment';
class WS2847005_ListProcess extends React.Component {
  static propTypes = {
    conditionPage: PropTypes.any,
    dataInit: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    // document.title = '一覧処理';

    this.state = {
      tableData: [],
      total: 0,
      current_page: 1,
      conditionData: {},
      isloading: false,
      childModal: {
        visible: false,
        component: null,
        width: 0,
        className: '',
      },
      selectedRow: {}
    };
  }
  componentDidMount() {
    if (this.props.dataInit) {
      this.setState({
        tableData: this.props.dataInit.data,
        total: this.props.dataInit.total,
        current_page: this.props.dataInit.current_page
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.dataInit) {
        this.setState({
          tableData: this.props.dataInit.data,
          total: this.props.dataInit.total
        })
      }
    }
  }
  getDataByPage(page) {
    this.setState({ isloading: true })
    let data = this.props.conditionPage
    data["page"] = page
    InitInterviewTargetDetermineProcessAction.executeButton(data).then(res => {
      this.setState({
        tableData: res.data
      })
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
      }
    }).finally(() => this.setState({ isloading: false }))
  }
  showPersonalReserveProcess() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        className: 'custom-button-close',
        component: (
          <WS2537001_PersonalReserveProcess
            Li_CourseLevel={this.state.selectedRow?.W1_course_level ? this.state.selectedRow.W1_course_level : null}
            Li_ReserveNum={this.state.selectedRow?.W1_reserve_num ? this.state.selectedRow.W1_reserve_num : null}
            Li_Child={true}
            onFinishScreen={() => {
              this.closeModal();
            }}
          />),
      },
    })
  }
  showOverallResultDisplayInput() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: '90%',
        component: (
          <WS2637001_OverallResultDisplayInput
            Li_CourseLevel={this.state.selectedRow?.W1_course_level ? this.state.selectedRow.W1_course_level : null}
            Li_ReserveNum={this.state.selectedRow?.W1_reserve_num ? this.state.selectedRow.W1_reserve_num : null}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />),
      },
    })
  }
  showChoose() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 300,
        component: (
          <WS0061009_CheckYesNoYes
            Li_DisplayContent={"確認して下さい!"}
            Li_DisplayMethod={0}
            onFinishScreen={(output) => {
              if (output.Lio_StsReturn) {
                InitInterviewTargetDetermineProcessAction.run_f12()
              }
              this.closeModal()
            }}
          />),
      },
    })
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
        className: ''
      },
    });
  }
  render() {
    return (
      <div className="list-process">
        <Card title="一覧処理">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Table
              dataSource={this.state.tableData}
              loading={this.state.isloading}
              pagination={{
                defaultCurrent: 1,
                defaultPageSize: 100,
                total: this.state.total,
                onChange: (page, pageSize) => {
                  if (this.state.current_page != page) {
                    this.getDataByPage(page)
                    this.setState({
                      current_page: page
                    })
                  }

                }
              }}
              rowSelection={{
                type: 'radio',
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log('selectedRows: ', selectedRows);
                  this.setState({ selectedRow: selectedRows })
                }
              }}
              rowKey={(record) => record.id}
              scroll={{ y: 500, x: 1000 }}
            >
              <Table.Column title="受診日" width={100} dataIndex="W1_consult_date" 
              render={(value, record, index) => {
                return <span>{moment(value).format("MM/DD")}</span>
              }} />
              <Table.Column title="コース" width={100} dataIndex="W1_visits_courses" />
              <Table.Column title="ＩＤ" width={100} dataIndex="W1_id_cd" />
              <Table.Column title="カナ氏名" width={150} dataIndex="W1_kana_name" />
              <Table.Column title="漢字氏名" width={200} dataIndex="W1_kanji_name" />
              <Table.Column title="性" width={30} dataIndex="Expression_1" />
              <Table.Column title="続柄" width={80} dataIndex="Expression_2" />
              <Table.Column title="生年月日" width={110} dataIndex="W1_birthday" 
              render={(value, record, index) => {
                return <span>{moment(value).format("YYYY/MM/DD")}</span>
              }} />
              <Table.Column title="年齢" width={100} dataIndex="W1_age" />
              <Table.Column title="保険者" width={130} dataIndex="W1_insurer_num" />
              <Table.Column title="保険記号" width={130} dataIndex="W1_insurer_card_symbol" />
              <Table.Column title="保険番号" width={130} dataIndex="W1_insurer_card_num" />
              <Table.Column title="初回面談" width={130} dataIndex="W1_hierarchy" />
            </Table>
            <div style={{ marginTop: '1em' }}>
              <Space style={{ float: 'right' }}>
                <Button type="primary" onClick={() => this.showPersonalReserveProcess()} >追加</Button>
                <Button type="primary" onClick={() => this.showOverallResultDisplayInput()} >入力</Button>
                <Button type="primary" onClick={() => this.showChoose()} >実行</Button>
              </Space>
            </div>
          </Form>
        </Card>
        <ModalDraggable
          className={this.state.childModal.className}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2847005_ListProcess);
