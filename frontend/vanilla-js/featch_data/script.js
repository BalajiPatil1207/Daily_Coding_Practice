document.getElementById("fetchBtn").addEventListener("click", getUserData);
document.getElementById("hiddenBtn").addEventListener("click",hideData);
const container = document.getElementById("container")

const API_URL = "https://jsonplaceholder.typicode.com/users";

async function getUserData(){
    try {
      const response = await axios.get(API_URL);
      console.log("Data from API : \n",response.data);
      const data = response.data;

      container.innerHTML = "";

      data.forEach((user) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <h3> ${user.name}</h3>
        <p>Username : ${user.username}</p>
        <p>email : ${user.email}</p>
        <p>Phone : ${user.phone}</p>
        <p>Website : ${user.website}</p>
        <p>Company : ${user.company.name}</p>
        `
        container.appendChild(card);      
      });
    } catch (error) {
        console.log(error.message);
    }
};

function hideData(){
  container.innerHTML = "";
}
