
// pages/movies/movies.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
    totalCount: 0,
    requestUrl: "",
    isEmpty: true,
  },
  onLoad: function (event) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var topUrl = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(topUrl, "top", "豆瓣Top250");
  },

  moreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },

  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "movies-detail/movies-detail?id=" + movieId
    })
  },

  getMovieListData: function (url, settedKey, categorytitle) {
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
        that.processDoubanData(res.data, settedKey, categorytitle);
      },
      fail: function (error) {
        // fail
        console.log("failed");
        console.log(error)
      }

    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true,
      totalCount: 0
    })
  },
  onCancelTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      // searchResult:{}
    })
  },
  onBindChange: function (event) {
    var text = event.detail.value;
    // console.log(text)
    //搜索请求
    wx.showNavigationBarLoading();
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "")
    this.data.requestUrl = searchUrl;
  },

  //上拉刷新
  // onReachBottom: function (event) {
  //   var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count20";
  //   util.http(nextUrl, this.secondProcessData);
  //   wx.showNavigationBarLoading();
  // },

  processDoubanData: function (moviesDouban, settedKey, categorytitle) {
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

    var readyData = {};
    //合并数据
    readyData[settedKey] = {
      categorytitle: categorytitle,
      movies: movies
    };

    this.setData(readyData);

    wx.hideNavigationBarLoading(); //数据加载完成后隐藏loading
  },

  // secondProcessData: function (moviesDouban) {
  //   var movies = [];
  //   for (var idx in moviesDouban.subjects) {
  //     var subject = moviesDouban.subjects[idx];
  //     var title = subject.title;
  //     if (title.length >= 6) {
  //       title = title.substring(0, 6) + "..."
  //     }
  //     var temp = {
  //       stars: util.convertToStarsArray(subject.rating.stars),
  //       title: title,
  //       average: subject.rating.average,
  //       coverageUrl: subject.images.large,
  //       movieId: subject.id
  //     }
  //     movies.push(temp)
  //   }
  //   var totalMovies = {};
  //   if (!this.data.isEmpty) {
  //     totalMovies = this.data.movies.concat(movies) //将新加载的数据与原有数据合并
  //   } else {
  //     totalMovies = movies;
  //     this.data.isEmpty = false;
  //   }
  //   wx.stopPullDownRefresh();
  //   wx.hideNavigationBarLoading(); //数据加载完成后隐藏loading

  //   this.data.totalCount += 20;
  //   this.setData({
  //     movies: totalMovies
  //   });
  // }


})