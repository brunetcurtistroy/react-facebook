import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { InternalInspectItemSearchQueryAction } from "redux/InspectionMaintenance/InspectItemInfoMaintain/InternalInspectItemSearchQuery.action";

import { Card, Form, Input, Button, Table, } from "antd";

class WS0253001_InternalInspectItemSearchQuery extends React.Component {
  static propTypes = {
    Lio_InternalInspectCode: PropTypes.any,
    Li_Select: PropTypes.any,
    Li_SearchChar: PropTypes.any,
    onFinishSceen: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    // document.title = '内部検査項目検索・照会';

    this.state = {
      isLoading: true,
      data: [],
      selectedRows: {},
      initParams: {
        Lio_InternalInspectCode: '',
        Li_Select: '',
        SearchAbbreviation:''
      }
    };
  }

  componentDidMount = () => {
    this.callAPILoadData();
  }

  callAPILoadData = (params) => {
    this.setState({isLoading: true})
    InternalInspectItemSearchQueryAction(params)
      .then((res)=> {
        this.setState({data: res});
      })
      .finally(() => this.setState({isLoading: false}))
  }

  handleSearch = (e) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        SearchAbbreviation: e.target.value,
      }
    }, () => this.callAPILoadData(this.state.initParams));
  }

  handleButton = () => {
    if(this.props.onFinishScreen){
      this.props.onFinishScreen({Lio_InternalInspectCode:this.state.selectedRows.internal_exam_code,recordData: this.state.selectedRows});
    };
  }

  render() {
    const {  data, pagination } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRow) => {
        this.setState({selectedRows: selectedRow[0]})
      }
    }
    return (
      <div className="internal-inspect-item-search-query">
        <Card title="内部検査項目検索・照会">
          <Form ref={this.formRef} >
            <Form.Item name="SearchAbbreviation" label="検索略称">
              <Input onChange={this.handleSearch}/>
            </Form.Item>

            <Table rowSelection={{ type: "radio", ...rowSelection }} pagination={pagination}
              dataSource={data} rowKey={record => record.id}
            >
              <Table.Column title="内部コード" dataIndex="internal_exam_code" />
              <Table.Column title="略名" dataIndex="exam_short_name" />
              <Table.Column title="名称" dataIndex="exam_name" />
            </Table>

            <Form.Item style={{float: 'right', marginTop: '1rem'}}>
              <Button type="primary" onClick={this.handleButton}>選択</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0253001_InternalInspectItemSearchQuery);
