export default class Filter {
  showFilter() {
    const btnFilter = document.querySelector(".btn__filter");
    btnFilter.addEventListener("click", () => {
      const filterBox = document.querySelector(".filter-box");
      filterBox.style.display = "block";
    });
  }
  showDoctor() {
    const doctorName = document.querySelector(".doctor__name");
    const radioBtns = document.querySelectorAll('input[name="doctor-name"]');

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

  render() {
    this.showFilter();
    this.showDoctor();
  }
}
const filter = new Filter();

filter.render();
