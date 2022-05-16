import Component from "./component.js";
import {
  token,
  visitTherapist,
  visitCardiologist,
  visitDentist,
} from "./main.js";
import VisitCardiologist from "./visitCardiologist.js";
import VisitDentist from "./visitDentist.js";
import VisitTherapist from "./VisitTherapist.js";

let checkAvailabilityCardsOnBord;
export default class DoctorAPIService extends Component {
  createCard(obj) {
    fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        purpose: obj.purpose,
        description: obj.descriptionVisit,
        name: obj.name,
        doctor: obj.doctor,
        pressure: obj.pressure,
        diseases: obj.diseases,
        age: obj.age,
        lastVisit: obj.lastVisit,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.doctor == "Therapist") {
          visitTherapist.render(response);
        }
        if (response.doctor == "Dentist") {
          visitDentist.render(response);
        }
        if (response.doctor == "Сardiologist") {
          visitCardiologist.render(response);
        }
        checkAvailabilityCardsOnBord++;
      });
  }
  deleteCard(cardId) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    checkAvailabilityCardsOnBord--;
    if (checkAvailabilityCardsOnBord == 0)
      document.querySelector(".no-items").style.display = "block";
  }
  getAllCreatedCards() {
    fetch(`https://ajax.test-danit.com/api/v2/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        checkAvailabilityCardsOnBord = response.length;
        response.forEach((elem) => {
          document.querySelector(".no-items").style.display = "none";
          if (elem.doctor == "Сardiologist") {
            let cardiologist = new VisitCardiologist();
            cardiologist.render(elem);
          }
          if (elem.doctor == "Dentist") {
            let dentist = new VisitDentist();
            dentist.render(elem);
          }
          if (elem.doctor == "Therapist") {
            let therapist = new VisitTherapist();
            therapist.render(elem);
          }
          const dragDrop = new DragDrop();
          dragDrop.render();
        });
      });
  }
  getOneCard(cardId) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  changeCard(cardId, name, purpose, description, age, doctor) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        age: age,
        description: description,
        name: name,
        purpose: purpose,
        doctor: doctor,
      }),
    });
  }
}
import DragDrop from "./dragDrop.js";
