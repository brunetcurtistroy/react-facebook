import React from "react";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, Table, Spin, } from "antd";
import { ReloadOutlined } from '@ant-design/icons';

import { debounce } from "lodash";

import ContractInsurerInfoInquirySubService from 'services/basicInfo/ContractInfoMaintain/ContractInsurerInfoInquirySubService';

/**
* @extends {React.Component<{Lo_InsurerCode:any, Li_Type:any, onClickedSelect:Function}>}
*/
class WS0329001_ContractInsurerInfoInquirySub extends React.Component {
  static propTypes = {
    Lo_InsurerCode: PropTypes.any,
    Li_Type: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '契約保険者情報照会SUB';

    this.state = {
      InsuranceList: [],

      isLoadingList: false,
    };

    this.loadInsuranceList = this.loadInsuranceList.bind(this);
  }

  componentDidMount() {
    this.loadInsuranceList();
  }

  loadInsuranceList() {
    this.setState({ isLoadingList: true });

    ContractInsurerInfoInquirySubService.getInsuranceList({
      Li_Type: this.props.Li_Type,
      KanaSearch: this.formRef.current.getFieldValue('KanaSearch'),
    })
      .then(res => {
        this.setState({ 
          InsuranceList: res.data,
         });
      })
      .catch(error => {

      })
      .finally(() => this.setState({ isLoadingList: false }))
  }

  render() {
    return (
      <div className="contract-insurer-info-inquiry-sub">
        <Card title="契約保険者情報照会">
          <Spin spinning={this.state.isLoadingList}>
            <Form ref={this.formRef}>
              <Form.Item name="KanaSearch" label="検索">
                <Input onChange={debounce(this.loadInsuranceList, 300)} />
              </Form.Item>
            </Form>

            <Table dataSource={this.state.InsuranceList} rowKey={record => record.id}
              pagination={{ showQuickJumper: true, showSizeChanger: true, }}
              loading={this.state.isLoadingList}
            >
              <Table.Column title="保険者コード" key="insurer_code" dataIndex={['insurer', 'insurer_code']} />
              <Table.Column title="契約名称" dataIndex="contract_name" />
              <Table.Column title="保険者名（漢字）" key="insurer_kanji_name" dataIndex={['insurer', 'insurer_kanji_name']} />
              <Table.Column title="電話番号" key="phone_number" dataIndex={['insurer', 'phone_number']} />
              <Table.Column title="保険者番号" key="insurer_number" dataIndex={['insurer', 'insurer_number']} />
              <Table.Column
                title={(
                  <Button type="primary" icon={<ReloadOutlined />} loading={this.state.isLoadingList} onClick={() => this.loadInsuranceList()} />
                )}
                key="action"
                render={(text, record) => (
                  <Button size="small" type="primary" onClick={() => {
                    const fn = this.props.onClickedSelect || this.props.onFinishScreen;
                    if (fn) {
                      fn({
                        Lo_InsurerCode: record.insurer?.insurer_code,

                        // Adding data
                        recordData: record,
                      });
                    }
                  }}>選択</Button>
                )}
              />
            </Table>
          </Spin>
        </Card>
      </div>
    );
  }
}

export default WS0329001_ContractInsurerInfoInquirySub;
