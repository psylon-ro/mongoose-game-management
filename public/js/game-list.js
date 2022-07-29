
const namee=document.querySelector('input[name="ISB"]')
const btn1=document.querySelector('.buttonnn');

btn1.addEventListener('click',()=>{
    getGameData(namee.value)
})

const getGameData=(name)=>{
        // Get information about the book using isbn
        const xhttp = new XMLHttpRequest();
    
        xhttp.open("GET", `http://localhost:3000/gamelist/${name}`, false);
        xhttp.send();
    
        const game = JSON.parse(xhttp.responseText);
        const {
            Title,
           Genre,
           Rating,
           Achievements
        } = game;
    
        // Filling information about the book in the form inside the modal
        document.getElementById('Title-data').textContent = Title;
        document.getElementById('Genre-data').textContent = Genre;
        document.getElementById('Rating-data').textContent = Rating;
        document.getElementById('Achievements-data').textContent =Achievements.join(", ").toString();
}

const setEditModal = (name) => {
    // Get information about the book using isbn
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/gamelist/${name}`, false);
    xhttp.send();

    const game = JSON.parse(xhttp.responseText);
    const {
        Title,
       Genre,
       Rating
    } = game;

    // Filling information about the book in the form inside the modal
    document.getElementById('Title').value = Title;
    document.getElementById('Genre').value = Genre;
    document.getElementById('Rating').value = Rating;
    const updatebutton=document.querySelector('#updatebutton');
    const savebutton= document.querySelector('#savebutton');

    savebutton.addEventListener('click',()=>{
        let achbody=['No achievements']
      if(game.Achievements.find(achievement => achievement === 'No achievements')){
        game.Achievements.pop()
        achbody=['Game master','Speed Demon']
      }
       
         const xhtp = new XMLHttpRequest();
        xhtp.open("POST", `http://localhost:3000/gamelistsave/${game._id}`);
        xhtp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhtp.send(JSON.stringify(achbody));
        location.reload(); 
    })

    updatebutton.addEventListener('click',()=>{
        let achbody=['No achievements']
      if(game.Achievements.find(achievement => achievement === 'No achievements')){
        game.Achievements.pop()
        achbody=['Game master','Speed Demon']
      }
         const xhtp = new XMLHttpRequest();
        xhtp.open("POST", `http://localhost:3000/gamelistupdate/${game._id}`);
        xhtp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhtp.send(JSON.stringify(achbody)); 
        location.reload();
    })
    // Setting up the action url for the book
    document.getElementById('editForm').action = `http://localhost:3000/gamelist/${game._id}`;
}

const deleteBook = (id) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/gamelist/${id}`, false);
    xhttp.send();

    // Reloading the page
    location.reload(); 
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/games", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book._id}</h6>
                        <div>Genre: ${book.Genre}</div>
                        <div>Rating: ${book.Rating}</div>
                        <div>Achievements: ${book.Achievements.join(", ").toString()}</div>
                        <hr>

                        <button type="button" class="btn btn-danger" onclick="deleteBook('${book._id}')">Delete</button>
                        <button types="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#editBookModal" onClick="setEditModal('${book.Title}')">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}

const loadTopGames = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/topgames", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);
    for (let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book._id}</h6>
                        <div>Genre: ${book.Genre}</div>
                        <div>Rating: ${book.Rating}</div>
                        <div>Achievements: ${book.Achievements.join(", ").toString()}</div>
                        <hr>

                        <button type="button" class="btn btn-danger" onclick="deleteBook('${book._id}')">Delete</button>
                        <button types="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#editBookModal" onClick="setEditModal('${book.Title}')">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('top-games').innerHTML = document.getElementById('top-games').innerHTML + x;
    }
}

const loadAchievementGames = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/achievementgames", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);
    for (let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book._id}</h6>
                        <div>Genre: ${book.Genre}</div>
                        <div>Rating: ${book.Rating}</div>
                        <div>Achievements: ${book.Achievements.join(", ").toString()}</div>
                        <hr>

                        <button type="button" class="btn btn-danger" onclick="deleteBook('${book._id}')">Delete</button>
                        <button types="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#editBookModal" onClick="setEditModal('${book.Title}')">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('achievement-games').innerHTML = document.getElementById('achievement-games').innerHTML + x;
    }
}

loadBooks();
loadTopGames();
loadAchievementGames();