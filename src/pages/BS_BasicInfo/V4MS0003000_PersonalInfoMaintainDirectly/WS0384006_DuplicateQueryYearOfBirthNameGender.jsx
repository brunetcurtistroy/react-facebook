import React from "react";
import { connect } from "react-redux";
import PropType from 'prop-types';
import { Card, Table, Alert, Button } from "antd";
import { getDataDuplicateQueryYearOfBirthNameGenderAction } from "redux/basicInfo/PersonalInfoMaintain/DuplicateQueryYearOfBirthNameGender.actions";
import moment from "moment";

class WS0384006_DuplicateQueryYearOfBirthNameGender extends React.Component {
  static propType = {
    Li_KanaName: PropType.any,
    Li_Gender: PropType.any,
    Li_DateOfBirth: PropType.any,
    Lo_PersonalNum: PropType.any,
    onFinishScreen: PropType.func,
  }

  constructor(props) {
    super(props);

    // document.title = "重複照会[生年・名・性別]";

    this.state = {
      pagination: {
        defaultPageSize: 10,
        size: 'small',
        showQuickJumper: true
      },
      dataSource: [],
      isLoading: false,
      rowSelect: {}
    };
  }

  componentDidMount = () => {
    const { Li_KanaName, Li_Gender, Li_DateOfBirth } = this.props;
    this.loadData({ Li_KanaName, Li_Gender, Li_DateOfBirth });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      const { Li_KanaName, Li_Gender, Li_DateOfBirth } = this.props;
      this.loadData({ Li_KanaName, Li_Gender, Li_DateOfBirth });
    }
  }

  loadData = (params) => {
    this.setState({ isLoading: true });
    getDataDuplicateQueryYearOfBirthNameGenderAction(params)
      .then(res => {
        if (res) {
          let data = res.data.map((item, index) => ({ ...item, id: index }));
          this.setState({
            dataSource: data,
            isLoading: false
          })
        }
      })
      .catch()
  }

  render() {
    return (
      <div className="duplicate-query-year-of-birth-name-gender">
        <Card title="おしらせ「医事」">
          <Alert style={{ textAlign: "center" }} type="warning" message="下記に同生年月日の方が存在します。" />
          <Table
            size='small'
            bordered
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            pagination={{
              ...this.state.pagination,
              hideOnSinglePage: this.state.dataSource.length > 10 ? false : true
            }}
            rowKey={(record) => record.id}
            onRow={(record, index) => ({ onClick: event => this.setState({ rowSelect: record }) })}
          >
            <Table.Column title="個人番号" dataIndex="personal_number_id" />
            <Table.Column title="氏　名" dataIndex="" render={(text, record) => (
              <>
                <div>{record.kana_name}</div>
                <div>{record.kanji_name}</div>
              </>
            )} />
            <Table.Column title="生年月日" dataIndex="" width={100} render={(text, record) => (
              <>
                <div>{moment(record.birthday_on).format('NNy/MM/DD')}</div>
                <div style={{ textAlign: 'right' }}>{record.Expresstion_6}</div>
              </>
            )} />
            <Table.Column title="保険情報" dataIndex="" render={(text, record) => (
              <>
                <div>{record.insurer_card_symbol}</div>
                <div>{record.insurer_card_number}</div>
              </>
            )} />
            <Table.Column title="保険情報" dataIndex="" render={(text, record) => (
              <>
                <div>{record.Expresstion_7}</div>
                <div>{record.office_kanji_name}</div>
              </>
            )} />
            <Table.Column align='center' width={100} render={(text, record) => (
              <Button type="primary"
                onClick={() => {
                  if (this.props.onFinishScreen)
                    this.props.onFinishScreen({ Lo_PersonalNum: record.PersonalNum })
                }}
              >
                選択
              </Button>
            )} />
          </Table>

          <Button type="primary" style={{ float: "right", marginTop: "20px" }} hidden={true}
            onClick={() => {
              if (this.props.onFinishScreen)
                this.props.onFinishScreen({ Lo_PersonalNum: this.state.rowSelect.PersonalNum })
            }}
          >
            選択
          </Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WS0384006_DuplicateQueryYearOfBirthNameGender);
