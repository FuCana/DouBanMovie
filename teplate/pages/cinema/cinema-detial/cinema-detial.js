// pages/cinema/cinema-detial/cinema-detial.js
Page({
  data: {
    navigateTitle: "",
    'cinemas': [
      {
        'name': '庆春影城',
        'lowerprice': '23.9',
        'location': '徐汇区田林路140号越界创业园区15幢2楼（近苍梧路）',
        'distance': '1.9km',
        'messages': '大闹天竺等3部片特惠',
        'id': 0
      },
      {
        'name': '左岸国际影城城（闵行店）',
        'lowerprice': '24.9',
        'location': '闵行区汇金路528号虹桥古玩城5楼（近红松路）',
        'distance': '2.0km',
        'messages': '大闹天竺等3部片特惠',
        'id': 1
      },
      {
        'name': '完美世界影城（闵行店）',
        'lowerprice': '23.9',
        'location': '徐汇区田林路140号越界创业园区15幢幢2楼（近苍梧路）',
        'distance': '1.9km',
        'messages': '大闹天竺等3部片特惠',
        'id': 2
      },
      {
        'name': '庆春影城',
        'lowerprice': '23.9',
        'location': '闵行区虹井路288号乐虹坊精致生活广场4楼',
        'distance': '2.1km',
        'messages': '西游伏妖篇等3部片特惠',
        'id': 3
      },
      {
        'name': '巨影国际影城',
        'lowerprice': '22.9',
        'location': '徐汇区吴中路52号古北时尚广场七楼',
        'distance': '2.9km',
        'messages': '西游伏妖篇等3部片特惠',
        'id': 4
      },
      {
        'name': '万达电影城',
        'lowerprice': '23.9',
        'location': '长宁区遵义路100号虹桥南丰城L4楼（世茂时尚欢乐影城）',
        'distance': '4.2km',
        'messages': '大闹天竺等3部片特惠',
        'id': 5
      },
      {
        'name': '世纪友谊影城',
        'lowerprice': '23.9',
        'location': '徐汇区田林路140号越界创业园区15幢幢2楼（近苍梧路）',
        'distance': '1.9km',
        'messages': '大闹天竺等3部片特惠',
        'id': 6
      },
      {
        'name': 'SFC上影影城（七宝店）',
        'lowerprice': '18.9',
        'location': '闵行区漕宝路3489号七莘路口汇宝广场8楼',
        'distance': '4.5km',
        'messages': '大闹天竺等3部片特惠',
        'id': 7
      },
      {
        'name': '大光明影城（七宝店）',
        'lowerprice': '22.9',
        'location': '闵行区',
        'distance': '4.9km',
        'messages': '大闹天竺等3部片特惠',
        'id': 8
      },

    ],
    index: 0,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var index = options.id;
    var cinema = this.data.cinemas[index];
    var cinema_name = cinema.name;
    this.setData({
      navigateTitle: cinema_name,
      index: index
    });

  },
  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success: function (res) {
        // success
      }
    })
  },
  onMapTap: function (event) {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 18,
          name: "江桥万达"
        })
      },

      fail: function () {
        alert("获取地理位置失败");
      }

    })
  }


})