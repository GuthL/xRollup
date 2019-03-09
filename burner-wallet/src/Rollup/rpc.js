import jaysonBrowserClient from 'jayson/lib/client/browser'
const fetch = window.fetch

var callServer = function(request, callback) {
  var options = {
    method: 'POST',
    body: request, // request is a string
    headers: {
      'Content-Type': 'application/json',
    },
  }

  fetch('http://localhost:3000', options)
    .then(function(res) {
      return res.text()
    })
    .then(function(text) {
      callback(null, text)
    })
    .catch(function(err) {
      callback(err)
    })
}

/* Create an RPC client */
const client = jaysonBrowserClient(callServer, {
  // other options??
})

export const getBalance = async (xRollupPubKey, address) => {
  const { result } = await client.request('eth_call', [
    'getBalance',
    { pubkey: xRollupPubKey, token_type: address },
  ])
  return result
}
