const body = document.querySelector("body");
const mainBox = document.querySelector(".main-content");
const btnLogIn = document.querySelector(".header-container__btn .btn");

// клас Component, для створення елементів

// Перший стпосіб:
//this.position = "beforeend";
// this.parentElement = body;
// this.createElement(` <div class="modal fade show form-box" </div>`);

// Другий спосіб: (можна пропустити якусь властивість)
// this.formSubmit = this.createElement({
//   tagName: "button",
//   classNames: ["form-box__submit", "btn"],
//   parentElement: this.formBoxItem,
//   content: "Вход",
//   key: data-id,
//   value: 1, //data-id
//   position: "prepend"
// })

/*
Component. Все элементы страницы по сути являются её компонентами (составляющими): будь то форма, отдельные элементы формы, модальные окна и так далее. Component - это главный класс, который представляет компонент. У этого класса могут существовать свойства и методы, которые нужны всем дочерним классам (своего рода "глобальные"). В частности может существовать метод createElement, который принимает в качестве аргумента объект с нужным набором свойств и на базе полученных данных создает HTML-элемент. Объект может содержать разные свойства, например:
tagName - название тега (какой HTML-элемент надо создать);
classNames - массив с названиями классов, которые нужно присвоить элементу;
attributes - объект с набором атрибутов, которые надо присвоить элементу (название атрибута - это key в объекте, значение атрибута - value в объекте);
content - содержимое элемента. Это может быть как просто текст, так и другой элемент;
parentElement - если нужно будет сохранять какую-то связь с родительским элементом, то можно иметь и такое свойство.

Либо метод createElement может получать не объект, а HTML-строку.

Количество данных и типы данных - на ваше усмотрение. Идея понятна: метод получает данные и на базе этих данных создает элемент для DOM-дерева. Этот элемент можно вставлять в нужное место страницы. Допустим, можно делать проверку, что если в качестве данных мы получили HTML-строку (typeof arg === 'string'), то использовать для вставки Element.insertAdjacentHTML(), в противном случае обработать полученный объект (всего его свойства, в том числе внутренние объекты) и создать элемент с нужными классами, атрибутами и прочими свойствами.

*/

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

//класс Form - общий класс для всех форм. Он не презентует конкретную форму. Для создания конкретных форм используем дочерние классы. Возьмем с ТЗ по аналогии с Visit и дальше по иерархии. Все также - класс Form может содержать общие свойства и методы для всех форм (например, submitForm), а дочерние - уже более тематические.
// Він створює модальне вікно, btn - sumbit та btn - close modal

class Form extends Component {
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

  createFormSubmit = () =>
    (this.formSubmit = this.createElement({
      tagName: "button",
      classNames: ["form-box__submit", "btn"],
      parentElement: this.formBoxItem,
      content: "Вход",
    }));

  getFormClose() {
    const btnClose = document.querySelector(".form-box__close__btn");
    btnClose.addEventListener("click", (e) => {
      e.preventDefault();
      this.getFormCloseAction();
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
    this.createFormSubmit();
    this.getFormClose();
  }
}

class LogInForm extends Form {
  createInputEmail = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputLogin = this.createElement(
      `<div class="forms-inputs mb-4">
      <span>Email or username</span>
      <input
        autocomplete="off"
        type="text"
        v-model="login"
        v-bind:class="{'form-control':true, 'is-invalid' : !validEmail(login) && emailBlured}"
        v-on:blur="loginBlured = true"
      />
      <div class="invalid-feedback">A valid login is required!</div>
    </div>`
    );
    return this.formInputLogin;
  };

  createInputPassword = () => {
    this.position = "beforeend";
    this.parentElement = this.inputBox;
    this.formInputPassword = this.createElement(
      `<div class="forms-inputs mb-4">
      <span>Password</span>
      <input
        autocomplete="off"
        type="password"
        v-model="password"
        v-bind:class="{'form-control':true, 'is-invalid' : !validPassword(password) && passwordBlured}"
        v-on:blur="passwordBlured = true"
      />
      <div class="invalid-feedback">Password must be 8 character!</div>
    </div>
    <div class="invalid-data invalid-feedback">Invalid login or password!</div>`
    );
    return this.formInputPassword;
  };

  checkInput() {
    this.formSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      const login = this.formBoxItem.querySelector(`input[v-model="login"]`);
      const password = this.formBoxItem.querySelector(
        `input[v-model="password"]`
      );
      const isLoginValid = login.value.length <= 6;
      const isPasswordValid = password.value.length < 8;
      this.checkValue(isLoginValid, login);
      this.checkValue(isPasswordValid, password);
      this.isData = this.checkValidData(login, password);
      if (this.dataValue) {
        btnLogIn.remove();
        mainBox.innerHTML = "No items have been added";
      }
    });
  }

  checkValue(flag, el) {
    this.errElem = el.parentNode.querySelector(`.invalid-feedback`);
    if (flag) {
      this.errElem.style.display = "block";
    } else {
      this.errElem.style.display = "none";
      return true;
    }
  }

  checkValidData(login, password) {
    passObj.forEach((e) => {
      if (e.login === login.value && e.password === password.value) {
        this.getFormCloseAction();
        this.dataValue = true;
        return this.dataValue;
      } else {
        this.errElem =
          this.formBoxItem.parentNode.querySelector(`.invalid-data`);
        this.errElem.style.display = "block";
      }
      return true;
    });
  }

  render() {
    this.renderDefaultForm();
    this.createInputEmail();
    this.createInputPassword();
    this.checkInput();
  }
}

let passObj = [
  { login: "admin@gmail.com", password: "qwerty123" },
  { login: "user@gmail.com", password: "12345678" },
  { login: "moderator@gmail.com", password: "87654321" },
  { login: "admin", password: "qwerty123" },
];

const logIn = new LogInForm();

btnLogIn.addEventListener("click", (e) => {
  e.preventDefault();
  logIn.render();
});
