<template>
  <div class="chat">
    <h1>Welcome {{ username }}</h1>

    <div v-if="errors.length > 0" class="errors">
      <div v-for="error in errors" class="error">{{ error }}</div>
    </div>

    <div class="messages-header">Messages</div>
    <div v-show="messages.length == 0" class="no-messages">
      Waiting for messages...
    </div>
    <div v-show="messages.length > 0" class="messages">
      <template v-for="message in messages">
        <pre v-if="message.source == 'system'" class="system">System Message: {{ message.msg }}</pre>
        <pre v-else>[{{ message.quantity }} {{ message.token }}] {{ message.msg }}</pre>
      </template>
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
import tokenpass from '../services/tokenpass'
import queryStringParser from '../services/queryStringParser'

export default {
  name: 'Messenger',

  data () {
    return {
      ready: false,
      messages: this.$root.messages,
      errors: [],

      queryVars: queryStringParser.parse(window.location.search),
      channelName: null,
      oauthToken: null,
      username: null,
      subscribeKey: null,

      quantity: null,
      token: null,
      message: null
    }
  },

  mounted () {
    // get parameter query var '?c=xxxxx'
    this.channelName = this.queryVars.c
    this.username = this.queryVars.username || 'User'
    this.oauthToken = this.queryVars.t
    this.subscribeKey = this.queryVars.subscribeKey || window.SUBSCRIBE_KEY
    this.tokenpassApiUrl = this.queryVars.tokenpassApiUrl || window.TOKENPASS_API_URL

    if (this.subscribeKey === '__SUBSCRIBE_KEY__') {
      console.error('No subscribe key found.')
      this.errors.push(`Unable to start messenger.`)
    }
    if (this.tokenpassApiUrl === '__TOKENPASS_API_URL__') {
      console.error('No Tokenpass API URL found.')
      this.errors.push(`Unable to start messenger.`)
    }
    console.log('this.subscribeKey', this.subscribeKey)
    console.log('this.tokenpassApiUrl', this.tokenpassApiUrl)

    // init the pubnub channel
    pubnub.init(this.channelName, this.subscribeKey).then(() => {
      // mark as ready
      this.ready = true
    })

    tokenpass.init(this.tokenpassApiUrl, this.oauthToken)

    // handle a new message
    pubnub.onMessage((newMessage) => {
      this.messages.push(newMessage)
    })
  },

  destroyed () {
    pubnub.close()
  },

  methods: {
    sendMessage () {
      // TO-DO check for errors and stuff first
      tokenpass.broadcast(this, this.quantity, this.token, this.message).then((response) => {
        let details = response.body
        this.messages.push({
          source: 'system',
          msg: `Sent message to ${details.count} recipient${details.count === '1' ? '' : 's'}`
        })
      }).catch((e) => {
        let errorMessage = 'Failed to broadcast errorMessage.'

        if (e.body != null && e.body.message != null) {
          errorMessage = errorMessage + ' ' + e.body.message
          console.error(e.body)
        } else {
          console.error(e)
        }
        this.errors.push(errorMessage)
      })

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

div.errors {
  margin: 8px 0;
  padding: 4px 4px;
  color: #900;
  font-weight: bold;
}

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

pre.system {
  color: #888;
  font-variant: oblique;
}

</style>
