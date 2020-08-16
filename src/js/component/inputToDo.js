import React from "react";
import List from "./list.js";

import "../../styles/index.scss";

export class InputToDo extends React.Component {
	constructor() {
		super();
		this.state = {
			list: [],
			userInput: ""
		};
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/juanfer112")
			.then(response => response.json())
			.then(data => {
				for (let items in data) {
					this.setState({ list: [...this.state.list, data[items]] });
				}
			});
	}
	componentDidUpdate() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/juanfer112", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(this.state.list)
		});
	}

	isEmpty(str) {
		return str.replace(/^\s+|\s+$/gm, "").length == 0;
	}

	addToList(e) {
		if (e.which == 13 || e.keyCode == 13) {
			if (!this.isEmpty(this.state.userInput)) {
				let listArray = this.state.list.concat(this.state.userInput);
				this.setState({
					list: [
						...this.state.list,
						{ label: e.target.value, done: false }
					],
					userInput: ""
				});
			}
		}
	}
	btnToList(e) {
		if (!this.isEmpty(this.state.userInput)) {
			let listArray = this.state.list.concat(this.state.userInput);
			this.setState({
				list: [
					...this.state.list,
					{ label: e.target.value, done: false }
				],
				userInput: ""
			});
		}
	}
	btnDeleteClicked = id => {
		this.setState({
			list: this.state.list.filter((item, pos) => pos !== id)
		});
	};

	checkBox = (id, clas) => {
		const checkElement = this.state.list.map((element, index) => {
			if (index === id) {
				element.done = !element.done;
			}
			return element;
		});

		this.setState({
			list: checkElement
		});
	};

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-10 mx-auto col-md-6 mt-4">
						<h1 className="gradient-multiline">
							<span>LIST TO DO</span>
						</h1>
						<div className="card card-body">
							<div className=" input-group">
								<div className=" input-group-prepend">
									<div className="input-group-text bg-primary text-white">
										<i className="fas fa-book" />
									</div>
								</div>

								<input
									className="form-control text-capitalize"
									type="text"
									placeholder="TAREAS POR HACER?"
									onChange={e => {
										this.setState({
											...this.state,
											userInput: e.target.value
										});
									}}
									value={this.state.userInput}
									onKeyPress={e => this.addToList(e)}
								/>
								<div className="input-group-append">
									<button
										type="button"
										className="btn btn-primary"
										value={this.state.userInput}
										onClick={e => this.btnToList(e)}>
										agregar
									</button>
								</div>
							</div>
						</div>

						<ul className="list-group my-2">
							<List
								lista={this.state.list}
								btnDeleteClicked={this.btnDeleteClicked}
								done={this.state.done}
								checkBox={this.checkBox}
							/>
							<div>
								{this.state.list.length == 1 ? (
									<>
										Tiene{" "}
										<strong>
											{this.state.list.length} Tarea por
											hacer{" "}
										</strong>
									</>
								) : (
									<>
										Tienes{" "}
										<strong>
											{this.state.list.length} Tareas por
											hacer{" "}
										</strong>
									</>
								)}
							</div>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
