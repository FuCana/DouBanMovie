function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function convertToStarsArray(stars) {
  var arr = [];
  var full = (stars + '')[0] - 0;
  var hasHalf = (stars + '')[1] - 0 == 5;
  for (var i = 0; i < full; i++) {
    arr.push(1);
  }
  hasHalf && arr.push(2);
  var len = arr.length;
  for (var i = 0; i < 5 - len; i++) {
    arr.push(0);
  }
  return arr;
  console.log(arr);

}

function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "content-Type": "application"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }

  })
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  formatTime: formatTime,
}