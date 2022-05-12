import Form from "./form.js";

export default class VisitForm extends Form {
  createDoctorsSelect = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputDoctors = this.createElement(
      `<div class="forms-inputs mb-4">
          <div class="items-doctors ">Выберите врача:</div>
          <ul class="select-list-doctors ">
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