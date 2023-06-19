import React from "react";
import userEvent from "@testing-library/user-event";
import {render, screen} from "@testing-library/react";
import Post from "../src/components/Post";

test("clicking the button calls event handler once", async () => {
  const post = {
    title: "Component testing is done with react-testing-library",
    author: "hddev8",
    url: "api/posts/Component-testing-is-done-with-react-testing-library",
    likes: 108,
    user: "hddev8",
  };

  const mockHandler = vi.fn();

  render(<Post post={post} updateLikes={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByTitle("thumbs-up");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("does not render url or likes", async () => {
  const post = {
    title: "Component testing is done with react-testing-library",
    author: "hddev8",
    // url: "api/posts/Component-testing-is-done-with-react-testing-library",
    // likes: 108,
    user: "hddev8",
  };

  render(<Post post={post} />);

  const element1 = screen.queryByText(
    "api/posts/Component-testing-is-done-with-react-testing-library"
  );
  expect(element1).toBeNull();

  const element2 = await screen.queryByText(`Likes: 108`);
  expect(element2).toBeNull();
});

describe("<Post />", () => {
  const post = {
    title: "Component testing is done with react-testing-library",
    author: "hddev8",
    url: "api/posts/Component-testing-is-done-with-react-testing-library",
    likes: 108,
    user: "hddev8",
  };

  let container;

  beforeEach(() => {
    container = render(<Post post={post} />).container;
  });

  test("renders its children", async () => {
    await screen.findAllByText("Component testing is done with react-testing-library");
  });

  test("at start the children are not displayed", async () => {
    const div = container.querySelector(".hidden-content");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".hidden-content");
    expect(div).not.toHaveStyle("display: none");
  });

  test("toggled content can be closed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const closeButton = screen.getByText("hide");
    await user.click(closeButton);

    const div = container.querySelector(".hidden-content");
    expect(div).toHaveStyle("display: none");
  });
});
