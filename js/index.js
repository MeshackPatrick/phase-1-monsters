document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const createMonsterForm = document.getElementById("create-monster");
    const backButton = document.getElementById("back");
    const forwardButton = document.getElementById("forward");
  
    const BASE_URL = "http://localhost:3000";
    let currentPage = 1;
  
    // Display the first 50 monsters on page load
    fetchMonsters();
  
    // Event listeners for pagination buttons
    backButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        fetchMonsters();
      }
    });
  
    forwardButton.addEventListener("click", () => {
      currentPage++;
      fetchMonsters();
    });
  
    // Event listener for monster creation form submission
    createMonsterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const age = form.age.value;
      const description = form.description.value;
  
      // Create a new monster
      createMonster(name, age, description);
  
      // Reset the form
      form.reset();
    });
  
    function fetchMonsters() {
      const limit = 50;
      const offset = (currentPage - 1) * limit;
      const url = `${BASE_URL}/monsters?_limit=${limit}&_page=${offset}`;
  
      // Fetch the monsters from the API
      fetch(url)
        .then((response) => response.json())
        .then((monsters) => {
          // Clear the monster container
          monsterContainer.innerHTML = "";
  
          // Display each monster
          monsters.forEach((monster) => {
            displayMonster(monster);
          });
        });
    }
  
    function displayMonster(monster) {
      // Create elements for the monster
      const monsterDiv = document.createElement("div");
      const nameHeader = document.createElement("h3");
      const ageParagraph = document.createElement("p");
      const descriptionParagraph = document.createElement("p");
  
      // Set the text content of the elements
      nameHeader.textContent = monster.name;
      ageParagraph.textContent = `Age: ${monster.age}`;
      descriptionParagraph.textContent = `Description: ${monster.description}`;
  
      // Append the elements to the monster container
      monsterDiv.appendChild(nameHeader);
      monsterDiv.appendChild(ageParagraph);
      monsterDiv.appendChild(descriptionParagraph);
      monsterContainer.appendChild(monsterDiv);
    }
  
    function createMonster(name, age, description) {
      const url = `${BASE_URL}/monsters`;
      const data = {
        name: name,
        age: parseInt(age),
        description: description,
      };
  
      // Create a new monster using the API
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((monster) => {
          // Display the new monster
          displayMonster(monster);
        });
    }
  });
  