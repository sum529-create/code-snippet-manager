<template>
  <header class="sticky top-0 left-0 right-0 bg-white shadow-sm z-[9999]">
    <nav class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo / Title -->
      <div class="flex items-center">
        <h1 class="text-xl font-bold text-gray-800">Code Snippets</h1>
      </div>

      <!-- Navigation Links -->
      <div class="hidden md:flex items-center space-x-4">
        <router-link
          to="/"
          class="px-3 py-2 rounded-lg hover:bg-gray-100"
          active-class="text-blue-600"
        >
          Home
        </router-link>
        <router-link
          to="/create"
          class="px-3 py-2 rounded-lg hover:bg-gray-100"
          active-class="text-blue-600"
        >
          New Snippet
        </router-link>
      </div>

      <!-- Search Bar -->
      <div class="hidden md:block">
        <input
          type="search"
          placeholder="Search snippets..."
          class="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Mobile Menu Button -->
      <button @click="menuHandler()" class="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <!-- Mobile Menu List -->
      <transition name="menu">
        <div v-if="isMenuOpen" class="md:hidden absolute w-full bg-[#2F855A] left-0 top-16 z-[1]">
          <div class="flex flex-col px-4 container mx-auto text-[#FFFFFF8C]">
            <router-link
              to="/"
              class="px-3 py-2 rounded-lg hover:text-[#FFFFFFBF]"
              active-class="text-[white] hover:text-[#FFFFFFFF]"
            >
              Home
            </router-link>
            <router-link
              to="/create"
              class="px-3 py-2 rounded-lg hover:text-[#FFFFFFBF]"
              active-class="text-[white] hover:text-[#FFFFFFFF]"
            >
              New Snippet
            </router-link>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const menuHandler = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
}
.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s ease-out;
  transform-origin: top;
}
.menu-enter-to,
.menu-leave-from {
  opacity: 1;
  transform: scaleY(1);
}
</style>
