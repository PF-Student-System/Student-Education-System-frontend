<template>
       
        <div class=" mt-24 py-4 flex justify-center align-center">
            <div class="p-10 rounded">
                <h1 class=" text-center mb-5 text-2xl text-customgreen text-3xl font-semibold mb-10">Sign up</h1>
                     <input type="text" v-model="user.firstname" placeholder="First Name" class="h-8 border rounded-md mb-3 px-2 w-72" ><br/>
                 
                     <input type="text" v-model="user.lastname" placeholder="Last Name" class="h-8 border rounded-md  px-2 w-72 mb-5" >
                     <br/>
                     <NuxtLink to="/Signupimage" ><button @click="steptwo" class="bg-customgreen hover:btnHover rounded text-white h-8 w-full"  >Next</button></NuxtLink>
            </div>
         </div>  
</template>
<script  setup>
import { reactive   } from 'vue';

        
        const user = reactive ({
        firstname:'',
        lastname:'',
        });

function steptwo(){
    
    console.log("lastname:",user.lastname);
    console.log("firstname",user.firstname);
   
}

</script>