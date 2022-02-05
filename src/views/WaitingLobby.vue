<template>
  <div
    class="flex flex-col border shadow-xl rounded-lg p-10 outline-none focus justify-center divide-y-2 space-y-2 divide-emerald-400 items-center"
  >
    <div class="flex flex-col align-center">
      <p class="self-center">List of players</p>
      <player-host :level="2" :winRate="80" :isReady="false" />
    </div>

    <div class="space-y-2 pt-1.75" v-if="players.length">
      <player-lobby
        :nickname="player.nickname"
        :level="player.level"
        :winRate="player.winrate"
        :isReady="true"
        v-for="player in players"
        :key="player.nickname"
      />
    </div>
    <div v-else>These is no players</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import PlayerLobby from "@/components/PlayerLobby.vue";
import PlayerHost from "@/components/PlayerHost.vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const players = store.state.players;

    return { players };
  },
  components: {
    PlayerLobby,
    PlayerHost
  }
});
</script>

<style scoped>
.btn {
  @apply w-25 self-center bg-blue-500 text-white rounded-sm focus:outline-none hover:bg-blue-700 transition-colors active:bg-blue-900 focus:border-red-500 border rounded-md h-10;
}
</style>
