<template>
	<view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0" style="min-height: 100vh;background: #FAFAFA;">
	
			<view class='dis_flex ju_a  tab_box'>
				<block v-for="(item,idx) in data_list">
					<view :class="type==item.id?'active':''" :data-type="item.id" @tap='bindcur'>{{item.name}}</view>
				</block>
	
			</view>
			
			<view class="order_list">
				<block v-if="type==1">
					<view class="order_li dis_flex_c" v-for="(item,index) in datas" @tap="jump" :data-url="'/pagesA/user_goods_xq/user_goods_xq?id='+item.id">
						<image class="order_li_img" :src="getimg(item.cover)" mode="aspectFill"></image>
						<view class="order_li_msg">
							<view class="oh2">{{item.title}}</view>
							<view class="order_buy dis_flex aic ju_b">
								<view class="order_pri"><text>￥</text>{{item.price}}</view>
								<image @tap="addcar(item)" class="order_car" src="../../static/images/user/gouwuche.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</block>
				<block v-if="type==2">
					<view class="order_li dis_flex_c" v-for="(item,index) in datas" @tap="jump" :data-url="'/pagesA/user_al_xq/user_al_xq?type=2&id='+item.id">
						<image class="order_li_img_al" :src="getimg(item.cover)" mode="aspectFill"></image>
						<view class="order_li_msg">
							<view class="oh2">{{item.title}}</view>
							<view class="order_bqs">
								<view class="order_bq" v-for="(item1,index1) in getarr(item.tag)">{{item1}}</view>
								<!-- <view class="order_bq">公寓</view> -->
							</view>
						</view>
					</view>
				</block>
				<block v-if="type==3">
					<view class="order_li dis_flex_c" v-for="(item,index) in datas" @tap="jump" :data-url="'/pagesA/user_al_xq/user_al_xq?type=3&id='+item.id">
						<image class="order_li_img" :src="getimg(item.cover)" mode="aspectFill"></image>
						<view class="order_li_msg">
							<view class="oh2">{{item.title}}</view>
						</view>
					</view>
				</block>
			</view>
			<view v-if="data_last" class="data_last">我可是有底线的哟~~~</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that 
	export default {
		data() {
			return {
				data_list: [{
						name: '智能家居',
						id: 1
					},
					{
						name: '案例',
						id: 2
					},
					{
						name: '资讯',
						id: 3
					},
				],
				type: 1,
				page:1,
				size:20,
				data_last:false,
				htmlReset: -1,
				datas: []
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad(option) {
			that=this
			this.type=option.type
			this.onRetry()
		},
		onPullDownRefresh() {
			this.onRetry()
		},
		onReachBottom() {
			this.getdata()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			addcar(item){
				var jkurl = '/user/collect'
				var datas = {
					token: that.loginDatas.token || '',
					id: item.id,
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
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
							icon:'none',
							title:'收藏成功'
						})
							
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
						title: '获取数据失败'
					})
				})
				
			},
			
			bindcur(e) {
				var that = this
				console.log(e.currentTarget.dataset.type)
				// if(that.type== e.currentTarget.dataset.type){
				// 	return
				// }
				that.type = e.currentTarget.dataset.type

				// that.getOrderList()
				this.onRetry()
			},
			onRetry() {
				this.page = 1
				this.datas = []
				this.data_last = false

				this.getdata()
			},
			getdata(num) {
				var that = this
				
				if (that.data_last) {
					return
				}
				var datas
				var jkurl = ''
				if(this.type==1){
					datas = {
						token: that.loginDatas.userToken || '',
						page: that.page,
						size: that.size,
					}
					jkurl = '/goods/list'
				}else if(this.type==2){
					datas = {
						token: that.loginDatas.userToken || '',
						page: that.page,
						size: that.size,
						type: 'case',
					}
					jkurl = '/caseinfo/list'
				}else{
					datas = {
						token: that.loginDatas.userToken || '',
						page: that.page,
						size: that.size,
						type: 'info',
					}
					jkurl = '/caseinfo/list'
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				//selectSaraylDetailByUserCard
				
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = that.page
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

							that.datas = datas
						} else {
							if (datas.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.datas = that.datas.concat(datas)
						}
						that.page++

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
								title: '获取数据失败'
							})
						}
					}
				}).catch(e => {
						that.htmlReset=1
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
				// if(!that.hasLogin){
				// 	uni.navigateTo({
				// 		url:'/pages/login/login'
				// 	})
				// 	return
				// }
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
					}, 1000)
				}

				service.jump(e)
			},
			getimg(e){
				return service.getimg(e)
			},
			getarr(str){
				if(!str){
					return
				}				
				console.log(str)
				str=str.split(',')
				console.log(str)
				return str
			}
		}
	}
</script>

<style scoped>
	.tab_box {
		/* border-top: 8upx solid #f5f5f5; */
		width: 100%;
		height: 75upx;
		background: #fff;
		position: fixed;
		top: 0;
		/* #ifdef H5*/
		top: calc(44px + env(safe-area-inset-top));
		/* #endif */
		z-index: 90;
		font-size: 30rpx;
		padding: 0 30upx;
		border-bottom: 1px solid #F5F5F5;
	}
	
	.tab_box view {
		height: 72upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #999999;
	}
	
	.tab_box view.active {
		color: #00A079;
		position: relative;
	}
	
	.tab_box view.active::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 53upx;
		height: 4upx;
		margin-left: -26upx;
		background: #11A078;
	}
	
	.order_list {
		width: 100%;
		padding: 100upx 30upx 20upx;
		display: flex;
		flex-wrap: wrap;
	}
	
	.order_li {
		width: 337upx;
		background: #FFFFFF;
		border-radius: 10upx;
		margin-bottom: 15upx;
		overflow: hidden;
	}
	.order_li:nth-child(2n){
		margin-left: 15upx;
	}
	.order_li_img{
		width: 337upx;
		height: 337upx;
		/* border-radius: 10upx 10upx 0upx 0upx; */
	}
	.order_li_msg{
		width: 100%;
		min-height: 122upx;
		padding: 20upx;
		font-size: 24upx;
		color: #222;
	}
	.order_li_msg .oh2{
		line-height: 30upx;
		height: 60upx;
	}
	.order_li_img_al{
		width: 337upx;
		height: 410upx;
	}
	.order_bqs{
		margin-top: 20upx;
		display: flex;
		flex-wrap: wrap;
	}
	.order_bq{
		padding: 10upx 20upx;
		font-size: 24upx;
		line-height: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #F4691A;
		margin-right: 15upx;
		margin-bottom: 15upx;
		border: 1px solid #F4691A;
		border-radius: 10upx;
	}
	.order_pri{
		color: #F4691A;
		font-size: 28upx;
	}
	.order_pri text{
		font-size: 24upx;
	}
	.order_buy{
		margin-top: 20upx;
	}
	.order_car{
		width: 44upx;
		height: 44upx;
	}
</style>
