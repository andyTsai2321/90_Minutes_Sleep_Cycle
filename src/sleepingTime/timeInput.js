import React, { Component } from "react";
import { TimePicker } from "antd";


class TimeInput extends Component {
  constructor(props) {
    super(props);
  }
  hanleTimeChange = (time) => {
    console.log(time)
    if (!time) return;
    this.props.setSleepTime(time._d);
  };
  render() {
    const format = "HH:mm";
    return (
      <TimePicker
          className="timeInput"
          onChange={this.hanleTimeChange}
          value={this.props.value}
          format={format}
          size="large"
          allowClear={false}
        />
    );
  }
}

export default TimeInput;
