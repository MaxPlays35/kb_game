<template>
  <div class="h-screen w-screen flex flex-row">
    <div class="bg-gray-400 w-20/100 flex flex-col h-screen">
      <div class="flex flex-col items-center rounded h-auto">
        <h2>Choose a peer</h2>
        <select name="" id="" class="w-full">
          <option :value="i" v-for="i in 5" :key="i">{{ i }}</option>
        </select>
      </div>
      <div class="flex flex-col h-99/100">
        <h2 class="self-center">Messages</h2>
        <div class="flex flex-col space-y-2">
          <div class="bg-warm-gray-50 rounded w-5/6">
            <p>dsfds</p>
          </div>
          <div
            class="flex flex-col bg-blue-500 rounded w-5/6 self-end text-right"
          >
            <p>asdsa</p>
          </div>
          <div class="bg-warm-gray-50 rounded w-5/6">
            <p class="self-end">dsfd,,,s</p>
          </div>
        </div>
      </div>
      <div class="h-auto">
        <div class="flex flex-row p-1">
          <input class="rounded" type="text" placeholder="Your message..." />
          <button class="btn">Send</button>
        </div>
      </div>
    </div>
    <div class="flex flex-col bg-fuchsia-300 w-screen">
      <div class="h-50 bg-violet-500 flex flex-row">
        <div
          class="flex flex-col items-center justify-center pl-4 text-center"
          v-for="i in 5"
          :key="i"
        >
          <img
            class="rounded-5xl w-20"
            :src="require('@/assets/braytech.png')"
            alt="Player's logo"
            height="45"
            width="45"
          />
          <div class="pt-2">
            <p>nickname</p>
            <p>Live</p>
          </div>
        </div>
      </div>
      <div class="bg-cyan-500 h-full">
        <div class="p-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style scoped>
.btn {
  @apply w-25 self-center bg-blue-500 text-white rounded-sm focus:outline-none hover:bg-blue-700 transition-colors active:bg-blue-900 focus:border-red-500 border rounded-md h-10;
}
</style>
