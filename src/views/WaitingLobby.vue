<template>
  <div
    class="flex flex-col border shadow-xl rounded-lg p-10 outline-none focus justify-center divide-y-2 space-y-2 divide-emerald-400 items-center"
  >
    <div class="flex flex-col align-center">
      <div class="flex flex-col pb-2">
        <p class="flr self-center">
          This room id is <strong>{{ roomId }}</strong>
        </p>
        <button class="btn btn-danger" @click="leaveRoom">LEAVE</button>
      </div>
      <player-host
        :level="player.level"
        :winRate="player.winrate"
        :isReady="player.isReady"
      />
      <p class="self-center">List of players</p>
    </div>

    <div class="space-y-2 pt-4" v-if="players.length">
      <player-lobby
        :nickname="player.nickname"
        :level="player.level"
        :winRate="player.winrate"
        :isReady="player.isReady"
        v-for="player in players"
        :key="player.id"
      />
    </div>
    <div v-else>These is no players</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, inject } from "vue";
import PlayerLobby from "@/components/PlayerLobby.vue";
import PlayerHost from "@/components/PlayerHost.vue";
import { useStore } from "vuex";
import { Player } from "@/store";
import Api from "@/api";

export default defineComponent({
  setup() {
    const store = useStore();
    const api: Api | undefined = inject("api");
    const players: ComputedRef<Player[]> = computed(() => store.state.players);
    const player: ComputedRef<Player> = computed(() => store.state.user);
    const roomId: ComputedRef<string> = computed(() => store.state.roomId);
    const leaveRoom = () => {
      if (api) {
        api.leaveRoom();
      }
    };

    return { players, player, roomId, leaveRoom };
  },
  components: {
    PlayerLobby,
    PlayerHost
  }
});
</script>

<style scoped>
.btn {
  @apply w-25 self-center  text-white rounded-sm focus:outline-none  transition-colors   border rounded-md h-10;
}
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-700 active:bg-blue-900 focus:border-blue-100;
}
.btn-danger {
  @apply bg-red-500 hover:bg-red-700 active:bg-red-900 focus:border-red-100;
}
</style>
