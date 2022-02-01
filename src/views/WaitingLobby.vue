<template>
  <div
    class="flex flex-col border shadow-xl rounded-lg p-10 outline-none focus justify-center divide-y-2 space-y-2 divide-emerald-400 items-center"
  >
    <div class="flex flex-col align-center">
      <p class="self-center">List of players</p>
      <player-lobby />
    </div>

    <div class="space-y-2 pt-1.75">
      <player-lobby v-for="i in 5" :key="i" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import PlayerLobby from "@/components/PlayerLobby.vue";

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    PlayerLobby
  }
});
</script>

<style>
.btn {
  @apply w-25 self-center bg-blue-500 text-white rounded-sm focus:outline-none hover:bg-blue-700 transition-colors active:bg-blue-900 focus:border-red-500 border rounded-md h-10;
}
</style>
