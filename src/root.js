import { Router, Route, RootRoute } from "@tanstack/react-router";

import ListingPage from "./pages/listingPage";
import HomePage from "./pages/homePage";
import CreateListingPage from "./pages/createPostPage";
import Root from "./App";

import LoginPage from "./pages/loginPage";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const listingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/listing",
  component: ListingPage,
});

const createListingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: CreateListingPage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  listingRoute,
  createListingRoute,
]);

export const router = new Router({ routeTree });
export default router;
