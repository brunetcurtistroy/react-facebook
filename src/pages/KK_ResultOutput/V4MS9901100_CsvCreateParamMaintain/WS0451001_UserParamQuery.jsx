import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Button } from "antd";
import UserParamQueryAction from "redux/ResultOutput/CsvCreateParamMaintain/UserParamQuery.action";

class WS0451001_UserParamQuery extends React.Component {

  static propTypes = {
    Lio_Format: PropTypes.any,
    Li_Displayed: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'ユーザーパラメータ照会';

    this.state = {
      dataSource: [],
      isLoadingTable: false
    };
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getData()
    }
  }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  getData() {
    let params = {
      Lo_Format: this.isEmpty(this.props.Lio_Format) ? '' : this.props.Lio_Format
    }
    this.setState({ isLoadingTable: true })
    UserParamQueryAction.getListData(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res.Result : [],
          isLoadingTable: false
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  render() {
    return (
      <div className="user-param-query">
        <Card title="ﾕｰｻﾞｰﾊﾟﾗﾒｰﾀ照会">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered
            rowKey={(record) => record.id}
            scroll={{ x: 300 }}
          >
            <Table.Column title="ﾌｫｰﾏｯﾄ" dataIndex="format" width={150} />
            <Table.Column title="名称" dataIndex="remarks" />
            <Table.Column width={70} align='center'
              render={(value, record, index) => {
                return (
                  <Button size="small" type="primary"
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          Lio_Format: record.format,
                          recordData: record
                        });
                      }
                    }}>
                    選択
                  </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0451001_UserParamQuery);
