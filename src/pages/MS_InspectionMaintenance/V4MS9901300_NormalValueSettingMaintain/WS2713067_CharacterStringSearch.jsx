import React from "react";
import { connect } from "react-redux";
import { Card, Form, Input, Modal } from "antd";
import PropTypes from 'prop-types';

class WS2713067_CharacterStringSearch extends React.Component {

  static propTypes = {
    Li_Format: PropTypes.string,
    Li_SeqCurrent: PropTypes.number
  }
  formRef = React.createRef();

  constructor(props) {
    super(props);

    // document.title = '文字列検索';

    this.state = {
    };
  }
  onEventSearchEnter = (e) => {
    // 
    let Lo_seqsearch = 0;
    console.log(e.target.value)
    if (Lo_seqsearch == 0) {
      return Modal.warning({
        content: '検索対象が見つかりませんでした',
        okText: 'OK',
      })
    }
  }
  onFinish(values) {

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
              <Input type="text" onPressEnter={(e) => { this.onEventSearchEnter(e) }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WS2713067_CharacterStringSearch);
