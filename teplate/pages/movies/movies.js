
// pages/movies/movies.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    inTheaters:{},
    comingSoon:{},
    top:{}
  },
  onLoad: function (event) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"+"?start=0&count=3";
    var topUrl = app.globalData.doubanBase + "/v2/movie/top250"+"?start=0&count=3";

    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(topUrl,"top","豆瓣Top250");
  },

  moreTap:function(){
      var category = event.currentTarget.dataset.category;
      wx.navigateTo({
        url:"more-movie/more-movie?category="+ category
      })
  },

  getMovieListData: function (url,settedKey,categorytitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "content-Type": "application"
      },
      success: function (res) {
        // success
        console.log(res);
        that.processDoubanData(res.data,settedKey,categorytitle);
      },
      fail: function (error) {
        // fail
        console.log("failed");
        console.log(error)
      }
      
    })
  },

  processDoubanData:function(moviesDouban,settedKey,categorytitle){
      var movies = [];
      for(var idx in moviesDouban.subjects){
          var subject = moviesDouban.subjects[idx];
          var title = subject.title;
          if(title.length >= 6){
              title = title.substring(0,6)+"..."
          }
          var temp = {
             stars:util.convertToStarsArray(subject.rating.stars),
             title:title,
             average:subject.rating.average,
             coverageUrl:subject.images.large,
             movieId:subject.id
          }
          movies.push(temp)
      }
      var readyData = {};
      readyData[settedKey] = {
          categorytitle:categorytitle,
          movies:movies
      };
      this.setData(readyData);
  }
    

})