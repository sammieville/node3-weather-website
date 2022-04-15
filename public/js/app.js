const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationRpt = document.querySelector("#location");
const rpt = document.querySelector("#report");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  rpt.textContent = "";
  locationRpt.textContent = "...loading";
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (!data.error) {
          locationRpt.textContent = data.location;
          rpt.textContent = data.forecast;
          console.log(data.location);
          console.log(data.forecast);
        } else {
          locationRpt.textContent = "Error Message:";
          rpt.textContent = data.error;
        }
      });
    }
  );
});
