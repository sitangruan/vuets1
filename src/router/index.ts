import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { routeList } from "../common/constants";
import type { NavigationLink } from "@/modals";
import Todos from "@/views/todos/index.vue";
import Posts from "@/views/posts/index.vue";
import Users from "@/views/users/index.vue";
import Albums from "@/views/albums/index.vue";

const routeMap = (routeName: string) => {
  switch (routeName) {
    case 'todos':
      return Todos;
    case 'posts':
      return Posts;
    case 'users':
      return Users;
    case 'albums':
      return Albums;
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
        redirect: `/${link.route}`,
      } as RouteRecordRaw);
    }

    const myPath = link.hasNestedLink
      ? `/${link.route}/:id?` : `/${link.route}`;

    myRoutes.push({
      path: myPath,
      name: link.route,
      component: routeMap(link.route),
    } as RouteRecordRaw);
  });

  return myRoutes;
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: populateRoutes(routeList),
});

export default router;


