import DoctorAPIService from "./doctorAPIService.js";
import Form from "./form.js";
import { doctorAPIService } from "./main.js";

export default class EditCardFormDentist extends Form {
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
        <button type='submit' class='btn edit-card-btn'>Редактировать</button>
      `);
  }
  trackEditBtn(id) {
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
        this.lastVisit,
        (this.doctor = "Dentist")
      );
      this.position = "beforeend";
      this.parentElement = document.querySelector(".main-content");
      this
        .createElement(`<div data-item=${id}  class='visit-therapist-card visit-card-element'>
        <div class='delete-card delete-card-${id}'> X </div>
        <div class='name'>Имя: ${this.editName}</div>
        <div class='visit-doctor'>Доктор: Dentist</div>  
        <div class='purpose'>Цель визита: ${this.editPurpose}</div>
        <div class='description'>Описание визита: ${this.editDescription}</div>
        <div class='lastVisit'>Последний визит: ${this.lastVisit}</div>
        <div class='visit-number'>Номер визита: ${id}</div>  
        </div>`);
      this.delete = document.querySelector(`.delete-card-${id}`);
      this.delete.addEventListener("click", () => {
        doctorAPIService.deleteCard(id);
        this.delete.parentNode.remove();
      });
      document.querySelector(".form-data").remove();
    });
  }
  render(id) {
    this.renderDefaultForm();
    this.createEditForm();
    this.trackEditBtn(id);
  }
}
