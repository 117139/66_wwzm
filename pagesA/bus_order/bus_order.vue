<template>
	<view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==0" style="min-height: 100vh;background: #FAFAFA;">

			<view class='dis_flex ju_a  tab_box'>
				<block v-for="(item,idx) in data_list">
					<view :class="type==item.id?'active':''" :data-type="item.id" @tap='bindcur'>{{item.name}}</view>
				</block>

			</view>
			<view class="order_list">
				<view class="order_li " v-for="(item,index) in datas" @tap="jump" :data-url="'/pagesA/bus_order_xq/bus_order_xq?type='+type">
					<view class="order_li_d1 oh1">木泓设计家装精致工艺0增加</view>
					<view class="order_li_d2 oh1">时间：2020/10/07</view>
					<view class="order_li_d2 oh1">地址：新天地世纪百货写字楼16-26号</view>
					<view class="order_li_d2 oh1">负责人：刘明</view>
					<view class="order_li_d2 oh1">合同：浙江后海房产装修合同</view>
					<view v-if="type!=1" class="order_li_d2 oh1">施工团队：刘明</view>
					<view v-if="type!=1" class="order_li_d2 oh1">施工联系方式：1786526552</view>
					<view class="dis_flex order_li_d3">
						<view class="flex_1"></view>
						<view v-if="type==1" class="order_li_btn">待接单</view>
						<view v-if="type>1" class="order_li_btn" @tap.stop="jump" data-url="">施工流程</view>
						<view v-if="type==2" class="order_li_btn">进行中</view>
						<view v-if="type==3" class="order_li_btn"  @tap.stop="jump" data-url="">售后</view>
						
					</view>
				</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
				<view class="order_bottom"></view>
				<view class="order_bottom" style="position: fixed;">
					<view  class="order_bottom_btn" @tap="jump" data-url="/pagesA/bus_order_edit/bus_order_edit">添加工程</view>
				</view>
			</view>
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
	export default {
		data() {
			return {
				data_list: [{
						name: '待接单',
						id: 1
					},
					{
						name: '施工中',
						id: 2
					},
					{
						name: '已完成',
						id: 3
					},
				],
				type: 1,
				htmlReset: 0,
				datas: [
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
				]
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
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
				this.datas = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
				return
				if (that.data_last) {
					return
				}
				var datas = {
					token: that.loginDatas.userToken || '',
					page: that.page,
					size: that.size,
					type: this.type,
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/user/productOrder/list'
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = that.page
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
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
	}

	.order_li {
		width: 100%;
		/* min-height: 420upx; */
		background: #FFFFFF;
		border-radius: 10px;
		padding: 30upx;
		/* box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.1); */
	}

	.order_li+.order_li {
		margin-top: 30upx;
	}

	.order_li_d1 {
		font-size: 30upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #222222;
		margin-bottom: 25upx;
	}

	.order_li_d2 {
		font-size: 26upx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #999999;
		margin-bottom: 15upx;
	}

	.order_li_d3 {
		width: 100%;
	}

	.order_li_btn {
		min-width: 120upx;
		height: 50upx;
		padding: 0 15upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22upx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #00A079;
		margin-left: 30upx;
		border: 1px solid #00A079;
		border-radius: 10upx;
	}
	.order_bottom{
		width: 100%;
		height: 180upx;
		padding-bottom: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fafafa;
		bottom: 0;
		left: 0;
		z-index: 100;
	}
	.order_bottom_btn{
		width: 690upx;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #00A079;
		background: #FFFFFF;
		border-radius: 10px;
	}
</style>
