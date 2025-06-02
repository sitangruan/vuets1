import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { routeList } from "../common/constants";
import type { NavigationLink } from "@/modals";

const populateRoutes = (links: NavigationLink[]): Array<RouteRecordRaw> => {
  const myRoutes = Array<RouteRecordRaw>();

  let hasAddedDefaultRoute = false;
  links.forEach((route) => {
    if (!hasAddedDefaultRoute && route.isDefaultLink) {
      hasAddedDefaultRoute = true;
      myRoutes.push({
        path: '/',
        redirect: `/${route.route}`,
      } as RouteRecordRaw);
    }

    const myPath = route.hasNestedLink
      ? `/${route.route}/:id?` : `/${route.route}`;

    myRoutes.push({
      path: myPath,
      name: route.route,
      component: () => import(`${route.componentPath}`),
    } as RouteRecordRaw);
  });

  console.log("myRoutes", myRoutes);
  return myRoutes;
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: populateRoutes(routeList),
});

export default router;


