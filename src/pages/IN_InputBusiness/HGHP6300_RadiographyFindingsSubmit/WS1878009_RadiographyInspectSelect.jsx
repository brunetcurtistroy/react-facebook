import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Button, message } from "antd";
import RadiographyFindingsSubmitAction from "redux/InputBusiness/RadiographyFindingInput/RadiographyFindingsSubmit.action"

class WS1878009_RadiographyInspectSelect extends React.Component {
  static propTypes = {
    Lio_InterpretationInspectItemCo: PropTypes.any,
    onClickedSelect: PropTypes.func,

  };

  constructor(props) {
    super(props);

    // document.title = '読影検査選択';

    this.state = {
      dataSource: [],
      isLoading: false,
      selectedRow: { visit_date_on: "2019/01/01", visit_course: "T-09" },
      initValue: {
        id: 0,
        interpretation_exam_item_code: '',
        interpretation_exam_name: ''
      }
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getAllData()
    }
  }
  componentDidMount() {
    this.getAllData()
  }
  getAllData() {
    this.setState({ isLoading: true });
    RadiographyFindingsSubmitAction.getRadiographyInspectSelect().then(res => {
      const data = res ? res : [];
      this.setState({ dataSource: data });
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => { this.setState({ isLoading: false }); });

  }
  render() {
    return (
      <div className="radiography-inspect-select">
        <Card title="読影検査選択">
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
            size="small"
          >
            <Table.Column title="読影ｺｰﾄﾞ" dataIndex="interpretation_exam_item_code" />
            <Table.Column title="名称" dataIndex="interpretation_exam_name" />
            <Table.Column title="" render={(item, record, index) => (
              <div  style={{textAlign: "center"}}>
                  <Button type="primary"  onClick={() => {
                const { onFinishScreen } = this.props;
                const selectedData = {
                  id: record.id,
                  interpretation_exam_item_code: record.interpretation_exam_item_code,
                  interpretation_exam_name:record.interpretation_exam_name,
                }
                if (onFinishScreen) {
                  onFinishScreen({
                    ...selectedData
                  })
                }
              }}>選択</Button>
              </div>
            
            )} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1878009_RadiographyInspectSelect);
