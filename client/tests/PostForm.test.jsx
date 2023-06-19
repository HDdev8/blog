import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostForm from "../src/components/PostForm";

test("<PostForm /> updates parent state and calls onSubmit", async () => {
  const postPost = vi.fn();
  const user = {username: "hddev8", password: "password"};
  const testUser = userEvent.setup();

  const {container} = render(<PostForm postPost={postPost} user={user} />);

  const input = container.querySelector(".post-input");
  const sendButton = screen.getByText("save");

  await testUser.type(input, "testing a form...");
  await testUser.click(sendButton);

  expect(postPost.mock.calls).toHaveLength(1);
  expect(postPost.mock.calls[0][0].title).toBe("testing a form...");
});
