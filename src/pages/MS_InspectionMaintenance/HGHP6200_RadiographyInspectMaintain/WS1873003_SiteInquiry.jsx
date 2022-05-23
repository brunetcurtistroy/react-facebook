import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Table, Row, Col, Button } from "antd";

const dataSource = [
  { id: 1, site_classification_code: '5', site_classification_name: '30' },
  { id: 2, site_classification_code: '51', site_classification_name: '40' }]
const dataSource2 = [
  {
    id: 1, site_code: '5', search_short_name: '30',
    site_name: '30', judgment_value: '3'
  },
  {
    id: 2, site_code: '5', search_short_name: '20',
    site_name: '2', judgment_value: '3'
  },
  {
    id: 3, site_code: '51', search_short_name: '35',
    site_name: '45', judgment_value: '3'
  }

]
class WS1873003_SiteInquiry extends React.Component {
  static propTypes = {
    Lo_SiteClassify: PropTypes.any,
    Li_SiteClassifyCode: PropTypes.any,
    Lo_FindingsClassifyCode: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = '部位照会';

    this.state = {
      selectedRows: [dataSource[0]],
      selectedRowKeys: [dataSource[0].id],
      tableIndex: 0,
      dataSource: [...dataSource],
      dataSource2: []
    };
  }
  componentDidMount() {
    this.getTableSiteTable()
  }
  getTableSiteTable() {
    let SiteTableDetail = dataSource2.filter(data => data.site_code === this.state.selectedRows[0].site_classification_code)
    this.setState({dataSource2: SiteTableDetail})
  }
  TableSiteInquiry() {
    return (
      <Table dataSource={this.state.dataSource}
        bordered={true}
        rowClassName={(record, index) => record.id === this.state.selectedRows[0]?.id ? 'table-row-light' : ''}
        size="small"
        scroll={{ y: 500 }}
        rowKey={(record) => record.id}
        pagination={false}
        loading={false}
        onRow={(record, index) => {
          return {
            onClick: async () => {
              const selected = record;
             await this.setState({
                selectedRowKeys: [selected.id],
                selectedRows: [selected],
                tableIndex: index,

              })
              await this.getTableSiteTable()
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
  TableSiteTable() {
    return (
      <Table
        bordered={true}
        dataSource={this.state.dataSource2}
        size="small"
        loading={false}
        rowKey={(record) => record.id}
        pagination={false}
        scroll={{ y: 500 }}
      >
        <Table.Column title="ｺｰﾄﾞ" dataIndex="site_code"
          width={90}
          render={(value, record, index) => {
            return (<div style={{ textAlign: 'right' }}><span>{record?.site_code}</span></div>)
          }}
        />
        <Table.Column width={180} title="検索略名" dataIndex="search_short_name" />
        <Table.Column title="部位名称" dataIndex="site_name" />

      </Table>
    )
  }
  onSubmit() {
    const { onFinishScreen } = this.props;
    if (onFinishScreen) {
      onFinishScreen({ Lo_SiteClassify: '' })
    }

  }
  render() {
    return (
      <div className="site-inquiry">
        <Card title="所見照会">
          <Row gutter={24}>
            <Col span={8} style={{ textAlign: 'center' }}>【 部位分類 】</Col>
            <Col span={16} style={{ textAlign: 'center' }}>【 部 位 】</Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              {this.TableSiteInquiry()}
            </Col>
            <Col span={16}>
              {this.TableSiteTable()}
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

export default connect(mapStateToProps, mapDispatchToProps)(WS1873003_SiteInquiry);
