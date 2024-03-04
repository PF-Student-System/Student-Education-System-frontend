<template>
    <div v-for="questions in myExam.questions" :key="questions.questionText" class="card">
          <mcqCard :questions="questions"/>
    </div>
</template>

<script lang="ts" setup>
    import { myExam } from '~/types/exam';
      onMounted(() => {
            console.log("hello" ,myExam)
        }) 

</script>

<style scoped>

</style>