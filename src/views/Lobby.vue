<template>
  <div class="h-screen w-screen flex flex-row">
    <div class="bg-gray-400 w-20/100 flex flex-col h-screen">
      <div class="flex flex-col items-center rounded h-auto">
        <h2>Choose a peer</h2>
        <select v-model="selectedChat" class="w-full">
          <option :value="i" v-for="i in Object.keys(chats)" :key="i">
            {{ chats[i].name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col h-screen">
        <h2 class="self-center">Messages</h2>
        <div class="h-full flex flex-col space-y-2">
          <div class="h-full flex flex-col space-y-2" v-if="messages.length">
            <message-view
              v-for="message in messages"
              :key="message.time"
              :time="message.time"
              :nickname="message.author.nickname"
              :message="message.message"
            ></message-view>
          </div>
          <p class="h-full" v-else>There is no messages</p>
          <div class="relative">
            <div class="flex flex-row p-1 h-full">
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
      </div>
    </div>
    <div class="flex flex-col bg-fuchsia-300 w-screen">
      <div class="h-50 bg-violet-500 flex flex-row">
        <div
          class="flex flex-col items-center justify-center pl-4 text-center"
          v-for="player in players"
          :key="player.id"
        >
          <img
            class="rounded-5xl w-20"
            :src="require('@/assets/braytech.png')"
            alt="Player's logo"
            height="45"
            width="45"
          />
          <div class="pt-2">
            <p>{{ player.nickname }}</p>
            <p>{{ player.isAlive }}</p>
          </div>
        </div>
      </div>
      <div class="bg-cyan-500 max-h-full">
        <div class="p-4 flex flex-col justify-center pt-25">
          <div
            class="flex flex-col border shadow-xl rounded-lg p-10 outline-none justify-center space-y-5 bg-white items-center text-center"
          >
            <div class="table border-collapse table-auto">
              <div class="table-caption">Market state</div>
              <div class="table-header-group">
                <div class="table-row">
                  <div class="table-cell border border-black p-1">Level</div>
                  <div class="table-cell border border-black p-1">
                    Volume raw materials
                  </div>
                  <div class="table-cell border border-black p-1">
                    Min price for raw materials
                  </div>
                  <div class="table-cell border border-black p-1">
                    Demand for destroyers
                  </div>
                  <div class="table-cell border border-black p-1">
                    Max price for destroyers
                  </div>
                </div>
              </div>
              <div class="table-row-group">
                <div class="table-row">
                  <div class="table-cell border border-black p-1">
                    {{ roomState.level }}
                  </div>
                  <div class="table-cell border border-black p-1">
                    {{ roomState.volume }}
                  </div>
                  <div class="table-cell border border-black p-1">
                    {{ roomState.minPriceRaw }}
                  </div>
                  <div class="table-cell border border-black p-1">
                    {{ roomState.maxDestroyers }}
                  </div>
                  <div class="table-cell border border-black p-1">
                    {{ roomState.maxPriceDestroyer }}
                  </div>
                </div>
              </div>
            </div>
            <div class="table border-collapse table-auto">
              <div class="table-caption">Your state</div>
              <div class="table-header-group">
                <div class="table-row">
                  <div class="table-cell border border-black p-1">Money</div>
                  <div class="table-cell border border-black p-1">
                    Raw materials
                  </div>
                  <div class="table-cell border border-black p-1">
                    Destroyers
                  </div>
                  <div class="table-cell border border-black p-1">
                    Manufactories
                  </div>
                </div>
              </div>
              <div class="table-row-group">
                <div class="table-row">
                  <div class="table-cell border border-black p-1">
                    {{ userState.money }}
                  </div>
                  <div class="table-cell border border-black p-1">
                    {{ userState.raw_materials }}
                  </div>
                  <div class="table-cell border border-black p-1">
                    {{ userState.destroyers }}
                  </div>
                  <div class="table-cell border border-black p-1">
                    {{ userState.manufactories }}
                  </div>
                </div>
              </div>
            </div>
            <p class="text-lg">Current month: {{ roomState.currentMonth }}</p>
          </div>
        </div>
        <div class="flex flex-row space-x-5 justify-center">
          <div
            class="flex flex-col border shadow-xl rounded-lg p-2 outline-none justify-center space-y-2 bg-white items-center text-center"
          >
            <h1>Buy offer</h1>
            <input
              type="number"
              placeholder="Quantity of raw materials"
              v-model="buyOffer.rawMaterials"
              :min="roomState.minPriceRaw"
            />
            <input type="number" placeholder="Price" v-model="buyOffer.price" />
            <button class="btn" @click="sendBuyOffer">Send</button>
          </div>
          <div
            class="flex flex-col border shadow-xl rounded-lg p-2 outline-none justify-center space-y-2 bg-white items-center text-center"
          >
            <h1>Produce offer</h1>
            <input
              type="number"
              placeholder="Quantity to build destroyers"
              v-model="produceOffer"
            />
            <button class="btn" @click="sendProduceOffer">Send</button>
          </div>
          <div
            class="flex flex-col border shadow-xl rounded-lg p-2 outline-none justify-center space-y-2 bg-white items-center text-center"
          >
            <h1>Build offer</h1>
            <input
              type="number"
              placeholder="Quantity to build manufactories"
              v-model="buildOffer"
            />
            <button class="btn" @click="sendBuildOffer">Send</button>
          </div>
          <div
            class="flex flex-col border shadow-xl rounded-lg p-2 outline-none justify-center space-y-2 bg-white items-center text-center"
          >
            <h1>Auction offer</h1>
            <input
              type="number"
              placeholder="Quantity to sell destroyers"
              v-model="auctionOffer.destroyers"
            />
            <input
              type="number"
              placeholder="Price"
              v-model="auctionOffer.price"
              :max="roomState.maxPriceDestroyer"
            />
            <button class="btn" @click="sendAuctionOffer">Send</button>
          </div>
        </div>
        <div class="flex flex-col justify-center pt-2">
          <button class="btn" @click="endMove">End turn</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Api from "@/api";
import MessageView from "@/components/MessageView.vue";
import { computed, defineComponent, inject, reactive, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { MessageView },
  setup() {
    const store = useStore();

    const chats = computed(() => store.state.chats);
    const selectedChat = ref(store.state.roomId);
    const messages = computed(() => chats.value[selectedChat.value].messages);
    const text = ref("");

    const roomState = computed(() => store.state.roomState);
    const userState = computed(() => store.state.userState);
    const players = computed(() => store.state.players);

    const api: Api | undefined = inject("api");

    const buyOffer = reactive({
      rawMaterials: "",
      price: ""
    });
    const auctionOffer = reactive({
      destroyers: "",
      price: ""
    });
    const produceOffer = ref("");
    const buildOffer = ref("");

    const sendMessage = () => {
      if (api && text.value != "") {
        api.sendMessage({
          author: {
            nickname: store.state.user.nickname,
            profilePhoto: store.state.user.profilePhoto
          },
          message: text.value,
          peerId: selectedChat.value
        });
        text.value = "";
      }
    };
    const sendBuyOffer = () => {
      if (api) {
        api.sendBuyOffer({
          rawMaterials: parseInt(buyOffer.rawMaterials),
          price: parseInt(buyOffer.price),
          playerId: store.state.user.id
        });
      }
    };
    const sendProduceOffer = () => {
      if (api) {
        api.sendProduceOffer({
          playerId: store.state.user.id,
          destroyers: parseInt(produceOffer.value)
        });
      }
    };
    const sendBuildOffer = () => {
      if (api) {
        api.sendBuildOffer({
          playerId: store.state.user.id,
          manufactories: parseInt(buildOffer.value)
        });
      }
    };
    const sendAuctionOffer = () => {
      if (api) {
        api.sendAuctionOffer({
          playerId: store.state.user.id,
          destroyers: parseInt(auctionOffer.destroyers),
          price: parseInt(auctionOffer.price)
        });
      }
    };
    const endMove = () => {
      if (api) {
        api.endMove();
      }
    };

    return {
      chats,
      selectedChat,
      messages,
      text,
      sendMessage,
      roomState,
      userState,
      sendBuyOffer,
      sendProduceOffer,
      sendBuildOffer,
      sendAuctionOffer,
      buyOffer,
      auctionOffer,
      produceOffer,
      buildOffer,
      players,
      endMove
    };
  }
});
</script>

<style scoped>
input {
  @apply border transition-colors focus:border-blue-500 focus:outline-none border-1.5px rounded-md text-sm text-center w-full;
}
.btn {
  @apply w-25 self-center bg-blue-500 text-white focus:outline-none hover:bg-blue-700 transition-colors active:bg-blue-900 focus:border-red-500 border rounded-md h-10;
}
</style>
