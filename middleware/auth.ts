import { useAuth } from "~/store/auth.js";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuth();
  const auth = store.auth;
  if (!auth) {
    return navigateTo("/");
  }
});
