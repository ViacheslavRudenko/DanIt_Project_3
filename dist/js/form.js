const body = document.querySelector("body");

import Component from "./component.js";
export default class Form extends Component {
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
