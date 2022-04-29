class Component {
  constructor(parentElement, position) {
    this.parentElement = parentElement;
    this.position = position;
  }
  createElement(newElem) {
    if (typeof newElem === "string") {
      this.parentElement.insertAdjacentHTML(this.position, newElem);
    } else if (typeof newElem === "object") {
      this.tagName = newElem.tagName;
      this.classNames = newElem.classNames;
      this.parentElement = newElem.parentElement;
      this.content = newElem.content;
      this.values = newElem.values;
      this.key = newElem.key;
      this.position = newElem.position;
      this.createElementbyObj();
    }
    return this.element;
  }

  createElementbyObj() {
    this.element = document.createElement(this.tagName);
    this.parentElement.append(this.element);

    this.position === "prepend"
      ? this.parentElement.prepend(this.element)
      : this.parentElement.append(this.element);

    if (this.values && this.key) {
      this.element.setAttribute(this.key, this.values);
    }
    if (this.classNames) {
      Array.isArray(this.classNames)
        ? this.element.classList.add(...this.classNames)
        : this.element.classList.add(this.classNames);
    }

    if (this.content) {
      this.element.innerHTML = this.content;
    }

    return this.element;
  }
}
const body = document.querySelector("body");

class Form extends Component {
  createForm = () =>
    (this.formBox = this.createElement({
      tagName: "div",
      classNames: ["form-box", "row", "flex", "justify-content-center"],
      parentElement: body,
      position: "prepend",
    }));

  createFormItem = () =>
    (this.formBoxItem = this.createElement({
      tagName: "div",
      classNames: [
        "form-box__item",
        "card-body",
        "p-5",
        "text-center",
        "card",
        "shadow-2-strong",
      ],
      parentElement: this.formBox,
    }));

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

  createFormSubmit = () =>
    (this.formSubmit = this.createElement({
      tagName: "button",
      classNames: ["form-box__submit", "btn"],
      parentElement: this.formBoxItem,
      content: "Вход",
    }));

  renderDefaultForm() {
    this.createForm();
    this.createFormItem();
    this.createFormClose();
    this.createFormCloseBtn();
    this.createFormSubmit();
  }
}

const form = new Form();

const btnLogIn = document.querySelector(".header-container__btn .btn");
btnLogIn.addEventListener("click", (e) => {
  e.preventDefault();
  form.renderDefaultForm();
});

//Приклад об'єкта для створення елементу
// const body = document.querySelector("body");
// const objForCreationElem = {
//   tagName: "div",
//   classNames: ["sad", "asdasd"],
//   parentElement: body,
//   content: "asdas",
//   values: "",
//   key: "",
//   position: "append",
// };
