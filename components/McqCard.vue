<template>
    <div class="mcqcard bg-green-100">
      <p class="text-xl font-bold " style="color: #535966;">{{ questions.questionText }}</p>
      <ul>
        <li v-for="(option, optionIndex) in questions.options" :key="optionIndex" class="mt-2">
          <input type="radio" :id="`question_${index}`" :name="`question_${index}`" class="mr-2">
          <label :for="`option_${optionIndex}`" class="mt-2">{{ option }}</label>
        </li>
      </ul>
    </div>
</template>

<script setup>
    const { questions } = defineProps(['questions'])
    console.log(questions)
</script>
<style scoped>
input[type="radio"] {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #333; /* Border color */
  border-radius: 50%; /* Rounded shape */
  outline: none;
  margin-right: 8px;
}
    input[type="radio"]:checked {
  background-color: #00C16A; /* Background color when checked */
    }
</style>
