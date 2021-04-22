/*  1. 点击 "+" 触发tap 点击事件
      1. 调用小程序内置的 选择图片的api
      2. 获取到 图片的路径 数组
      3. 把图片路径 存到 data 的变量中
      4. 页面就可以根据 图片数组 进行循环显示 自定义组件
    2. 删除图片的本质是删除图片数组元素
      1. 获取被点击的元素的索引
      2. 获取 data 中的图片数组
      3. 根据索引 删除 数组中对应的元素
      4. 把数组设置回 data 

    3. 点击 提交
      1. 获取文本域的内容
        1. data 中定义变量 
        2. 绑定事件 事件触发时 把输入框的值 存入到变量中
      2. 对这些内容 合法性验证
      3. 验证通过 用户选择的图片 上传到专门的图片服务器 返回图片外网的连接
      4. 文本域和外网的图片路径 一起提交到服务器中
      5.清空
      6. 返回上一页
    */
import {
  showToast
} from "../../utils/async.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 文本域内容
    textValue: "",
    tabs: [{
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    // 问题分类
    issue: [{
        id: 0,
        value: "功能建议",
        isActive: true
      },
      {
        id: 1,
        value: "购买遇到问题",
        isActive: false
      },
      {
        id: 2,
        value: "性能问题",
        isActive: false
      },
      {
        id: 3,
        value: "其他",
        isActive: false
      }
    ],
    // 上传图片临时路径
    chooseImgs: []
  },
  // 自定义事件 接收子组件
  hanleImgDel(e) {
    console.log(e)
    // 1. 获取被点击的元素的索引
    // 2. 获取 data 中的图片数组
    // 3. 根据索引 删除 数组中对应的元素
    // 4. 把数组设置回 data 
    // console.log(e)
    const {
      index
    } = e.detail
    // console.log(index)
    let {
      chooseImgs
    } = this.data
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },
  // 选择上传图片
  handleChooseImg() {
    // 1. 调用小程序内置的 选择图片的api
    // 2. 获取到 图片的路径 数组
    // 3. 把图片路径 存到 data 的变量中
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result)
        this.setData({
          // 合并已选择的图片和要选的
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    })

  },
  // tab切换
  handleItemTabsItemChange(e) {
    // console.log(e)
    // 获取被点击标题的索引
    const {
      index
    } = e.detail
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
  },
  // 文本域输入事件
  handleTextInput(e) {
    this.setData({
      textValue: e.detail.value
    })
  },
  // 表单提交
  handleFormSubmit() {
    //1. 获取文本域的内容
    const {
      textValue
    } = this.data
    //2. 对这些内容 合法性验证
    if (!textValue.trim()) {
      // 不合法
      showToast({
        title: "输入不合法"
      })
      return;
    }
    // 3. 准备上传图片 到专门的图片服务器
    // 上传文件API 不支持 多个文件同时上传 遍历数组挨个上传
    var upTask = wx.uploadFile({
      url: '',
      filePath: ,
      name: ,
      formData: {},
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})