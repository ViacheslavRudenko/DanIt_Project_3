// import Form from "./form.js";

// export default class FiltersForm extends Form {
//   createInputSearchByText = () => {
//     this.position = "beforeend";
//     this.parentElement = this.inputBox;
//     this.formInputSearchText = this.createElement(
//       `<div class="forms-inputs mb-4">
//                 <input class="forms-inputs__item text-search-input"
//                   placeholder="поиск по тексту карточки"
//                   autocomplete="off"
//                   type="text"
//                 />
//               </div>`
//     );
//     return this.formInputSearchText;
//   };

//   creatSearchByDoctor() {
//     this.position = "beforeend";
//     this.parentElement = this.inputBox;
//     this.formSearchByDoctor = this.createElement(
//       `<div class="items-doctors">Выберите врача</div>
//       <ul class="select-list-doctors">
//         <a class="select-list-doctors__link cardio-doctor" href="#"><li >Кардиолог</li></a>
//         <a class="select-list-doctors__link dentist" href="#"><li >Стоматолог</li></a>
//         <a class="select-list-doctors__link therapist" href="#"><li>Терапевт</li></a>
//       </ul>`
//     );
//     return this.formSearchByDoctor;
//   }

//   render() {
//     this.renderDefaultForm();
//     this.createInputSearchByText();
//     this.creatSearchByDoctor();
//   }
// }
