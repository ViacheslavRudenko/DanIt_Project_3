import Visit from "./visit.js";
import { item } from "./main.js";
export default class VisitDentist extends Visit {
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
    //item++;
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
