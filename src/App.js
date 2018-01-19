import React, { Component } from 'react';
import Calendar from './calendar/Calendar';
import Appointments from './appointments/Appointments';
import './App.scss';

class App extends Component {
	constructor() {
		super();

		this.state = {
			appointments: [{
				date: 1516125600000,
				name: 'IT Meeting'
			}]
		}

		this.addAppointment = this.addAppointment.bind(this);
		this.removeAppointment = this.removeAppointment.bind(this);
	}

	addAppointment(date, title){
		const newAppointment = {
			date: Number(date),
			name: title
		}

		this.setState({
			appointments: [...this.state.appointments, newAppointment]
		});
	}

	removeAppointment(date) {
		const newResults = this.state.appointments.filter(el => el.date !== date);

		this.setState({
			appointments: newResults
		});
	}

	render() {
		return (
			<div className="App">
			<Calendar
				appointments={this.state.appointments}
				addAppointment={this.addAppointment}/>
			<Appointments
				appointments={this.state.appointments}
				removeAppointment={this.removeAppointment}/>
			</div>
		);
	}
}

export default App;
