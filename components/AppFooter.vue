<template>
    <footer class="bg-customgreen px-10 pt-10 pb-2">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <!-- About Us -->
          <div class="section-container bg-customgreen">
            <div class="section-content text-white">
              <h2 class="text-base font-semibold mb-1 text-xl">About us</h2>
              <p class="text-sm leading-snug mb-1 font-light text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aperiam quod eveniet eligendi veritatis sint rem possimus rerum. Quidem laboriosam reiciendis neque qui!</p>
              <div class="flex space-x-2">
                <a href="#" class="hover:text-white text-customblue"><i class="fab fa-facebook"></i></a>
                <a href="#" class="hover:text-white text-customblue"><i class="fab fa-twitter"></i></a>
                <a href="#" class="hover:text-white text-customblue"><i class="fab fa-instagram"></i></a>
                <a href="#" class="hover:text-white text-customblue"><i class="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <!-- Address -->
          <div class="section-container bg-customgreen px-20">
            <div class="section-content text-white">
              <h2 class="text-base font-semibold mb-1 px-2 text-xl">Address</h2>
              <div class="flex items-center mb-1 py-1">
                <i class="fas fa-map-marker-alt text-customblue mr-1 px-2"></i>
                <span class="text-sm">Lahore, Pakistan</span>
              </div>
              <div class="flex items-center mb-1 py-1">
                <i class="fas fa-phone-alt text-customblue mr-1 px-2"></i>
                <span class="text-sm">+92-0123456789</span>
              </div>
              <div class="flex items-center mb-1 py-1">
                <i class="fas fa-clock text-customblue mr-1 px-2"></i>
                <span class="text-sm">Mon-Fri: 9am-6pm</span>
              </div>
              <div class="flex items-center mb-1 py-1">
                <i class="fas fa-globe text-customblue mr-1 px-2"></i>
                <span class="text-sm">www.example.com</span>
              </div>
              <div class="flex items-center mb-1 py-1">
                <i class="fas fa-envelope text-customblue mr-1 px-2"></i>
                <span class="text-sm">abc@example.com</span>
              </div>
            </div>
          </div>
          <!-- Contact Us -->
          <div class="section-container bg-customgreen">
            <div class="section-content text-white">
              <h2 class="text-base font-semibold mb-1 text-xl">Contact us</h2>
              <form class="flex flex-col space-y-2">
                <label for="email" class="text-sm">Email *</label>
                <input type="email" id="email" class="w-full bg-gray-800 text-white rounded px-2 py-1 outline-none focus:border-red-600" required>
                <label for="message" class="text-sm">Message *</label>
                <textarea id="message" rows="2" class="w-full bg-gray-800 text-black rounded px-2 py-1 outline-none focus:border-red-600" required></textarea>
                <button type="submit" class="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-800 bg-customblue">Send</button>
              </form>
            </div>
          </div>
        </div>
        <div class="mt-2 text-center text-white">
          <span class="text-xs">© 2024 All rights reserved.</span>
        </div>
      </div>
    </footer>
  </template>
  