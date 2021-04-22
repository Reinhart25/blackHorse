/* 触发父组件的自定义事件 同时传递数据给 父组件*/
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      // 默认值
      value: ""
    },
    index: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 图片删除 icon 的索引来自父组件
    handleImgDel(e) {
      const {
        index
      } = e.currentTarget.dataset
      console.log(e)
      this.triggerEvent("ImgDel", {
        index
      })
    }
  }
})