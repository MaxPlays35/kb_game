<template>
  <div
    class="border shadow-xl rounded-lg p-10 outline-none focus justify-center divide-y-2 space-y-2 divide-emerald-400"
  >
    <form
      @submit.prevent="joinRoom"
      class="items-center flex flex-col space-y-2"
    >
      <label class="self-center" for="roomId">Room Id</label>
      <input type="text" v-model="idRoom" id="roomId" />

      <button class="btn" type="submit">Join Room</button>
    </form>

    <form
      @submit.prevent="createRoom"
      class="items-center flex flex-col space-y-2 pt-2"
    >
      <label class="self-center" for="months">Months</label>
      <input type="number" v-model="months" id="months" min="6" />
      <button class="btn">Create room</button>
    </form>
  </div>
</template>

<script lang="ts">
import Api from "@/api";
import { defineComponent, inject, Ref, ref } from "vue";

export default defineComponent({
  setup() {
    const idRoom: Ref<string> = ref("");
    const months: Ref<number> = ref(0);
    const api: Api | undefined = inject("api");
    const joinRoom = () => {
      if (api) {
        api.connect(idRoom.value);
      }
    };
    const createRoom = () => {
      if (api) {
        api.createRoom(months.value);
      }
    };

    return { idRoom, joinRoom, createRoom, months };
  }
});
</script>

<style scoped>
input {
  @apply border transition-colors focus:border-blue-500 focus:outline-none border-1.5px rounded-md text-sm text-center w-full;
}
.btn {
  @apply w-25 self-center bg-blue-500 text-white rounded-sm focus:outline-none hover:bg-blue-700 transition-colors active:bg-blue-900 focus:border-red-500 border rounded-md h-10;
}
</style>
