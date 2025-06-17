/**
 * This is the central place for all the api calling methods.
 */

import { apiUrls } from "../common/urls";
import { sleepFor } from "../common/utillities";
import { idPlaceHolder } from "../common/constants";

const forceWaitingTime = 500;

const apiCaller = {
  todos: {
    // getTodos() {
    //   return fetch(apiUrls.todos).then(response => {
    //     sleepFor(forceWaitingTime); //Force to have a waiting time so the loading mask will appear to mimic a more realistic server call.
    //     return response.json();
    //   })
    // },
    // postTodo(item: TodoElement) {
    //   const toSave = {
    //     userId: item.UserId,
    //     title: item.Title,
    //     completed: item.Completed
    //   }
    //   return fetch(apiUrls.todos, {
    //     method: 'POST',
    //     body: JSON.stringify(toSave),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8',
    //     }
    //   })
    //   .then(response => {
    //     sleepFor(forceWaitingTime);
    //     const randomNumber = Math.floor(Math.random() * 10);
    //     if (randomNumber % 2 === 0) {
    //       //Force to throw an error with 50% chances so that the UI could demo an error message.
    //       throw(new Error("Server side error happened. Please try agin later!"));
    //     }

    //     return response.json();
    //   })
    // },

    //To be implemented if needed.
  },
  users: {
    //To be implemented if needed.
  },
  posts: {
    getPosts() {
      return fetch(apiUrls.posts).then(response => {
        sleepFor(forceWaitingTime); //Force to have a waiting time so the loading mask will appear to mimic a more realistic server call.
        return response.json();
      })
    },
    getPostComments(postId: number) {
      if (!Number.isInteger(postId) || !(postId > 0)) {
        throw new Error("Invalid post ID. Please enter a valid integer greater than 0.");
      }

      const myUrl = apiUrls.comments.replace(idPlaceHolder, postId.toString());
      return fetch(myUrl).then(response => {
        sleepFor(forceWaitingTime); //Same as above.
        return response.json();
      })
    }
  },
  albums: {
    //To be implemented if needed.
  }
};

export default apiCaller;
