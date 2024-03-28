import { defineStore } from "pinia";
// import { Ref } from "vue";

interface SignupStore {
  fName: Ref<string | null>;
  lName: Ref<string | null>;
  role: Ref<string | null>;
  StudentCourse: Ref<string | null>;
  set: (f: string | null, l: string | null, r: string | null , s:string | null) => void;
}

export const useSignup = defineStore("signup", () => {
  const fName: Ref<string | null> = ref(null);
  const lName: Ref<string | null> = ref(null);
  const role: Ref<string | null> = ref(null);
  const StudentCourse: Ref<string | null> = ref(null);


  function set(f: string | null, l: string | null, r: string | null, s:string | null): void {
    fName.value = f;
    lName.value = l;
    role.value = r;
    StudentCourse.value = s;
  }

  return { fName, lName, role, StudentCourse, set } as SignupStore;
});
