import Component from "./component.js";
import {
  token,
  visitTherapist,
  visitCardiologist,
  visitDentist,
} from "./main.js";
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
      });
  }
  deleteCard(cardId) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
        console.log(response);
        response.forEach((elem) => {
          // тут нужно показывать все карточки при авторизации
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
  changeCard(cardId, name, purpose, description, age) {
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
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  }
}
