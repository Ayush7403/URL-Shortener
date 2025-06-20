import { createRootRoute } from "@tanstack/react-router";
import { homePageRoute } from "./homePage";
import { authRoute } from "./auth";
import { dashboardRoute } from "./dashboard";
import App from "../App";

export const rootRoute = createRootRoute({
    component: App,
});

export const routeTree = rootRoute.addChildren([
    homePageRoute,
    authRoute,
    dashboardRoute,
]);

