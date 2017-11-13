let fetch = require('node-fetch');
let fs = require('fs')

let list = [];

let count = 0;
let max = 5;
let interval = 250;
let fileName = 'test1Step1.json'

teste1()

function teste1(){
  setInterval(() => {
    if(list.length != max){

      let startRequest = new Date();
      let finishRequest;

      fetch('https://uw36ybpog7.execute-api.sa-east-1.amazonaws.com/dev/v1/occurrence/list',
      {
        method: 'POST',
        headers: {
          authenticator: '45f2ee7859eb5383675ef4889601a191'
        }
      })
      .then(function(res) {
        finishRequest = new Date();
        return res.json()
      })
      .then(function(json) {
        let status;
        if(json.date) status = 200;
        add(finishRequest - startRequest, status)
        if(list.length == max) finish();
      })
      .catch(err => {
        add(finishRequest - startRequest, 500)
        if(list.length == max) finish();
      });

    }
  }, interval)
}

function add(time, status){
  list.push({
    time,
    status
  })
}

function finish(){
  console.log(list.length)
  fs.writeFile(fileName, JSON.stringify({
    data: list
  }), (err, data) => {
    if(err) console.log('#ERROR_SAVE_FILE')
    process.exit();
  })
}
