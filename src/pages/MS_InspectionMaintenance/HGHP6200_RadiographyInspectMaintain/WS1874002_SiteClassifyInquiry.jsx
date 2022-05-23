import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Table, Row, Col, Button } from "antd";
const dataSource = [{id: 1, findings_classification_i: '10', site_name: '80'}]
class WS1874002_SiteClassifyInquiry extends React.Component {
  static propTypes = {
    Li_Division: PropTypes.any,
    Li_InspectClassifyCode: PropTypes.any,
    Lo_FindingsClassifyCode: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };
  constructor(props) {
    super(props);

    // document.title = '部位分類照会';

    this.state = {
    };
  }
  TableSiteClassifyInquiry() {
    return (
      <Table dataSource={dataSource}
        bordered={true}
        size="small"
        scroll={{ y: 500 }}
        rowKey={(record) => record.id}
        pagination={false}
        loading={false}
      >
        <Table.Column width={100} title="部位分類" dataIndex="findings_classification_i"
          render={(value, record, index) => {
            return (<div><span>{record?.findings_classification_i}</span></div>)
          }} />
        <Table.Column title="部位分類名称" dataIndex="site_name" />
        <Table.Column width={100} title="" style={{ textAlign: 'center' }} 
        render={(value, record, index) => {
         return <div  style={{ textAlign: 'center' }}><Button onClick={() => this.onSubmit(record)} type="primary">選択</Button></div>
        }} />
      </Table>)
  }
  onSubmit(record) {
    const {onFinishScreen} = this.props;
    if(onFinishScreen) {
      onFinishScreen({Lo_FindingsClassifyCode: record?.findings_classification_i})
    }
  }
  render() {
    return (
      <div className="site-classify-inquiry">
        <Card title="部位分類照会">
          {this.TableSiteClassifyInquiry()}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1874002_SiteClassifyInquiry);
