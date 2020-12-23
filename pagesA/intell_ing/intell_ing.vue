<template>
	<view class="content_wrap" style="min-height: 100vh;background: #FAFAFA;">
		
		<view class="index_list">
			<view class="index_li" v-for="(item,index) in datas">
				<view class="index_li_d1">
					<image class="index_tx" src="/static/images/tx_m2.jpg" lazy-load="true" mode="aspectFill"></image>
					<view class="index_yz">业主：<text>孙三三</text></view>
					<view @tap="call" data-tel="18300000000" class="iconfont iconphone"></view>
				</view>
				<view class="index_li_d2" @tap="map_dp()">
					<view class="index_add">
						<view class="index_add1">
							<view class="iconfont icondizhizhuanhuan"></view>
						</view>
						<view class="flex_1 index_add2">
							重庆市渝中区菜园坝
						</view>
						<view class="index_add3">
							距您<text style="color: #3778FE;">150</text>米
							<text class="iconfont iconnext-m"></text>
						</view>
					</view>
					<view class="index_address">菜园坝290号重庆中银大厦6-11-4</view>
				</view>
				<view class="index_li_d3">
					<view class="index_li_d3_tit">安防套餐</view>
					<scroll-view class="weixin_dblist" scroll-x="true" bindscroll="scroll" style="width: 100%">
						<image v-for="(item,index) in 10" @tap="pveimg" lazy-load="true" data-src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1306508493,2006189766&fm=26&gp=0.jpg" class="taocan_li" src="/static/images/business/tc_img_03.png" mode="aspectFit"></image>
							
					</scroll-view>
				</view>
				<view class="index_li_d1" style="border-bottom: 0;">
					<view class="index_yz dis_flex">要求：
						<view class="flex_1"><text class="oh1">情况紧急，需要在三天内完成需要在三天内完成需要在三天内完成需要在三天内完成需要在三天内完成</text></view>
					</view>
					<view class="go_btn" @tap="jump" :data-url="'/pagesA/intell_order_xq/intell_order_xq?type='+1">进入</view>
				</view>
			</view>
			<view v-if="datas.length==0" class="zanwu">暂无数据</view>
			<view v-if="data_last" class="data_last">我可是有底线的哟~~~</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import QQMapWX from '../../libs/qqmap-wx-jssdk.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				datas:[1,1,1,1,1,1,1],
				data_last:false,
				page:1,
				size:20
			};
		},
		onLoad() {},
		onShow() {
			// service.wxlogin()
		},
		onPageScroll(e) {
			// console.log(e)
			// this.PageScroll = e.scrollTop
			// if(e.scrollTop>10){
			// 	uni.showToast({
			// 		title:e.scrollTop
			// 	})
			// }
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onPullDownRefresh() {
			this.onRetry()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			map_dp(data) {
				let that = this
				let plugin = requirePlugin('routePlan');
				let key = '56LBZ-EYRK6-TODSV-EY4P2-RC367-HAFGD'; //使用在腾讯位置服务申请的key
				let referer = '达鑫达'; //调用插件的app的名称
				let endPoint = JSON.stringify({ //终点
					'name': 'dd',
					'latitude':  parseFloat('38.912884929705875')||'',
					'longitude':parseFloat('115.37814606640623')||'',
				});
				console.log(endPoint)
				uni.navigateTo({
					url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=1'
				});
			},
			onRetry() {
				this.page = 1
				this.datas=[]
				this.data_last=false
				this.getdata()
			},
			getdata() {
				var that = this
				
				if(that.data_last){
					return
				}
				var fwb_id
				if(that.fw_cur==-1){
					fwb_id=-1
				}else{
					fwb_id=that.productCateData[that.fw_cur].id
				}
				var datas = {
					id:fwb_id,
					token: that.loginDatas.userToken,
					page: that.page,
					size: that.size
				}
				if(this.btn_kg==1){
					return
				}
				this.btn_kg=1
				//selectSaraylDetailByUserCard
				var jkurl = '/serveList'
				uni.showLoading({
					title: '正在获取数据',
					mask:true
				})
				var page_that=that.page
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg=0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
					
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						
						if(page_that==1){
							
							that.datas = datas
						}else{
							if(datas.length==0){
								that.data_last=true
								return
							}
							that.datas =that.datas.concat(datas) 
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
					that.btn_kg=0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
				
			},
			
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			pveimg(e){
				service.pveimg(e)
			},
			fabu_status() {
				var that = this
				if (that.loginDatas.dy_status == 3) {
					var now = Date.parse(new Date())
					console.log(now)
					console.log(that.loginDatas.dy_start_status * 1000)
					console.log(that.loginDatas.dy_end_status * 1000)
					console.log(1667567600000 < now)
					console.log(that.loginDatas.dy_end_status * 1000 > now)
					console.log(1667567600000 < now && that.loginDatas.dy_end_status * 1000 > now)
					if (that.loginDatas.dy_start_status * 1000 < now && that.loginDatas.dy_end_status * 1000 > now) {
						return true
					}
				}
				return false
			},
			gettime(time) {
				var time = new Date(time * 1000);
				var year = time.getFullYear();
				var month = time.getMonth() + 1;
				var date = time.getDate();
				var hour = time.getHours();
				var minute = time.getMinutes();
				var second = time.getSeconds();
				month = month < 10 ? "0" + month : month;
				date = date < 10 ? "0" + date : date;
				hour = hour < 10 ? "0" + hour : hour;
				minute = minute < 10 ? "0" + minute : minute;
				second = second < 10 ? "0" + second : second;
				return year + '-' + month + '-' + date
			},
			call(e) {
				console.log(e)
				service.call(e)
			},
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
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
	
	.index_list{
		width: 100%;
		padding: 20upx 30upx;
	}
	.index_li{
		width: 100%;
		background: #FFFFFF;
		border-radius: 10upx;
		margin-bottom: 20upx;
	}
	.index_li_d1{
		display: flex;
		align-items: center;
		width: 100%;
		height: 85upx;
		padding: 0 20upx;
		border-bottom: 1px solid #EEEEEE;
	}
	.index_tx{
		width: 44upx;
		height: 44upx;
		border-radius: 50%;
		margin-right: 20upx;
	}
	.index_yz{
		flex: 1;
		display: flex;
		align-items: center;
		font-size: 22upx;
		color: #999;
	}
	.index_yz text{
		color: #000;
	}
	.iconphone{
		font-size: 40upx;
		color: #3778FE;
	}
	.index_li_d2{
		width: 100%;
		padding: 24upx 0;
		border-bottom: 1px solid #EEEEEE;
		
	}
	.index_add{
		display: flex;
	}
	.index_add1{
		width: 60upx;
		text-align: center;
		color: #3778FE;
		font-size: 22upx;
	}
	.index_add1 .iconfont{
		font-size: 24upx;
	}
	.index_add2{
		line-height: 24upx;
		font-size: 24upx;
		font-family: PingFang;
		font-weight: bold;
		color: #000000;
	}
	.index_add3{
		font-size: 22upx;
		display: flex;
		color: #999;
		align-items: center;
		padding-right: 20upx;
	}
	.index_add3 .iconfont{
		margin-left: 10upx;
		font-size: 20upx;
		color: #222;
	}
	.index_address{
		padding-left: 60upx;
		padding-right: 20upx;
		font-size: 22upx;
		margin-top: 15upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}
	.index_li_d3{
		width: 100%;
		padding: 20upx 30upx;
		border-bottom: 1px solid #eee;
	}
	.index_li_d3_tit{
		line-height: 35upx;
		font-size: 28upx;
		font-family: PingFang;
		font-weight: bold;
		color: #222222;
		margin-bottom: 15upx;
	}
	
	.weixin_dblist{
		width: 100%;
		height: 170upx;
		background: #FAFAFA;
		white-space:nowrap;
		padding: 15upx;
	}
	.taocan_li{
		width: 140upx;
		height: 140upx;
		background: #FFFFFF;
		border-radius: 4px;
		display: inline-flex;
		margin-right: 10upx;
	}
	.go_btn{
		margin-left: 10upx;
		width: 160upx;
		height: 56upx;
		background: #3778FE;
		border-radius: 10upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FEFEFE;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
