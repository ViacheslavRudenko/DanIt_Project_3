import VisitForm from "./visitForm.js";
export default class CardioVisitForm extends VisitForm {
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

  checkValueAge() {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.inValidAge = this.createElement(
      `<div class="invalid-age-box">
          <p class="invalid-age-box__text">Введите корректный возраст</p>
            </div>`
    );
    return this.inValidAge;
  }

  checkValuePressure() {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.inValidPressure = this.createElement(
      `<div class="invalid-pressure-box">
          <p class="invalid-pressure-box__text">Введите давление в числовом формате в диапазоне от 50 до 160</p>
            </div>`
    );
    return this.inValidPressure;
  }

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
    this.checkValueAge();
    this.checkValuePressure();
  }
}
