import React from "react";
import { connect } from "react-redux";

import { Card, Table, Button } from "antd";
import OfficeInquiryAction from "redux/ResultOutput/ResultsTblCollectOutput/SetupResultTblCollectOutput/WS1527022_OfficeInquiry/OfficeInquiry.action.js";

class WS1527022_OfficeInquiry extends React.Component {
  constructor(props) {
    super(props);

    // document.title = '事業所照会';

    this.state = {
      dataSource:[],
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true,
        pageSizeOptions: [10, 20, 50, 100]
      },
    };
  }
  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.setState({ isLoading: true })
    OfficeInquiryAction.GetListData()
      .then(res => {
        let data = res.data.map(item=>({
          ...item,
          branch_store_code: item.branch_store_code === 0 ? "" : item.branch_store_code
        }));
        this.setState({ dataSource: data })
      })
      .finally(() => this.setState({ isLoading: false }))
  }
  render() {
    return (
      <div className="office-inquiry">
        <Card title="事業所照会">
          <Table
            dataSource={this.state.dataSource}
            loading={false}
            pagination={{
              ...this.state.pagination,
              hideOnSinglePage: this.state.dataSource?.length > 10 ? false : true,
            }}
            bordered={true}
            rowKey={(record) => record.id}
          >
           <Table.Column title="コード" dataIndex="office_code" width={80} align="right"  />
            <Table.Column title="支社店" dataIndex="branch_store_code" width={80}  align="right"  />
            <Table.Column title="事　業　所　名" dataIndex="office_kanji_name"  />
            <Table.Column width={100} align="center"
              render={(value, record) => (
                <Button size="small" type="primary"  onClick={() => {
                  this.props.onFinishScreen({
                    office_code: record.office_code,
                    v4_branch_store_code: record.branch_store_code,
                    recordData: record,
                  });
                }}>選択</Button>
              )} />

          </Table>
          <br></br>
          <Button type="primary" style={{float: 'right'}}
            onClick={() => { }} >照会</Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1527022_OfficeInquiry);
