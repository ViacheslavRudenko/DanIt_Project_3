const body = document.querySelector("body");
const mainBox = document.querySelector(".main-content");
const btnLogIn = document.querySelector(".header-container__btn .btn");
const btnCreatVisit = document.querySelector(".creat-visit-btn");
const token = "ce156da3-d189-40b2-b87d-6d98918eb367";
let visitDentist;
let visitCardiologist;
let visitTherapist;

class Component {
  constructor(parentElement, position) {
    this.parentElement = parentElement;
    this.position = position;
  }
  createElement(newElem) {
    if (typeof newElem === "string") {
      this.parentElement.insertAdjacentHTML(this.position, newElem);
    } else if (typeof newElem === "object") {
      this.tagName = newElem.tagName;
      this.classNames = newElem.classNames;
      this.parentElement = newElem.parentElement;
      this.content = newElem.content;
      this.values = newElem.values;
      this.key = newElem.key;
      this.position = newElem.position;
      this.createElementbyObj();
    }
    return this.element;
  }

  createElementbyObj() {
    this.element = document.createElement(this.tagName);
    this.parentElement.append(this.element);

    this.position === "prepend"
      ? this.parentElement.prepend(this.element)
      : this.parentElement.append(this.element);

    if (this.values && this.key) {
      this.element.setAttribute(this.key, this.values);
    }
    if (this.classNames) {
      Array.isArray(this.classNames)
        ? this.element.classList.add(...this.classNames)
        : this.element.classList.add(this.classNames);
    }

    if (this.content) {
      this.element.innerHTML = this.content;
    }

    return this.element;
  }
}

class Form extends Component {
  createForm = () => {
    this.position = "beforeend";
    this.parentElement = body;
    this.createElement(` <div
                          class="modal fade show form-box"
                          tabindex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content form-box__item"></div>
                          </div>
                        </div>`);
    this.formBoxItem = document.querySelector(".form-box__item");
    body.style.overflow = "hidden";
    return this.formBoxItem;
  };

  createFormClose = () =>
    (this.btnClose = this.createElement({
      tagName: "div",
      classNames: "form-box__close",
      parentElement: this.formBoxItem,
    }));

  createFormCloseBtn = () =>
    (this.btnCloseBtn = this.createElement({
      tagName: "button",
      classNames: ["form-box__close__btn"],
      parentElement: this.btnClose,
      content: "X",
    }));

  getFormClose() {
    this.formBox = document.querySelector(".form-box");
    this.formBox.addEventListener("click", (e) => {
      e.preventDefault();

      if (
        !e.target.closest(".modal-content") ||
        e.target.closest(".form-box__close__btn")
      ) {
        this.getFormCloseAction();
      }
    });
  }

  getFormCloseAction() {
    this.formBox = document.querySelector(".form-box");
    this.formBox.remove();
    body.style.overflow = "visible";
  }

  createInputBox = () =>
    (this.inputBox = this.createElement({
      tagName: "div",
      classNames: ["form-data"],
      parentElement: this.formBoxItem,
    }));

  renderDefaultForm() {
    this.createForm();
    this.createFormClose();
    this.createFormCloseBtn();
    this.createInputBox();
    this.getFormClose();
  }
}

class LogInForm extends Form {
  createInputEmail = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputLogin = this.createElement(
      `<div class="forms-inputs mb-4">
      <span>Email or username</span>
      <input
        autocomplete="off"
        type="text"
        v-model="login"
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
    }));

  createInputPassword = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputPassword = this.createElement(
      `<div class="forms-inputs mb-4">
      <span>Password</span>
      <input
        autocomplete="off"
        type="password"
        v-model="password"
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
      const login = this.formBoxItem.querySelector(`input[v-model="login"]`);
      const password = this.formBoxItem.querySelector(
        `input[v-model="password"]`
      );
      const isLoginValid = login.value.length <= 6;
      const isPasswordValid = password.value.length < 8;
      this.checkValue(isLoginValid, login);
      this.checkValue(isPasswordValid, password);
      this.isData = this.checkValidData(login, password);
      if (this.dataValue) {
        btnLogIn.remove();
        btnCreatVisit.style.display = "block";
        mainBox.innerHTML = "No items have been added";
      }
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

let passObj = [
  { login: "admin@gmail.com", password: "qwerty123" },
  { login: "user@gmail.com", password: "12345678" },
  { login: "moderator@gmail.com", password: "87654321" },
  { login: "admin", password: "qwerty123" },
];

const logIn = new LogInForm();

btnLogIn.addEventListener("click", (e) => {
  e.preventDefault();
  logIn.render();
});

//------------- visit modal ------------------
class VisitForm extends Form {
  createDoctorsSelect = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputDoctors = this.createElement(
      `<div class="forms-inputs mb-4">
        <div class="items-doctors">Выберите врача:</div>
        <ul class="select-list-doctors">
          <a class="select-list-doctors__link" href="#"><li class="cardio-doctor">Кардиолог</li></a>
          <a class="select-list-doctors__link" href="#"><li class="dentist">Стоматолог</li></a>
          <a class="select-list-doctors__link" href="#"><li class="therapist">Терапевт</li></a>
        </ul>
      </div>`
    );
    return this.formInputDoctors;
  };

  createVisitSubmit = () =>
    (this.formSubmit = this.createElement({
      tagName: "button",
      classNames: ["form-box__submit", "creat-visit", "btn"],
      parentElement: this.formBoxItem,
      content: "Создать",
    }));

  createInputPurpose = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputPurpose = this.createElement(
      `<div class="forms-inputs mb-4">
          <input class="forms-inputs__item purpose-input"
            placeholder="Цель визита"
            autocomplete="off"
            type="text"
          />
        </div>`
    );
    return this.formInputPassword;
  };

  createInputDescription = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputDescription = this.createElement(
      `<div class="forms-inputs mb-4">
          <input class="forms-inputs__item description-visit-input"
            placeholder="Описание визита"
            autocomplete="off"
            type="text"
          />
        </div>`
    );
    return this.formInputDescription;
  };

  createInputName = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputName = this.createElement(
      `<div class="forms-inputs mb-4">
          <input class="forms-inputs__item name-input"
            placeholder="ФИО"
            autocomplete="off"
            type="text"
          />
        </div>`
    );
    return this.formInputName;
  };

  createCheckInputsValues() {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.checkValuesBox = this.createElement(
      `<div class="check-inputs-value">
          <p class="check-inputs-value__text">Заполните все поля</p>
        </div>`
    );
    return this.checkValuesBox;
  }

  render() {
    this.renderDefaultForm();
    this.createDoctorsSelect();
  }
}

class CardioVisitForm extends VisitForm {
  createInputPressure = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputPressure = this.createElement(
      `<div class="forms-inputs mb-4">
          <input class="forms-inputs__item pressure-input"
            placeholder="Обычное давление"
            autocomplete="off"
            type="text"
          />
        </div>`
    );
    return this.formInputPressure;
  };

  createInputDiseases = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputDiseases = this.createElement(
      `<div class="forms-inputs mb-4">
          <input class="forms-inputs__item diseases-input"
            placeholder="Перенесенные заболевания"
            autocomplete="off"
            type="text"
          />
        </div>`
    );
    return this.formInputDiseases;
  };

  createInputAge = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputAge = this.createElement(
      `<div class="forms-inputs mb-4">
          <input class="forms-inputs__item age-input"
            placeholder="Возраст"
            autocomplete="off"
            type="text"
          />
        </div>`
    );
    return this.formInputAge;
  };

  getInputData() {
    this.doctor = "Сardiologist";
    this.purpose = document.querySelector(".purpose-input").value;
    this.descriptionVisit = document.querySelector(
      ".description-visit-input"
    ).value;
    this.name = document.querySelector(".name-input").value;
    this.age = document.querySelector(".age-input").value;
    this.pressure = document.querySelector(".pressure-input").value;
    this.diseases = document.querySelector(".diseases-input").value;
  }

  render() {
    this.renderDefaultForm();
    this.createInputPurpose();
    this.createInputDescription();
    this.createInputName();
    this.createInputPressure();
    this.createInputDiseases();
    this.createInputAge();
    this.createVisitSubmit();
    this.createCheckInputsValues();
  }
}

class DentistVisitForm extends VisitForm {
  createInputLastVisit = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputLastVisit = this.createElement(
      `<div class="forms-inputs mb-4">
          <input class="forms-inputs__item last-visit-input"
            placeholder="Дата последнего визита"
            autocomplete="off"
            type="text"
          />
        </div>`
    );
    return this.formInputLastVisit;
  };
  getInputData() {
    this.doctor = "Dentist";
    this.purpose = document.querySelector(".purpose-input").value;
    this.descriptionVisit = document.querySelector(
      ".description-visit-input"
    ).value;
    this.name = document.querySelector(".name-input").value;
    this.lastVisit = document.querySelector(".last-visit-input").value;
  }
  render() {
    this.renderDefaultForm();
    this.createInputPurpose();
    this.createInputDescription();
    this.createInputName();
    this.createInputLastVisit();
    this.createVisitSubmit();
    this.createCheckInputsValues();
  }
}

class TherapistVisitForm extends VisitForm {
  createInputAge = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputAge = this.createElement(
      `<div class="forms-inputs mb-4">
          <input class="forms-inputs__item age-input"
            placeholder="Возраст"
            autocomplete="off"
            type="text"
          />
        </div>`
    );
    return this.formInputAge;
  };
  getInputData() {
    this.doctor = "Therapist";
    this.purpose = document.querySelector(".purpose-input").value;
    this.descriptionVisit = document.querySelector(
      ".description-visit-input"
    ).value;
    this.name = document.querySelector(".name-input").value;
    this.age = document.querySelector(".age-input").value;
  }
  render() {
    this.renderDefaultForm();
    this.createInputPurpose();
    this.createInputDescription();
    this.createInputName();
    this.createInputAge();
    this.createVisitSubmit();
    this.createCheckInputsValues();
  }
}
let cardioVisitModal;
let dentistVisitModal;
let therapistVisitModal;

btnCreatVisit.addEventListener("click", () => {
  btnCreatVisit.disabled = true;
  const doctorsBox = document.createElement("div");
  doctorsBox.classList.add("doctors-box");
  doctorsBox.innerHTML = `<div class="items-doctors">Выберите врача</div>
  <ul class="select-list-doctors">
    <a class="select-list-doctors__link" href="#"><li class="cardio-doctor">Кардиолог</li></a>
    <a class="select-list-doctors__link" href="#"><li class="dentist">Стоматолог</li></a>
    <a class="select-list-doctors__link" href="#"><li class="therapist">Терапевт</li></a>
  </ul>`;
  mainBox.append(doctorsBox);

  const doctors = document.querySelector(".items-doctors");

  const selectDoctorsList = document.querySelector(".select-list-doctors");
  doctors.addEventListener("click", () => {
    if (doctors.classList.contains("menu") == false) {
      doctors.classList.add("menu");
      selectDoctorsList.style.display = "block";
    } else {
      doctors.classList.remove("menu");
      selectDoctorsList.style.display = "none";
    }
  });
  let selectedDoctor;
  selectDoctorsList.addEventListener("click", (e) => {
    // delete
    if (e.target.classList.contains("cardio-doctor")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      cardioVisitModal = new CardioVisitForm();
      selectedDoctor = "cardioVisitModal";
      cardioVisitModal.render();
    } else if (e.target.classList.contains("dentist")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      dentistVisitModal = new DentistVisitForm();
      selectedDoctor = "dentistVisitModal";
      dentistVisitModal.render();
    } else if (e.target.classList.contains("therapist")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      therapistVisitModal = new TherapistVisitForm();
      selectedDoctor = "therapistVisitModal";
      therapistVisitModal.render();
    }

    // const modalBox = document.querySelector(".modal-content");
    const creatVisitBtn = document.querySelector(".creat-visit");
    const creatError = document.querySelector(".check-inputs-value");
    creatVisitBtn.addEventListener("click", (e) => {
      const inputsNode = document.querySelectorAll(".forms-inputs__item");
      const inputsArr = [...inputsNode];
      inputsArr.forEach((e) => {
        if (e.value === "") {
          creatError.style.display = "block";
        } else {
          creatError.style.display = "none";
        }
      });
      if (creatError.style.display == "none") {
        if (selectedDoctor == "therapistVisitModal") {
          therapistVisitModal.getInputData();
          console.log(therapistVisitModal);
          doctorAPIService.createCard(therapistVisitModal);
        }
        if (selectedDoctor == "dentistVisitModal") {
          dentistVisitModal.getInputData();
          console.log(dentistVisitModal);
          doctorAPIService.createCard(dentistVisitModal);
        }
        if (selectedDoctor == "cardioVisitModal") {
          cardioVisitModal.getInputData();
          console.log(cardioVisitModal);
          doctorAPIService.createCard(cardioVisitModal);
        }
      }
    });
  });
});

class DoctorAPIService {
  createCard(obj) {
    fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        purpose: obj.purpose,
        description: obj.descriptionVisit,
        name: obj.name,
        doctor: obj.doctor,
        pressure: obj.pressure,
        diseases: obj.diseases,
        age: obj.age,
        lastVisit: obj.lastVisit,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.doctor == "Therapist") {
          visitTherapist = new VisitTherapist();
          visitTherapist.render(response);
          console.log(visitTherapist);
        }
        if (response.doctor == "Dentist") {
          visitDentist = new VisitDentist();
          visitDentist.render(response);
          console.log(visitDentist);
        }
        if (response.doctor == "Cardiologist") {
          visitCardiologist = new VisitCardiologist();
          visitCardiologist.render(response);
          console.log(visitCardiologist);
        }
      });
  }
  deleteCard(cardId) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getAllCreatedCards() {
    fetch(`https://ajax.test-danit.com/api/v2/cards`, {
      method: "GET ",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  getOneCard(cardId) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  changeCard(cardId) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        // вносить изменения, пока хз как
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  }
}

class Visit {
  getName(response) {
    this.name = response.name;
  }
  getPurpose(response) {
    this.purpose = response.purpose;
  }
  getDescription(response) {
    this.description = response.description;
  }
  renderDefaultVisit(response) {
    this.getName(response);
    this.getPurpose(response);
    this.getDescription(response);
  }
}
class VisitDentist extends Visit {
  getLastVisit(response) {
    this.lastVisit = response.lastVisit;
  }
  render(response) {
    this.renderDefaultVisit(response);
    this.getLastVisit(response);
  }
}
class VisitCardiologist extends Visit {
  getPressure(response) {
    this.pressure = response.pressure;
  }
  getDiseases(response) {
    this.diseases = response.diseases;
  }
  getAge(response) {
    this.age = response.age;
  }
  render(response) {
    this.renderDefaultVisit(response);
    this.getPressure(response);
    this.getDiseases(response);
    this.getAge(response);
  }
}
class VisitTherapist extends Visit {
  getAge(response) {
    this.age = response.age;
  }
  render(response) {
    this.renderDefaultVisit(response);
    this.getAge(response);
  }
}

const doctorAPIService = new DoctorAPIService();
