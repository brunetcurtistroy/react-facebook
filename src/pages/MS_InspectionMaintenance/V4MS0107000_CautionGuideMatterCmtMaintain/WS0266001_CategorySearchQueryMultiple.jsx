import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Button, Space } from "antd";

class WS0266001_CategorySearchQueryMultiple extends React.Component {
  constructor(props) {
    super(props);

    // document.title = "カテゴリ検索・照会(複数)";

    this.state = {
      dataSource: [
        {
          id: 1,
          category_code: 1,
          category_name: "abc",
        },
        {
          id: 2,
          category_code: 1,
          category_name: "abc",
        },
      ],
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      isLoadingTable: false,
    };
  }

  render() {
    return (
      <div className="category-search-query-multiple">
        <Card title="カテゴリ検索・照会(複数)">
          <Table
            dataSource={this.state.dataSource}
            loading={false}
            pagination={this.state.isLoadingTable}
            rowKey={(record) => record.id}
          >
            <Table.Column title="ｺｰﾄﾞ" dataIndex="category_code" />
            <Table.Column title="名  称" dataIndex="category_name" />
          </Table>
          <Space
            style={{
              float: "left",
              marginTop: "1em",
              marginRight: "10px",
              width: "100%",
              display: "flex",
              marginBottom: "15px",
              justifyContent: "flex-end",
            }}
          >
            <Button type="primary">保守</Button>
            <Button type="primary">選択</Button>
          </Space>
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
)(WS0266001_CategorySearchQueryMultiple);
