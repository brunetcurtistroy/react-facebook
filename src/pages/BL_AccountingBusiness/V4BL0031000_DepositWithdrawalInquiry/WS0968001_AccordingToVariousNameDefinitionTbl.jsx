import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Card, Table } from "antd";

class WS0968001_AccordingToVariousNameDefinitionTbl extends React.Component {
  static propTypes = {
    Li_Classify: PropTypes.any,
    Lo_Code: PropTypes.any,
    Lo_Name: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = "請求各種名定義テーブル";

    this.state = {
      dataSource: [{id: 1, code: 100, name: 'test'}],
    };
  }

  render() {
    return (
      <div className="according-to-various-name-definition-tbl">
        <Card title="請求各種名定義テーブル">
          <Table
            dataSource={this.state.dataSource}
            loading={false}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
          >
            <Table.Column title="分類" dataIndex="cd_classification" key="" />
            <Table.Column title="コード" dataIndex="code" key="" />
            <Table.Column title="名称" dataIndex="name" key="" />
            <Table.Column title="計上区分" dataIndex="sumup_division" key="" />
            <Table.Column width={100}
              render={(value, record) => {
                return (
                  <Button
                    type="primary"
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          Lo_Code: record.code,
                          Lo_Name: record.name,
                        });
                      }
                    }}
                  >
                    選択
                  </Button>
                );
              }}
            />
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0968001_AccordingToVariousNameDefinitionTbl);
