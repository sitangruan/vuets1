/**
 * This the central place for all constant value definitions.
 */

import type { NavigationLink } from "../modals/index";

export const routeList = [
  {
    id: 1,
    displayName: "Todos",
    route: "/todos",
    isDefaultLink: false,
    hasNestedLink: false,
    componentPath: "/src/views/todos/index.vue",
  },
  {
    id: 2,
    displayName: "Posts",
    route: "/posts",
    isDefaultLink: false,
    hasNestedLink: true,
    componentPath: "/src/views/posts/index.vue",
    children: [
      {
        id: 5,
        displayName: "Post-List",
        route: "",
        parentRoute: "posts",
        isDefaultLink: false,
        hasNestedLink: false,
        componentPath: "/src/views/posts/postList.vue",
      } as NavigationLink,
      {
        id: 6,
        displayName: "Post-Details",
        route: ":id",
        parentRoute: "posts",
        isDefaultLink: false,
        hasNestedLink: false,
        componentPath: "/src/views/posts/postDetails.vue",
        beforeEnter: (to: { params: { id: number } }) => {
          if (!Number.isInteger(Number(to.params?.id)) || !(to.params?.id > 0)) {
            alert("Invalid post ID. Please enter a valid integer greater than 0.");
            return false;
          }

          // If the id is a valid integer, allow navigation
          return true; // Allow navigation
        }
      } as NavigationLink,
    ]
  },
  {
    id: 3,
    displayName: "Users",
    route: "/users",
    isDefaultLink: true,
    hasNestedLink: false,
    componentPath: "/src/views/users/index.vue",
  },
  {
    id: 4,
    displayName: "Albums",
    route: "/albums",
    isDefaultLink: false,
    hasNestedLink: false,
    componentPath: "/src/views/albums/index.vue",
  },
] as NavigationLink[];

export const linkedInUrl = 'https://www.linkedin.com/in/sitang-ruan/';

export const sourceCodesUrl = 'https://github.com/sitangruan/vuets1';

