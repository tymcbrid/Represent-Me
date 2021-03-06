import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.css";
import axios from "axios";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    //request to server to add a new username/password
    axios
      .post("/api/login/", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful login");
          this.props.history.push("/landingPage");
        }
      })
      .catch((error) => {
        alert("Incorrect username or password");
        console.log("login error: ");
        console.log(error);
      });
  }
  render() {
    return (
      <div className="uk-container uk-overlay-default">
        <form className="uk-form-stacked">
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Email
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                id="form-stacked-text"
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="uk-margin uk-form-password">
            <label className="uk-form-label" htmlFor="form-stacked-text">
              Password
            </label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                id="form-stacked-text"
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <button
              className="uk-button login-button"
              onClick={this.handleSubmit}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(LogIn);
