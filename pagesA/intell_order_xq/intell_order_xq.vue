<template>
	<view class="content_wrap" style="min-height: 100vh;background: #FAFAFA;">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="/static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="index_list">
				<view class="index_li">
					<view class="index_li_d1">
						<image class="index_tx" src="/static/images/tx_m2.jpg" lazy-load="true" mode="aspectFill"></image>
						<view class="index_yz">业主：<text>{{datas.owner_name}}</text></view>
						<view @tap="call" :data-tel="datas.owner_name" class="iconfont iconphone"></view>
					</view>
					<view class="index_li_d2" @tap="map_dp(datas)">
						<view class="index_add">
							<view class="index_add1">
								<view class="iconfont icondizhizhuanhuan"></view>
							</view>
							<view class="flex_1 index_add2">
								{{datas.order_name}}
							</view>
							<block v-if="datas.distance">
								<view class="index_add3" v-if="datas.distance>1000">
									距您<text style="color: #3778FE;">{{getcm(item.distance)}}</text>千米
									<text class="iconfont iconnext-m"></text>
								</view>
								<view class="index_add3" v-else>
									距您<text style="color: #3778FE;">{{datas.distance}}</text>米
									<text class="iconfont iconnext-m"></text>
								</view>
							</block>
						</view>
						<view class="index_address">{{datas.owner_address}}</view>
					</view>
					<view class="index_li_d3">
						<view class="index_li_d3_tit">安防套餐(详单)</view>
						<view class="tc_list">
							<view class="tc_li" v-for="(item,index) in datas.goods_list">
								<image class="tc_li_img" :src="getimg(item.cover)" mode="aspectFit"></image>
								<view class="tc_msg flex_1">
									<view class="dis_flex tc_d1 ju_b">
										<view class="tc_d1_l">{{item.title}}</view>
										<view class="tc_d1_r">￥{{item.price}}</view>
									</view>
									<view class="dis_flex tc_d1 ju_b tc_d2">
										<view class="tc_d1_l">{{item.description}}</view>
										<view class="tc_d1_r">x{{item.quantity}}</view>
									</view>
									<view class="dis_flex flex-wrap">
										<view class="tc_bq">{{item.goods_type}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="index_li_d4">
						<view class="dis_flex aic ju_b index_li_d4_li">
							<view style="color: #999;">订单号</view>
							<view>{{datas.order_num}}</view>
						</view>
						<view class="dis_flex aic ju_b index_li_d4_li">
							<view style="color: #999;">下单时间</view>
							<view>{{datas.created_at}}</view>
						</view>
					</view>
					<view class="index_li_d1" style="border-bottom: 0;">
						<view class="index_yz dis_flex ju_b">要求：
							<view class="" style="max-width: 90%"><text class="oh1">{{datas.owner_demand}}</text></view>
						</view>
					</view>
				</view>
				<view v-if="datas.status==1" @tap="jump" :data-url="'/pagesA/intell_order_xq_pz1/intell_order_xq_pz1?order_num='+datas.order_num"
				 class="pz_btn"><text class="iconfont iconshigong"></text>施工前照片</view>
				<view v-if="datas.status==2" @tap="jump" :data-url="'/pagesA/intell_order_xq_pz2/intell_order_xq_pz2?order_num='+datas.order_num"
				 class="pz_btn">
					<text class="iconfont iconshigong"></text>施工结束照片
				</view>
				<view v-if="datas.status==3&&datas.owner_sign_photo.length==''" @tap="jump" :data-url="'/pagesA/intell_order_xq_pz3/intell_order_xq_pz3?order_num='+datas.order_num"
				 class="pz_btn">
					<text class="iconfont iconshigong"></text>完工签字验收
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import service from '../../service.js';
	import QQMapWX from '../../libs/qqmap-wx-jssdk.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				type: 0,
				htmlReset: -1,
				datas: [],
				data_last: false,
				page: 1,
				size: 20,
				longitude:'',
				latitude:''
			};
		},
		onLoad(option) {
			that = this
			that.id = option.id
			that.onRetry()
		},

		onShow() {
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.data.order_new) {
				//将携带的参数赋值

				that.onRetry()
				// this.addressBack=true 
				currPage.setData({
					//直接给上一个页面赋值
					order_new: false,
				});

			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),

			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar
				var style = `padding-top:${padd_top}px;`;

				return style
			},
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;

				return style
			},

			style1() {
				var StatusBar = this.StatusBar;
				var style = `top:${StatusBar}px;`;

				return style
			},
			style2() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `padding-top:${CustomBar}px;`;

				return style
			}
		},
		onPullDownRefresh() {
			this.onRetry()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getcm(num){
				if(num>1000){
					num=num/1000
					num=num.toFixed(2)
					return num
				}
			},
			onRetry() {
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						that.longitude = res.longitude
						that.latitude = res.latitude
						console.log('当前位置的纬度：' + res.latitude);
						that.getdata()
					}
				});
			},
			map_dp(data) {
				let that = this
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

			getdata() {
				var that = this

				if (that.data_last) {
					return
				}

				var datas = {
					id: that.id,
					token: that.loginDatas.token,
					long:that.longitude,
					lat:that.latitude,
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
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
						that.datas = datas
						// if(page_that==1){

						// 	that.datas = datas
						// }else{
						// 	if(datas.length==0){
						// 		that.data_last=true
						// 		return
						// 	}
						// 	that.datas =that.datas.concat(datas) 
						// }
						// that.page++

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
								title: '操作失败'
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

			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			pveimg(e) {
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
		padding: 0 30upx;
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
		padding: 20upx 30upx 10upx;
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

	.tc_list {
		width: 100%;
	}

	.tc_li {
		width: 100%;
		display: flex;
		padding: 15upx 0;
	}

	.tc_li_img {
		width: 140upx;
		height: 140upx;
		background: #FAFAFA;
		border-radius: 4upx;
		margin-right: 20upx;
	}

	.tc_d1 {
		align-items: center;
		margin-bottom: 10upx;
	}

	.tc_d1_l {
		font-size: 24upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #222222;
		line-height: 35upx;
		font-weight: bold;
	}

	.tc_d1_r {
		font-size: 24upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: #222222;
		line-height: 35upx;
		flex: none;
	}

	.tc_d2 .tc_d1_l {
		color: #999;
		font-weight: normal;
	}

	.tc_d2 .tc_d1_r {
		color: #999;
		font-weight: normal;
	}

	.tc_bq {
		padding: 7upx 9upx;
		font-size: 16upx;
		line-height: 16upx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #3778FE;
		border: 1px solid #3778FE;
	}

	.index_li_d4 {
		width: 100%;
		padding: 20upx 30upx;
		border-bottom: 1px solid #eee;
	}

	.index_li_d4_li {
		width: 100%;
		font-size: 22upx;
		color: #000;
	}

	.index_li_d4_li+.index_li_d4_li {
		margin-top: 25upx;
	}

	.pz_btn {
		width: 690upx;
		height: 88upx;
		background: #3778FE;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin: 60upx auto;
	}

	.pz_btn text {
		margin-right: 8upx;
		font-size: 34upx;
	}
</style>
