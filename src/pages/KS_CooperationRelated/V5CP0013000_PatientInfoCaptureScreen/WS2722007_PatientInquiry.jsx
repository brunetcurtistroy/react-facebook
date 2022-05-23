import VenusDatePickerCustom from "components/Commons/VenusDatePickerCustom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Form, Input, Table, DatePicker, Row, Col, message } from "antd";
import { getDataPatientInquiryAction } from "redux/CooperationRelated/PatientInfoCaptureScreen/PatientInquiry.actions";
import moment from "moment-timezone";
import { debounce } from "lodash";

class WS2722007_PatientInquiry extends React.Component {
  static propTypes = {
    Li_KanaName: PropTypes.any,
    Li_DateBirth: PropTypes.any,
    Li_Date: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '患者照会';

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {},
      initParams: {
        KanaName: '',
        DateBirth: '',
        Date: '',
      }
    };
    this.handleSearch = debounce(this.handleSearch, 700);
  }

  componentDidMount = () => {
    this.setState({
      initParams: {
        KanaName: this.props.Li_KanaName || '',
        DateBirth: this.props.Li_DateBirth || '',
        Date: this.props.Li_Date || '',
      }
    });
    this.loadData(this.state.initParams);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      this.setState({
        initParams: {
          KanaName: this.props.Li_KanaName || '',
          DateBirth: this.props.Li_DateBirth || '',
          Date: this.props.Li_Date || '',
        }
      });
      this.loadData(this.state.initParams);
    }
  }

  handleSearch = (value, name) => {
    this.setState({
      initParams: {
        ...this.state.initParams,
        [name]: value
      }
    }, () => this.loadData(this.state.initParams));
  }

  loadData = (params) => {
    this.setState({ isLoading: true });
    getDataPatientInquiryAction(params)
      .then(res => {
        if (res) {
          this.setState({
            dataSource: res.data,
            isLoading: false
          });
        }
      })
      .catch(err => message.error(err.response.data.message || "エラーが発生しました"))
  }

  render() {
    return (
      <div className="patient-inquiry">
        <Card>
          <Form>
            <Row gutter={20}>
              <Col span={8}>
                <Form.Item name="KanaName" label="カナ氏名" >
                  <Input onChange={e => this.handleSearch(e.target.value, 'KanaName')} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="DateBirth" label="生年月日" >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={'YYYY/MM/DD'}
                    onChange={date => this.handleSearch(moment(date).format('YYYY/MM/DD'), 'DateBirth')}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="Date" label="更新日" >
                  <VenusDatePickerCustom formRefDatePicker={this.formRef} format={'YYYY/MM/DD'}
                    onChange={date => this.handleSearch(moment(date).format('YYYY/MM/DD'), 'Date')}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Table
              className='mt-3'
              size='small'
              dataSource={this.state.dataSource}
              loading={this.state.isLoading}
              pagination={{
                ...this.state.pagination,
                hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
              }}
              rowKey={(record) => record.id}
              onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
            >
              <Table.Column title="患者番号" dataIndex="patient_no" />
              <Table.Column title="カナ氏名" dataIndex="kana_name" />
              <Table.Column title="漢字氏名" dataIndex="kanji_name" />
              <Table.Column title="性別" dataIndex="expression_4" />
              <Table.Column title="生年月日" dataIndex="birthday_on"
                render={text => moment(text).isValid() ? moment(text).format('NNy/MM/DD') : ''}
              />
            </Table>
          </Form>
        </Card>
      </div >
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS2722007_PatientInquiry);
