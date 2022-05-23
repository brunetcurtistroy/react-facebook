import React from "react";
import { connect } from "react-redux";

import { Card, Table, Row, Col, Button} from "antd";
import RadiographyFindingInputAction from "redux/InputBusiness/RadiographyFindingInput/JudgeSelectQuerySub.action"

class WS1868001_JudgeSelectQuerySub extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '判定選択照会 SUB';

    this.state = {
      selectedRowTableFirst: {},
      isLoadingForm: true,
      dataSource: [],
      rowSelect: {}
    };
  }

  handleSelectRowsTableFirst = selectedRowTableFirst => {
    this.setState({ rowSelect:selectedRowTableFirst[0] });
  };
  componentDidMount(){
    this.getListData();
  }
  getListData(){
    this.setState({ isLoadingForm: true });
    const data={
      Li_JudgeLevel: this.props.Li_JudgeLevel
    }
    RadiographyFindingInputAction.getListDataAction(data)
      .then((res) => {
        if (res) {
          this.setState({ dataSource: res });
        }
      })
      .finally(() => {
        this.setState({ isLoadingForm: false });
      });

  }

  render() {
    const { selectedRowTableFirst } = this.state

    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst
    }
    return (
      <div className="judge-select-query-sub">
        <Card title="判定選択照会 SUB">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoadingForm}
            pagination={false}
            // rowSelection={{ type: "radio", ...rowSelectionTableFirst }}
            rowKey={(record) => record.interpretation_judgment_result}
            className="mb-3"
            // onRow={(record, index) => ({
            //   onClick: e => {
            //     this.setState({ rowSelect: record });
            //   }
            // })}
          >
            <Table.Column title="判定" dataIndex="interpretation_judgment_result"  />
            <Table.Column title="名称" dataIndex="judgment_name"  />
            <Table.Column  
                render={(value, record) => {
                  return (
                    <Button type="primary"
                      onClick={() => {
                        if (this.props.onFinishScreen) {
                          this.props.onFinishScreen({
                            Lo_interpretation_judgment_result: record.interpretation_judgment_result,
                            Lo_judgment_name: record.judgment_name,
                          });
                        }
                      }}
                    >選択</Button>
                  )
                }} />
          </Table>
          {/* <Row gutter={24}>
            <Col span={24}>
              <Button  type="primary" style={{ float: "right" }}>選択</Button>
            </Col>
          </Row> */}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1868001_JudgeSelectQuerySub);
