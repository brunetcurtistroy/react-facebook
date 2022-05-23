import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RadiographyFindingsSubmitAction from "redux/InputBusiness/RadiographyFindingInput/RadiographyFindingsSubmit.action"

import { Card, Form, Input, Table, message } from "antd";

class WS1881003_RadiographyContentsOfQuery extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    Li_ReserveNum: PropTypes.any,
    Li_InterpretationInspectItemCod: PropTypes.string,
    Li_DoctorCode: PropTypes.number,
  }
  constructor(props) {
    super(props);

    // document.title = '読影内容照会';

    this.state = {
      selectedRowTableFirst: [],
      isLoading: false,
      dataSource: []
    };
  }
  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      this.loadData()
    }
  }
  componentDidMount = ()  => {this.loadData()}
  loadData() {
    const params = {
      Li_ReserveNum: this.isEmpty(this.props.Li_ReserveNum) ? 0 : this.props.Li_ReserveNum,
      Li_InterpretationInspectItemCod: this.isEmpty(this.props.Li_InterpretationInspectItemCod) ? '' : this.props.Li_InterpretationInspectItemCod,
      Li_DoctorCode: this.isEmpty(this.props.Li_DoctorCode) ? 0 : this.props.Li_DoctorCode,
    }
    this.setState({ isLoading: true })
    RadiographyFindingsSubmitAction.getRadiographyContentsOfQuery(params).then(res => {
      const data = res;
      this.setState({ dataSource: data && data.FindingsContent ? data.FindingsContent : []});
      this.setFormFieldValue('LeadershipMatters', data && data.LeadershipMatters ? data.LeadershipMatters : "")
    }).catch(error => {
      const res = error.response;
      if (!res || res.data || res.data.message) {
        message.error('エラーが発生しました');
        return;
      }
    }).finally(() => { this.setState({ isLoading: false }); });
  }
  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }
  onFinish(values) {

  }

  handleSelectRowsTableFirst = selectedRowTableFirst => {
    console.log(selectedRowTableFirst);
    this.setState({ selectedRowTableFirst });
  };

  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  render() {
    const { selectedRowTableFirst } = this.state

    const rowSelectionTableFirst = {
      selectedRowTableFirst,
      onChange: this.handleSelectRowsTableFirst
    }

    const dataSource = [
    ];

    return (
      <div className="radiography-contents-of-query">
        <Card title="読影内容照会">
          <Table
            pagination={false}
            dataSource={this.state.dataSource}
            rowKey={record => record.id}
            className="mb-2"
            bordered={true}
            rowSelection={{ type: "radio", ...rowSelectionTableFirst }}
          >
            <Table.Column title="連番" dataIndex="serial_number"  />
            <Table.Column title="部位" dataIndex="site_name"  />
            <Table.Column title="所見" dataIndex="findings_name"  />
            <Table.Column title="判定" dataIndex="judgement"  />

          </Table>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="LeadershipMatters"
            >
              <Input.TextArea readOnly type="text" rows={5} />
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1881003_RadiographyContentsOfQuery);
