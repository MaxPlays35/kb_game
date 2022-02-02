<template>
  <div class="h-screen w-screen flex flex-row">
    <div class="bg-gray-400 w-80 h-screen">Chat</div>
    <div class="flex flex-col bg-fuchsia-300 w-screen">
      <div class="h-50 bg-violet-500">Players</div>
      <div class="bg-cyan-500 h-full">Information about game</div>
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

<style></style>
