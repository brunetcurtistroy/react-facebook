import React from "react";

import { Card, Modal, Button, List, Space, } from "antd";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import WS0920008_IntroduceLetterTargetCmtMaintain from "./WS0920008_IntroduceLetterTargetCmtMaintain";
import WS0922009_DepartmentMaster from "./WS0922009_DepartmentMaster";
import WS0922005_InspectNameMaster from "./WS0922005_InspectNameMaster";
import WS0922007_FindingsContentMaster from "./WS0922007_FindingsContentMaster";
import WS0922010_DayOfWeekBasedDeterminePhysicianMaster from "./WS0922010_DayOfWeekBasedDeterminePhysicianMaster";
import WS0922003_MedicalInstitutionsMaster from "./WS0922003_MedicalInstitutionsMaster";
import WS0922006_VictimNameMaster from "./WS0922006_VictimNameMaster";
import WS0922004_DoctorNameMaster from "./WS0922004_DoctorNameMaster";
import WS0922008_TreatmentContentMaster from "./WS0922008_TreatmentContentMaster";

class WS0919001_IntroduceLetterMasterMaintain extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '紹介状マスタ保守';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        afterClose: null,
        width: 0,
      },
    };
  }

  render() {
    return (
      <div className="introduce-letter-master-maintain">
        <Card title="紹介状マスタ保守">
          <List itemLayout="horizontal">
            <List.Item>
              <List.Item.Meta
                title="診療科"
                description="診療科の設定を行います"
              ></List.Item.Meta>
              <div><Button type="primary" onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 900,
                    component: (
                      <WS0922009_DepartmentMaster />
                    ),
                  },
                });
              }}>診療科</Button></div>
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title="コメント"
                description="紹介状を自動作成する設定を行います"
              ></List.Item.Meta>
              <div><Button type="primary" onClick={() => {
                this.setState({
                  childModal: {
                    ...this.state.childModal,
                    visible: true,
                    width: 900,
                    component: (
                      <WS0920008_IntroduceLetterTargetCmtMaintain />
                    ),
                  },
                });
              }}>コメント</Button></div>
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title="施設関係"
                description="医療機関や判定医の設定を行います"
              ></List.Item.Meta>
              <div>
                <Space>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 900,
                        component: (
                          <WS0922003_MedicalInstitutionsMaster />
                        ),
                      }
                    });
                  }}>医療機関</Button>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 900,
                        component: (
                          <WS0922004_DoctorNameMaster />
                        ),
                      },
                    });
                  }}>判定医</Button>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 900,
                        component: (
                          <WS0922010_DayOfWeekBasedDeterminePhysicianMaster />
                        ),
                      },
                    });
                  }}>曜日別</Button>
                </Space>
              </div>
            </List.Item>
            <List.Item>
              <List.Item.Meta
                title="返送内容"
                description="返送内容を登録する際に使用する、照会選択の設定"
              ></List.Item.Meta>
              <div>
                <Space>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 900,
                        component: (
                          <WS0922005_InspectNameMaster />
                        ),
                      },
                    });
                  }}>検査内容</Button>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 900,
                        component: (
                          <WS0922006_VictimNameMaster />
                        ),
                      },
                    });
                  }}>傷病名</Button>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 900,
                        component: (
                          <WS0922007_FindingsContentMaster />
                        ),
                      },
                    });
                  }}>所見内容</Button>
                  <Button type="primary" onClick={() => {
                    this.setState({
                      childModal: {
                        ...this.state.childModal,
                        visible: true,
                        width: 900,
                        component: (
                          <WS0922008_TreatmentContentMaster />
                        ),
                      },
                    });
                  }}>治療内容</Button>
                </Space>
              </div>
            </List.Item>
          </List>
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

export default WS0919001_IntroduceLetterMasterMaintain;
