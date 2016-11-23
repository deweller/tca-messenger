import PubNub from 'pubnub'

let pubnub
let callbacks = []
let myTcaUserChannel = null

function connect (tcaUserChannel, subscribeKey) {
  return new Promise((resolve) => {
    pubnub = new PubNub({
      subscribeKey: subscribeKey
    })

    pubnub.addListener({
      status: function (statusEvent) {
        if (statusEvent.category === 'PNConnectedCategory') {
          resolve()
        }
      },

      message: function (messageNotification) {
        console.log('received new messageNotification.message', messageNotification.message)
        for (var i = 0; i < callbacks.length; i++) {
          callbacks[i].call(this, messageNotification.message)
        }
      }

    })

    pubnub.subscribe({
      channels: ['control', tcaUserChannel]
    })
  })
}

export default {

  init (tcaUserChannel, subscribeKey) {
    myTcaUserChannel = tcaUserChannel
    return connect(tcaUserChannel, subscribeKey)
  },

  close () {
    pubnub.unsubscribe({
      channels: ['control', myTcaUserChannel]
    })

    pubnub = null
    callbacks = []
    myTcaUserChannel = null
  },

  onMessage (callback) {
    callbacks.push(callback)
  },

  publish (channel, message) {
    if (pubnub == null) {
      console.error('init pubnub first')
      return
    }

    var publishConfig = {
      channel: channel,
      message: message
    }

    pubnub.publish(publishConfig, (status, response) => {
      if (status.error) {
        console.error(status.error)
      }
    })
  }

}
