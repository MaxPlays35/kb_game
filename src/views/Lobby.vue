<template>
  <div class="h-screen w-screen flex flex-row">
    <div class="bg-gray-400 w-20/100 flex flex-col h-screen">
      <div class="flex flex-col items-center rounded h-auto">
        <h2>Choose a peer</h2>
        <select v-model="selectedChat" class="w-full">
          <option :value="i" v-for="i in Object.keys(chats)" :key="i">
            {{ i }}
          </option>
        </select>
      </div>
      <div class="flex flex-col h-99/100">
        <h2 class="self-center">Messages</h2>
        <div class="flex flex-col space-y-2">
          <message-view
            v-for="message in messages"
            :key="message.time"
            :time="message.time"
            :nickname="message.nickname"
            :message="message.message"
          ></message-view>
          <!-- <div class="bg-warm-gray-50 rounded w-5/6">
            <p>dsfds</p>
          </div>
          <div
            class="flex flex-col bg-blue-500 rounded w-5/6 self-end text-right"
          >
            <p>asdsa</p>
          </div>
          <div class="bg-warm-gray-50 rounded w-5/6">
            <p class="self-end">dsfd,,,s</p>
          </div> -->
        </div>
      </div>
      <div class="h-auto">
        <div class="flex flex-row p-1">
          <input
            class="rounded"
            type="text"
            placeholder="Your message..."
            v-model="text"
          />
          <button class="btn" @click="sendMessage">Send</button>
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

<script lang="ts">
import Api from "@/api";
import MessageView from "@/components/MessageView.vue";
import { computed, defineComponent, inject, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { MessageView },
  setup() {
    const store = useStore();
    const chats = computed(() => store.state.chats);
    const selectedChat = ref("social");
    const messages = computed(() => store.state.chats[selectedChat.value]);
    const api: Api | undefined = inject("api");
    const text = ref("");
    const sendMessage = () => {
      if (api) {
        api.sendMessage({
          author: {
            nickname: store.state.user.nickname,
            profilePhoto: store.state.user.profilePhoto
          },
          message: text.value,
          peerId: chats.value[selectedChat.value].peerId
        });
      }
    };

    return {
      chats,
      selectedChat,
      messages,
      text,
      sendMessage
    };
  }
});
</script>

<style scoped>
.btn {
  @apply w-25 self-center bg-blue-500 text-white rounded-sm focus:outline-none hover:bg-blue-700 transition-colors active:bg-blue-900 focus:border-red-500 border rounded-md h-10;
}
</style>
