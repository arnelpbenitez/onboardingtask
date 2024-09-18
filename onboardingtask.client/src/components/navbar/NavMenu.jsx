import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const items = [
	{ key: "customer", name: "Customers", active: true },
	{ key: "product", name: "Products" },
	{ key: "store", name: "Stores" },
	{ key: "sales", name: "Sales" },
];

export class NavMenu extends Component {
	state = { activeItem: "customer" };

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name });
	};

	render() {
		return (
			<Menu>
				{items.map((item) => {
					return (
						<Menu.Item
							key={item.key}
							name={item.key}
							active={this.state.activeItem === item.key}
							onClick={this.handleItemClick}
							as={Link}
							to={`/${item.key}`}
						>
							{item.name}
						</Menu.Item>
					);
				})}
			</Menu>
		);
	}
}
