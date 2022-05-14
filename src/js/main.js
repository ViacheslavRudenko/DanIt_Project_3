export const mainBox = document.querySelector(".main-content");
export const btnLogIn = document.querySelector(".header-container__btn .btn");
export const btnCreatVisit = document.querySelector(".creat-visit-btn");
export const token = "d038cbe5-6cb1-4373-b513-864f37c31d87";

window.onload = function () {
  if (localStorage.getItem("autoLogIn")) {
    autoClick("modal");
    const login = document.getElementById(`login`);
    const password = document.getElementById(`password`);
    login.value = localStorage.getItem("login");
    password.value = localStorage.getItem("password");
    autoClick("submit_value");
  }
};

const autoClick = (id) => document.getElementById(`${id}`).click();

export let visitDentist, visitCardiologist, visitTherapist;
export let item = 0;

import Component from "./component.js";
import Form from "./form.js";

import LogInForm from "./logIn.js";

export let passObj = [
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

//------------- visit modal ------------------
import VisitForm from "./visitForm.js";
// import FiltersForm from "./filters.js";
import CardioVisitForm from "./cardioVisitForm.js";
import DentistVisitForm from "./dentistVusitForm.js";
import TherapistVisitForm from "./therapistVisitForm.js";

let cardioVisitModal;
let dentistVisitModal;
let therapistVisitModal;

btnCreatVisit.addEventListener("click", () => {
  btnCreatVisit.disabled = true;
  const doctorsBox = document.createElement("div");
  doctorsBox.classList.add("doctors-box");
  doctorsBox.innerHTML = `<div class="items-doctors">Выберите врача</div>
  <ul class="select-list-doctors">
    <a class="select-list-doctors__link cardio-doctor" href="#"><li >Кардиолог</li></a>
    <a class="select-list-doctors__link dentist" href="#"><li >Стоматолог</li></a>
    <a class="select-list-doctors__link therapist" href="#"><li>Терапевт</li></a>
  </ul>`;
  mainBox.append(doctorsBox);

  const doctors = document.querySelector(".items-doctors");

  const selectDoctorsList = document.querySelector(".select-list-doctors");
  doctors.addEventListener("click", () => {
    if (doctors.classList.contains("menu") == false) {
      doctors.classList.add("menu");
      selectDoctorsList.style.display = "block";
    } else {
      doctors.classList.remove("menu");
      selectDoctorsList.style.display = "none";
    }
  });
  let selectedDoctor;
  selectDoctorsList.addEventListener("click", (e) => {
    if (e.target.closest(".cardio-doctor")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      cardioVisitModal = new CardioVisitForm();
      selectedDoctor = "cardioVisitModal";
      cardioVisitModal.render();
    } else if (e.target.closest(".dentist")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      dentistVisitModal = new DentistVisitForm();
      selectedDoctor = "dentistVisitModal";
      dentistVisitModal.render();
    } else if (e.target.closest(".therapist")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      therapistVisitModal = new TherapistVisitForm();
      selectedDoctor = "therapistVisitModal";
      therapistVisitModal.render();
    }

    const creatVisitBtn = document.querySelector(".creat-visit");
    const creatError = document.querySelector(".check-inputs-value");
    const invalidDate = document.querySelector(".invalid-date-box");
    const invalidAge = document.querySelector(".invalid-age-box");
    const invalidPressure = document.querySelector(".invalid-pressure-box");
    creatVisitBtn.addEventListener("click", () => {
      const inputsNode = document.querySelectorAll(".forms-inputs__item");
      const inputAge = document.querySelector(".age-input");
      const inputPressure = document.querySelector(".pressure-input");
      const inputLastVisitDate = document.querySelector(".last-visit-input");

      const inputsArr = [...inputsNode];
      inputsArr.some((e) => {
        if (e.value === "") {
          creatError.style.display = "block";
          return true;
        } else {
          creatError.style.display = "none";
        }
      });
      if (creatError.style.display == "none") {
        if (selectedDoctor == "therapistVisitModal") {
          if (isNaN(inputAge.value)) {
            invalidAge.style.display = "block";
            inputAge.style.borderColor = "red";
          } else {
            therapistVisitModal.getInputData();
            visitTherapist = new VisitTherapist();
            doctorAPIService.createCard(therapistVisitModal);
            document.querySelector(".modal").remove();
            invalidAge.style.display = "none";
            inputAge.style.borderColor = "black";
            document.querySelector(".no-items").style.display = "none";
          }
        }
        if (selectedDoctor == "dentistVisitModal") {
          if (isNaN(inputLastVisitDate.value)) {
            invalidDate.style.display = "block";
            inputLastVisitDate.style.borderColor = "red";
          } else {
            dentistVisitModal.getInputData();
            visitDentist = new VisitDentist();
            doctorAPIService.createCard(dentistVisitModal);
            document.querySelector(".modal").remove();
            invalidDate.style.display = "none";
            inputLastVisitDate.style.borderColor = "black";
            document.querySelector(".no-items").style.display = "none";
          }
        }
        if (selectedDoctor == "cardioVisitModal") {
          if (isNaN(inputAge.value)) {
            invalidAge.style.display = "block";
            inputAge.style.borderColor = "red";
            invalidPressure.style.display = "none";
            inputPressure.style.borderColor = "#eee";
          } else if (
            isNaN(inputPressure.value) ||
            inputPressure.value < 50 ||
            inputPressure.value > 160
          ) {
            invalidPressure.style.display = "block";
            inputPressure.style.borderColor = "red";
            invalidAge.style.display = "none";
            inputAge.style.borderColor = "#eee";
          } else {
            cardioVisitModal.getInputData();
            visitCardiologist = new VisitCardiologist();
            doctorAPIService.createCard(cardioVisitModal);
            document.querySelector(".modal").remove();
            document.querySelector(".no-items").style.display = "none";
          }
        }
      }
    });
  });
});

import DoctorAPIService from "./doctorAPIService.js";
import Visit from "./visit.js";
import VisitDentist from "./visitDentist.js";
import VisitCardiologist from "./visitCardiologist.js";
import VisitTherapist from "./VisitTherapist.js";
import EditCardFormDentist from "./editCardFormDentist.js";
import EditCardFormTherapist from "./editCardFormTherapist.js";
import EditCardFormCardiologist from "./editCardFormCardiologist.js";
import Filter from "./filter.js";

export const doctorAPIService = new DoctorAPIService();
