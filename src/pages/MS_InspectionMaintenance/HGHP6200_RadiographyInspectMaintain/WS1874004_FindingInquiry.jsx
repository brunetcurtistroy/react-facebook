import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Row, Col, Button } from "antd";

const dataSource = [
  { id: 1, site_classification_code: '5', site_classification_name: '30' },
  { id: 2, site_classification_code: '51', site_classification_name: '40' }]
const dataSource2 = [{ id: 1, findings_code: '5Z', search_short_name: '30', findings_name: '60', judgment_value: '3' }]
class WS1874004_FindingInquiry extends React.Component {
  static propTypes = {
    Lo_SiteClassify: PropTypes.any,
    Li_Division: PropTypes.any,
    Li_InspectClassifyCode: PropTypes.any,
    Li_SiteClassifyCode: PropTypes.any,
    Lo_FindingsClassifyCode: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);
    // document.title = '所見照会';
    this.state = {
      selectedRows: [dataSource[0]],
      selectedRowKeys: [dataSource[0].id],
      tableIndex: 0,
    };
  }
  TableFindingInquiry() {
    return (
      <Table dataSource={dataSource}
        bordered={true}
        rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
        size="small"
        scroll={{ y: 500 }}
        rowKey={(record) => record.id}
        pagination={false}
        loading={false}
        onRow={(record, index) => {
          return {
            onClick: () => {
              const selected = record;
              this.setState({
                selectedRowKeys: [selected.id],
                selectedRows: [selected],
                tableIndex: index,
              })
            },
          };
        }}
      >
        <Table.Column width={90} title="ｺｰﾄﾞ" dataIndex="site_classification_code"
          render={(value, record, index) => {
            return (<div style={{ textAlign: 'right' }}><span>{record?.site_classification_code}</span></div>)
          }} />
        <Table.Column title="部位分類名称" dataIndex="site_classification_name" />
      </Table>)
  }
  TableFindingTable() {
    return (
      <Table
        bordered={true}
        dataSource={dataSource2}
        size="small"
        loading={false}
        rowKey={(record) => record.id}
        pagination={false}
        scroll={{ y: 500 }}
      >
        <Table.Column title="ｺｰﾄﾞ" dataIndex="findings_code"
          width={90}
          render={(value, record, index) => {
            return (<div style={{ textAlign: 'right' }}><span>{record?.findings_code}</span></div>)
          }}
        />
        <Table.Column width={180} title="検索略名" dataIndex="search_short_name" />
        <Table.Column title="所見名称" dataIndex="findings_name" />
        <Table.Column width={160} title="判定値" dataIndex="judgment_value" />

      </Table>
    )
  }
  onSubmit() {
    const {onFinishScreen} = this.props;
    if(onFinishScreen) {
      onFinishScreen({})
    }

  }
  render() {
    return (
      <div className="finding-inquiry">
        <Card title="所見照会">
          <Row gutter={24}>
            <Col span={8} style={{ textAlign: 'center' }}>【 部位分類 】</Col>
            <Col span={16} style={{ textAlign: 'center' }}>【 所 見 】</Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              {this.TableFindingInquiry()}
            </Col>
            <Col span={16}>
              {this.TableFindingTable()}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={20}></Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Button onClick={() => this.onSubmit()} type="primary">選択</Button></Col>
          </Row>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1874004_FindingInquiry);
