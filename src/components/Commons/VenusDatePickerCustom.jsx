import React from "react";
import moment from "moment";
import ja_JP from "antd/es/date-picker/locale/ja_JP";
import PropTypes from "prop-types";
import { DatePicker, message } from "antd";
import { VenusDateValidation } from "helpers/VenusDateValidation";

const defaultFormatDate = "YYYY/MM/DD";

const VenusDatePickerCustom = (props) => {
  const [date, setDate] = React.useState(null);
  const [dateValidate, setDateValidate] = React.useState(null);
  const [isPressKeyEnter, setIsPressKeyEnter] = React.useState(false);

  React.useEffect(() => {
    setDate(props.value);
  }, [props]);

  React.useEffect(() => {
    if (isPressKeyEnter) {
      if (dateValidate === '') {
        // message.error("不正な日付です");
        setDate(null);
      } else {
        const mDate = moment(dateValidate);
        if (props.id && props.formRefDatePicker)
          props.formRefDatePicker?.current?.setFields([
            { name: props.id, value: mDate },
          ]);
        if (props.onChange) props.onChange(mDate, moment(mDate).format(defaultFormatDate));
        setDate(mDate);
      }
      setIsPressKeyEnter(false);
      setDateValidate(null);
    }
  }, [isPressKeyEnter]);

  return (
    <DatePicker
      {...props}
      locale={ja_JP}
      format={props.format || defaultFormatDate}
      value={date ? moment(date) : null}
      onBlur={() => {
        if (dateValidate) setIsPressKeyEnter(true);
        if (props.onBlur) props.onBlur();
      }}
      onChange={(value, dateString) => {
        if (props.onChange) props.onChange(value, dateString);
        setDate(value);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter" && e.key !== "Tab") {
          setDateValidate(VenusDateValidation(e.target.value + e.key));
        } else {
          setDateValidate(VenusDateValidation(e.target.value));
        }
        if (e.key === "Enter" || e.key === "Tab") {
          setIsPressKeyEnter(true);
          return;
        }
      }}
    ></DatePicker>
  );
};

VenusDatePickerCustom.propTypes = {
  format: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.any,
  allowClear: PropTypes.bool,
};
export default VenusDatePickerCustom;
