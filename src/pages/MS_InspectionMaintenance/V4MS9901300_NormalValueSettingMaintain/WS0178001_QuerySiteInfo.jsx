import React from "react";
import { connect } from "react-redux";
import  ModalDraggable  from "components/Commons/ModalDraggable";

import { Card, Form, Input, Button, Table, Space,Modal } from "antd";
import WS0350001_SiteFindingsMaintainSub from "./WS0350001_SiteFindingsMaintainSub";

class WS0178001_QuerySiteInfo extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = "V4-VNS71100:照会:部位情報";

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
      <div className="query-site-info">
        <Card title="V4-VNS71100:照会:部位情報">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="ShortNameSearch" label="検索">
              <Input type="text" />
            </Form.Item>
          </Form>

          <Table
            dataSource={[
              {
                id: 1,
                site_code: "site_code",
                search_short_name: "search_short_name",
                site_name: "site_name",
              },
            ]}
          >
            <Table.Column title="部位ｺｰﾄﾞ" dataIndex="site_code" key="" />
            <Table.Column
              title="検索略称"
              dataIndex="search_short_name"
              key=""
            />
            <Table.Column title="部位名称" dataIndex="site_name" key="" />
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
                    onClick={() => {
                      this.setState({
                        childModal: {
                          ...this.state.childModal,
                          visible: true,
                          width: "90%",
                          component: <WS0350001_SiteFindingsMaintainSub />,
                        },
                      });
                    }}
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
)(WS0178001_QuerySiteInfo);
