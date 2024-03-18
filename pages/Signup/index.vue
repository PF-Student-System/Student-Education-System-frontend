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
        <!-- <select required @change="(event) => {
          user.usertype = event.target.value;}" -->
          <select required v-model="user.usertype"
           class="h-8 border rounded-md  px-2 w-full mb-5">
          <option value="" >select User</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>
        <button type="submit"
        class="bg-customgreen hover:btnHover rounded-md text-white h-8 w-full">Next</button>

      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';


export interface user {
  firstname: String;
  lastname: String;
  usertype:string | null;


}
const user = reactive<user>({
  firstname: '',
  lastname: '',
  usertype:'',

});

const router = useRouter();
const isValidFirstName = computed(() => user.firstname.length >= 3);
const isValidLastName = computed(() => user.lastname.length >= 3);
//const isValidUserType = computed(() => user.usertype.length >0);
const isFormValid = computed(() => isValidFirstName.value && isValidLastName.value);




const handleSubmit = () => {

  router.push('Signup/Signupimage');
  console.log(user);

};

// function steptwo(){
const steptwo = () => {


}

</script>