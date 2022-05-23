import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Button } from "antd";
import StyleQueryAction from "redux/ResultOutput/CommunicationRosterOutput/StyleQuery.action";

class WS0811004_StyleQuery extends React.Component {
  static propTypes = {
    onFinishScreen: PropTypes.func
  }

  constructor(props) {
    super(props);

    // document.title = '様式照会';

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

  getData() {
    this.setState({ isLoadingTable: true })
    StyleQueryAction.getData()
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoadingTable: false
        })
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  render() {
    return (
      <div className="style-query">
        <Card title="様式照会">
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingTable}
            pagination={true}
            bordered
            rowKey={(record) => record.id}
            scroll={{x: 500}}
          >
            <Table.Column title="様式" dataIndex="style_code" width={90} />
            <Table.Column title="様式名称" dataIndex="format_name" />
            <Table.Column width={70} align='center'
              render={(text, record, index) => {
                return <div>
                  <Button type="primary"
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          recordData: record
                        })
                      }
                    }}
                  >選択</Button>
                </div>;
              }}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0811004_StyleQuery);
