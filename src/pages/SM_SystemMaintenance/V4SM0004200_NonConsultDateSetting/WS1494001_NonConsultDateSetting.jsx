import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Button, Modal } from "antd";

import WS1494003_CollectSetting from 'pages/SM_SystemMaintenance/V4SM0004200_NonConsultDateSetting/WS1494003_CollectSetting.jsx';
import WS1494006_SingleSetting from 'pages/SM_SystemMaintenance/V4SM0004200_NonConsultDateSetting/WS1494006_SingleSetting.jsx';
import moment from "moment";

const btnStyle = {
  marginBottom: '15px',
  padding: '10px 25px',
  height: 'auto',
  width: '150px',
  borderRadius: '5px'
}
class WS1494001_NonConsultDateSetting extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '休診日設定';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
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

  onFinish(values) {}

  render() {
    return (
      <div className="non-consult-date-setting" style={{width: 350}}>
        <Card title="休診日設定">
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" style={btnStyle}
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 500,
                    component: (
                      <WS1494003_CollectSetting
                        onFinishScreen={(output) => {

                          this.closeModal()
                        }}
                      />),
                  },
                })
              }}
            >一括設定</Button>
            <br></br>
            <Button type="primary" style={btnStyle}
              onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 700,
                    component: (
                      <WS1494006_SingleSetting
                        Lio_Date={moment().format('YYYY/MM/DD')}
                        onFinishScreen={(output) => {

                          this.closeModal()
                        }}
                      />),
                  },
                })
              }}
            >個別設定</Button>
          </div>
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1494001_NonConsultDateSetting);
