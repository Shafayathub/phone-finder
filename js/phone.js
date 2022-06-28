const searchPhone = () => {
  const searchText = document.getElementById('search-field').value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((phoneData) => getData(phoneData.data));
};
const getData = (phoneData) => {
  phoneData.forEach((data) => {
    releaseDate(data);
  });
};
const releaseDate = (data) => {
  const id = data.slug;
  fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((slugData) => showData(slugData.data));
};
const showData = (data) => {
  const searchResult = document.getElementById('search-result');
  const div = document.createElement('div');
  div.classList.add('col');
  div.innerHTML = `
            <div class="card h-100">
                <img src="${data.image}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${data.brand}</h5>
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.releaseDate}</p>
                </div>
                <div class="card-footer">
                   <small class="text-muted">
                      <a target=_blank href="#" class="btn btn-warning stretched-link">Details</a>
                   </small>
                </div>
            </div>
      `;
  searchResult.appendChild(div);
};
