//import { mainBox } from "./main.js";

export default class DragDrop {
  getDraggable() {
    this.tasksListElement = document.querySelector(".main-content");
    this.taskElements = document.querySelectorAll(".card-body");
    for (const task of this.taskElements) {
      task.draggable = true;
    }
    this.tasksListElement.addEventListener(`dragstart`, (evt) => {
      evt.target.classList.add(`selected`);
    });

    this.tasksListElement.addEventListener(`dragend`, (evt) => {
      evt.target.classList.remove(`selected`);
    });
  }

  getAction() {
    this.tasksListElement.addEventListener(`dragover`, (evt) => {
      evt.preventDefault();
      const activeElement = this.tasksListElement.querySelector(`.selected`);
      const currentElement = evt.target;
      const isMoveable =
        activeElement !== currentElement &&
        currentElement.classList.contains(`card-body`);
      if (!isMoveable) {
        return;
      }
      const nextElement =
        currentElement === activeElement.nextElementSibling
          ? currentElement.nextElementSibling
          : currentElement;
      this.tasksListElement.insertBefore(activeElement, nextElement);
    });
  }

  getChange() {
    this.tasksListElement.addEventListener(`dragover`, (evt) => {
      evt.preventDefault();
      const activeElement = this.tasksListElement.querySelector(`.selected`);
      const currentElement = evt.target;
      const isMoveable =
        activeElement !== currentElement &&
        currentElement.classList.contains(`card-body`);

      if (!isMoveable) {
        return;
      }
      const nextElement =
        currentElement === activeElement.nextElementSibling
          ? currentElement.nextElementSibling
          : currentElement;

      this.tasksListElement.insertBefore(activeElement, nextElement);
    });
    const getNextElement = (cursorPosition, currentElement) => {
      const currentElementCoord = currentElement.getBoundingClientRect();
      const currentElementCenter =
        currentElementCoord.y + currentElementCoord.height / 2;
      const nextElement =
        cursorPosition < currentElementCenter
          ? currentElement
          : currentElement.nextElementSibling;
      return nextElement;
    };
  }
  render() {
    this.getDraggable();
    this.getAction();
    this.getChange();
  }
}

const dragDrop = new DragDrop();
dragDrop.render();
