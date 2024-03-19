import { useAuth } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuth();
  const auth = store.auth;
  if (!auth) {
    return navigateTo("/");
  }
});
