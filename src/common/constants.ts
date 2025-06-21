/**
 * This the central place for all constant value definitions.
 */

import type { SortingInfo } from "@/modals/SortingInfo";
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
    isDefaultLink: true,
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
    isDefaultLink: false,
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

export const idPlaceHolder = '{id}';

export const defaultPostsSortingInfo = {
  sortBy: 'title',
  sortOrder: 'asc',
} as SortingInfo;

export const postsGridColumns = [
  { field: 'title', label: 'Title', sortable: true, headerClassName: 'col-title-header', className: 'col-title' },
  { field: 'body', label: 'Body', sortable: true, headerClassName: 'col-body-header', className: 'col-body' },
  { field: 'userName', label: 'User Name', sortable: true, headerClassName: 'col-username-header', className: 'col-username' },
  { field: 'email', label: 'Email', sortable: true, headerClassName: 'col-email-header', className: 'col-email' },
] as const;

export const limits = {
  maxCommentLength: 500,
}
