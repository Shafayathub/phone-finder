const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  document.getElementById('spinner').style.display = 'block';
  // clear search box
  searchField.value = '';
  const searchResult = document.getElementById('search-result');
  // clear loaded content
  searchResult.textContent = '';
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
  if (phoneData.length !== 0) {
    // showing 20 results
    newPhoneData = phoneData.slice(0, 20);
    newPhoneData.forEach((data) => {
      slugData(data);
    });
  } else {
    const preSearchResult = document.getElementById('pre-search-result');
    // clear loaded content
    preSearchResult.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `<div id="pre-search-result" class="container">
        <div class="card text-center">
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>No phone found. Choose better search another.</p>
                    <footer class="blockquote-footer">Another learner <cite title="Source Title">MD shafayat
                            Islam</cite>
                    </footer>
                </blockquote>
            </div>
            <div class="card-footer">
                <small class="text-muted">
                    <a target=_blank href="https://sites.google.com/view/shafayat/home"
                        class="btn btn-info stretched-link">Meet the developer</a>
                </small>
            </div>
        </div>
    </div>`;
    preSearchResult.appendChild(div);
    document.getElementById('spinner').style.display = 'none';
  }
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
                <img src="${data.image}" class="card-img-top mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.brand}</h5>
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.releaseDate}</p>
                </div>
                <div class="card-footer">
                   <small class="text-muted">
                      <button class="btn btn-info text-white">Details</button>
                   </small>
                </div>
            </div>
      `;
    searchResult.appendChild(div);
  } else {
    div.innerHTML = `
            <div class="card h-100">
                <img src="${data.image}" class="card-img-top mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.brand}</h5>
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${'not found'}</p>
                </div>
                <div class="card-footer">
                   <small class="text-muted">
                      <button class="btn btn-info text-white">Details</button>
                   </small>
                </div>
            </div>
      `;
    searchResult.appendChild(div);
  }

  document.getElementById('spinner').style.display = 'none';
};
