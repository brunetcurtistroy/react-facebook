import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";
import { Modal, Table, Form, message, Card } from "antd";
import LaboratoryInspectConfirmSubAction from 'redux/CooperationRelated/MiraisElectronicMedicalRecordsSent/LaboratoryInspectConfirmSub.actions'
class WS2738001_LaboratoryInspectConfirmSub extends React.Component {
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Li_TransmissionState: PropTypes.any,
    Li_ProcessDivision: PropTypes.any,
    Li_Type: PropTypes.any,
    Li_Identify: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  formRef = React.createRef();
  constructor(props) {
    super(props);

    // document.title = '検体検査確認SUB';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      loadding: false
    };
  }
  componentDidMount() {
    this.getInit()
  }
  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }
  componentDidUpdate(preV) {
    if (preV !== this.props) {
      this.getInit()
    }
  }
  getInit() {
    if (this.props.Li_ReserveNum) {
      this.setState({ loadding: true })
      let data = {
        reservation_number_medical_exam: this.isEmpty(this.props.Li_ReserveNum) ? "" : this.props.Li_ReserveNum,
        transmission_state: this.isEmpty(this.props.Li_TransmissionState) ? "" : this.props.Li_TransmissionState,
        processing_division: this.isEmpty(this.props.Li_ProcessDivision) ? "" : this.props.Li_ProcessDivision,
        kind: this.isEmpty(this.props.Li_Type) ? "" : this.props.Li_Type,
        identification: this.isEmpty(this.props.Li_Identify) ? "" : this.props.Li_Identify
      }
      LaboratoryInspectConfirmSubAction.getListData(data)
        .then(res => {
          this.formRef.current?.setFieldsValue({ tableData: res })
          this.setState({ loadding: false })
        })
        .catch(error => {
          const res = error.response;
          if (!res || res.data || res.data.message) {
            message.error('エラーが発生しました');
          }
        })
        .finally(() => this.setState({ loadding: false }))
    }
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  render() {
    return (
      <div className="laboratory-inspect-confirm-sub">
        <Card title='検体検査確認SUB'>
          <Form
            ref={this.formRef}
          >
            <Table
              size='small'
              dataSource={this.formRef.current?.getFieldValue("tableData") ? this.formRef.current?.getFieldValue("tableData") : []}
              loading={this.state.loadding}
              scroll={{ y: 600 }}
              bordered
              pagination={false}
              rowKey={(record) => record.id}
            >
              <Table.Column title="コード" dataIndex="test_item_code" width={70} />
              <Table.Column title="検査名称" dataIndex="Expression_8" />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2738001_LaboratoryInspectConfirmSub);
