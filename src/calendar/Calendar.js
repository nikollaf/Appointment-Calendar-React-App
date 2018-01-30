import React, { Component } from 'react';
import './Calendar.scss';
import moment from 'moment';

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    const date = moment();

    this.state = {
      date
    }

    this.selectDay = this.selectDay.bind(this);
  }

  previous() {
    this.setState((state, props) => {
      return {
        date: state.date.subtract(1, 'month')
      }
    });
  }

  next() {
    this.setState((state, props) => {
      return {
        date: state.date.add(1, 'month')
      }
    });
  }

  selectDay(date, selected) {
    if (selected) {
      return alert('There is already an appointment for this day');
    }

    var title = prompt("What's the appointment?");

    if (title) {
      this.props.addAppointment(date, title);
    }
  }

  _renderWeeks() {
    const month = this.state.date;
    const firstDayOfWeek = month.clone().localeData().firstDayOfWeek();
    const firstOfMonth = month.clone().startOf('month').hour(12);
    const lastOfMonth = month.clone().endOf('month').hour(12);

    // calculate the exact first and last days to fill the entire matrix
    // (considering days outside month)
    const prevDays = ((firstOfMonth.day() + 7 - firstDayOfWeek) % 7);
    const nextDays = ((firstDayOfWeek + 6 - lastOfMonth.day()) % 7);
    const firstDay = firstOfMonth.clone().subtract(prevDays, 'day');
    const lastDay = lastOfMonth.clone().add(nextDays, 'day');

    const totalDays = lastDay.diff(firstDay, 'days') + 1;

    const currentDay = firstDay.clone();
    const weeksInMonth = [];

    for (let i = 0; i < totalDays; i += 1) {
      if (i % 7 === 0) {
        weeksInMonth.push([]);
      }

      let day = currentDay.clone();

      weeksInMonth[weeksInMonth.length - 1].push(day);

      currentDay.add(1, 'day');
    }

    return weeksInMonth.map((week, index) => {
      return <Week
              appointment={this.props.appointments}
              selectDay={this.selectDay}
              key={index}
              week={week}
              month={month.month()}
      />
    });
  }

  _renderMonthLabel() {

    const monthName = this.state.date.format('MMMM'),
          year = this.state.date.format('YYYY');

    return <h1>{monthName} {year}</h1>;
  }

  render() {
    return (
      <div className="calendar">
        <div className="header">
          <i onClick={() => this.previous()}>Back</i>
            {this._renderMonthLabel()}
          <i onClick={() => this.next()}>Forward</i>
        </div>
        {this._renderWeeks()}
        <p className="info">* Click on a date to set up an appointment</p>
      </div>
    )
  }
}


class Week extends Component {

  _renderDays() {
    return this.props.week.map((date, index) => {
      // add disabled class for days outside of month
      const disabled = this.props.month !== date.month() && true;
      // return appointment if it exists
      const selected = this.props.appointment.filter(data => {
        return Number(data.date) === Number(date.format('x'))
      }).length;

      return <Day
              key={index}
              selectDay={this.props.selectDay}
              disabled={disabled}
              selected={selected}
              day={date}
            />
    });
  }

  render() {
    return (
      <div className="week">
        {this._renderDays()}
      </div>
    )
  }
};

const Day = (props) => {
  return (
    <span className={(props.disabled ? 'disabled ' : '') + (props.selected ? 'selected' : '')} onClick={() => props.selectDay(props.day.format('x'), props.selected)}>
      {props.day.format('D')}
    </span>
  )
};
