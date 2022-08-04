const getWord = (word) => {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then((data) => {
        result.textContent = "";
        console.log(data[0].phonetics[0].audio);
      displayWord(data);
    })
    .catch((err) => (result.textContent = "Word Not Found"));
};

var result = document.getElementById("result");

const createAudio = (aud) => {
    const audio = document.createElement("audio")
    audio.setAttribute("controls", true)
    audio.src = aud
    result.appendChild(audio)
}

document
  .getElementById("searchWord")
  .addEventListener("keyup", (e) => getWord(e.target.value));


const displayWord = (data) => {
  let res = data[0]
    res.phonetics[0].audio && createAudio(res.phonetics[0].audio)

  let resp = res.meanings[0].definitions;
  resp.forEach((element) => {
    let movieListItem = document.createElement("div");
    movieListItem.innerHTML = `<h2>Definition</h2>
    <p class="text-muted">${element.definition}</p>`;
    result.appendChild(movieListItem);
  });
};
