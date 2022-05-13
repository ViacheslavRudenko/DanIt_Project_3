import VisitForm from "./visitForm.js";
export default class TherapistVisitForm extends VisitForm {
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
    this.checkValueAge();
  }
}
