<template>
	<view style="min-height: 100vh;background: #fafafa;padding-bottom: 150upx;">
		
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="goods">
			
				<view class="goods1" v-for="(item,idx) in datas" :data-tab="idx">
			
					<view class="xuanze" @tap.stop="select(idx)">
						<view class="xuanze1 " :class="item.xuan==true? 'xuanze2':''">
							<text v-if="item.xuan==true" class="iconfont iconduigou" style="color: #F4691A;"></text>
						</view>
					</view>
					<view class="goodsImg" @tap="jump" :data-url="'/pages/details/details?id='+item.id">
						<image class="goodsImg" :lazy-load='true' :src="getimg(item.cover)" mode="aspectFill"></image>
					</view>
					<view class="goodsinr" @tap="jump" :data-url="'/pages/details/details?id='+item.id">
						<view class="goodsname fz30 c30 oh1">{{item.title}}</view>
						<view class="goodsname1">
							<text>{{item.description}}</text>
						</view>
						<view class="dis_flex aic ju_b">
							<view class="goodspri1">
								<text style="font-size: 24upx;">￥</text><text class="">{{item.price}}</text>
							</view>
							<view class="goodspri1">
			
								<!-- <text class="fz30 c9">库存：{{item.sku_number}}</text> -->
								<text class="fz30 c9" v-if="item.sku_number < item.number">库存不足</text>
								<text class="fz30 c9" v-else></text>
			
								<view class="vstepper steppera">
									<view v-if="item.quantity==1" class="vantjian c9" style="color: #aaa;">-</view>
									<view v-else @tap.stop="onNum" :data-idx="idx" data-ad="-" :data-id="item.id" class="vantjian">-</view>
									<input class="vanipt c6" disabled :value="item.quantity"></input>
									<view @tap.stop="onNum" :data-idx="idx" data-ad="+" :data-id="item.id" class="vantjia">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~~~</view>
			</view>
			<view class="pl_bbox">
				<view class="xq_cz dis_flex aic ju_b">
					<view class="selecAll" @tap="selecAll">
						<view class="xuanze1 all " :class="all==true? 'xuanze2':''">
							<!-- <icon v-if="all==true" type="success" size="16" color="#F7B43B" /> -->
							<text v-if="all==true" class="iconfont iconduigou" style="color: #F4691A;"></text>
						</view>
						全选
					</view>
					<view class="heji flex_1">
						<!-- <view><text class="fz26">合计:</text>￥{{sum}}</view>
						<view class="fz22 c9">不含运费</view> -->
					</view>
					<view class="hj_pri">合计：<text style="font-size: 24upx;">￥</text><text>{{sum}}</text></view>
					<view class="jiesuan jiesuan1" @tap="cardel">删除</view>
					<view class="jiesuan" @tap="openOrder">下单</view>
				</view>
			</view>
		</block>
		
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that = this
	export default {
		data() {
			return {
				datas: [],
				page:1,
				size:20,
				all:false,
				sum: '0.00',
				htmlReset:-1,
				data_last:false
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onLoad() {
			that = this
			that.onRetry()
		},
		onPullDownRefresh() {
			this.onRetry()
		},
		onReachBottom() {
			this.getcar()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			onRetry() {
				this.page = 1
				this.datas = []
				this.data_last = false
			
				this.getcar()
			},
			getcar() {
				var that =this
				var jkurl = '/user/collect_list'
				var datas = {
					token: that.loginDatas.token || '',
					page:this.page,
					size:this.size
				}
				var page_that=this.page
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset=0
						var datas = res.data
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
			
						if (page_that == 1) {
						
							that.datas = datas.goods
						} else {
							if (datas.goods.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.datas = that.datas.concat(datas.goods)
						}
						that.page++
						that.countpri()
					} else {
						that.htmlReset=1
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.htmlReset=1
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			
			selecAll() {
				let kg
				var that = this
				if (this.all == false) {
					kg = true
				} else {
					kg = false
				}
				that.all = kg
				for (var i = 0; i < that.datas.length; i++) {

					if (kg) {
						that.$set(that.datas[i], 'xuan', true)

					} else {
						that.$set(that.datas[i], 'xuan', kg)
					}
				}
				
				that.countpri()
			},

			select(idx) {
				let that = this

				if (!that.datas[idx].xuan) {
					//if(that.datas[idx].sku_number>=that.datas[idx].number){ //库存充足是可以点击
					that.$set(that.datas[idx], 'xuan', true)
					/*}else if(that.datas[idx].sku_number>0){
						uni.showToast({
							icon: 'none',
							title: '该商品库存不足请减少购买数量'
						})
					}else{
						uni.showToast({
							icon: 'none',
							title: '该商品库存不足'
						})
					}*/
				} else {
					that.$set(that.datas[idx], 'xuan', false)
				}
				let qx = true
				for (let i in that.datas) {
					if (!that.datas[i].xuan) {
						qx = false
						break
					}
				}
				console.log(qx)
				//触发全选
				if (qx == true) {
					// that.setData({
					//   all: true
					// })
					that.all = true
				} else {
					that.all = false
					// that.setData({
					//   all: false
					// })
				}
				// //计算总价
				that.countpri()
			},
			//加减
			onNum(e) {
				let that = this
				console.log(e.currentTarget.dataset)
				let ad = e.currentTarget.dataset.ad
				let id = e.currentTarget.dataset.id
				let thisidx = e.currentTarget.dataset.idx

				if (that.datas[thisidx].num < 2 && ad == '-') {
					console.log('禁止')
					return false;

				}

				// if (ad == '-') {
				// 	that.datas[thisidx].num--
				// } else {
				// 	that.datas[thisidx].num++
				// }
				// return
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				var jkurl = '/user/goods_num'
				var datas = {
					token: that.loginDatas.token,
					id: that.datas[thisidx].id,
					type: ad == '-' ? 'decrement' : 'increment ',
					sum: 1
				}
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						if (ad == '-') {
							that.datas[thisidx].quantity--
						} else {
							that.datas[thisidx].quantity++
						}
						that.countpri()
					}else{
						if(res.msg){
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						}else{
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})

			},
			/*计算价格*/
			countpri() {
			  let heji = 0
			  let var2 = this.datas
			  for (let i in var2) {
			    if (var2[i].xuan == true) {
			      heji += var2[i].quantity * (var2[i].price * 100)
			
			    }
			  }
			
			  heji = (heji / 100).toFixed(2)
				this.sum=heji
			},
			getimg(img) {
				return service.getimg(img)
			},
			pveimg(e) {
				service.pveimg(e)
			},
			get_fwb(str) {
				return service.get_fwb(str)
			},
			cardel(e) {
			  // wx.showToast({
			  //   title: '删除成功',
			  // })
			  // return
			  var that = this
			  
			  let var2 = this.datas
				var c_ids=[]
				for (let i in var2) {
				  if (var2[i].xuan == true) {
				    c_ids.push(var2[i].id)
							
				  }
				}
				if(c_ids.length==0){
					uni.showToast({
						icon:'none',
						title:'请选择您的收藏'
					})
					return
				}
				
				uni.showModal({
				    title: '提示',
				    content: '是否删除这些商品？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										if (that.btnkg == 1) {
										  return
										} else {
										  that.btnkg= 1
										}
										c_ids=c_ids.join(',')
										var jkurl='/user/defined'
										var datas={
											token:that.loginDatas.token,
											id:c_ids,
											type:'del'
										}
										service.P_post(jkurl, datas).then(res => {
											that.btn_kg = 0
											console.log(res)
											if (res.code == 1) {
												var datas = res.data
												console.log(typeof datas)
										
												if (typeof datas == 'string') {
													datas = JSON.parse(datas)
												}
												console.log(res)
										
												uni.showToast({
													icon: 'none',
													title: '操作成功'
												})
												setTimeout(()=>{
													that.onRetry()
												},500)
											} else {
												if (res.msg) {
													uni.showToast({
														icon: 'none',
														title: res.msg
													})
												} else {
													uni.showToast({
														icon: 'none',
														title: '操作失败'
													})
												}
											}
										}).catch(e => {
											that.btn_kg = 0
											console.log(e)
											uni.showToast({
												icon: 'none',
												title: '获取数据失败，请检查您的网络连接'
											})
										})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			},
			openOrder() {
			  let that = this
			  let xuanG = that.datas
			  let idG = ''
			  var xzarr = []
				var kc_tip=false
				for(var i=0; i<xuanG.length;i++){
			    if (xuanG[i].xuan) {
						// if(xuanG[i].num>xuanG[i].sku_num){
						// 	kc_tip=true
						// 	that.all=false
						// 	that.$set(that.datas[i],'xuan',false)
						// }else{
							if (idG == '') {
							  idG = xuanG[i].id
										
							} else {
							  idG += ',' + xuanG[i].id
							}
						// }
			    }
			
			  }
				if(idG.length==0){
					uni.showToast({
						icon: 'none',
						title: '请选择收藏'
					})
					return
				}
				var jkurl='/user/defined'
				var datas={
					token:this.loginDatas.token,
					id:idG,
					type:'create'
				}
			  console.log(idG)
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
				
						uni.showToast({
							icon: 'none',
							title: '操作成功'
						})
						setTimeout(()=>{
							// that.onRetry()
							uni.navigateTo({
								url:'/pagesA/user_order/user_order?type=1'
							})
						},500)
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
				
			},
			
			jump(e) {
				var that = this

				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}

				service.jump(e)
			},

		}
	}
</script>

<style scoped>
	.goods {
		width: 100%;
		margin-bottom: 20rpx;
		padding: 20upx 30upx;
	}

	.goods1 {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: stretch;
		/* align-items: flex-start; */
		/* border-bottom: 1px solid #ddd; */
		position: relative;
		background-color: #fff;
		margin-bottom: 20upx;

		border-radius: 10upx;
	}

	.scbg {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		width: 46rpx;
		height: 46rpx;
		line-height: 46rpx;
		border-radius: 50%;
		background-color: #999;
		color: #fff;
		font-size: 26rpx;
		/* display: flex;
		justify-content: space-between;
		align-items: center; */
		text-align: center;
	}

	.goodsImg {
		width: 140rpx;
		height: 140rpx;
		/* border: 1px solid #d2d2d2; */
		margin-right: 22rpx;
	}

	.xuanze {
		/* width: 30rpx;
		height: 30rpx; */
		/* padding: 0 30rpx; */
		padding-right: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex: none;
	}

	.xuanze1 {
		width: 34rpx;
		height: 34rpx;
		border-radius: 50%;
		border: 1px solid #ddd;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex: none;
	}
	.xuanze1 text{
		font-size: 34upx;
	}
	.xuanze2 {
		border: 0;
		overflow: hidden;
	}

	.goodsinr {
		flex: 1;
	}

	.goodsname {
		font-size: 24rpx;
		color: #222;
		padding-right: 20rpx;
		margin-bottom: 15rpx;
		box-sizing: border-box;
		display: -webkit-box !important;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		font-weight: bold;
	}

	.goodsname1 {
		font-size: 22rpx;
		color: #999;
		padding-right: 20rpx;
		margin-bottom: 10rpx;
		box-sizing: border-box;
		/* display:-webkit-box !important;  
		overflow:hidden;
		text-overflow:ellipsis;
		word-break:break-all;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; */
	}

	.goodsname1 text {
		margin-right: 8upx;
	}

	.goodspri {
		font-size: 24rpx;
		color: #F4691A;
		font-weight: bold;
	}

	.scx {
		text-decoration: line-through;
	}

	.goodspri1 {
		font-size: 28rpx;
		color: #F4691A;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.goods2 {
		width: 100%;
		padding: 20rpx 28rpx 28rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.goods2tit {
		width: 100%;
		line-height: 45rpx;
		font-size: 26rpx;
		color: #333;
	}

	/*步进器*/
	.steppera {
		width: 148rpx;
		height: 45rpx;
		border: 1px solid #dcdcdc;
		display: flex;
		overflow: hidden;
		align-items: center;
		color: #222;
	}

	.steppera .vanipt {
		width: 60rpx;
		height: 40rpx;
		max-height: 0;
		line-height: 40rpx;
		border-left: 1px solid #dcdcdc;
		border-right: 1px solid #dcdcdc;
		border-bottom: 0;
		border-top: 0;
		box-sizing: border-box;
		background-color: #fff;
		margin: 0;
		text-align: center;
		display: flex;
		/* align-items: center; */
		justify-content: center;
		font-size: 24upx;
	}

	.steppera .vantjia,
	.steppera .vantjian {
		width: 45rpx;
		height: 43rpx;
		background-color: #fff;
		margin: 0;
		text-align: center;
		display: flex;
		align-items: center;
		font-size: 40rpx;
		line-height: 40rpx;
		justify-content: center;
		color: #222;
		font-weight: 100;
	}
	
	
	.pl_bbox {
		width: 100%;
		padding-bottom: 50upx;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		z-index: 100;
	}
	
	.xq_cz {
		width: 100%;
		height: 96upx;
	
		box-shadow: 0px -3upx 10upx 0px rgba(0, 0, 0, 0.1);
		padding: 14upx 30upx;
		display: flex;
		align-items: center;
	}
	
	.xq_cz {
		width: 100%;
		height: 96upx;
	
		box-shadow: 0px -3upx 10upx 0px rgba(0, 0, 0, 0.1);
		padding: 14upx 30upx;
		display: flex;
		align-items: center;
	}
	
	.selecAll{
		display: flex;
		align-items: center;
	}
	.selecAll .all{
		margin-right: 20upx;
	}
	.hj_pri{
		font-size: 28upx;
		color: #222;
		margin-right: 30upx;
	}
	.hj_pri text{
		color: #F4691A;
	}
	.jiesuan{
		width: 160upx;
		height: 56upx;
		background: #11A078;
		border-radius: 28upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #FFFFFF;
		margin-left: 10upx;
	}
</style>
