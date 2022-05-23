import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Input, Button } from "antd";
import CharacterStringSearchAction from 'redux/ResultOutput/PrintParamMaintain/CharacterStringSearch.action'
class WS0855021_CharacterStringSearch extends React.Component {
  // static propTypes = {
  //   Li_StyleCode: PropTypes.string,
  //   Li_RecordNumCurrent: PropTypes.number,
  //   Lio_SearchString: PropTypes.string,
  //   Lo_RecordNumSearch: PropTypes.number,
  //   onFinishScreen: PropTypes.func
  // }
  formRef = React.createRef();
  constructor(props) {
    super(props);
    // document.title = '文字列検索';
    this.state = {
      search: {
        Li_StyleCode: "",
        Li_RecordNumCurrent: "",
        Lio_SearchString: "",
        Lo_RecordNumSearch: ""
      },
    };
  }
  componentDidMount() {
    this.state.search.Li_StyleCode = this.props.Li_StyleCode
    this.state.search.Li_RecordNumCurrent = this.props.Li_RecordNumCurrent
    this.state.search.Lo_RecordNumSearch = this.props.Lo_RecordNumSearch
  }

  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.state.search.Li_StyleCode = this.props.Li_StyleCode
      this.state.search.Li_RecordNumCurrent = this.props.Li_RecordNumCurrent
      this.state.search.Lo_RecordNumSearch = this.props.Lo_RecordNumSearch
    }
  }

  updateValue(value) {
    this.state.search.Lio_SearchString = value
  }

  Search() {
    const func = this.props.onSelect || this.props.onFinishScreen;
    CharacterStringSearchAction.RunSearch(this.state.search)
      .then((res) => {
        func({
          Lo_RecordNumSearch: res.data.Lo_RecordNumSearch,
          Lio_SearchString: res.data.Lio_SearchString,
          Warning: res.data.Warning
        });
      })
      .finally(() => this.setState({ isLoadingTable: false }))
  }

  render() {
    return (
      <div className="character-string-search">
        <Card title="文字列検索">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item name="Lio_SearchString">
              <Input onChange={(e) => {
                this.updateValue(e.target.value)
              }}
                onPressEnter={() => this.Search()}
              />
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS0855021_CharacterStringSearch);
