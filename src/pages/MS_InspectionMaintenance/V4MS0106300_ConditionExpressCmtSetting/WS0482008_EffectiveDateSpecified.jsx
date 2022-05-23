import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";

import { Card, Form, Button, DatePicker } from "antd";
import Modal from "antd/lib/modal/Modal";
import WS0482010_EffectiveDateSelect from "./WS0482010_EffectiveDateSelect";
import  ModalDraggable  from "components/Commons/ModalDraggable";

class WS0482008_EffectiveDateSpecified extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "適用日指定";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  onFinish(values) {}

  closeModal = () => {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  };

  render() {
    return (
      <div className="effective-date-specified">
        <Card title="適用日指定">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item
              name="EffectiveDateChar"
              label="適用日"
              onDoubleClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 400,
                    component: (
                      <WS0482010_EffectiveDateSelect
                        Lio_AdoptionDate={""}
                        onFinishScreen={({}) => {
                          this.closeModal();
                        }}
                      />
                    ),
                  },
                });
              }}
            >
              <VenusDatePickerCustom formRefDatePicker={this.formRef} format="YYYY/MM/DD" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" style={{ float: "right" }}>
                選択
              </Button>
            </Form.Item>
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0482008_EffectiveDateSpecified);
