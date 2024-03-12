import { defineStore } from "pinia";
export const useAuth = defineStore("auth", () => {
  const auth = ref(true);
  function login() {
    auth.value = true;
  }
  function logout() {
    auth.value = false;
  }

  return { auth, login, logout };
});
