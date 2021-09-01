
function displayImg(){
    console.log("hi");
    const container = document.getElementById("books");
    console.log(container);
    const div = document.createElement("div");
    div.innerHTML =`
    <img width=200px; src="https://covers.openlibrary.org/b/id/554106-M.jpg" alt="">
    `
    container.appendChild(div);
}