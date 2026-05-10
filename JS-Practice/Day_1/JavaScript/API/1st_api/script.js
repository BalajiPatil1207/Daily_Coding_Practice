const btn = document.getElementById("btn");
const hidden = document.getElementById("hidden");
const container = document.getElementById("container");

const API_URL = "https://jsonplaceholder.typicode.com/users";

btn.addEventListener("click", getUserData);
async function getUserData() {
  try {
    const response = await axios.get(API_URL);
    const result = response.data;
    console.log(result);

    container.innerHTML = " ";

    result.forEach(res => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
      <h3>${res.name}</h3>
      `

      container.append(card);
    });
    
  } catch (error) {
    console.log(error.message);
  };
};

hidden.addEventListener("click",hiddenData);

async function hiddenData() {
  container.innerHTML = "";
}