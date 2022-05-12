export const mainBox = document.querySelector(".main-content");
export const btnLogIn = document.querySelector(".header-container__btn .btn");
export const btnCreatVisit = document.querySelector(".creat-visit-btn");
export const token = "8fb8e795-7b38-46c3-9c84-d3f2588a2d5f";

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
import CardioVisitForm from "./cardioVisitForm.js";
import DentistVisitForm from "./dentistVusitForm.js";
import TherapistVisitForm from "./therapistVisitForm.js";

let cardioVisitModal;
let dentistVisitModal;
let therapistVisitModal;

btnCreatVisit.addEventListener("click", () => {
  btnCreatVisit.disabled = true;
  const doctorsBox = document.createElement("div");
  doctorsBox.classList.add("doctors-box", "modal-content", "form-box__item");
  doctorsBox.innerHTML = `<div class="items-doctors ">Выберите врача</div>
  <ul class="select-list-doctors modal-content">
    <a class="select-list-doctors__link" href="#"><li class="cardio-doctor">Кардиолог</li></a>
    <a class="select-list-doctors__link" href="#"><li class="dentist">Стоматолог</li></a>
    <a class="select-list-doctors__link" href="#"><li class="therapist">Терапевт</li></a>
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
    // delete
    if (e.target.classList.contains("cardio-doctor")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      cardioVisitModal = new CardioVisitForm();
      selectedDoctor = "cardioVisitModal";
      cardioVisitModal.render();
    } else if (e.target.classList.contains("dentist")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      dentistVisitModal = new DentistVisitForm();
      selectedDoctor = "dentistVisitModal";
      dentistVisitModal.render();
    } else if (e.target.classList.contains("therapist")) {
      selectDoctorsList.style.display = "none";
      document.querySelector(".doctors-box").remove();
      btnCreatVisit.disabled = false;
      therapistVisitModal = new TherapistVisitForm();
      selectedDoctor = "therapistVisitModal";
      therapistVisitModal.render();
    }

    // const modalBox = document.querySelector(".modal-content");
    const creatVisitBtn = document.querySelector(".creat-visit");
    const creatError = document.querySelector(".check-inputs-value");
    creatVisitBtn.addEventListener("click", (e) => {
      const inputsNode = document.querySelectorAll(".forms-inputs__item");
      const inputsArr = [...inputsNode];
      inputsArr.forEach((e) => {
        if (e.value === "") {
          creatError.style.display = "block";
        } else {
          creatError.style.display = "none";
        }
      });
      if (creatError.style.display == "none") {
        if (selectedDoctor == "therapistVisitModal") {
          therapistVisitModal.getInputData(); // тут нужно создавать обьект карточки
          visitTherapist = new VisitTherapist();
          doctorAPIService.createCard(therapistVisitModal);
          document.querySelector(".modal").remove();
          if (document.querySelector(".no-items"))
            document.querySelector(".no-items").remove();
        }
        if (selectedDoctor == "dentistVisitModal") {
          dentistVisitModal.getInputData();
          visitDentist = new VisitDentist();
          doctorAPIService.createCard(dentistVisitModal);
          document.querySelector(".modal").remove();
          if (document.querySelector(".no-items"))
            document.querySelector(".no-items").remove();
        }
        if (selectedDoctor == "cardioVisitModal") {
          cardioVisitModal.getInputData();
          visitCardiologist = new VisitCardiologist();
          doctorAPIService.createCard(cardioVisitModal);
          document.querySelector(".modal").remove();
          if (document.querySelector(".no-items"))
            document.querySelector(".no-items").remove();
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

export const doctorAPIService = new DoctorAPIService();
