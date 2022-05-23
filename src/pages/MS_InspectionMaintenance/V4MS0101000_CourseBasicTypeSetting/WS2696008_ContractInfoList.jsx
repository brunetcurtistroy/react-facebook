import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Button, Card, Table, Tooltip, } from "antd";
import Color from "constants/Color";
import Modal from "antd/lib/modal/Modal";
import WS0605127_ContractLineItemDisplay from "pages/BS_BasicInfo/V4KB0201400_ContractInfoBatchProcess/WS0605127_ContractLineItemDisplay";
import { number_format } from "helpers/CommonHelpers";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS2696008_ContractInfoList extends React.Component {
  static propTypes = {
    Li_MedicalExamCourse: PropTypes.any,

    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);

    // document.title = '契約情報一覧';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },

      isLoadingTable: false,
      dataSource: []
    };
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
      <div className="contract-info-list">
        <Card title="契約情報一覧">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered
            scroll={{x: 750}}
            rowKey={(record) => record.id}
          >
            <Table.Column title="種別" dataIndex="Expression_5" width={60}
              render={(value, record, index) => {
                return (
                  <div style={{
                    color: Color(record.Expression_6)?.Foreground,
                    background: Color(record.Expression_6)?.Background
                  }}>
                    {value}
                  </div>
                )
              }} />
            <Table.Column title="団体名" dataIndex="W3_option" width={190}
              render={(value, record, index) => {
                return (
                  <Tooltip title={record.Expression_7}>
                    <div>{value}</div>
                  </Tooltip>
                )
              }} />
            <Table.Column title="開始日" dataIndex="contract_start_date_on" width={90}
              render={(value, record, index) => {
                return (
                  <div>{value === '0000/00/00' ? '' : value}</div>
                )
              }} />
            <Table.Column title="番号" dataIndex="contract_number" width={40}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: "right" }}>{value === 0 ? '' : value}</div>
                )
              }} />
            <Table.Column title="略称" dataIndex="contract_short_name"
              render={(value, record, index) => {
                return (
                  <Tooltip title={record.Expression_8}>
                    <div>{value}</div>
                  </Tooltip>
                )
              }} />
            <Table.Column title="金額" dataIndex="W3_person_3_total" width={80}
              render={(value, record, index) => {
                return (
                  <div style={{ textAlign: "right" }}>{number_format(value)}</div>
                )
              }} />
            <Table.Column title="最新" dataIndex="Lainspect" width={40}
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(211)?.Foreground }}>{value}</div>
                )
              }} />
            <Table.Column width={55}
              render={(value, record, index) => {
                return (
                  <Button type='primary' size='small'
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: '90%',
                          component: (
                            <WS0605127_ContractLineItemDisplay
                              Li_ContractType={record.contract_type}
                              Li_ContractOrgCode={record.contract_office_code}
                              Li_ContractStartDate={record.contract_start_date_on}
                              Li_ContractNum={record.contract_number}
                              onFinishScreen={(output) => {

                                this.closeModal()
                              }}
                            />),
                        },
                      }) 
                    }}
                  >契約照会</Button>
                )
              }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2696008_ContractInfoList);
