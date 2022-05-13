export default class LogInForm extends Form {
  createInputEmail = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputLogin = this.createElement(
      `<div class="forms-inputs mb-4">
        <span>Email or username</span>
        <input
          autocomplete="off"
          type="text"
          id="login"
          v-bind:class="{'form-control':true, 'is-invalid' : !validEmail(login) && emailBlured}"
          v-on:blur="loginBlured = true"
        />
        <div class="invalid-feedback">A valid login is required!</div>
      </div>`
    );
    return this.formInputLogin;
  };

  createFormSubmit = () =>
    (this.formSubmit = this.createElement({
      tagName: "button",
      classNames: ["form-box__submit", "btn"],
      parentElement: this.formBoxItem,
      content: "Вход",
      key: "id",
      values: "submit_value",
    }));

  createInputPassword = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputPassword = this.createElement(
      `<div class="forms-inputs mb-4">
        <span>Password</span>
        <input
          id="password"
          autocomplete="off"
          type="password"
          v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}"
          v-on:blur="passwordBlured = true"
        />
        <div class="invalid-feedback">Password must be 8 character!</div>
      </div>
      <div class="invalid-data invalid-feedback">Invalid login or password!</div>`
    );
    return this.formInputPassword;
  };

  checkInput() {
    this.formSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      const login = document.getElementById(`login`);
      const password = document.getElementById(`password`);
      const isLoginValid = login.value.length <= 6;
      const isPasswordValid = password.value.length < 8;
      this.checkValue(isLoginValid, login);
      this.checkValue(isPasswordValid, password);
      this.isData = this.checkValidData(login, password);
      if (this.dataValue) {
        btnLogIn.remove();
        btnCreatVisit.style.display = "block";
      }
      doctorAPIService.getAllCreatedCards();
    });
  }

  checkValue(flag, el) {
    this.errElem = el.parentNode.querySelector(`.invalid-feedback`);
    if (flag) {
      this.errElem.style.display = "block";
    } else {
      this.errElem.style.display = "none";
      return true;
    }
  }

  checkValidData(login, password) {
    passObj.forEach((e) => {
      if (e.login === login.value && e.password === password.value) {
        localStorage.setItem("login", login.value);
        localStorage.setItem("password", password.value);
        localStorage.setItem("autoLogIn", true);
        this.getFormCloseAction();
        this.dataValue = true;

        return this.dataValue;
      } else {
        this.errElem =
          this.formBoxItem.parentNode.querySelector(`.invalid-data`);
        this.errElem.style.display = "block";
      }
      return true;
    });
  }

  render() {
    this.renderDefaultForm();
    this.createFormSubmit();
    this.createInputEmail();
    this.createInputPassword();

    this.checkInput();
  }
}

import {
  passObj,
  btnLogIn,
  btnCreatVisit,
  mainBox,
  doctorAPIService,
} from "./main.js";
import Form from "./form.js";
