<template>
  <div class="font-sans antialiased">
    <nav class="bg-customgreen py-4">
      <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div class="flex items-center">
          <NuxtLink to="/">
            <span class="text-white text-lg font-bold mr-4">Tracking App</span>
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <input type="checkbox" class="hidden" id="menu-toggle" />
          <label for="menu-toggle" class="cursor-pointer md:hidden block mr-4">
            <i class="fas fa-bars text-white text-2xl"></i>
          </label>
          <div class="flex items-center">
            <span class="text-white ml-2 px-5">John Doe</span>
            <div @click="togglemousein" class="flex">
              <img
                src="/Img.jpeg"
                alt="Profile"
                class="h-8 w-8 rounded-full bg-white"
              />
              <!-- Dropdown Button -->
              <button
                ref="dropdownToggle"
                id="dropdown-toggle"
                class="text-white focus:outline-none"
              >
                <!-- Add dropdown icon here -->
                <i class="material-icons mt-[8px]">arrow_drop_down</i>
              </button>
            </div>
          </div>
          <!-- Dropdown Menu -->
          <div
            v-show="dropdownOpen"
            ref="dropdownMenu"
            id="dropdown-menu"
            class="dropdown-menu absolute right-0 mt-[109px] w-48 bg-white rounded-md shadow-lg z-10"
          >
            <NuxtLink
              to="/"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              @click="togglemouseout"
              >Home</NuxtLink
            >
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const dropdownOpen = ref(false);

    const togglemousein = () => {
      dropdownOpen.value = true;
    };
    const togglemouseout = () => {
      dropdownOpen.value = false;
    };

    return { dropdownOpen, togglemousein, togglemouseout };
  },
};
</script>

<style scoped></style>
