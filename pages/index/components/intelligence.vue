<template>
	<view class="content_wrap" style="min-height: 100vh;background: #FAFAFA;">
		<cu-custom bgColor="bg-white">
			<block slot="content">首页</block>
		</cu-custom>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="/static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<scroll-view class="scroll_H" :style="style" scroll-y="true" refresher-enabled='true' :refresher-triggered="triggered"
			 :refresher-threshold="100" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			 @refresherabort="onAbort" @scrolltolower="getdata" @scroll="scroll_fuc">
				<view class="index_list">
					<!-- <view  class="order_bottom_btn" @tap="jump" data-url="/pagesA/bus_order_edit/bus_order_edit">添加工程</view> -->
					<view  class="index_li" v-for="(item,index) in datas">
						<view class="index_li_d1">
							<image class="index_tx" :src="getimg(item.owner_cover)" lazy-load="true" mode="aspectFill"></image>
							<view class="index_yz">业主：<text>{{item.owner_name}}</text></view>
							<view @tap="call" :data-tel="item.owner_phone" class="iconfont iconphone"></view>
						</view>
						<view class="index_li_d2" @tap="map_dp(item)">
							<view class="index_add">
								<view class="index_add1">
									<view class="iconfont icondizhizhuanhuan"></view>
								</view>
								<view class="flex_1 index_add2">
									{{item.order_name}}
								</view>
								<block v-if="item.distance">
									<view class="index_add3" v-if="item.distance>1000">
										距您<text  style="color: #3778FE;">{{getcm(item.distance)}}</text>千米
										<text class="iconfont iconnext-m"></text>
									</view>
									<view class="index_add3" v-else>
										距您<text  style="color: #3778FE;">{{item.distance}}</text>米
										<text class="iconfont iconnext-m"></text>
									</view>
								</block>
							</view>
							<view class="index_address">{{item.owner_address}}</view>
						</view>
						<view class="index_li_d3">
							<view class="index_li_d3_tit">{{item.goods_list_name}}</view>
							<scroll-view class="weixin_dblist" scroll-x="true" style="width: 100%">
								<image v-for="(item1,index1) in item.goods_list" @tap="pveimg" lazy-load="true" :src="getimg(item1.cover)" :data-src="getimg(item1.cover)"
								 class="taocan_li" mode="aspectFit"></image>

							</scroll-view>
						</view>
						<view class="index_li_d1" style="border-bottom: 0;">
							<view class="index_yz dis_flex">要求：
								<view class="flex_1"><text class="oh1">{{item.owner_demand}}</text></view>
							</view>
							<view class="go_btn" @tap="jump" :data-url="'/pagesA/intell_order_xq/intell_order_xq?id='+item.id">进入</view>
						</view>
					</view>
					<view v-if="datas.length==0" class="zanwu">暂无数据</view>
					<view v-if="data_last" class="data_last">我可是有底线的哟~~~</view>
				</view>

			</scroll-view>
		</block>
		<view v-if="show_tk" class="tk_big_box dis_flex aic ju_c">
			<view class="dis_flex_c aic ju_c">
				<view class="dis_flex_c tk_box">
					<view class="tk_tit">提示</view>
					<view class="tk_msg">为了更好的服务，小程序需要获取您的位置信息</view>
					<view class="dis_flex ju_a ">
						<view class="dy_btn dy_btn1" style="position: relative;">
							<button style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;" open-type="openSetting" @opensetting='handler'>点击授权</button>
							点击授权
						</view>
						<view class="dy_btn" @tap="authMsg_on">取消</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../../service.js';
	import QQMapWX from '../../../libs/qqmap-wx-jssdk.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				datas: [],
				data_last: false,
				page: 1,
				size: 20,
				triggered: true, //设置当前下拉刷新状态
				htmlReset:-1,
				longitude:'',
				latitude:'',
				show_tk:false
			};
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `top:${CustomBar}px;height:calc(100vh - ${CustomBar}px);`

				return style
			},
		},

		mounted() {
			that = this
			
			this._freshing = false;
			this.onRetry()
		},
		watch: {
			hasLogin(newval, oldval) {
				console.log(newval)
				if (newval == true) {
					that.btn_kg = 0
					that.onRetry()
				}
			}
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			scroll_fuc(){},
			getcm(num){
				if(num>1000){
					num=num/1000
					num=num.toFixed(2)
					return num
				}
			},
			handler: function (e) {
			  var that = this;
			  if (!e.detail.authSetting['scope.userLocation']) {
			   that.ldata=false
			  } else {
			    that.ldata=true
				that.show_tk=false
				that.onRetry()
			
			    
			  }
			},
			authMsg_on(e){
				var that =this
				uni.showModal({
						title: '温馨提示',
						content: '拒绝后您将无法获取消息,请返回授权',
						confirmText:"知道了",
						showCancel:false,
						success: function (res) {
							///点击知道了的后续操作 
							///如跳转首页面 
							// that.show_tk=false
						}
				});
			},
			onPulling(e) {
				console.log("onpulling", e);
			},
			onRefresh() {
				if (this.btn_kg == 1) {
					that.triggered = false
					that._freshing = false
					return
				}
				if (that._freshing) return;
				that._freshing = true;
				this.onRetry()
				setTimeout(() => {
					that.triggered = false
					that._freshing = false
					
				}, 500)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
			},
			onRetry() {
				this.page = 1
				this.datas = []
				this.data_last = false
				this.getdata()
			},
			getdata() {
				var that = this
				if(!that.hasLogin){
					this.htmlReset=0
					return
				}
				if (that.data_last) {
					return
				}
				uni.getLocation({
				    type: 'gcj02',
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
								that.longitude=res.longitude
								that.latitude=res.latitude
				        console.log('当前位置的纬度：' + res.latitude);
								var datas = {
								
									token: that.loginDatas.token,
									long:that.longitude,
									lat:that.latitude,
									page: that.page,
									size: that.size,
									status:''
								}
								if (that.btn_kg == 1) {
									return
								}
								that.btn_kg = 1
								//selectSaraylDetailByUserCard
								var jkurl = '/engineer/list'
								uni.showLoading({
									title: '正在获取数据',
									mask: true
								})
								var page_that = that.page
								service.P_get(jkurl, datas).then(res => {
									that.btn_kg = 0
									console.log(res)
									if (res.code == 1) {
										that.htmlReset = 0
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
											that.datas = that.datas.concat(datas)
										}
										that.page++
								
									} else {
										that.htmlReset = 1
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
									that.htmlReset = 1
									that.btn_kg = 0
									console.log(e)
									uni.showToast({
										icon: 'none',
										title: '获取数据失败，请检查您的网络连接'
									})
								})
								
				    },
					fail: function (err) {
						console.log(err)
						that.htmlReset=0
						that.show_tk=true
					}
				});

				
			},

			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			pveimg(e) {
				service.pveimg(e)
			},

			map_dp(data) {
				let that = this
				if(!data.distance){
					return
				}
				let plugin = requirePlugin('routePlan');
				// let key = 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'; //使用在腾讯位置服务申请的key
				let key =service.map_key
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
	.scroll_H {
		position: fixed;
		top: 0;
		bottom: 0;
		height: 100vh;
		z-index: 100;
	}

	.index_list {
		width: 100%;
		padding: 20upx 30upx;
	}

	.index_li {
		width: 100%;
		background: #FFFFFF;
		border-radius: 10upx;
		margin-bottom: 20upx;
	}

	.index_li_d1 {
		display: flex;
		align-items: center;
		width: 100%;
		height: 85upx;
		padding: 0 20upx;
		border-bottom: 1px solid #EEEEEE;
	}

	.index_tx {
		width: 44upx;
		height: 44upx;
		border-radius: 50%;
		margin-right: 20upx;
	}

	.index_yz {
		flex: 1;
		display: flex;
		align-items: center;
		font-size: 22upx;
		color: #999;
	}

	.index_yz text {
		color: #000;
	}

	.iconphone {
		font-size: 40upx;
		color: #3778FE;
	}

	.index_li_d2 {
		width: 100%;
		padding: 24upx 0;
		border-bottom: 1px solid #EEEEEE;

	}

	.index_add {
		display: flex;
	}

	.index_add1 {
		width: 60upx;
		text-align: center;
		color: #3778FE;
		font-size: 22upx;
	}

	.index_add1 .iconfont {
		font-size: 24upx;
	}

	.index_add2 {
		line-height: 24upx;
		font-size: 24upx;
		font-family: PingFang;
		font-weight: bold;
		color: #000000;
	}

	.index_add3 {
		font-size: 22upx;
		display: flex;
		color: #999;
		align-items: center;
		padding-right: 20upx;
	}

	.index_add3 .iconfont {
		margin-left: 10upx;
		font-size: 20upx;
		color: #222;
	}

	.index_address {
		padding-left: 60upx;
		padding-right: 20upx;
		font-size: 22upx;
		margin-top: 15upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.index_li_d3 {
		width: 100%;
		padding: 20upx 30upx;
		border-bottom: 1px solid #eee;
	}

	.index_li_d3_tit {
		line-height: 35upx;
		font-size: 28upx;
		font-family: PingFang;
		font-weight: bold;
		color: #222222;
		margin-bottom: 15upx;
	}

	.weixin_dblist {
		width: 100%;
		height: 170upx;
		background: #FAFAFA;
		white-space: nowrap;
		padding: 15upx;
	}

	.taocan_li {
		width: 140upx;
		height: 140upx;
		background: #FFFFFF;
		border-radius: 4px;
		display: inline-flex;
		margin-right: 10upx;
	}

	.go_btn {
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
	
	
	.tk_big_box {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 9999;
			background: rgba(0, 0, 0, .5);
		}
		.tk_box {
			width: 400rpx;
			padding: 20upx;
			background: #FFF;
		}
		.tk_tit{
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24upx;
			margin-bottom: 30upx;
		}
		.tk_msg{
			font-size: 24upx;
			margin-bottom: 20upx;
			padding-bottom: 20upx;
			border-bottom: 1px solid #ddd;
		}
		.dy_btn{
			width: 150upx;
			height: 60upx;
			font-size: 24upx;
			border: 1px solid #ddd;
			color: #ddd;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.dy_btn1{
			width: 152upx;height: 62upx;
			background: linear-gradient(90deg, rgba(61, 127, 255, 0.91), rgba(60, 142, 255, 0.91));
			color: #fff;
			border: 0;
		}
</style>
