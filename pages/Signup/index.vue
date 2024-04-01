<template>
  <div class="mt-24 py-4 flex justify-center align-center">
    <div class="p-10 rounded">
      <h1 class="text-center text-customgreen text-3xl font-semibold mb-5">
        Sign up
      </h1>
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          required
          v-model="user.firstname"
          placeholder="First Name"
          class="h-8 border rounded-md mb-3 px-2 w-72"
        /><br />

        <input
          type="text"
          required
          v-model="user.lastname"
          placeholder="Last Name"
          class="h-8 border rounded-md px-2 w-72 mb-5"
        />
        <br />

        <select
          required
          v-model="user.usertype"
          class="h-8 border rounded-md px-2 w-full mb-5 class='text-customgreen'"
        >
          <option value="">Select User</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <select
          v-if="user.usertype == 'student'"
          required
          v-model="user.StudentCourse"
          class="h-8 border rounded-md px-2 w-full mb-5 class='text-customgreen'"
        >
          <option value="Maths">Maths</option>
        </select>
        <button
          type="submit"
          class="bg-customgreen hover:btnHover rounded-md text-white h-8 w-full"
        >
          Next
        </button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSignup } from "~/store/signup";
const store = useSignup();
export interface user {
  firstname: String;
  lastname: String;
  usertype: string | null;
  StudentCourse: string | null;
}
const user = reactive<user>({
  firstname: "",
  lastname: "",
  usertype: "",
  StudentCourse: "",
});

const userStudentType = ref(null);
const router = useRouter();
const isValidFirstName = computed(() => user.firstname.length >= 3);
const isValidLastName = computed(() => user.lastname.length >= 3);

const isFormValid = computed(
  () => isValidFirstName.value && isValidLastName.value
);

const handleSubmit = () => {
  store.set(user.firstname, user.lastname, user.usertype, user.StudentCourse);
  navigateTo("signup/signupimage");
};
</script>
