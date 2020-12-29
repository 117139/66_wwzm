<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view style="width: 100%;height: 20upx;"></view>
		<view v-for="(item,index) in datas">
			<view class="order_li_tit">{{item.title}}</view>
			<view class="order_li_msg">

				<scroll-view class="weixin_dblist" scroll-x="true" bindscroll="scroll" style="width: 100%">

					<view v-for="(item1,index1) in item.children" class="taocan_li" @tap="jump" :data-url="'/pagesA/user_goods_xq/user_goods_xq?id='+item1.id">
						<image class="taocan_li_img" :src="getimg(item1.cover)" mode="aspectFit"></image>
						<view class="taocan_li_msg oh2">{{item1.title}}</view>
						<view class="taocan_li_pri"><text style="font-size: 18upx;">￥</text>{{item1.price}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				datas:[
					{
						name:'智能套餐A'
					},
					{
						name:'智能套餐B'
					},
					{
						name:'智能套餐C'
					},
				],
				page:1,
				size:20,
				data_last:false,
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
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onPullDownRefresh() {
			that.onRetry()
		},
		onReachBottom() {
			// that.getdata()
		},
		onLoad() {
			that=this
			that.onRetry()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			onRetry() {
				this.page = 1
				this.datas = []
				this.data_last = false
				this.getdata()
			},
			getdata() {
			
				///api/info/list
				var that = this
				var data = {
					token: this.loginDatas.token || '',
					page: this.page,
					size: this.size
				}
				if (this.data_last) {
					return
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/gp/list'
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = this.page
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
			
						if (page_that == 1) {
			
							that.datas = datas
						} else {
							if (datas.length == 0) {
								that.data_last = true
								return
							}
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
								title: '获取数据失败'
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
			
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			getimgarr(img) {
				return service.getimgarr(img)
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
		height: 300upx;
		white-space: nowrap;
		padding:0 10upx;
		background: #fff;margin-bottom: 20upx;
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
		margin-bottom: 10upx;
		white-space: pre-wrap;
	}

	.taocan_li_pri {
		color: #F4691A;
		font-size: 22upx;
	}
</style>
