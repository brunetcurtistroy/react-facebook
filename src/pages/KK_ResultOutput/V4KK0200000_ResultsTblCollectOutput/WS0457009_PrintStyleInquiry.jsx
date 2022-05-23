import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Button } from "antd";

class WS0457009_PrintStyleInquiry extends React.Component {

  static propTypes = {
    Lo_StyleCode: PropTypes.any,
    Lo_FormatName: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '印刷様式照会';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      selectedRows: []
    };
  }

  closeModal() {
    this.setState({
      childModal: {
        ...this.state.childModal,
        visible: false,
      },
    });
  }

  render() {
    return (
      <div className="print-style-inquiry">
        <Card title="印刷様式照会">
          <Table
            dataSource={[]}
            loading={false}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            rowSelection={{
              type: 'radio',
              onChange: async (selectedRowKeys, selectedRows) => {
                await this.setState({
                  selectedRows: selectedRows
                })
              }
            }}
          >
            <Table.Column title="様式" dataIndex="style_code" key="" />
            <Table.Column title="様  式  名" dataIndex="format_name" key="" />
            <Table.Column align='center' width={70}
              render={(value, record, index) => {
                return (
                  <Button type="primary" style={{ float: 'right' }}
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          Lo_StyleCode: record.style_code,
                          Lo_FormatName: record.format_name,
                        });
                      }
                    }}>選択</Button>
                )
              }}
            />

          </Table>
          <br></br>

        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0457009_PrintStyleInquiry);
