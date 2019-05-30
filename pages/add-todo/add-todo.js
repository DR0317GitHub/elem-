const app = getApp();

Page({
  data: {
    inputValue: '',
  },

  onBlur(e) {
    console.log(e.detail.value,"e.detail.value")
    this.setData({
      inputValue: e.detail.value,
    });
  },

  add() {
    app.todos = app.todos.concat([
      {
        text: this.data.inputValue,
        compeleted: false,
      },
    ]);

    my.navigateBack();
  },
});
