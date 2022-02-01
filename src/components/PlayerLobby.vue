<template>
  <div class="bg-gray-300 rounded-md p-1">
    <div class="flex">
      <img
        src="@/assets/braytech.png"
        alt="Player's avatar"
        height="30"
        width="30"
        class="rounded-5xl w-20"
      />
      <div class="flex flex-col items-center justify-center w-40">
        <h5>You</h5>
        <h5>2 lvl &nbsp; &nbsp; 70%</h5>
      </div>

      <div class="flex flex-col items-center justify-center w-40">
        <button class="btn">READY</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style></style>
