import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Card, Form, Table, Input } from "antd";
import CharacterStringSearchAction from 'redux/ResultOutput/CsvCreateParamMaintain/CharacterStringSearch.action'

class WS0461004_CharacterStringSearch extends React.Component {
  formRef = React.createRef();

  static propTypes = {
    Li_Format: PropTypes.any,
    Li_SeqCurrent: PropTypes.any,
    Lo_SeqSearch: PropTypes.any,
    onFinishScreen: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '文字列検索';

    this.state = {
      Lo_SeqSearch: '',
      SearchString: ''
    };
  }
  search(params, search) {
        const req = {
      ...params, SearchString: search,
    }
    CharacterStringSearchAction.getSearch(req).then((res) => {
      if (res) {
        const  {onFinishScreen} = this.props
        if(onFinishScreen) {
          onFinishScreen({
            recordData: res,
            Lo_SeqSearch: res && res.Lo_SeqSearch
          })
          
          this.setState({Lo_SeqSearch: res && res.Lo_SeqSearch, SearchString: res && res.CharStringSearch})
        }
      }
    })
  }
  componentDidUpdate(PropPev) {
    if (this.props !== PropPev) {
      this.setFormFieldValue('SearchString', this.state.SearchString)
    }
  }
  componentDidMount() {
   this.setFormFieldValue('SearchString', this.state.SearchString)
  }
  onFinish(values) {

  }
  setFormFieldValue(namePath, value) {
    this.formRef.current.setFields([
      {
        name: namePath,
        value,
      },
    ]);
  }
  onChange(event) {
    if (event.keyCode === 13) {
      const search = event.target.value
      this.search({Li_Format: this.props.Li_Format, 
        Li_SeqCurrent: (this.state.Lo_SeqSearch+1)}, search)
    }

  }

  render() {
    return (
      <div className="character-string-search">
        <Card title="文字列検索">
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Form.Item name="SearchString" label="">
              <Input type="text" autoFocus={true} onKeyUp={(event) => { this.onChange(event) }}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(WS0461004_CharacterStringSearch);
