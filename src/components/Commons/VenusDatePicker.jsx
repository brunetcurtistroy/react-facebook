import { DatePicker } from 'antd';
import moment from 'moment';
import ja_JP from "antd/es/date-picker/locale/ja_JP";

class VenusDatePicker extends DatePicker {
  valueStr = '';

  constructor(props) {
    super(props);

    this.state = {
      format: this.props.format,
    };

    // this.render = this.render.bind(this);
  }

  render() {
    return (
      <DatePicker
        {...this.props}
        locale={ja_JP}
        // defaultValue={this.state.value}
        // value={this.state.value}
        format={this.state.format || moment.defaultFormat}
        // onKeyDown={e => {
        //   console.log(e, this.valueStr);
        //   if (e.key === 'Enter') {
        //     // this.setState({
        //     //   format: this.props.format,
        //     // });
        //   } else {
        //     // let toFormat = this.props.format;
        //     let toFormat = 'YYMMDD';
        //     if ((e.code.indexOf('Numpad') === 0) || (e.code.indexOf('Digit') === 0)) {
        //       this.valueStr = this.valueStr.concat(e.key);

        //       // if (this.valueStr.length <= 2) {
        //       //   toFormat = 'DD';
        //       // } else if (this.valueStr.length <= 4) {
        //       //   toFormat = 'MMDD';
        //       // } else if (this.valueStr.length <= 6) {
        //       //   toFormat = 'YYMMDD';
        //       // } else if (this.valueStr.length <= 8) {
        //       //   toFormat = 'YYYYMMDD';
        //       // }
        //     } else {
        //       toFormat = this.props.format;
        //     }
        //     this.setState({
        //       format: toFormat,
        //     });
        //   }
        // }}
        // onChange={() => {
        //   this.valueStr = '';

        //   this.setState({
        //     format: this.props.format,
        //   });
        // }}
        // onOpenChange={() => {
        //   this.valueStr = '';

        //   this.setState({
        //     format: this.props.format,
        //   });
        // }}
      />
    );
  }
}

export default VenusDatePicker;
