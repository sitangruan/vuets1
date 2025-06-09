import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { routeList } from "../common/constants";
import type { NavigationLink } from "@/modals";
import Todos from "@/views/todos/index.vue";
import Posts from "@/views/posts/index.vue";
import PostList from "@/views/posts/postList.vue";
import PostDetail from "@/views/posts/postDetail.vue";
import Users from "@/views/users/index.vue";
import Albums from "@/views/albums/index.vue";

// This file defines the Vue Router configuration for the application.
// It maps the routes defined in the constants to their respective components.
// Each route is associated with a component that will be rendered when the route is accessed.
// The `populateRoutes` function recursively builds the route configuration based on the provided links.
// The `routeMap` function maps route names to their corresponding components.
// The router is created with a hash history and the populated routes.
// In this demo project, it is limited to have maximum 2 levels of nested routes.
const routeMap = (routeName: string, parentRouteName = '') => {
  switch (routeName) {
    case '/todos':
      return Todos;
    case '/posts':
      return Posts;
    case '/users':
      return Users;
    case '/albums':
      return Albums;
    case '':
      if (parentRouteName === 'posts') {
        return PostList;
      } else {
        return Posts;
      }
    case ':id':
      if (parentRouteName === 'posts') {
        return PostDetail;
      } else {
        throw new Error(`Route component for ${routeName} not found.`);
      }
    default:
      throw new Error(`Route component for ${routeName} not found.`);
  }
};

const populateRoutes = (links: NavigationLink[]): Array<RouteRecordRaw> => {

  const myRoutes = Array<RouteRecordRaw>();

  let hasAddedDefaultRoute = false;
  links.forEach((link) => {
    if (!hasAddedDefaultRoute && link.isDefaultLink) {
      hasAddedDefaultRoute = true;
      myRoutes.push({
        path: '/',
        redirect: `${link.route}`,
      } as RouteRecordRaw);
    }

    const childrenRoute = Array<RouteRecordRaw>()
    if (link.children && link.children.length > 0) {
      const nestedRoutes = populateRoutes(link.children);
      childrenRoute.push(...nestedRoutes);
    }

    myRoutes.push({
        path: link.route,
        name: link.displayName,
        component: routeMap(link.route, link.parentRoute),
        children: childrenRoute,
      } as RouteRecordRaw);
  });

  return myRoutes;
}

const totalRoutes = populateRoutes(routeList);
console.log("Total Routes: ", totalRoutes);

const router = createRouter({
  history: createWebHashHistory(),
  routes: totalRoutes,
});

export default router;


