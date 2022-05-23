import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Button, Form, Input } from "antd";
const dataSource = [{ id: 1, category_code: '5', category_name: '30', common_category_code: '50' }]
class WS0176001_QueryCategoryInfo extends React.Component {
  formRef = React.createRef();
  static propTypes = {
    _Dks050StartUpFlag: PropTypes.any,
    _Dks050GroupCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = 'V4-VNS70500:照会:カテゴリー情報';

    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      indexTable: 0
    };
  }

  componentDidMount() { }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) { }
  }
  onSelectEvent() { 
    //api
  }
  inspectGroupSettings() {
    //api
    // show new Screem
  }
  componentWillUnmount() { }
  render() {
    return (
      <div className="query-category-info">
        <Form ref={this.formRef}>
          <Card title="V4-VNS70500:照会:カテゴリー情報">
            <Table
              size="small"
              dataSource={dataSource}
              loading={false}
              pagination={false}
              bordered
              scroll={{y: 600}}
              rowKey={(record) => record.id}
              rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    this.setState({
                      selectedRows: [record],
                      selectedRowKeys: [record.id],
                      indexTable: rowIndex,
                    })
                  }
                };
              }}

            >
              <Table.Column title="コード" dataIndex="category_code"
                width={100}
                render={(value, record, index) => {
                  return <Form.Item>
                    <Input value={value} onDoubleClick={() =>
                      this.inspectGroupSettings()}>
                      </Input>
                  </Form.Item>
                }} />
              <Table.Column title="名　　称" dataIndex="category_name" />
              <Table.Column width={100} title="共通ｶﾃｺﾞﾘ" dataIndex="common_category_code"
                render={(value, record, index) => {
                  return <div style={{ textAlign: 'right' }}><span>{value}</span></div>
                }} />

            </Table>
            <div style={{ float: 'right', marginTop: '10px' }}>
              <Button onClick={() => this.onSelectEvent()} type="primary">確定</Button>
            </div>
          </Card>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0176001_QueryCategoryInfo);
