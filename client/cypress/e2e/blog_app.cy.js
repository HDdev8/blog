describe("Post app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.createUser({name: "hddev8", username: "root", password: "password"});
    cy.createUser({name: "harry", username: "harry", password: "harry"});
    // cy.login({username: "root", password: "password"});
    cy.visit("/");
  });

  it("front page can be opened", function () {
    cy.contains("Posts");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.contains("Username").find("input").type("root");
    cy.contains("Password").find("input").type("password");
    cy.get('button[type="submit"]').click();
  });

  it("a new post can be created", function () {
    cy.login({username: "root", password: "password"});
    cy.contains("Post Post").click();
    cy.get("input").type("a post created by cypress");
    cy.contains("save").click();
    cy.contains("a post created by cypress");
  });

  it("it can be liked", function () {
    cy.contains("a post created by cypress").get(".likeButton").click();
    cy.contains("Likes: 1");
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.contains("Username").find("input").type("root");
    cy.contains("Password").find("input").type("wrong");
    cy.get('button[type="submit"]').click();

    cy.get(".error-message")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
  });
});

describe("Logging in", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.createUser({name: "hddev8", username: "root", password: "password"});
    cy.visit("/");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
  });

  it("succeeds with correct credentials", function () {
    cy.login({username: "root", password: "password"});
  });

  it("fails with wrong credentials", function () {
    cy.login({username: "root", password: "wrong"});
  });
});

describe("when logged in", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.createUser({name: "hddev8", username: "root", password: "password"});
    cy.createUser({name: "harry", username: "harry", password: "harry"});
    cy.login({username: "root", password: "password"});
    cy.visit("/");
  });

  it("A post can be created", function () {
    cy.createPost({
      title: "1 post cypress",
      author: "root",
    });
  });

  describe("and several posts exist", function () {
    beforeEach(function () {
      cy.createPost({
        title: "1 post cypress",
        author: "root",
        likes: 1,
      });
      cy.createPost({
        title: "2 post cypress",
        author: "root",
        likes: 2,
      });
      cy.createPost({
        title: "3 post cypress",
        author: "root",
        likes: 3,
      });
    });

    it("one of those can be liked", function () {
      cy.contains("1 post cypress").get(".likeButton").click();
      cy.contains("1 post cypress").contains("Likes: 2");
    });

    it("another of those can be liked", function () {
      cy.contains("2 post cypress").parent().find("button").as("theButton");
      cy.get("@theButton").click();
      cy.contains("2 post cypress").contains("Likes: 3");
    });

    it("the creator can delete one", function () {
      cy.contains("2 post cypress").get('button[label="delete"]').click();
      cy.get("html").should("not.contain", "2 post cypress");
    });

    it("Only the creator can see the delete button", function () {
      cy.logOut();
      cy.login({username: "harry", password: "harry"});
      cy.contains("2 post cypress").should("not.contain", 'button[label="delete"]');
    });

    it("The posts can be sorted by likes", function () {
      cy.contains("Sort").click();
      cy.get(`button[class="view-post"]`).then((buttons) => {
        cy.wrap(buttons[0]).click();
        cy.wrap(buttons[1]).click();
        cy.wrap(buttons[2]).click();
      });
      cy.get(".post").eq(0).should("contain", "Likes: 3");
      cy.get(".post").eq(1).should("contain", "Likes: 2");
      cy.get(".post").eq(2).should("contain", "Likes: 1");
      cy.contains("Sort").click();
      cy.get(`button[class="view-post"]`).then((buttons) => {
        cy.wrap(buttons[0]).click();
        cy.wrap(buttons[1]).click();
        cy.wrap(buttons[2]).click();
      });
      cy.get(".post").eq(0).should("contain", "Likes: 1");
      cy.get(".post").eq(1).should("contain", "Likes: 2");
      cy.get(".post").eq(2).should("contain", "Likes: 3");
    });
  });
});
