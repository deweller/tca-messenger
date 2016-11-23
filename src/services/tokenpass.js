let myOauthToken = null
let tokenpassUrl = null

export default {

  init (apiUrl, oauthToken) {
    tokenpassUrl = apiUrl
    myOauthToken = oauthToken
  },

  broadcast (context, quantity, token, messageString) {
    console.log(`broadcast myOauthToken="${myOauthToken}" messageString="${messageString}"`)

    let url = tokenpassUrl + '/api/v1/tca/messenger/broadcast'
    let params = {
      oauth_token: myOauthToken,
      quantity: quantity,
      token: token,
      message: messageString
    }
    return context.$http.post(url, params)
  }

}
