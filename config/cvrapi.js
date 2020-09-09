const fetch = require('node-fetch')

module.exports = tester = async (cvr) => {
    const res = await fetch(`https://cvrapi.dk/api?country=dk&vat=${cvr}`, {
      method: 'GET'
    })
    const json = await res.json()
    console.log(json)
}   

