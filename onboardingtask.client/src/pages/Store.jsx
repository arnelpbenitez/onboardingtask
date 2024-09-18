import React, { Component } from "react";
import StoreList from "../components/store/List";
import StoreForm from "../components/store/Form";

export default class Store extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stores: [],
			loading: true,
			recordId: 0,
			data: {},
			open: false,
		};
	}

	componentDidMount() {
		this.getStoresList();
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
			<div>
				<div>
					<StoreForm
						updateStore={this.getStoresList}
						recordId={this.state.recordId}
						data={this.state.data}
						open={this.state.open}
					/>
					<StoreList
						stores={this.state.stores}
						editRecord={this.handleEditRecord}
					/>
				</div>
			</div>
		);
	}

	getStoresList = async () => {
		await fetch(process.env.REACT_APP_API + "/stores")
			.then((data) => data.json())
			.then((json) => this.setState({ stores: json, loading: false }))
			.catch((error) => {
				console.log(error);
			});
	};
}
