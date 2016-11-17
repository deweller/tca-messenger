<template>
  <div class="chat">
    <h1>Welcome User <span data-my-uuid></span></h1>

    <div class="messages-header">Messages</div>
    <div v-show="messages.length == 0" class="no-messages">
      Waiting for messages...
    </div>
    <div v-show="messages.length > 0" class="messages">
      <pre v-for="message in messages">[{{ message.quantity }} {{ message.token }}] {{ message.msg }}</pre>
    </div>

    <h2>Publish A Message</h2>
    <div class="input-group"><label for="QuantityInput">Quantity <input type="text" v-model="quantity" id="QuantityInput" placeholder="10"></label></div>
    <div class="input-group"><label for="TokenInput">Token <input type="text" v-model="token" id="TokenInput" placeholder="TOKENLY"></label></div>
    <div class="input-group"><label for="MessageInput">Message <textarea style="width: 300px; height: 48px;" v-model="message" id="MessageInput" placeholder="Your Message Here"></textarea></label></div>
    <button id="SendButton" v-on:click="sendMessage()" :disabled="!ready">Send</button>
  </div>
</template>

<script>
import pubnub from '../services/pubnub'

export default {
  name: 'Messenger',

  data () {
    return {
      ready: false,
      messages: this.$root.messages,

      quantity: null,
      token: null,
      message: null
    }
  },

  mounted () {
    // get parameter query var '?c=xxxxx'
    let queryVarName = 'c'
    let match = RegExp('[?&]' + queryVarName + '=([^&]*)').exec(window.location.search)
    let channelName = (match && decodeURIComponent(match[1]))

    // init the pubnub channel
    pubnub.init(channelName).then(() => {
      // mark as ready
      this.ready = true
    })

    // handle a new message
    pubnub.onMessage((newMessage) => {
      this.messages.push(newMessage)
    })
  },

  methods: {
    sendMessage () {
      // TO-DO check for errors and stuff first
      pubnub.publish('tcabroadcast', this.quantity, this.token, this.message)

      // reset the message
      this.message = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


/* Warning: stupid styles below */

div.messages-header {
  font-weight: bold;
  padding: 0 8px;
}

div.messages {
  padding: 0 0 0 0;
  border: 1px solid #ccc;
}

div.messages pre {
  margin: 4px 0 0 0;
  padding: 0 16px 4px;
  border-bottom: 1px solid #eee;
}


.input-group {
  margin-bottom: 12px;
}
label input, label textarea {
  margin-left: 12px;
}

</style>
