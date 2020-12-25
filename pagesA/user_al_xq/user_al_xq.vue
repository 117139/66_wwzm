<template>
	<view style="min-height: 100vh; background: #fff;">
		<view class="al_xq">
			<view class="al_tit">纯水岸冬湖现代简约风三室一厅</view>
			<view class="order_bqs">
				<view class="order_bq">现代</view>
				<view class="order_bq">公寓</view>
			</view>
			
			<view class="xq_img">
				<image :src="getimg('/static/images/user/banner_01.jpg')" mode="widthFix" lazy-load="true"></image>
				<image :src="getimg('/static/images/user/banner_01.jpg')" mode="widthFix" lazy-load="true"></image>
				<image :src="getimg('/static/images/user/banner_01.jpg')" mode="widthFix" lazy-load="true"></image>
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
	var that =this
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getdata() {
				var that =this
				var jkurl = '/data/refer_record'
				var datas = {
					token: that.loginDatas.token||'',
					id:that.id
				}
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.count
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
			
						that.datas = datas
			
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
			
			getimg(img) {
				return service.getimg(img)
			},
		}
	}
</script>

<style scoped>
	.al_xq{
		width: 100%;
		padding: 20upx 30upx;
	}
	.al_tit{
		font-size: 36upx;
		font-family: PingFang;
		font-weight: bold;
		color: #222222;
		margin-bottom: 30upx;
	}
	.order_bqs{
		margin-bottom: 25upx;
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
	.xq_img image{
		width: 100%;
	}
	.xq_img image+image{
		margin-top: 23upx;
	}
	.xq_img{
		margin-bottom: 48upx;
	}
</style>
