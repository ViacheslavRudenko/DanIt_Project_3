// import {Component, Form} from "./main.js";

class VisitForm extends Form {
  createDoctorsSelect = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputDoctors = this.createElement(
      `<div class="forms-inputs mb-4">
        <span id="spa">Сладости (нажми меня)!</span>
        <ul>
            <li>Пирог</li>
            <li>Пончик</li>
            <li>Мед</li>
        </ul>
      </div>`
    );
    return this.formInputDoctors;
  };

  //   createInputPassword = () => {
  //     this.position = "beforeend";
  //     this.parentElement = this.inputBox;
  //     this.formInputPassword = this.createElement(
  //       `<div class="forms-inputs mb-4">
  //         <span>Password</span>
  //         <input
  //           autocomplete="off"
  //           type="password"
  //           v-model="password"
  //           v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}"
  //           v-on:blur="passwordBlured = true"
  //         />
  //         <div class="invalid-feedback">Password must be 8 character!</div>
  //       </div>
  //       <div class="invalid-data invalid-feedback">Invalid login or password!</div>`
  //     );
  //     return this.formInputPassword;
  //   };

  //   checkInput() {
  //     this.formSubmit.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       const login = this.formBoxItem.querySelector(`input[v-model="login"]`);
  //       const password = this.formBoxItem.querySelector(
  //         `input[v-model="password"]`
  //       );
  //       const isLoginValid = login.value.length <= 6;
  //       const isPasswordValid = password.value.length < 8;
  //       this.checkValue(isLoginValid, login);
  //       this.checkValue(isPasswordValid, password);
  //       this.isData = this.checkValidData(login, password);
  //       if (this.dataValue) {
  //         btnLogIn.remove();
  //         mainBox.innerHTML = "No items have been added";
  //       }
  //     });
  //   }

  //   checkValue(flag, el) {
  //     this.errElem = el.parentNode.querySelector(`.invalid-feedback`);
  //     if (flag) {
  //       this.errElem.style.display = "block";
  //     } else {
  //       this.errElem.style.display = "none";
  //       return true;
  //     }
  //   }

  //   checkValidData(login, password) {
  //     passObj.forEach((e) => {
  //       if (e.login === login.value && e.password === password.value) {
  //         this.getFormCloseAction();
  //         this.dataValue = true;
  //         return this.dataValue;
  //       } else {
  //         this.errElem =
  //           this.formBoxItem.parentNode.querySelector(`.invalid-data`);
  //         this.errElem.style.display = "block";
  //       }
  //       return true;
  //     });
  //   }

  render() {
    this.createDoctorsSelect();
    // this.renderDefaultForm();
    // this.createInputEmail();
    // this.createInputPassword();
    // this.checkInput();
  }
}

const visitForm = new VisitForm();

document.body.addEventListener("click", (e) => {
  console.log("hello");
  e.preventDefault();
  visitForm.render();
});

// console.log("hello");
