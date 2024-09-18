import React, { Component } from "react";
import CustomerList from "../components/customer/List";
import CustomerForm from "../components/customer/Form";
import { Segment } from "semantic-ui-react";

export default class Customer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customers: [],
			loading: true,
			recordId: 0,
			data: {},
			open: false,
		};
	}

	componentDidMount() {
		this.getCustomersList();
	}

	handleEditRecord = (id, name, address) => {
		this.setState({
			recordId: id,
			data: { id, name, address },
			open: true,
		});
	};

	render() {
		return (
			<Segment>
				<CustomerForm
					updateCustomer={this.getCustomersList}
					recordId={this.state.recordId}
					data={this.state.data}
					open={this.state.open}
				/>
				<CustomerList
					customers={this.state.customers}
					editRecord={this.handleEditRecord}
				/>
			</Segment>
		);
	}

	getCustomersList = async () => {
		await fetch(process.env.REACT_APP_API + "/customers")
			.then((data) => data.json())
			.then((json) => this.setState({ customers: json, loading: false }))
			.catch((error) => {
				console.log(error);
			});
	};
}
