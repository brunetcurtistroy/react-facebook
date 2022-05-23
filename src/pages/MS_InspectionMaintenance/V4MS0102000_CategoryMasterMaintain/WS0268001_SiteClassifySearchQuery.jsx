import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Dropdown, Menu, Table, } from "antd";
import Color from "constants/Color";

class WS0268001_SiteClassifySearchQuery extends React.Component {
  static propTypes = {
    Lo_SiteClassifyCode: PropTypes.any,

    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);

    // document.title = '部位分類検索・照会';

    this.state = {
      dataSource: [{ id: 1, site_classification_code: 123, site_classification_name: '部位分類検索・照会' }],
      isLoadingTable: false
    };
  }

  selectRecord(record) {
    if (this.props.onFinishScreen) {
      this.props.onFinishScreen({
        Lo_SiteClassifyCode: record.site_classification_code,
        recordData: record
      })
    }
  }

  render() {
    return (
      <div className="site-classify-search-query">
        <Card title="部位分類検索・照会">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered
            scroll={{ x: 400 }}
            rowKey={(record) => record.id}
          >
            <Table.Column title="ｺｰﾄﾞ" dataIndex="site_classification_code" width={70}
              render={(value, record, index) => {
                return (
                  <div style={{
                    textAlign: 'right',
                    color: Color(record.Expression_3)?.Foreground
                  }}
                  >{value === 0 ? '' : value}</div>
                )
              }} />
            <Table.Column title="名　称" dataIndex="site_classification_name"
              render={(value, record, index) => {
                return (
                  <div style={{ color: Color(record.Expression_3)?.Foreground }}
                  >{value}</div>
                )
              }} />
            <Table.Column width={100} align='center'
              render={(value, record, index) => {
                return (
                  <div>
                    <Dropdown.Button
                      type="primary"
                      onClick={() => { this.selectRecord(record) }}
                      overlay={(
                        <Menu>
                          <Menu.Item type="primary" onClick={() => { }}>保　守</Menu.Item>
                        </Menu>
                      )}>
                      選択
                    </Dropdown.Button>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0268001_SiteClassifySearchQuery);
