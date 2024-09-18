import React, { Component } from "react";
import ProductList from "../components/product/List";
import ProductForm from "../components/product/Form";
import { Segment } from "semantic-ui-react";

export default class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			loading: true,
			recordId: 0,
			data: {},
			open: false,
		};
	}

	componentDidMount() {
		this.getProductsList();
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
				<ProductForm
					updateProduct={this.getProductsList}
					recordId={this.state.recordId}
					data={this.state.data}
					open={this.state.open}
				/>
				<ProductList
					products={this.state.products}
					editRecord={this.handleEditRecord}
				/>
			</Segment>
		);
	}

	getProductsList = async () => {
		await fetch(process.env.REACT_APP_API + "/products")
			.then((data) => data.json())
			.then((json) => this.setState({ products: json, loading: false }))
			.catch((error) => {
				console.log(error);
			});
	};
}
