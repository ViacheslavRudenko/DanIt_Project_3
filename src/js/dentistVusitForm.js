import VisitForm from "./visitForm.js";

export default class DentistVisitForm extends VisitForm {
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
