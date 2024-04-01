import { defineStore } from "pinia";

interface AuthStore {
  auth: Ref<boolean>;
  token: Ref<string>;
  login: () => void;
  logout: () => void;
}

export const useAuth = defineStore("auth", () => {
  const auth: Ref<boolean> = ref(true);
  const token = ref("");

  function login(tok: string): void {
    auth.value = true;
    token.value = tok;
    console.log(token.value);
  }

  function logout(): void {
    auth.value = false;
  }

  return { auth, token, login, logout } as AuthStore;
});
