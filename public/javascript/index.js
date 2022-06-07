const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = " ";
  messageThree.textContent = " ";
  fetch(`http://127.0.0.1:5000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        messageOne.textContent = data.placeName;
        messageTwo.textContent = data.weather_descriptions;
        messageThree.textContent = data.feelslike;
        //     console.log(data.placeName);
        //     console.log(data.weather_descriptions);
        //     console.log(data.feelslike);
      });
    }
  );
});
