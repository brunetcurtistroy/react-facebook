import React from "react";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, Table, } from "antd";
import { ReloadOutlined } from '@ant-design/icons';

import { debounce } from "lodash";

import ContractOfficeInfoInquirySubService from 'services/basicInfo/ContractInfoMaintain/ContractOfficeInfoInquirySubService';

/**
* @extends {React.Component<{Lo_OfficeCode:any, Lo_BranchStoreCode:any, Li_Type:any, onClickedSelect:Function}>}
*/
class WS0328001_ContractOfficeInfoInquirySub extends React.Component {
  static propTypes = {
    Lo_OfficeCode: PropTypes.any,
    Lo_BranchStoreCode: PropTypes.any,
    Li_Type: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '契約事業所情報照会';

    this.state = {
      PlanList: [],

      isLoadingList: false,
    };
  }

  componentDidMount() {
    this.loadPlanList();
  }

  loadPlanList = () => {
    this.setState({ isLoadingList: true });

    ContractOfficeInfoInquirySubService.getPlanList({
      Li_Type: this.props.Li_Type,
      KanaSearch: this.formRef.current.getFieldValue('KanaSearch'),
    })
      .then(res => {
        this.setState({
          PlanList: res.data,
        });
      })
      .catch(error => {

      })
      .finally(() => this.setState({ isLoadingList: false }))
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="contract-office-info-inquiry-sub">
        <Card title="契約事業所情報照会">
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Form.Item name="KanaSearch" label="検索">
              <Input onChange={debounce(this.loadPlanList, 300)} />
            </Form.Item>
          </Form>
          <Table
            dataSource={this.state.PlanList}
            rowKey={(record) => record.id}
            pagination={{ showQuickJumper: true, showSizeChanger: true, }}
            loading={this.state.isLoadingList}
          >
            <Table.Column title="コード" key="office_code" render={(value, record) => record.office?.office_code} />
            <Table.Column title="枝番" key="branch_store_code" render={(value, record) => record.office?.branch_store_code} />
            <Table.Column title="名称" dataIndex="contract_name" />
            <Table.Column title="電話番号" key="phone_number" render={(value, record) => record.office?.phone_number} />
            <Table.Column title="保険証記号" key="insurer_card_symbol" render={(value, record) => record.office?.insurer_card_symbol} />
            <Table.Column
              title={(
                <Button type="primary" icon={<ReloadOutlined />} loading={this.state.isLoadingList} onClick={() => this.loadPlanList()} />
              )}
              key="action"
              render={(text, record) => (
                <Button size="small" type="primary" onClick={() => {
                  const onFinishScreen = this.props.onFinishScreen || this.props.onClickedSelect;
                  if (onFinishScreen) {
                    onFinishScreen({
                      Lo_OfficeCode: record.office?.office_code,
                      Lo_BranchStoreCode: record.office?.branch_store_code,

                      // Adding data
                      recordData: record,
                    });
                  }
                }}>選択</Button>
              )}
            />
          </Table>
        </Card>
      </div>
    );
  }
}

export default WS0328001_ContractOfficeInfoInquirySub;
