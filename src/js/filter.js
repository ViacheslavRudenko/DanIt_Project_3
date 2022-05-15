export default class Filter {
  showFilter() {
    const btnFilter = document.querySelector(".btn__filter--main");
    btnFilter.addEventListener("click", () => {
      const filterBox = document.querySelector(".filter-box");
      console.log(filterBox);
      filterBox.style.display = "block";
    });
  }
  showDoctor() {
    const doctorName = document.querySelector(".doctor__name");
    const radioBtns = document.querySelectorAll('input[name="doctor-name"]');
    this.radioBtns = radioBtns;

    doctorName.addEventListener("click", function (e) {
      for (const radioButton of radioBtns) {
        if (radioButton.checked) {
          let selectedSize = radioButton.id;
          const arrNotFilter = document.querySelectorAll(
            `div[data-doctor="${selectedSize}"]`
          );
          Array.from(arrNotFilter).map((e) => {
            e.style.display = "block";
          });
        } else {
          let selectedSize = radioButton.id;

          const arrNotFilter = document.querySelectorAll(
            `div[data-doctor="${selectedSize}"]`
          );
          Array.from(arrNotFilter).map((e) => {
            e.style.display = "none";
          });
        }
      }
    });
  }

  showPacient() {
    this.namePacient = document.querySelector(".name-pacient__input-search");

    this.namePacient.addEventListener("input", () => {
      let pacientNameStr = this.namePacient.value;
      this.value = pacientNameStr;
      const allNamesPacient = document.querySelectorAll(".name");
      Array.from(allNamesPacient).forEach((pacient) => {
        if (
          pacient.innerText
            .toLowerCase()
            .includes(pacientNameStr.toLowerCase(), 5)
        ) {
          pacient.parentElement.style.display = "block";
        } else {
          pacient.parentElement.style.display = "none";
        }
      });
    });
  }

  getDefaultFilter() {
    const reset = document.getElementById("reset");
    reset.addEventListener("click", () => {
      this.radioBtns.forEach((e) => {
        e.click();
        e.checked = true;
      });
      this.namePacient.value = "";
    });
  }

  render() {
    this.showFilter();
    this.showDoctor();
    this.showPacient();
    this.getDefaultFilter();
  }
}
const filter = new Filter();

filter.render();
