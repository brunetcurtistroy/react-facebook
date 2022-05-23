import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Table, Modal, Button, Input, message, Select } from "antd";
import WS0344001_SupplementalInfoSetting from 'pages/BS_BasicInfo/V4MS0001000_InsurerInfoMaintain/WS0344001_SupplementalInfoSetting.jsx';
import VisitsSupplementWkAction from 'redux/ReservationBusiness/PersonalReserveProcess/VisitsSupplementWk.actions'
class WS0392005_VisitsSupplementWk extends React.Component {
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Lio_Remarks: PropTypes.any,
    onFinishScreen: PropTypes.func,
  }
  constructor(props) {
    super(props);

    // document.title = '受診補足WK';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isloading: false,

      dataSource: [],

      StsDirectInput: []
    };
  }

  componentDidUpdate(preV) {
    if (this.props !== preV) {
      this.setState({Lio_Remarks: this.props.Lio_Remarks ? this.props.Lio_Remarks : ''})
      this.GetIndex()
    }
  }

  componentDidMount() {
    this.setState({Lio_Remarks: this.props.Lio_Remarks ? this.props.Lio_Remarks : ''})
    this.GetIndex()
  }

  GetIndex() {
    this.setState({ isloading: true })
    let data = {
      ReserveNum: this.props.Li_ReserveNum ? this.props.Li_ReserveNum : '',
      Lio_Remarks: this.props.Lio_Remarks ? this.props.Lio_Remarks : ''
    }
    VisitsSupplementWkAction.GetIndex(data)
      .then(res => {
        let InputCheck = []
        let datas = res ? res.VisitSupplementWK : []
        datas.forEach(x => {
          InputCheck.push(true)
        })

        this.setState({
          dataSource: datas,
          isloading: false,
          StsDirectInput: InputCheck
        })

      })
      .catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      })
      .finally(() => this.setState({ isloading: false }))
  }

  UpdateContent(value, record, index) {
    // this.setState({ isloading: true })
    let data = {
      ReserveNum: this.props.Li_ReserveNum ? this.props.Li_ReserveNum : '',
      Content: value,
      item_id: record.item_id
    }

    let datas = [...this.state.dataSource]
    datas[index]['Content'] = value;

    this.setState({
      dataSource: datas
    });

    VisitsSupplementWkAction.UpdateContent(data)
      .then(res => {
      })
      .catch(error => {
        const res = error.response;
        if (!res || res.data || res.data.message) {
          message.error('エラーが発生しました');
          return;
        }
      })
    // .finally(() => this.setState({ isloading: false }))
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  ShowWS0344001_SupplementalInfoSetting() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: true,
        width: 1500,
        component: (
          <WS0344001_SupplementalInfoSetting
            Li_IdentifyChar={"MAST4"}
            onFinishScreen={(output) => {
              this.closeModal()
            }}
          />
        ),
      },
    });
  }
  render() {
    return (
      <div className="visits-supplement-wk background-th">
        <Card title='受診補足WK'>
          <Table
            size="small"
            dataSource={this.state.dataSource}
            loading={this.state.isloading}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
          >
            <Table.Column title="項目" width={250} dataIndex="item"
              render={(value, record, index) => {
                return (
                  <div style={{ background: '#1C66B9', marginBottom: '0px', color: 'white', textAlign: 'center', width: '100%', height: '27px' }}
                    onDoubleClick={() => {
                      let stsInput = [...this.state.StsDirectInput]
                      stsInput[index] = !this.state.StsDirectInput[index]
                      this.setState({ StsDirectInput: stsInput })
                    }}>
                    {value}
                  </div>
                )
              }} >
            </Table.Column>

            <Table.Column title="内容" dataIndex="Content"
              render={(value, record, index) => {
                return (
                  <div>
                    {this.state.StsDirectInput[index] ?
                      <Input value={record.Content} style={{ width: '100%' }}
                        onChange={(e) => this.UpdateContent(e.target.value, record, index)} >
                      </Input>
                      :
                      <Select value={record.Content} style={{ width: '100%' }}
                        onChange={(e) => this.UpdateContent(e, record,)} >
                        {record?.ContentCombobox?.map(value => (
                          <Select.Option key={'ContentCombobox-' + Math.random()} value={value.LinkedField}>{value.DisplayField}</Select.Option>
                        ))}
                      </Select>
                    }
                  </div>
                )
              }}
            >
            </Table.Column>
          </Table>

          <Input.TextArea defaultValue={this.state.Lio_Remarks} row={3} maxLength={80} style={{ marginTop: "10px" }}
            onChange={(e) => {
              this.setState({
                Lio_Remarks: e.target.value
              })
            }} />

          <div style={{ marginTop: 15, textAlign: 'right' }}>
            <Button type="primary"
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 1500,
                    component: (
                      <WS0344001_SupplementalInfoSetting
                        Li_IdentifyChar={"MAST4"}
                        onFinishScreen={(output) => {
                          this.closeModal()
                        }}
                      />
                    ),
                  },
                });
              }}
            >設　定</Button>
          </div>
        </Card>
        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0}}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0392005_VisitsSupplementWk);
