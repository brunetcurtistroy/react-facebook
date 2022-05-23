import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, } from "antd";
import Color from "constants/Color";

class WS0356005_CategoryYouAreUsing extends React.Component {
  static propTypes = {
    Li_SiteClassify: PropTypes.any,

    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);

    // document.title = '使用しているカテゴリ';

    this.state = {
      dataSource: [{ id: 1, category_code: 12345, category_name: '部位分類検索・照会' }],
      isLoadingTable: false
    };
  }

  render() {
    return (
      <div className="category-you-are-using">
        <Card title="使用しているカテゴリ">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered
            scroll={{ x: 300 }}
            rowKey={(record) => record.id}
          >
            <Table.Column title="ｺｰﾄﾞ" dataIndex="category_code" width={70}
              render={(value, record, index) => {
                return (
                  <div style={{
                    textAlign: 'right',
                    color: Color(record.Expression_3)?.Foreground
                  }}
                  >{value === 0 ? '' : value}</div>
                )
              }} />
            <Table.Column title="ｶﾃｺﾞﾘ名称" dataIndex="category_name"
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.Expression_3)?.Foreground }}
                  >{value}</div>
                )
              }} />
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0356005_CategoryYouAreUsing);
