var dev = require("/assets/mock/index.js").dev;
Page({
  data: {
    hasLocation: false,
    location: "",
    background: ['../../assets/image/10.jpg', '../../assets/image/11.jpg', '../../assets/image/6.jpg'],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    page: 2, //从第二页开始加载 
    page_size: 10, //每页加载十个 
    isShowLoadmore: false, //正在加载 
    isShowNoDatasTips: false, //暂无数据
    // endloading: false,  //判断是否还有数据
    listLike: [],
    release: "",
    num: 0,
    list1: []
  },
  onLoad() {
    var that = this
    my.chooseLocation({
      success(res) {
        my.hideLoading();
        console.log(res)
        // that对象为Page可以设置数据刷新界面
        that.setData({
          hasLocation: true,
          location: res.name
        })
        that.getIconList();
        that.reviewpage();
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败' });
      },
    })
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var that = this;
    that.data.num++
    // var endloading = that.data.endloading
    console.log(that.data.num, "num")
    if (that.data.num < 5) {
      that.reviewpage()  //页面上拉调用这个方法
    } else {
      that.setData({
        isShowLoadmore: true, //隐藏正在加载
        isShowNoDatasTips: true, //显示暂无数据
        // endloading: true, //上拉不在加载
      })
    }
  },

  // 获取商品列表
  reviewpage: function (e) {
    var that = this;
    var id = this.data.id;
    var page = this.data.page;
    my.request({
      url: dev + 'list',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res && res.status == 200) {  //判断当code == 200 的时候得到数据
          that.setData({
            isShowLoadmore: false, 
            listLike: that.data.listLike.concat(res.data.array), //展示列表数据
          })
        } else if (res == undefined || res == {}) { //如果more_data == 0 表示没有可加载的数据了
          that.setData({
            isShowLoadmore: true, //隐藏正在加载
            isShowNoDatasTips: true, //显示暂无数据
            // endloading: true, //上拉不在加载
          })
        } else {
          that.setData({
            page: page + 1 //更新page 请求下一页数据
          })
        }
      },
      fail: function (res) {
        console.log(res, "fail")
      }
    })
  },

  // 获取图标
  getIconList: function (e) {
   var that = this;
    my.request({
      url: dev + 'listicon',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res && res.status == 200) {  //判断当code == 200 的时候得到数据
          that.setData({
            list1: res.data.listicon, //展示列表数据
          })
        }
      },
      fail: function (res) {
        my.alert({ content: res });
      },
    })
  }
});
