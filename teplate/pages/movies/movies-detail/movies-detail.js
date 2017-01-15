
var app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {
    movie: {},
    movieId:{}
  },
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    util.http(url, this.processDouBanData);
    this.setData({
      movieId:movieId
    })
  },
  processDouBanData: function (data) {
    console.log(data)
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      genres: data.genres.join("、"),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.converToCastInfos(data.casts),
      summary: data.summary
    }
    console.log(movie);
    this.setData({
      movie: movie
    })
 
  },
  onShareAppMessage: function (event) {
    return {
      title: this.data.movie.title,
      desc: this.data.movie.summary,
      path: '/pages/movies/movies-detail/movies-detail?id=movieId'
    }
  },
  viewMoviePostImg:function(event){
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current:src,
      urls:[src]
    })
  }

})