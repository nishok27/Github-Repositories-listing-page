const form = document.getElementById("myForm");
const showMoreButton = document.getElementById("showmore");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const search = document.getElementById("search").value;

  const orginalName = search.split(" ").join("");

  const userEndpoint = `https://api.github.com/users/${orginalName}`;

  console.log(userEndpoint);
  fetch(userEndpoint)
    .then((response) => response.json())
    .then((users) => {
      console.log(users);
      const profile = document.getElementById("profile");

      console.log(Object.keys(users));

      const profileItem = document.createElement("div");
      profileItem.innerHTML = `  
          <img src=${users.avatar_url}></img>
          <a href="${users.html_url}" target="_blank">${users.name}</a>
          <p>${users.location}</p>          
          ${users.bio ? `<p>${users.bio}</p>` : `<p></p>`}
      `;
      profile.appendChild(profileItem);
    });

  const reposEndpoint = `https://api.github.com/users/${orginalName}/repos?limit=100`;

  console.log(reposEndpoint);
  fetch(reposEndpoint, {
    per_page: 4,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const repoList = document.getElementById("repo-list");

      console.log(Object.keys(data));

      data.forEach((repo) => {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <p>${repo.description}</p>
        `;
        repoList.appendChild(repoItem);
      });
    })
    .catch((error) => console.error(error));
});

let page = 1;
const repoPerPage = 4;

const loadRepos = () => {
  const skip = page - 1 * repoPerPage;
  const search = document.getElementById("search").value;
  const name = search.split(" ").join("");
  const paginatedURL = `https://api.github.com/users/${name}/repos?limit=${repoPerPage}&skip=${skip}`;

  fetch(paginatedURL)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((repo) => {
        const repoList = document.getElementById("repo-list");
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <p>${repo.description}</p>
        `;
        repoList.appendChild(repoItem);
      });
    })
    .catch((error) => console.error(error));
};

showMoreButton.addEventListener("click", function (e) {
  page++;
  loadRepos();
});
