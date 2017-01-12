// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js')
var app = getApp();
Page({
  data: {
    movies: {},
    navigateTitle: "",
    totalCount: 0,
    requestUrl: "",
    isEmpty: true,
  },
  onLoad: function (options) {
    var category = options.category;
    this.setData({
      navigateTitle: category
    });

    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters"
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon"
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/top250"
        break;
    }
    wx.showNavigationBarLoading();
    util.http(dataUrl, this.processDoubanData);
    this.data.requestUrl = dataUrl; //保存跳转连接
  },
  //上拉刷新
  onScrollLower: function (event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count20";
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  //下拉重新加载数据
  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl + "?start=0&count20";
    this.data.movies={};
    this.data.isEmpty=true;
    util.http(refreshUrl, this.processDoubanData);
  },

  //数据处理
  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovies = {};
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies) //将新加载的数据与原有数据合并
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    wx.hideNavigationBarLoading();

    this.data.totalCount += 20;
    this.setData({
      movies: totalMovies
    });
  },


  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success: function (res) {
        // success
      }
    })
  }

})