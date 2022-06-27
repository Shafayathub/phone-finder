const searchPhone = () => {
  const searchText = document.getElementById('search-field').value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayResult(data.data));
};
const displayResult = (phones) => {
  const searchResult = document.getElementById('search-result');
  phones.forEach((data) => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `<div class="card">
                <img width=100% src="${data.image}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${data.phone_name}</h5>
                    <h5 class="card-title">${data.brand}</h5>
                </div>
                <div class="card-footer">
                   <small class="text-muted">
                      <a target=_blank href="#" class="btn btn-warning stretched-link">Details</a>
                   </small>
                </div>
            </div>`;
    searchResult.appendChild(div);
  });
};
