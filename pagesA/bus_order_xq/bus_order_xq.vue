<template>
	<view style="min-height: 100vh;background-color: #fff;">
		<view style="width: 100%;height: 20upx;background: #fafafa;"></view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="order_box">
				<view class="order_main">
					<view  v-if="datas.status==1" class="order_status">待结单</view>
					<view  v-if="datas.status==2" class="order_status" style="color: #4793FA;">施工中</view>
					<view  v-if="datas.status==3" class="order_status" style="color: #4793FA;">已完成</view>
					<view class="order_li">
						<view class="order_li_tit">业主名称</view>
						<view class="order_li_msg">{{datas.owner_name}}</view>
					</view>
					<view class="order_li">
						<view class="order_li_tit">业主联系电话</view>
						<view class="order_li_msg">{{datas.owner_phone}}</view>
					</view>
					<view class="order_li" @tap="map_dp(datas)">
						<view class="order_li_tit">业主地址</view>
						<view class="order_li_msg" >
							<view class="flex_1">{{datas.owner_address}}</view>
							<view class="flex_0 iconfont icondizhizhuanhuan" style="opacity: 1;color: #222;"></view>
						</view>
					</view>
					<view class="order_li">
							<view class="order_li_tit">套内详单</view>
							<view class="order_li_msg">
								
								<scroll-view class="weixin_dblist" scroll-x="true" bindscroll="scroll" style="width: 100%">
									
										<view v-for="(item,index) in datas.goods_id" class="taocan_li">
											<image class="taocan_li_img" :src="getimg(item.cover)" mode="aspectFit"></image>
											<view class="taocan_li_msg oh2">{{item.title}}</view>
											<view class="taocan_li_pri"><text style="font-size: 18upx;">￥</text>{{item.price}}</view>
										</view>
								</scroll-view>
							</view>
					</view>
					<view class="order_li">
						<view class="order_li_tit">负责人</view>
						<view class="order_li_msg">{{datas.functionary}}</view>
					</view>
					<view class="order_li">
						<view class="order_li_tit">负责人联系方式</view>
						<view class="order_li_msg">{{datas.functionary_phone}}</view>
					</view>
					<view class="order_li">
							<view class="order_li_tit">时间</view>
							<view class="order_li_msg">{{datas.time}}</view>
					</view>
					<view class="order_li">
							<view class="order_li_tit">合同</view>
							<view class="order_li_msg">{{datas.agreement_id}}</view>
					</view>
					<view v-if="datas.status!=1" class="order_li">
						<view class="order_li_tit">施工团队</view>
						<view class="order_li_msg">{{datas.engineer_name}}</view>
					</view>
					<view v-if="datas.status!=1" class="order_li">
						<view class="order_li_tit">施工团队联系方式</view>
						<view class="order_li_msg">{{datas.engineer_phone}}</view>
					</view>
					<view  class="order_li">
						<view class="order_li_tit">客户要求</view>
						<view class="order_li_msg">{{datas.owner_demand}}</view>
					</view>
					<view class="order_bottom"></view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import QQMapWX from '../../libs/qqmap-wx-jssdk.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			const currentDate = this.getDate({
					format: true
			})
			return {
				type:'',
				id:'',
				datas:'',
				htmlReset:-1
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onLoad(option) {
			that=this
			this.id=option.id
			this.getdata()
		},
		onPullDownRefresh() {
			this.getdata()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			onRetry(){
				this.getdata()
			},
			getdata() {
				var that =this
				var jkurl = '/order/list'
				var datas = {
					token: that.loginDatas.token || '',
					id: that.id,
				}
				
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
			
						that.datas = datas
			
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
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			getimgarr(img){
				return service.getimgarr(img)
			},
			pveimg(e){
				service.pveimg(e)
			},
			call(e){
				service.call(e)
			},
			map_dp(data) {
				let that = this
				let plugin = requirePlugin('routePlan');
				let key = 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'; //使用在腾讯位置服务申请的key
				let referer = '万屋智能'; //调用插件的app的名称
				let endPoint = JSON.stringify({ //终点
					'name': data.owner_address,
					'latitude': parseFloat(data.lat) || '',
					'longitude': parseFloat(data.long) || '',
				});
				console.log(endPoint)
				uni.navigateTo({
					url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=1'
				});
			},
			
			
			getDate(type) {
					const date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();

					if (type === 'start') {
							year = year - 60;
					} else if (type === 'end') {
							year = year + 200;
					}
					month = month > 9 ? month : '0' + month;;
					day = day > 9 ? day : '0' + day;
					return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style scoped>
	.order_box{
		width: 100%;
		padding:20upx 30upx 0;
	}
	.order_main{
		width: 100%;
		background: #fff;
		border-radius: 10upx;
		padding: 0 30upx;
	}
	.order_li{
		width: 100%;
		padding-top: 30upx;
		border-bottom: 1px solid #EEEEEE;
	}
	.order_li_tit{
		font-size: 30upx;
		color: #222;
		line-height: 30upx;
	}
	.order_li_msg{
		width: 100%;
		min-height: 87upx;
		font-size: 30upx;
		line-height: 40upx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 15upx 0;
		color: #222222;
		opacity: 0.5;
	}
	
	.order_bottom {
		width: 100%;
		height: 180upx;
		padding-bottom: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		bottom: 0;
		left: 0;
		z-index: 100;
	}


	.order_status{
		padding-top: 10upx;
		line-height: 90upx;
		font-size: 40upx;
		font-family: PingFang;
		font-weight: bold;
		color: #EC5B5B;
	}
	
	.weixin_dblist{
		width: 100%;
		height: 320upx;
		white-space:nowrap;
		padding-top: 10upx;
	}
	.taocan_li{
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
	.taocan_li_img{
		width: 152upx;
		height: 152upx;
		margin-bottom: 15upx;
	}
	.taocan_li_msg{
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
	
	.taocan_li_pri{
		color: #F4691A;
		font-size: 22upx;
	}
</style>
