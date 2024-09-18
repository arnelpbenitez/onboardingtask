import React, { Component } from "react";
import { Button, Form, Icon, Modal, Segment } from "semantic-ui-react";

export default class CustomerForm extends Component {
	state = {
		open: this.props.open ?? false,
		name: this.props.record?.name ?? "",
		address: this.props.record?.address ?? "",
		recordId: 0,
	};

	componentDidUpdate(prevProps) {
		if (prevProps.recordId !== this.props.recordId) {
			this.setState({
				recordId: this.props.recordId,
				open: true,
				name: this.props.data.name,
				address: this.props.data.address,
			});
		}
	}

	handleListChange = () => {
		this.props.updateCustomer();
	};

	handleOpen = () =>
		this.setState({ open: true, name: "", address: "", recordId: 0 });
	handleClose = () => this.setState({ open: false, recordId: 0 });
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		if (this.state.recordId > 0) {
			await this.updateCustomer();
		} else {
			await this.addCustomer();
		}

		this.handleListChange();

		this.setState({ name: "", address: "" });

		this.handleClose();
	};

	render() {
		const { open } = this.state;
		return (
			<Segment>
				<Button primary onClick={this.handleOpen}>
					New Customer
				</Button>

				<Modal open={open} onClose={this.handleClose} size="small">
					<Modal.Header>
						{this.state.recordId === 0 ? "Create" : "Edit"} Customer
					</Modal.Header>
					<Modal.Content>
						<Form onSubmit={this.handleSubmit}>
							<Form.Field>
								<label>Name</label>
								<input
									type="text"
									name="name"
									value={this.state.name}
									onChange={this.handleChange}
									required
								/>
							</Form.Field>
							<Form.Field>
								<label>Address</label>
								<input
									type="text"
									name="address"
									value={this.state.address}
									onChange={this.handleChange}
									required
								/>
							</Form.Field>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.handleClose} secondary>
							Cancel
						</Button>
						<Button
							onClick={this.handleSubmit}
							positive
							icon
							labelPosition="right"
						>
							{this.state.recordId === 0 ? "Create" : "Edit"}{" "}
							<Icon name="check circle" />
						</Button>
					</Modal.Actions>
				</Modal>
			</Segment>
		);
	}

	addCustomer = async () => {
		await fetch(process.env.REACT_APP_API + "/customers", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: 0,
				name: this.state.name,
				address: this.state.address,
			}),
		})
			.then((data) => data.json())
			.catch((error) => {
				console.log(error);
			});
	};

	updateCustomer = async () => {
		await fetch(
			`${process.env.REACT_APP_API}/customers/${this.state.recordId}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: this.state.recordId,
					name: this.state.name,
					address: this.state.address,
				}),
			}
		).catch((error) => {
			console.log(error);
		});
	};
}
