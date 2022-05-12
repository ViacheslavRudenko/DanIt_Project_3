import Component from "./component.js";
export default class Visit extends Component {
  getName(response) {
    this.name = response.name;
  }
  getPurpose(response) {
    this.purpose = response.purpose;
  }
  getDescription(response) {
    this.description = response.description;
  }
  renderDefaultVisit(response) {
    this.getName(response);
    this.getPurpose(response);
    this.getDescription(response);
  }
}
