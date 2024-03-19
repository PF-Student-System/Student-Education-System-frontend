import { defineStore } from "pinia";
// import { Ref } from "vue";

interface AuthStore {
  auth: Ref<boolean>;
  login: () => void;
  logout: () => void;
}

export const useAuth = defineStore("auth", () => {
  const auth: Ref<boolean> = ref(true);

  function login(): void {
    auth.value = true;
  }

  function logout(): void {
    auth.value = false;
  }

  return { auth, login, logout } as AuthStore;
});
