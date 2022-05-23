import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Button, Table, Modal, Space } from "antd";

class WS0179001_InquiryFindingInfo extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "V4-VNS71100:照会:所見情報";

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
    };
  }

  onFinish(values) {}

  render() {
    return (
      <div className="inquiry-finding-info">
        <Card title="V4-VNS71100:照会:所見情報">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="ShortNameSearch" label="検索">
              <Input type="text" />
            </Form.Item>
          </Form>

          <Table
            dataSource={[
              {
                id: 1,
                findings_code: "findings_code",
                search_short_name: "search_short_name",
                findings_name: "findings_name",
                judgment_value: "judgment_value",
              },
            ]}
          >
            <Table.Column title="所見コード" dataIndex="findings_code" key="" />
            <Table.Column
              title="検索略称"
              dataIndex="search_short_name"
              key=""
            />
            <Table.Column title="所見名称" dataIndex="findings_name" key="" />
            <Table.Column title="判定" dataIndex="judgment_value" key="" />
            <Table.Column
              title=""
              dataIndex=""
              render={(text, record, index) => (
                <Space>
                  <Button type="primary" size="small">
                    選　択
                  </Button>
                  <Button
                    type="primary"
                    // onClick={() => {
                    //   this.setState({
                    //     childModal: {
                    //       ...this.state.childModal,
                    //       visible: true,
                    //       width: "90%",
                    //       component: <WS0350001_SiteFindingsMaintainSub />,
                    //     },
                    //   });
                    // }}
                  >
                    設　定
                  </Button>
                </Space>
              )}
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

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0179001_InquiryFindingInfo);
