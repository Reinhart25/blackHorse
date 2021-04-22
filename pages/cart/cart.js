/* 1.获取用户的收货地址
      1. 绑定点击事件
      2. 调用小程序内置 api 获取用户的收货地址 wx.chooseAddress
        2. 获取 用户 对小程序 所授予 获取地址的 权限 状态 scope
            1. 假设 用户 点击获取收货地址的提示框 确定 authSetting scope.address
            2. 假设 用户 点击获取收货地址的提示框 取消 scope 值 false
    2. 页面加载完毕
      1. 获取本地存储中的地址数据
      2. 把数据 设置给data 中的一个变量
    3. 1.获取缓存中的购物车数组
        2. 把购物车数据 填充到data 中
    4. 全选的实现 数据的展示
      1. onShow 获取缓存中的购物车数组
      2. 根据购物车中的商品数据 
        (1) 所有的商品都被选中 checked=true 全选就被选中
    5. 总价格和总数量
      1. 都需要商品被选中 才计算
      2. 获取购物车数组 
      3. 遍历 判断商品是否被选中
      4. 总价格 += 商品的单价 * 商品数量
      5. 总数量 += 商品数量
      6. 设置回data
    6. 商品的 选中
      1. 绑定change 事件
      2. 获取到被修改的商品对象
      3. 商品对象的选中状态 取反
      4. 重新填充回data 中和缓存中
      5. 重新计算全选  总价格和总数量
    7. 全选和反选功能
      1. 复选框绑定事件 change
      2. 获取 data 中的全选变量 allChecked
      3. 直接取反
      4. 遍历购物车数组所有元素checked 跟随 allChecked改变 5. 把购物车数组 和 allCheck 重新设置回 data 把购物车重新设置回缓存中
    8. 商品数量的编辑
      1. "+""-" 按钮 绑定同一个点击事件 区分的关键 自定义属性 (1)
      2. 传递被点击的商品id 
      3. 获取data 中的购物车数组 来获取需要的被修改的商品对象
        3.1 当购物车的数量 = 1 同时 点击 -
        3.2 弹窗提示 询问用户是否要删除
          1. 确定 删除
          2. 返回
      4. 直接修改商品对象的num
      5. 把cart 数组 重新设置回缓存和data中
    9. 点击结算 
      1. 判断有没商品
      2. 判断有没地址
      3. 经过以上验证跳转到支付页面

 */
import {
  chooseAddress,
  showModal,
  showToast
} from "../../utils/async.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  async handleChooseAdd() {
    // console.log("爱一行")
    // 1.获取收货地址
    let address = await chooseAddress()
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    // 2. 存入到缓存中
    wx.setStorageSync("address", address)
  },
  // 商品的 选中
  // 1. 绑定change 事件
  // 2. 获取到被修改的商品对象
  // 3. 商品对象的选中状态 取反
  // 4. 重新填充回data 中和缓存中
  // 5. 重新计算全选  总价格和总数量
  handleItemChange(e) {
    // console.log(e)
    //1. 获取到被修改的商品id
    const goods_id = e.currentTarget.dataset.id
    // console.log(goods_id)
    // 2.获取购物车数组
    let {
      cart
    } = this.data
    // 3.找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id)
    // 4.选中状态取反
    cart[index].checked = !cart[index].checked

    this.setCart(cart)
  },
  // 设置购物车 状态 同时重新计算底部工具栏的 总价格和总数量 全选
  setCart(cart) {
    let allChecked = true
    // 1. 都需要商品被选中 才计算
    // 2. 获取购物车数组 
    // 3. 遍历 判断商品是否被选中
    // 4. 总价格 += 商品的单价 * 商品数量
    // 5. 总数量 += 商品数量
    // 6. 设置回data
    let totalPrice = 0
    let totalNum = 0
    cart.forEach((v) => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync("cart", cart)

  },
  // 商品全选功能
  handleItemAllChange() {
    // 1. 复选框绑定事件 change
    // 2. 获取 data 中的全选变量 allChecked
    let {
      cart,
      allChecked
    } = this.data
    // 3. 直接取反
    allChecked = !allChecked
    // 4. 遍历购物车数组所有元素checked 跟随 allChecked改变 
    cart.forEach(v => v.checked = allChecked)
    // 5. 把购物车数组 和 allCheck 重新设置回 data 把购物车重新设置回缓存中
    this.setCart(cart)


  },
  // 按钮加减功能
  async handleItem(e) {
    // 3.1 当购物车的数量 = 1 同时 点击 -
    //     3.2 弹窗提示 询问用户是否要删除
    //       1. 确定 删除
    //       2. 返回
    // 1. "+""-" 按钮 绑定同一个点击事件 区分的关键 自定义属性 (1)
    // 2. 传递被点击的商品id
    const {
      operation,
      id
    } = e.currentTarget.dataset
    console.log(operation, id)
    // 3. 获取data 中的购物车数组 来获取需要的被修改的商品对象
    let {
      cart
    } = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    // 4. 判断是否执行删除
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal({
        content: "您是否要删除此商品"
      })
      if (res.confirm) {
        // 用户点击确定
        cart.splice(index, 1)
        this.setCart(cart)
      } else if (res.cancel) {
        // 用户点击取消
      }
    } else {
      // 4. 直接修改商品对象的num
      cart[index].num += operation
      // 5. 把cart 数组 重新设置回缓存和data中
      this.setCart(cart)
    }
  },
  // 点击结算 
  async handlePay() {
    const {
      address,
      totalNum
    } = this.data
    //     1. 判断有没商品
    if (totalNum === 0) {
      await showToast({
        title: "您还没有选购商品"
      })
      return
    }
    //     2. 判断有没地址
    if (!address.userName) {
      await showToast({
        title: "您还没有选择收货地址"
      })
      return
    }
    //     3. 经过以上验证跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/pay'
      // events: {
      //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //   acceptDataFromOpenedPage: function (data) {
      //     console.log(data)
      //   },
      //   someEvent: function (data) {
      //       console.log(data)
      //     }
      //     ...
      // },
      // success: function (res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromOpenerPage', {
      //     data: 'test'
      //   })
      // }
    })


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
    // 1. 获取本地存储中的地址数据
    const address = wx.getStorageSync("address")
    //   2. 把数据 设置给data 中的一个变量
    // console.log(address)
    // 1.获取缓存中的购物车数组
    const cart = wx.getStorageSync("cart") || []
    this.setCart(cart)

    this.setData({
      address
    })

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