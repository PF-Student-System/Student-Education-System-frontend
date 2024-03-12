<template>

  <div class=" mt-24 py-4 flex justify-center align-center">
    <div class="p-10 rounded">
      <h1 class=" text-center mb-5 text-2xl text-customgreen text-3xl font-semibold mb-10">Sign up</h1>
      <form @submit.prevent="handleSubmit">
        <input type="text" required v-model="user.firstname" placeholder="First Name"
          class="h-8 border rounded-md mb-3 px-2 w-72"><br />

        <input type="text" required v-model="user.lastname" placeholder="Last Name"
          class="h-8 border rounded-md  px-2 w-72 mb-5">
        <br />
        <button type="submit"
          class="bg-customgreen hover:btnHover rounded text-white h-8 w-full">Next</button>

      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';


export interface user {
  firstname: String;
  lastname: String;


}
const user = reactive<user>({
  firstname: '',
  lastname: '',

});

const router = useRouter();
const isValidFirstName = computed(() => user.firstname.length >= 3);
const isValidLastName = computed(() => user.lastname.length >= 3);
const isFormValid = computed(() => isValidFirstName.value && isValidLastName.value);




const handleSubmit = () => {
  // Perform form submission logic here
  // router.push('/Signupimage');
  router.push('Signup/Signupimage');

};

// function steptwo(){
const steptwo = () => {


}

</script>