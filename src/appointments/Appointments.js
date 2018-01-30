import React, { Component } from 'react';
import moment from 'moment';
import './Appointments.scss';

export default class Appointments extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.appointments
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.appointments !== this.props.appointments) {
			this.setState({
				data: nextProps.appointments
			});
		}
	}

	_renderList() {
		const data = this.state.data;

		return data.map((list, index) => {
			return <List
								key={index}
								list={list}
								removeAppointment={this.props.removeAppointment}
							/>
		});
	}

	render() {
		return (
			<div className="appointments">
				<h3>Appointments</h3>
				{this._renderList()}
			</div>
		)
	}
}

class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			date: props.list.date,
			name: props.list.name,
			isEdit: false
		}

		this.changeText = this.changeText.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.list !== this.props.list) {
			this.setState({
				date: nextProps.list.date,
				name: nextProps.list.name,
				isEdit: false
			});
		}
	}

	changeText(event) {
		this.setState({name: event.target.value});
	}

	toggleEdit() {
		this.setState((state, props) => {
			return {
				isEdit: !state.isEdit
			}
		});
	}

	render() {
		const state = this.state;

		return (
			<div>
			{state.isEdit ? (
				<div className="list">
					<input value={state.name} onChange={this.changeText}/>
					<button className="update" onClick={this.toggleEdit}>Update</button>
					<button className="delete" onClick={() => this.props.removeAppointment(state.date)}>Delete</button>
				</div>
			) : (
				<div className="list">
					<div>
						<span>({moment.utc(state.date).format('MMM Do')})</span> {state.name}
					</div>
					<button onClick={this.toggleEdit}>Edit</button>
				</div>
			)
		}
		</div>
		)
	}
};
