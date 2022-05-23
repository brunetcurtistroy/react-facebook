import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StyleQueryAction from 'redux/InputBusiness/NotInputCheckCategory/StyleQuery.action'

import { Card, Table, Form, Input, Button, } from "antd";

class WS3020054_StyleQuery extends React.Component {
  static propTypes = {
    Lio_ParentCode: PropTypes.any,

  };

  constructor(props) {
    super(props);

    // document.title = '様式照会';

    this.state = {
      dataSource: [],
    };

  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.setState({ isLoading: true })
    StyleQueryAction.GetListData()
      .then(res => {
        this.setState({ dataSource: res })
      })
      .finally(() => this.setState({ isLoading: false }))
  }
  render() {

    return (
      <div className="style-query">
        <Card title="様式照会">
          <Table
            dataSource={this.state.dataSource}
            loading={false}
            pagination={false}
            rowKey={(record) => record.key}
            bordered={true}
          >
            <Table.Column title="様式" dataIndex="parent_code" width={100} align="center"
            />
            <Table.Column title="様式名称" dataIndex="style_name"
            />
            <Table.Column width={100} align="center"
              render={(value, record) => (
                <Button size="small" type="primary"  onClick={() => {
                  this.props.onFinishScreen({
                    Lio_ParentCode: record.parent_code,
                    recordData: record,
                  });
                }}>選択</Button>
              )} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS3020054_StyleQuery);
