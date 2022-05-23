import React from "react";
import { connect } from "react-redux";

import { Card, Table,Form,Button } from "antd";

class WS1873002_SiteClassifyInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '部位分類照会';

    this.state = {
    };
  }

  render() {
    return (
      <div className="site-classify-inquiry">
        <Card title="部位分類照会">
          <Table
            dataSource={[]}
            loading={false}
            pagination={false}
            rowKey={(record) => record.id}
          >
            <Table.Column title="部位分類" dataIndex="site_classification_io" key="" />
            <Table.Column title="部位分類名称" dataIndex="site_name" key="" />

          </Table>
          <Form.Item style={{textAlign: 'end'}}>
              <Button  type="primary">実行</Button>
            </Form.Item>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1873002_SiteClassifyInquiry);
