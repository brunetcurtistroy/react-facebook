import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Form, Input, Button, Table, } from "antd";
import QueryNameOfDiseaseAction from "redux/InputBusiness/NotInputCheckCategory/QueryNameOfDisease.action";

class WS2320001_QueryNameOfDisease extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Lio_DiseaseNameCode: PropTypes.any,
    Li_SearchChar: PropTypes.any,

    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = 'V4-VNS72200:照会:病名';

    this.state = {
      dataSource: [],
      isLoading: false
    };
  }


  componentDidMount() {
    this.getDataScreen()
  }

  componentDidUpdate(prv) {
    if (this.props !== prv) {
      this.getDataScreen()
    }
  }

  getDataScreen() {
    let params = {
      SearchChar: this.formRef.current?.getFieldValue('SearchChar')
    }
    this.setState({ isLoading: true })
    QueryNameOfDiseaseAction.getDataScreen(params)
      .then((res) => {
        this.setState({
          dataSource: res ? res : [],
          isLoading: false
        })
      })
      .finally(() => this.setState({ isLoading: false }))
  }

  onFinish(values) { }

  render() {
    return (
      <div className="query-name-of-disease">
        <Card title="V4-VNS72200:照会:病名">
          <Form ref={this.formRef} onFinish={this.onFinish} >
            <Form.Item name="SearchChar">
              <Input onBlur={() => { this.getDataScreen() }} />
            </Form.Item>
          </Form>
          <Table
            size='small'
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={false}
            bordered
            rowKey={(record) => record.id}
            style={{ marginTop: 15 }}
          >
            <Table.Column title="コード" dataIndex="disease_name_code" width={100} />
            <Table.Column title="略称名" dataIndex="search_key" width={100} />
            <Table.Column title="病名" dataIndex="name_of_a_disease" />
            <Table.Column width={60} align='center'
              render={(value, record, index) => {
                return (
                  <Button type="primary" size='small'
                    onClick={() => {
                      if (this.props.onFinishScreen) {
                        this.props.onFinishScreen({
                          Lio_DiseaseNameCode: record.disease_name_code,
                          recordData: record
                        });
                      }
                    }}
                  >選択</Button>
                )
              }} />
          </Table>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2320001_QueryNameOfDisease);
