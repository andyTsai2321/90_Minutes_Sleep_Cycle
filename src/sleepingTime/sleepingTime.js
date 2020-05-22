import React, { Component } from "react";
import TimeInput from "./timeInput";
import { Button } from "antd";
import "./sleepingTime.css";
import moment from "moment";

class SleepingTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: [3, 9], //start, end
      timeInterval: 5400, // 90min
      sleepTime: [],
      value: null,
    };
  }

  componentDidMount() {
    this.setSleepTime();
  }

  setSleepTime = (time = new Date()) => {
    const originalTime = time;
    const copiedTime = new Date(originalTime.getTime());
    const { timeInterval, interval } = this.state;
    const timestamp = copiedTime.getTime();
    let sleepTimeResult = [];
    for (let i = interval[0]; i <= interval[1]; i++) {
      const plusTime = i * timeInterval;
      const result = new Date(copiedTime.setTime(timestamp + 1000 * plusTime));
      const hours = result.getHours();
      const mins = result.getMinutes();
      sleepTimeResult.push(`${this.padZero(hours)}:${this.padZero(mins)}`);
    }
    this.setState({
      sleepTime: sleepTimeResult,
      value: moment(originalTime),
    });
  };

  padZero = (num) => {
    if (typeof num !== String) {
      num = num + "";
    }
    return num.split("").length > 1 ? num : num.padStart(2, "0");
  };

  render() {
    const { sleepTime, value } = this.state;
    return (
      <div className="container">
        <h3>睡覺時間設定</h3>
        <div className="time-input-wrap">
          <TimeInput
            setSleepTime={this.setSleepTime}
            value={this.state.value}
          />
          <Button
            className="update-btn"
            type="primary"
            onClick={() => this.setSleepTime()}
          >
            update time
          </Button>
        </div>

        <div className="wakeUp-wrap">
          <h3>起床時間</h3>
          <div className="wakeUp-content">
            {sleepTime.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SleepingTime;
