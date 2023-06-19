import "@testing-library/cypress/add-commands";

Cypress.Commands.add("createUser", ({name, username, password}) => {
  cy.request("POST", "/api/users", {
    name,
    username,
    password,
  });
  cy.visit("");
});

Cypress.Commands.add("login", ({username, password}) => {
  cy.request("POST", "/api/login", {
    username,
    password,
  }).then(({body}) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(body));
    cy.visit("");
  });
});

Cypress.Commands.add("createPost", ({title, author, content}) => {
  cy.request({
    url: "/api/posts",
    method: "POST",
    body: {title, author, content},
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("loggedBlogappUser")).token}`,
    },
  });
  cy.visit("");
});

Cypress.Commands.add("deletePost", (id) => {
  cy.request({
    url: `/api/posts/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("loggedBlogappUser")).token}`,
    },
  });
  cy.visit("");
});

Cypress.Commands.add("logOut", () => {
  localStorage.removeItem("loggedBlogappUser");
  cy.visit("");
});
