//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    login: app.globalData.login,
    obj: {
      // tab切换  
      currentTab: 0,
      // 页面配置     
      winWidth: 0,
      winHeight: 0,
    }
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          'obj.winWidth': res.windowWidth,
          'obj.winHeight': res.windowHeight
        });
      }

    });
  },
  //事件处理函数
  formsubmit: function (event) {
    console.log('表单提交携带数据：', event.detail.value)
  },
  bindChange: function (event) {

    var that = this;
    that.setData({ 'obj.currentTab': event.detail.current });

  },
  bindUserInfo: function () {
    var that = this
    wx.login({
      success: function (res) {
        app.globalData.login = false;
        app.getUserInfo(function (userInfo) {
          //更新数据
          that.setData({
            userInfo: userInfo
          })
        })
        that.setData({
          login: false,
        })
      }
      
    })
     console.log(this.data.userInfo)     
  },

  //  点击tab切换 

  swichNav: function (event) {

    var that = this;
    if (this.data.currentTab === event.target.dataset.current) {
      return false;
    } else {
      that.setData({
        'obj.currentTab': event.target.dataset.current
      })
    }
  }
})
