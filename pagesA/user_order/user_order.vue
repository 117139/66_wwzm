<template>
	<view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==0" style="min-height: 100vh;background: #FAFAFA;">

			<view class='dis_flex ju_a  tab_box'>
				<block v-for="(item,idx) in data_list">
					<view :class="type==item.id?'active':''" :data-type="item.id" @tap='bindcur'>{{item.name}}</view>
				</block>

			</view>

			<view style="width: 100%;height: 90upx;"></view>
			<view v-for="(item,index) in datas">
				<view class="order_d1">
					<view class="order_tel" @tap="call" :data-tel="item.engineer_phone">
						<text  class="iconfont iconphone"></text>{{item.engineer_phone}}
					</view>
					<view v-if="item.status==1" class="order_type">
						待处理
					</view>
					<view v-else-if="item.status==2" class="order_type" style="color: #0B8EE1;">
						施工中
					</view>
					<view v-else class="order_type" style="color:#A2A2A2;">已完成</view>
				</view>
				<view class="order_li_tit">{{item.order_name}}</view>
				<view class="order_li_msg">
					<scroll-view class="weixin_dblist" scroll-x="true" bindscroll="scroll" style="width: 100%">
						<view v-for="(item1,index1) in item.goods_list" class="taocan_li" @tap.stop="jump" :data-url="'/pagesA/user_goods_xq/user_goods_xq?id='+item1.id">
							<image class="taocan_li_img" :src="getimg(item1.cover)" mode="aspectFit"></image>
							<view class="taocan_li_msg oh2">{{item1.title}}</view>
							<view class="taocan_li_pri"><text style="font-size: 18upx;">￥</text>{{item1.price}}</view>
						</view>
					</scroll-view>
				</view>
				<view class="order_cz">
					<view class="order_time">下单时间：{{item.created_at}}</view>
					<view v-if="item.status!=1" class="order_btn" @tap='jump' :data-url="'/pagesA/user_order_xq/user_order_xq?id='+item.id">查看进度</view>
				</view>
			</view>
			<view v-if="datas.length==0" class="zanwu">暂无数据</view>
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
						name: '全部',
						id: 0
					},
					{
						name: '待处理',
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
				type: 0,
				htmlReset: 0,
				datas:[],
				pages:1,
				size:20,
				taocan_list: [{
						name: 'Mini 主机',
						id: 1
					},
					{
						name: '门窗传感器',
						id: 2
					},
					{
						name: '智能可燃气体报警器多功能更安全快速防',
						id: 3
					},
					{
						name: '智能门锁 T1C',
						id: 4
					},
					{
						name: 'Mini 主机',
						id: 1
					},
					{
						name: '门窗传感器',
						id: 2
					},
					{
						name: '智能可燃气体报警器多功能更安全快速防',
						id: 3
					},
					{
						name: '智能门锁 T1C',
						id: 4
					},
				],
				data_last: false,
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
		},
		onLoad() {
			this.onRetry()
		},
		onReachBottom() {
			this.getdata()
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
			getdata() {
				var that = this
				
				if (that.data_last) {
					return
				}
				var datas = {
					token: that.loginDatas.token || '',
					page: that.page,
					size: that.size,
					status: this.type==0?'':this.type,
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/user/rate'
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
			call(e){
				service.call(e)
			},
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
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
	
	.order_d1{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		height: 84upx;
		padding: 0 30upx;
		position: relative;
		border-bottom:1px solid #EEEEEE;
	}
	.order_tel{
		font-size: 24upx;
		color: #999;
		display: flex;
		align-items: center;
	}
	.order_tel text{
		font-size: 30upx;
		color: #11A078;
		margin-right: 8upx;
	}
	
	.order_type{
		color: #F34826;
		font-size: 28upx;
	}
	.order_cz{
		font-size: 24upx;
		color: #999;
		background: #fff;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
		margin-bottom: 20upx;
	}
	.order_time{
		font-size: 24upx;
		color: #999;
	}
	.order_btn{
		font-size: 24upx;
		color: #999;
		width: 152upx;
		height: 46upx;
		border: 1px solid #A8A8A8;
		border-radius: 23upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.order_li_tit{
		line-height: 90upx;
		font-size: 34upx;
		font-family: PingFang;
		font-weight: bold;
		color: #000000;
		padding: 0 30upx;
		background: #fff;
		
	}
	.weixin_dblist {
		width: 100%;
		height: 290upx;
		white-space: nowrap;
		padding-top:0;
		background: #fff;
		/* margin-bottom: 20upx; */
	}
	
	.taocan_li {
		width: 162upx;
		height: 281upx;
		background: #FAFAFA;
		margin-right: 14upx;
		padding: 5upx;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 10upx;
	}
	
	.taocan_li_img {
		width: 152upx;
		height: 152upx;
		margin-bottom: 15upx;
	}
	
	.taocan_li_msg {
		width: 95%;
		text-align: center;
		line-height: 30upx;
		height: 60upx;
		font-size: 20upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #222222;
		margin-bottom: 4upx;
		white-space: pre-wrap;
	}
	
	.taocan_li_pri {
		color: #F4691A;
		font-size: 22upx;
	}
</style>
