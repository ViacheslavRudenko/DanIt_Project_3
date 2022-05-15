export default class Filter {
  showFilter() {
    this.reset = document.getElementById("reset");
    const btnFilter = document.querySelector(".btn__filter--main");
    btnFilter.addEventListener("click", () => {
      const filterBox = document.querySelector(".filter-box");
      filterBox.style.display = "block";
    });
  }
  showDoctor() {
    const doctorName = document.querySelector(".doctor__name");
    const radioBtns = document.querySelectorAll('input[name="doctor-name"]');
    this.radioBtns = radioBtns;

    doctorName.addEventListener("click", () => {
      this.updateFilterVaule();
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
      this.updateFilterVaule();
      let pacientNameStr = this.namePacient.value;
      this.defaultFilterPatient = this.namePacient.value;
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
  getFilterByPriority(btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let dataIdArr = [];
      let cardBox = document.querySelector(".card");

      for (let i = 0; i < cardBox.children.length; i++) {
        this.filterItem = cardBox.children[i].getAttribute("data-item");
        if (this.filterItem) {
          dataIdArr.push(...[this.filterItem]);
        }
      }

      if (btn.id == "low") {
        this.sortdataIdArr = dataIdArr.sort();
      } else {
        this.sortdataIdArr = dataIdArr.sort().reverse();
      }

      let flag = 0;

      for (let i = 0; i < cardBox.children.length; i++) {
        let filterItem = cardBox.children[i].getAttribute("data-item");

        if (filterItem) {
          let oldFilterItem = cardBox.children[i];
          const filterItem = this.sortdataIdArr[flag];
          flag++;

          const replceItem = cardBox.querySelector(
            `[data-item="${filterItem}"]`
          );

          cardBox.insertAdjacentElement("afterbegin", replceItem);
        }
      }
    });
  }
  getLowPriority() {
    const btn = document.querySelector(".filter__id--lower");
    this.getFilterByPriority(btn);
  }
  getGrowPriority() {
    const btn = document.querySelector(".filter__id--grow");
    this.getFilterByPriority(btn);
  }

  getDefaultFilter() {
    this.reset.addEventListener("click", () => {
      this.radioBtns.forEach((e) => {
        e.click();
        e.checked = true;
      });
      this.namePacient.value = "";
      this.reset.disabled = true;
    });
  }

  updateFilterVaule() {
    this.reset.disabled = false;
  }
  render() {
    this.showFilter();
    this.showDoctor();
    this.showPacient();
    this.getLowPriority();
    this.getGrowPriority();
    this.getDefaultFilter();
  }
}
const filter = new Filter();

filter.render();
