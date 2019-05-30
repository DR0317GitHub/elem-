var dev = require("/assets/mock/index.js").dev;
Page({
  data: {
    list: [],
  },
  onLoad(){
    this.getList();
  },
  getList() {
    var that = this;
    my.request({
      url: dev + 'found',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res && res.status == 200) {  //判断当code == 200 的时候得到数据
          that.setData({
            list: res.data.array, //展示列表数据
          })
        }
      },
      fail: function (res) {
        my.alert({ content: res });
      },
    })
  },
});
