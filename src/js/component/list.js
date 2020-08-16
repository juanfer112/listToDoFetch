/*import React from "react";*/
import React, { Component } from "react";
import PropTypes, { element } from "prop-types";

import "../../styles/index.scss";
import Posts from "./Posts";

class List extends Component {
	constructor(props) {
		super(props);
	}
	styleCompleted(e, i) {
		this.props.lista.map((item, index) => {
			if (i == index) {
				return {
					fontSize: "20px",
					color: item.done ? "gray" : "black",
					textDecoration: item.done ? "line-through" : "none"
				};
			}
		});
	}

	render() {
		const { btnDeleteClicked, lista, checkBox } = this.props;

		return (
			<div>
				{lista.map((element, i) => {
					let className = element.done
						? " list-group-item text-capitalize d-flex justify-content-between mt-2 done "
						: "list-group-item text-capitalize d-flex justify-content-between mt-2 undone";
					return (
						<li
							id={i}
							key={i}
							style={this.styleCompleted(element, i)}
							className={className}>
							{element.label}
							<span className="item">
								<input
									type="checkbox"
									onChange={() => checkBox(i, className)}
								/>

								<i
									className="far fa-trash-alt grow"
									onClick={() => btnDeleteClicked(i)}
								/>
							</span>
						</li>
					);
				})}
			</div>
		);
	}
}

const btnDelete = {
	fontSize: "18px",
	background: "#ea2027",
	color: "#fff",
	border: "none",
	padding: "10px 15px",
	borderRadius: "50%",
	cursor: "pointer",
	float: "rigth"
};

List.propTypes = {
	lista: PropTypes.any,
	btnDeleteClicked: PropTypes.any,
	checkBox: PropTypes.any,
	done: PropTypes.any
};

export default List;
