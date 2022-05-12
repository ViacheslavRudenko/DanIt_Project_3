const body = document.querySelector("body");
const mainBox = document.querySelector(".main-content");
const btnLogIn = document.querySelector(".header-container__btn .btn");
const btnCreatVisit = document.querySelector(".creat-visit-btn");
const token = "8fb8e795-7b38-46c3-9c84-d3f2588a2d5f";

let visitDentist;
let visitCardiologist;
let visitTherapist;

let item = 0;

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
        mainBox.innerHTML = `<div class='no-items'> No items have been added</div>`;
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
let cardioVisitModal;
let dentistVisitModal;
let therapistVisitModal;
class VisitForm extends Form {
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
    // this.getFormCloseAction();
  }
}

btnCreatVisit.addEventListener("click", () => {
  btnCreatVisit.disabled = true;
  const doctorsBox = document.createElement("div");
  doctorsBox.classList.add("doctors-box");
  doctorsBox.innerHTML = `<div class="items-doctors">Выберите врача</div>
  <ul class="select-list-doctors">
    <a class="select-list-doctors__link cardio-doctor" href="#"><li >Кардиолог</li></a>
    <a class="select-list-doctors__link dentist" href="#"><li>Стоматолог</li></a>
    <a class="select-list-doctors__link therapist" href="#"><li>Терапевт</li></a>
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
    if (e.target.closest(".cardio-doctor")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      cardioVisitModal = new CardioVisitForm();
      selectedDoctor = "cardioVisitModal";
      cardioVisitModal.render();
    } else if (e.target.closest(".dentist")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      dentistVisitModal = new DentistVisitForm();
      selectedDoctor = "dentistVisitModal";
      dentistVisitModal.render();
    } else if (e.target.closest(".therapist")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      therapistVisitModal = new TherapistVisitForm();
      selectedDoctor = "therapistVisitModal";
      therapistVisitModal.render();
    }

    const creatVisitBtn = document.querySelector(".creat-visit");
    creatVisitBtn.addEventListener("click", (e) => {
      const creatError = document.querySelector(".check-inputs-value");
      const inputsNode = document.querySelectorAll(".forms-inputs__item");
      const inputsArr = [...inputsNode];
      inputsArr.every((e) => {
        if (e.value === "") {
          creatError.style.display = "block";
          return false;
        } else {
          creatError.style.display = "none";
          return true;
        }
      });
      if (creatError.style.display == "none") {
        const formVisitBox = document.querySelector(".modal-content ");
        // formVisitBox..display = "none";
        // body.style.overflow = "visible";
        // btnCreatVisit.disabled = false;

        if (selectedDoctor == "therapistVisitModal") {
          therapistVisitModal.getInputData(); // тут нужно создавать обьект карточки
          visitTherapist = new VisitTherapist();
          doctorAPIService.createCard(therapistVisitModal);
          document.querySelector(".modal").remove();
          if (document.querySelector(".no-items"))
            document.querySelector(".no-items").remove();
        }
        if (selectedDoctor == "dentistVisitModal") {
          dentistVisitModal.getInputData();
          visitDentist = new VisitDentist();
          doctorAPIService.createCard(dentistVisitModal);
          document.querySelector(".modal").remove();
          if (document.querySelector(".no-items"))
            document.querySelector(".no-items").remove();
        }
        if (selectedDoctor == "cardioVisitModal") {
          cardioVisitModal.getInputData();
          visitCardiologist = new VisitCardiologist();
          doctorAPIService.createCard(cardioVisitModal);
          document.querySelector(".modal").remove();
          if (document.querySelector(".no-items"))
            document.querySelector(".no-items").remove();
        }
      }
    });
  });
});

class DoctorAPIService extends Component {
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
          visitTherapist.render(response);
        }
        if (response.doctor == "Dentist") {
          visitDentist.render(response);
        }
        if (response.doctor == "Сardiologist") {
          visitCardiologist.render(response);
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
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        response.forEach((elem) => {
          // тут нужно показывать все карточки при авторизации
        });
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
  changeCard(cardId, name, purpose, description, age) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        age: age,
        description: description,
        name: name,
        purpose: purpose,
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  }
}

class Visit extends Component {
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
  getID(response) {
    this.id = response.id;
  }
  getDoctor(response) {
    this.doctor = response.doctor;
  }
  showCard() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(".main-content");
    this
      .createElement(`<div data-item=${item}  class='visit-dentist-card visit-card-element'>
    <div   class='delete-card delete-card-${item}'> X </div>
    <div class='name'>Имя: ${this.name}</div>
    <div class='visit-doctor'>Доктор: ${this.doctor}</div> 

    </div>`);
  }
  createBtnShowMore() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(
      `.visit-dentist-card[data-item="${item}"]`
    );
    this.createElement(`
    <button data-item=${item} type='submit' class='show-more'>Показать больше</button>
    `);
    this.btnShowMore = document.querySelector(
      `.show-more[data-item="${item}"]`
    );
    this.btnShowMore.addEventListener("click", () => {
      this.createElement(`
      <div class='purpose'>Цель визита: ${this.purpose}</div>
      <div class='description'>Описание визита: ${this.description}</div>
      <div class='lastVisit'>Последний визит: ${this.lastVisit}</div>
      <div class='visit-number'>Номер визита: ${this.id}</div>  
      <button type='submit' class = 'edit edit-card-${item}'>Редактировать</button>
      `);
      this.btnShowMore.remove();
      this.editCard();
    });
  }
  deleteCard() {
    this.delete = document.querySelector(`.delete-card-${item}`);
    this.delete.addEventListener("click", () => {
      this.delete.parentNode.remove();
    });
    item++;
  }
  editCard() {
    this.edit = document.querySelector(`.edit-card-${item}`);
    this.edit.addEventListener("click", () => {
      this.edit.parentNode.remove();
      const editCardForm = new EditCardFormDentist();
      editCardForm.render(this.id);
    });
  }
  render(response) {
    this.getID(response);
    this.getDoctor(response);
    this.renderDefaultVisit(response);
    this.getLastVisit(response);
    this.showCard();
    this.createBtnShowMore();
    this.deleteCard();
  }
}
class VisitCardiologist extends Visit {
  getPressure(response) {
    this.pressure = response.pressure;
  }
  getID(response) {
    this.id = response.id;
  }
  getDoctor(response) {
    this.doctor = response.doctor;
  }
  getDiseases(response) {
    this.diseases = response.diseases;
  }
  getAge(response) {
    this.age = response.age;
  }
  showCard() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(".main-content");
    this
      .createElement(`<div data-item=${item}  class='visit-cardiologist-card visit-card-element'>
    <div   class='delete-card delete-card-${item}'> X </div>
    <div class='name'>Имя: ${this.name}</div>
    <div class='visit-doctor'>Доктор: ${this.doctor}</div>  
    </div>`);
  }
  createBtnShowMore() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(
      `.visit-cardiologist-card[data-item="${item}"]`
    );
    this.createElement(`
    <button data-item=${item} type='submit' class='show-more'>Показать больше</button>
    `);
    this.btnShowMore = document.querySelector(
      `.show-more[data-item="${item}"]`
    );
    this.btnShowMore.addEventListener("click", () => {
      this.createElement(`
      <div class='purpose'>Обычное давление: ${this.pressure}</div>
      <div class='description'>Описание визита: ${this.description}</div>
      <div class='purpose'>Цель визита: ${this.purpose}</div>
      <div class='diseases'>Перенесенные заболевания сердечно-сосудистой системы: ${this.diseases}</div>
      <div class='age'>Возраст: ${this.age}</div>
      <div class='visit-number'>Номер визита: ${this.id}</div>  
      <button type='submit' class = 'edit edit-card-${item}'>Редактировать</button>
      `);
      this.btnShowMore.remove();
      this.editCard();
    });
  }
  deleteCard() {
    this.delete = document.querySelector(`.delete-card-${item}`);
    this.delete.addEventListener("click", () => {
      this.delete.parentNode.remove();
    });
    item++;
  }
  editCard() {
    this.edit = document.querySelector(`.edit-card-${item}`);
    this.edit.addEventListener("click", () => {
      this.edit.parentNode.remove();
      const editCardForm = new EditCardFormCardiologist();
      editCardForm.render(this.id);
      console.log(1); // тут редактируем изминения
    });
  }
  render(response) {
    this.getID(response);
    this.getDoctor(response);
    this.renderDefaultVisit(response);
    this.getPressure(response);
    this.getDiseases(response);
    this.getAge(response);
    this.showCard();
    this.createBtnShowMore();
    this.deleteCard();
  }
}
class VisitTherapist extends Visit {
  getAge(response) {
    this.age = response.age;
  }
  getID(response) {
    this.id = response.id;
  }
  getDoctor(response) {
    this.doctor = response.doctor;
  }
  showCard() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(".main-content");
    this
      .createElement(`<div data-item=${item}  class='visit-therapist-card visit-card-element'>
    <div   class='delete-card delete-card-${item}'> X </div>
    <div class='name'>Имя: ${this.name}</div>
    <div class='visit-doctor'>Доктор: ${this.doctor}</div>  
    </div>`);
  }
  createBtnShowMore() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(
      `.visit-therapist-card[data-item="${item}"]`
    );
    this.createElement(`
    <button data-item=${item} type='submit' class='show-more'>Показать больше</button>
    `);
    this.btnShowMore = document.querySelector(
      `.show-more[data-item="${item}"]`
    );
    this.btnShowMore.addEventListener("click", () => {
      this.createElement(`
      <div class='purpose'>Цель визита: ${this.purpose}</div>
      <div class='description'>Описание визита: ${this.description}</div>
      <div class='lastVisit'>Возраст: ${this.age}</div>
      <div class='visit-number'>Номер визита: ${this.id}</div>  
      <button type='submit' class = 'edit edit-card-${item}'>Редактировать</button>
      `);
      this.btnShowMore.remove();
      this.editCard();
    });
  }
  deleteCard() {
    this.delete = document.querySelector(`.delete-card-${item}`);
    this.delete.addEventListener("click", () => {
      doctorAPIService.deleteCard(this.id);
      this.delete.parentNode.remove();
    });
    item++;
  }
  editCard() {
    this.edit = document.querySelector(`.edit-card-${item}`);
    this.edit.addEventListener("click", () => {
      this.edit.parentNode.remove();
      const editCardForm = new EditCardFormTherapist();
      editCardForm.render(this.id);
      console.log(1); // тут редактируем изминения
    });
  }
  render(response) {
    this.getID(response);
    this.getDoctor(response);
    this.renderDefaultVisit(response);
    this.getAge(response);
    this.showCard();
    this.createBtnShowMore();
    this.deleteCard();
  }
}
class EditCardFormDentist extends Form {
  createEditForm() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(".form-data");
    this.createElement(`
      <div class = 'edit-name'>Измените имя:</div>
      <input type"text" class='edit-name-input'>
      <div class = 'edit-purpose'>Измените цель визита:</div>
      <input type"text" class='edit-purpose-input'>
      <div class = 'edit-description'>Измените описание визита:</div>
      <input type"text" class='edit-description-input'>
      <div class = 'edit-lastVisit'>Измените дату последнего визита:</div>
      <input type"text" class='edit-lastVisit-input'>
      <button type='submit' class='edit-card-btn btn'>Редактировать изменения</button>
    `);
  }
  trackEditBtn(id) {
    // this.position = "beforeend";
    // this.parentElement = document.querySelector(
    //   `.visit-therapist-card[data-item="${item}"]`
    // );
    console.log(id);
    this.editBtn = document.querySelector(".edit-card-btn");
    this.editBtn.addEventListener("click", () => {
      this.editName = document.querySelector(".edit-name-input").value;
      this.editPurpose = document.querySelector(".edit-purpose-input").value;
      this.editDescription = document.querySelector(
        ".edit-description-input"
      ).value;
      this.lastVisit = document.querySelector(".edit-lastVisit-input").value;
      doctorAPIService.changeCard(
        id,
        this.editName,
        this.editPurpose,
        this.editDescription,
        this.lastVisit
      );
      this.position = "beforeend";
      this.parentElement = document.querySelector(".main-content");
      this
        .createElement(`<div data-item=${item}  class='visit-therapist-card visit-card-element'>
      <div class='delete-card delete-card-${item}'> X </div>
      <div class='name'>Имя: ${this.editName}</div>
      <div class='visit-doctor'>Доктор: Dentist</div>  
      <div class='purpose'>Цель визита: ${this.editPurpose}</div>
      <div class='description'>Описание визита: ${this.editDescription}</div>
      <div class='lastVisit'>Возраст: ${this.lastVisit}</div>
      <div class='visit-number'>Номер визита: ${id}</div>  
      </div>`);
      this.delete = document.querySelector(`.delete-card-${item}`);
      this.delete.addEventListener("click", () => {
        doctorAPIService.deleteCard(id);
        this.delete.parentNode.remove();
      });
      item++;
      document.querySelector(".form-data").remove();
    });
  }
  render(id) {
    this.renderDefaultForm();
    this.createEditForm();
    this.trackEditBtn(id);
  }
}
class EditCardFormTherapist extends Form {
  createEditForm() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(".form-data");
    this.createElement(`
      <div class = 'edit-name'>Измените имя:</div>
      <input type"text" class='edit-name-input'>
      <div class = 'edit-purpose'>Измените цель визита:</div>
      <input type"text" class='edit-purpose-input'>
      <div class = 'edit-description'>Измените описание визита:</div>
      <input type"text" class='edit-description-input'>
      <div class = 'edit-age'>Измените возраст:</div>
      <input type"text" class='edit-age-input'>
      <button type='submit' class='edit-card-btn btn'>Редактировать изменения</button>
    `);
  }
  trackEditBtn(id) {
    // this.position = "beforeend";
    // this.parentElement = document.querySelector(
    //   `.visit-therapist-card[data-item="${item}"]`
    // );
    console.log(id);
    this.editBtn = document.querySelector(".edit-card-btn");
    this.editBtn.addEventListener("click", () => {
      this.editName = document.querySelector(".edit-name-input").value;
      this.editPurpose = document.querySelector(".edit-purpose-input").value;
      this.editDescription = document.querySelector(
        ".edit-description-input"
      ).value;
      this.editAge = document.querySelector(".edit-age-input").value;
      doctorAPIService.changeCard(
        id,
        this.editName,
        this.editPurpose,
        this.editDescription,
        this.editAge
      );
      this.position = "beforeend";
      this.parentElement = document.querySelector(".main-content");
      this
        .createElement(`<div data-item=${item}  class='visit-therapist-card visit-card-element'>
      <div class='delete-card delete-card-${item}'> X </div>
      <div class='name'>Имя: ${this.editName}</div>
      <div class='visit-doctor'>Доктор: Therapist</div>  
      <div class='purpose'>Цель визита: ${this.editPurpose}</div>
      <div class='description'>Описание визита: ${this.editDescription}</div>
      <div class='lastVisit'>Возраст: ${this.editAge}</div>
      <div class='visit-number'>Номер визита: ${id}</div>  
      </div>`);
      this.delete = document.querySelector(`.delete-card-${item}`);
      this.delete.addEventListener("click", () => {
        doctorAPIService.deleteCard(id);
        this.delete.parentNode.remove();
      });
      item++;
      document.querySelector(".form-data").remove();
    });
  }
  render(id) {
    this.renderDefaultForm();
    this.createEditForm();
    this.trackEditBtn(id);
  }
}
class EditCardFormCardiologist extends Form {
  createEditForm() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(".form-data");
    this.createElement(`
      <div class = 'edit-name'>Измените имя:</div>
      <input type"text" class='edit-name-input'>
      <div class = 'edit-purpose'>Измените цель визита:</div>
      <input type"text" class='edit-purpose-input'>
      <div class = 'edit-description'>Измените описание визита:</div>
      <input type"text" class='edit-description-input'>
      <div class = 'edit-age'>Измените возраст:</div>
      <input type"text" class='edit-age-input'>
      <div class = 'edit-diseases'>Измените заболевания:</div>
      <input type"text" class='edit-diseases-input'>
      <div class = 'edit-pressure'>Измените давление:</div>
      <input type"text" class='edit-pressure-input'>
      <button type='submit' class='edit-card-btn btn'>Редактировать изменения</button>
    `);
  }
  trackEditBtn(id) {
    // this.position = "beforeend";
    // this.parentElement = document.querySelector(
    //   `.visit-therapist-card[data-item="${item}"]`
    // );
    console.log(id);
    this.editBtn = document.querySelector(".edit-card-btn");
    this.editBtn.addEventListener("click", () => {
      this.editName = document.querySelector(".edit-name-input").value;
      this.editPurpose = document.querySelector(".edit-purpose-input").value;
      this.editDescription = document.querySelector(
        ".edit-description-input"
      ).value;
      this.editAge = document.querySelector(".edit-age-input").value;
      this.editDiseases = document.querySelector(".edit-diseases-input").value;
      this.editPressure = document.querySelector(".edit-pressure-input").value;
      doctorAPIService.changeCard(
        id,
        this.editName,
        this.editPurpose,
        this.editDescription,
        this.editAge,
        this.editDiseases,
        this.editPressure
      );
      this.position = "beforeend";
      this.parentElement = document.querySelector(".main-content");
      this
        .createElement(`<div data-item=${item}  class='visit-therapist-card visit-card-element'>
      <div class='delete-card delete-card-${item}'> X </div>
      <div class='name'>Имя: ${this.editName}</div>
      <div class='visit-doctor'>Доктор: Therapist</div>  
      <div class='purpose'>Цель визита: ${this.editPurpose}</div>
      <div class='description'>Описание визита: ${this.editDescription}</div>
      <div class='lastVisit'>Возраст: ${this.editAge}</div>
      <div class='visit-number'>Номер визита: ${id}</div>  
      <div class='editDiseases'>Перенесенные заболевания сердечно-сосудистой системы:: ${this.editDiseases}</div>
      <div class='editPressure'>Давление: ${this.editPressure}</div>
      </div>`);
      this.delete = document.querySelector(`.delete-card-${item}`);
      this.delete.addEventListener("click", () => {
        doctorAPIService.deleteCard(id);
        this.delete.parentNode.remove();
      });
      item++;
      document.querySelector(".form-data").remove();
    });
  }
  render(id) {
    this.renderDefaultForm();
    this.createEditForm();
    this.trackEditBtn(id);
  }
}

const doctorAPIService = new DoctorAPIService();
