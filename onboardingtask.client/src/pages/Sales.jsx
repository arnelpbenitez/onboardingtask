import React, { Component } from "react";
import SaleList from "../components/sale/List";
import SaleForm from "../components/sale/Form";
import { Segment } from "semantic-ui-react";

export default class Sale extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sales: [],
			loading: true,
			recordId: 0,
			data: {},
			open: false,
		};
	}

	componentDidMount() {
		this.getSalesList();
	}

	handleEditRecord = (record) => {
		this.setState({
			recordId: record.id,
			data: record,
			open: true,
		});
	};

	render() {
		return (
			<Segment>
				<SaleForm
					updateSale={this.getSalesList}
					recordId={this.state.recordId}
					data={this.state.data}
					open={this.state.open}
				/>
				<SaleList
					sales={this.state.sales}
					editRecord={this.handleEditRecord}
				/>
			</Segment>
		);
	}

	getSalesList = async () => {
		await fetch(process.env.REACT_APP_API + "/sales")
			.then((data) => data.json())
			.then((json) => this.setState({ sales: json, loading: false }))
			.catch((error) => {
				console.log(error);
			});
	};
}
