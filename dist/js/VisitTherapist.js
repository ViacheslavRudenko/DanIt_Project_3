import Visit from "./visit.js";
import { item } from "./main.js";
export default class VisitTherapist extends Visit {
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
    // item++;
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
