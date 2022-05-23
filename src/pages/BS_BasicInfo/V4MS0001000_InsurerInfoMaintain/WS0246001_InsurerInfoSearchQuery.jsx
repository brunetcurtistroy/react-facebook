import React from "react";
import PropTypes from 'prop-types';
import ModalDraggable from "components/Commons/ModalDraggable";

import { Card, Form, Input, Table, Button, message, Checkbox, Modal } from "antd";
import { ReloadOutlined } from '@ant-design/icons';

import WS0339001_InsurerInfoMaintain from './WS0339001_InsurerInfoMaintain';

import axios from "configs/axios";
import { debounce } from "lodash";

/**
* @extends {React.Component<{Lo_InsurerCode:number, onFinishScreen:Function}>}
*/
class WS0246001_InsurerInfoSearchQuery extends React.Component {
  static propTypes = {
    Lo_InsurerCode: PropTypes.number,
    Lo_Name: PropTypes.any,

    onFinishScreen: PropTypes.func,
  }

  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '保険者情報検索・照会';

    this.state = {
      insurersData: [],
      isLoadingInsurersList: false,

      childModal: {
        visible: false,
        component: null,
        width: 0,
      },
      tableDataPaginate: {}
    };

    this.loadInsurersList = this.loadInsurersList.bind(this);
  }

  componentDidMount() {
    this.loadScreenData();
  }

  loadScreenData = () => {
    this.setState({ isLoadingInsurersList: true });
    axios.get("/api/insurer-info-maintain/insurer-info-search-query/get-screen-data")
      .then((res) => {
        this.formRef.current.setFieldsValue(res.data);

        this.loadInsurersList(1);
      })
      .catch(error => {
        console.log(error);
        message.error('エラーが発生しました');
      })
  }

  loadInsurersList(page, pageSize) {
    this.setState({
      isLoadingInsurersList: true,
    });

    axios.get("/api/insurer-info-maintain/insurer-info-search-query/", {
      params: {
        KanaSearch: this.formRef.current.getFieldValue('kana_name'),
        Li_FuzzySearch: this.formRef.current.getFieldValue('SearchMethodsOp'),
        InvalidCharOp: this.formRef.current.getFieldValue('InvalidCharOp'),
        page: page ? page : 1,
        limit: pageSize || 15
      },
    })
      .then((res) => {
        this.setState({
          insurersData: res.data.data_table,
          tableDataPaginate: res ? {
            ...this.state.tableDataPaginate,
            current: res.data.current_page,
            pageSize: res.data.per_page,
            total: res.data.total,
          } : null,
        });
      })
      .catch(error => {
        console.log(error);
        message.error('エラーが発生しました');
      })
      .finally(() => {
        this.setState({
          isLoadingInsurersList: false,
        });
      });
  }

  render() {
    return (
      <div className="insurer-info-search-query">
        <Card title="保険者情報検索・照会">
          <Form ref={this.formRef}>
            <Form.Item name="InvalidCharOp" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="SearchMethodsOp" valuePropName="checked" hidden>
              <Checkbox />
            </Form.Item>

            <Form.Item name="kana_name" label="検索">
              <Input onChange={debounce(this.loadInsurersList, 300)} />
            </Form.Item>
            <Table dataSource={this.state.insurersData}
              loading={this.state.isLoadingInsurersList}
              rowKey={(record) => record.insurer_code}
              pagination={{
                ...this.state.tableDataPaginate,
                onChange: (page, pageSize) => this.setState({
                  ...this.state.isLoadingInsurersList,
                  page,
                  pageSize
                }, () => this.loadInsurersList(page, pageSize))
              }}
              bordered
              size="small"
            >
              <Table.Column title="保険者コード" dataIndex="insurer_code" render={(value) => (<div style={{ textAlign: 'right' }}>{value}</div>)} />
              {/* <Table.Column title="メモ" dataIndex="insurer_code" render={(value) => (
                <Button size="small" onClick={() => {
                  this.setState({
                    childModal: {
                      ...this.state.childModal,
                      visible: true,
                      width: '95vw',
                      component: (<WS0339001_InsurerInfoMaintain
                        Lo_InsurerCode={value}
                      />),
                    },
                  })
                }}>:</Button>
              )} /> */}
              <Table.Column title="カナ名称" dataIndex="insurer_kana_name" />
              <Table.Column title="漢字名称" dataIndex="insurer_kanji_name" />
              <Table.Column title="電話番号" dataIndex="phone_number" />
              <Table.Column title="保険者番号" dataIndex="insurer_number" />
              <Table.Column title="契約" dataIndex="ContractPresence" render={(text, record) => (
                text
                // record.StsContractManageInfo === 1 ? 'あり' : ''
              )} />
              <Table.Column
                title={(
                  <Button type="primary" icon={<ReloadOutlined />} loading={this.state.isLoadingInsurersList} onClick={() => this.loadInsurersList()} />
                )}
                key="action"
                render={(text, record) => (
                  <Button type="primary" size="small" onClick={() => {
                    const func = this.props.onFinishScreen || this.props.onClickedSelect;
                    if (func) {
                      func({
                        Lo_InsurerCode: record.insurer_code,
                        Lo_Name: record.insurer_kanji_name,

                        // Adding data
                        recordData: record,
                      });
                    }
                  }}>選択</Button>
                )}
              />
            </Table>
          </Form>
        </Card>

        <ModalDraggable
          width={this.state.childModal.width}
          visible={this.state.childModal.visible}
          component={this.state.childModal.component}
          bodyStyle={{ margin: 0, padding: 0 }}
          maskClosable={false}
          onCancel={() => {
            this.setState({
              childModal: {
                ...this.state.childModal,
                visible: false,
              },
            });
          }}
        />
      </div>
    );
  }
}

export default WS0246001_InsurerInfoSearchQuery;
