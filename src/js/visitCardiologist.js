import Visit from "./visit.js";
import { item } from "./main.js";

import EditCardFormCardiologist from "./editCardFormCardiologist.js";

export default class VisitCardiologist extends Visit {
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
      .createElement(`<div data-item=${this.id}  class='visit-cardiologist-card visit-card-element'>
      <div   class='delete-card delete-card-${this.id}'> X </div>
      <div class='name'>Имя: ${this.name}</div>
      <div class='visit-doctor'>Доктор: ${this.doctor}</div>  
      </div>`);
  }
  createBtnShowMore() {
    this.position = "beforeend";
    this.parentElement = document.querySelector(
      `.visit-cardiologist-card[data-item="${this.id}"]`
    );
    this.createElement(`
      <button data-item=${this.id} type='submit' class='show-more'>Показать больше</button>
      `);
    this.btnShowMore = document.querySelector(
      `.show-more[data-item="${this.id}"]`
    );
    this.btnShowMore.addEventListener("click", () => {
      this.createElement(`
        <div class='purpose'>Обычное давление: ${this.pressure}</div>
        <div class='description'>Описание визита: ${this.description}</div>
        <div class='purpose'>Цель визита: ${this.purpose}</div>
        <div class='diseases'>Перенесенные заболевания сердечно-сосудистой системы: ${this.diseases}</div>
        <div class='age'>Возраст: ${this.age}</div>
        <div class='visit-number'>Номер визита: ${this.id}</div>  
        <button type='submit' class = 'edit edit-card-${this.id}'>Редактировать</button>
        `);
      this.btnShowMore.remove();
      this.editCard();
    });
  }
  deleteCard() {
    this.delete = document.querySelector(`.delete-card-${this.id}`);
    this.delete.addEventListener("click", () => {
      this.delete.parentNode.remove();
    });
    //item++;
  }
  editCard() {
    this.edit = document.querySelector(`.edit-card-${this.id}`);
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
