import { defineStore } from "pinia";
export const useSignup = defineStore("signup", () => {
  const fName = ref(null);
  const lName = ref(null);
  const role = ref(null);
  function set(f, l, r) {
    fName.value = f;
    lName.value = l;
    role.value = r;
  }

  return { fName, lName, role, set };
});
