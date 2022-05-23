import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Card, Input } from "antd";
class WS1050007_InspectSpecified extends React.Component {
  static propTypes = {
    Lio_InspectSpecified: PropTypes.any,

    onChangeValue: PropTypes.func,
  };

  constructor(props) {
    super(props);

    // document.title = '検査指定';

    this.state = {
    };
  }

  onFinish(values) {

  }

  render() {
    return (
      <div className="inspect-specified">
        <Card title="検査指定">
          <div style={{ color: '#1463ab', marginBottom: '25px', fontWeight: 600 }}><b>外部検査をカンマ区切で指定してください。</b></div>
          <Input.TextArea rows={8} defaultValue={this.props.Lio_InspectSpecified}
            onChange={(e) => {
              if (this.props.onChangeValue) {
                this.props.onChangeValue({
                  Lio_InspectSpecified: e.target.value
                })
              }
            }} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, alertReducer }) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WS1050007_InspectSpecified);
