/* 3.  点击加入购物车
      1. 先点击绑定事件
      2. 获取缓存中的购物车数据 数组格式
      3. 先判断 当前的商品是否已经存在于购物车里面
      4. 已经存在修改商品数据 执行购物车数量++ 重新把购物车数组 填充回缓存中
      5. 不存在于购物车的数组中 直接给购物车数组添加一个新元素 带上购买数量属性 num 重新把购物车数组填充回缓存中
      6. 弹出提示

  4.商品收藏功能
  ` 1. 页面 onShow 的时候加载缓存中的商品收藏的数据
    2. 显示 判断当前商品是不是被收藏的
      1. 改变页面图标
      2. 不是什么都不做
    3. 操作 点击商品收藏按钮
      1. 判断该商品是否存在缓存数组中
        1. 存在 删除
        2。 不存在 加入 同时加入收藏数组中显示
*/
import {
  request
} from "../../request/index.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 只有我需要的属性的商品对象
    goodsObj: {},
    // 商品是否被收藏过
    isCollect: false
  },
  // 商品对象
  GoodsInfo: {},
  // 收藏点击事件
  handleCollect() {
    let isCollect = false
    // 1. 判断该商品是否存在缓存数组中
    //     1. 存在 删除
    //     2. 不存在 加入 同时加入收藏数组中显示
    let collect = wx.getStorageSync("collect") || []
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    // 3.当 index != -1 表示 已经收藏过
    if (index != -1) {
      // 找到了 已经收藏 删除操作
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })

    } else {
      // 没收藏
      collect.push(this.GoodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    // 4. 把数组存入缓存
    wx.setStorageSync("collect", collect)
    // 5. 修改data中的属性 isCollect
    this.setData({
      isCollect
    })

  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    })
    this.GoodsInfo = goodsObj
    //1. 获取缓存中的商品收藏的数据
    let collect = wx.getStorageSync("collect") || []
    //2. 显示 判断当前商品是不是被收藏的
    //   1. 改变页面图标
    //   2. 不是什么都不做
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)

    // console.log(this.GoodsInfo)
    this.setData({
      goodsObj: {
        pics: goodsObj.pics,
        goods_price: goodsObj.goods_price,
        goods_name: goodsObj.goods_name,
        // iphone 部分手机不识别 webp 图片格式
        // 最好找到后台 让他进行修改 临时自己改 .webq => .jpg
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg')
      },
      isCollect
    })
  },
  // 点击加入购物车
  handleCartAdd(e) {
    // console.log(e)
    // 1.获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 2. 判断 当前的商品是否已经存在于购物车里面
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      // 3.不存在于购物车的数组中 直接给购物车数组添加一个新元素 带上购买数量属性 num 重新把购物车数组填充回缓存中
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      // console.log(this.GoodsInfo)
      cart.push(this.GoodsInfo)
    } else {
      //4. 已经存在修改商品数据 执行购物车数量++ 
      cart[index].num++
    }
    // 重新把购物车数组 填充回缓存中
    wx.setStorageSync("cart", cart)
    //5. 弹出提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })

  },
  // 点击轮播图放大查看
  handlePreview(e) {
    // console.log("预览")
    // 1. 构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid_url)
    // 2. 接收传递过来的图片下标
    // console.log(e)
    const current = e.currentTarget.dataset.index
    wx.previewImage({
      current: urls[current], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options
    const {
      goods_id
    } = options
    // console.log(goods_id)
    this.getGoodsDetail(goods_id)
  }
})