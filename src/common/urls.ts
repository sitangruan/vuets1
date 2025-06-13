/**
* This is the central place for all server endpoints.
*/

import { idPlaceHolder } from "./constants";

export const baseUrl = "https://jsonplaceholder.typicode.com/";

export const apiUrls = {
  todos: `${baseUrl}todos`,
  users: `${baseUrl}users`,
  posts: `${baseUrl}posts`,
  albums: `${baseUrl}albums`,
  comments: `${baseUrl}posts/${idPlaceHolder}/comments`,
};
