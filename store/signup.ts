import { defineStore } from "pinia";
// import { Ref } from "vue";

interface SignupStore {
  fName: Ref<string | null>;
  lName: Ref<string | null>;
  role: Ref<string | null>;
  set: (f: string | null, l: string | null, r: string | null) => void;
}

export const useSignup = defineStore("signup", () => {
  const fName: Ref<string | null> = ref(null);
  const lName: Ref<string | null> = ref(null);
  const role: Ref<string | null> = ref(null);

  function set(f: string | null, l: string | null, r: string | null): void {
    fName.value = f;
    lName.value = l;
    role.value = r;
  }

  return { fName, lName, role, set } as SignupStore;
});
