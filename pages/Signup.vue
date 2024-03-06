<template>
    <div style="border: 2px solid black; display: flex;
     justify-content:center; align-items: center; height: 500px;" >
        <h3>SignUp</h3>
        <h3>Step 1 out of 2</h3>
        <form  >
                     <div style="margin: auto; padding: auto;"> 
                     <input type="text" v-model="user.firstname" placeholder="First Name" style="border: 1px solid black; margin-left: 80px; padding: 6px; border-radius: 5px;">
                    </div>
                    <br>
                     <div>
                     <input type="text" v-model="user.lastname" placeholder="Last Name" style="border: 1px solid black; margin-left: 80px; padding: 6px; border-radius: 5px;">
                     </div>
                     <NuxtLink to="/Signupimage" @click="steptwo" class="btn" >Next</NuxtLink>
        </form>
                        
                       
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