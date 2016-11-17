import PubNub from 'pubnub'

let pubnub
let callbacks = []

function connect (tcaUserChannel) {
  return new Promise((resolve) => {
    pubnub = new PubNub({
      publishKey: 'pub-c-ccbdf034-c8ed-4fd1-86fb-880758711b7f',
      subscribeKey: 'sub-c-da59fece-ac28-11e6-a114-0619f8945a4f'
    })

    pubnub.addListener({
      status: function (statusEvent) {
        if (statusEvent.category === 'PNConnectedCategory') {
          resolve()
        }
      },

      message: function (messageNotification) {
        console.log('received new messageNotification', messageNotification)

        for (var i = 0; i < callbacks.length; i++) {
          callbacks[i].call(this, messageNotification.message)
        }
        // $('.messages').append('<pre>['+message.message.token+'] '+message.message.msg+(message.message.num ? ' '+message.message.num : '')+'</pre>')
      }

    })

    pubnub.subscribe({
      channels: ['control', tcaUserChannel]
    })
  })
}

export default {

  init (channelName) {
    return connect(channelName)
  },

  onMessage (callback) {
    callbacks.push(callback)
  },

  publish (channel, quantity, token, messageString) {
    if (pubnub == null) {
      console.error('init pubnub first')
      return
    }

    var publishConfig = {
      channel: channel,
      message: {quantity: quantity, token: token, msg: messageString}
    }

    pubnub.publish(publishConfig, (status, response) => {
      if (status.error) {
        console.error(status.error)
      }
    })
  }

}
