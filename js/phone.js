const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  document.getElementById('spinner').style.display = 'block';
  // clear search box
  searchField.value = '';
  if (searchText == '') {
    alert('Please enter text to search');
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((phoneData) => getData(phoneData.data));
  }
};

const getData = (phoneData) => {
  phoneData.forEach((data) => {
    slugData(data);
  });
};
const slugData = (data) => {
  const id = data.slug;
  fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((slugData) => showData(slugData.data));
};
const showData = (data) => {
  const preSearchResult = document.getElementById('pre-search-result');
  // clear loaded content
  preSearchResult.textContent = '';
  const searchResult = document.getElementById('search-result');
  const div = document.createElement('div');
  div.classList.add('col');
  if (data.releaseDate != '') {
    div.innerHTML = `
            <div class="card h-100">
                <img src="${data.image}">
                <div class="card-body">
                    <h5 class="card-title">${data.brand}</h5>
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.releaseDate}</p>
                </div>
                <div class="card-footer">
                   <small class="text-muted">
                      <a target=_blank href="#" class="btn btn-info stretched-link">Details</a>
                   </small>
                </div>
            </div>
      `;
    searchResult.appendChild(div);
  } else {
    div.innerHTML = `
            <div class="card h-100">
                <img src="${data.image}">
                <div class="card-body">
                    <h5 class="card-title">${data.brand}</h5>
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${'not found'}</p>
                </div>
                <div class="card-footer">
                   <small class="text-muted">
                      <a target=_blank href="#" class="btn btn-info stretched-link">Details</a>
                   </small>
                </div>
            </div>
      `;
    searchResult.appendChild(div);
  }

  document.getElementById('spinner').style.display = 'none';
};
