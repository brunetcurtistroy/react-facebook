import React from "react";
import { connect } from "react-redux";

import { Card, Table, Form, Space } from "antd";
import { getDataInspectByPatternCategoryDisplayAction } from "redux/InspectionMaintenance/InspectItemInfoMaintain/InspectByPatternCategoryDisplay.actions";

class WS2716057_InspectByPatternCategoryDisplay extends React.Component {

  constructor(props) {
    super(props);

    // document.title = '検査別パターン・カテゴリ表示';

    this.state = {
      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      ScreenData: {},
      dataSource: [],
      isLoading: true,
      rowSelect: {}
    };
  }

  componentDidMount = () => {
    this.getDataInspectByPatternCategoryDisplay(this.props.Li_InspectCode);
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps !== this.props){
      this.getDataInspectByPatternCategoryDisplay(this.props.Li_InspectCode);
    }
  }

  getDataInspectByPatternCategoryDisplay = (params) => {
    console.log(params)
    this.setState({isLoading: true})
    getDataInspectByPatternCategoryDisplayAction({test_item_code: params})
      .then(res => {
        this.setState({
          dataSource: res.data.data,
          ScreenData: res.data.ScreenData
        })
      })
      .catch()
      .finally(() => this.setState({isLoading: false}))
  }

  render() {
    return (
      <div className="inspect-by-pattern-category-display">
        <Card title="検査別パターン・カテゴリ表示">
          <Form ref={this.formRef}>
            <Form.Item label='検査'>
              <Space>
                <span>{this.state.ScreenData?.Li_InspectCode}</span>
                <span>{this.state.ScreenData?.exam_name}</span>
              </Space>
            </Form.Item>
            <Table
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={this.state.pagination}
              rowKey={(record) => record.id}
            >
              <Table.Column title='ﾊﾟﾀｰﾝｺｰﾄﾞ' dataIndex='pattern_code'/>
              <Table.Column title='パターン名称' dataIndex='pattern_name'/>
              <Table.Column title='ｶﾃｺﾞﾘｺｰﾄﾞ' dataIndex='category_code'/>
              <Table.Column title='カテゴリ名称' dataIndex='category_name'/>
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2716057_InspectByPatternCategoryDisplay);
