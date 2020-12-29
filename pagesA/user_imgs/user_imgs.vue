<template>
	<view class="content_wrap" style="min-height: 100vh;background: #fafafa;">
	<view class="index_list">
			<view class="index_li" v-for="(item,index) in datas" >
				<view class="li_d1" @tap="jump" :data-url="'/pagesA/user_xq/user_xq?id='+item.id">
					<view class="li_user ">
						<image class="flex_0" :src="getimg(item.owner_cover)" mode="aspectFill"></image>
						<text class="oh1">{{item.owner_nickname}}</text>
					</view>
					<view class="li_msg">{{item.title}}</view>
				</view>
				<view class="li_img" @tap="jump" :data-url="'/pagesA/user_xq/user_xq?id='+item.id">
					<image :src="getimgarr(item.photo)[0]" mode="aspectFill"></image>
				</view>
				<view class="li_cz">
					<view class="cz_li">
						<button type="default" open-type="share" :data-id="item.id"></button>
						<text class="iconfont iconfenxiang1"></text>
					</view>
					<view class="dis_flex aic"  @tap="jump" :data-url="'/pagesA/user_xq/user_xq?id='+item.id">
						<view class="cz_li">
							<text class="iconfont iconpinlun"></text>
						</view>
						<!-- <view class="cz_li">
							<text class="iconfont iconshoucang"></text>
							<text class="cz_num">33</text>
						</view> -->
						<view class="cz_li">
							<text v-if="item.like_status==1" class="iconfont iconzan3" style="color: #F4691A;"></text>
							<text v-else class="iconfont iconzan2"></text>
							<text v-if="item.like_count>0" class="cz_num">{{item.like_count}}</text>
						</view>

					</view>
				</view>
			</view>
			<view v-if="datas.length==0" class="zanwu">暂无数据</view>
			<view v-if="data_last" class="data_last">我可是有底线的哟~~~</view>
			<!-- <view  class="data_last">我可是有底线的哟~~~</view> -->
			<image class="user_add" src="../../static/images/user_add.png" mode="aspectFill"  @tap="jump" data-url="/pagesA/user_img_add/user_img_add"></image>
			
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
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,

				banner: [],
				datas: [],
				page:1,
				size:20,
				PageScroll: '',
				fk_show: false,
				tk_show: true,
				tximg: '/static/logo.png'
			};
		},
		onLoad() {
			that=this
			this.onRetry()
		},
		onShow() {
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.data.img_new) {  
			      //将携带的参数赋值
			        
			    that.onRetry()
			    // this.addressBack=true 
					currPage.setData({
					  //直接给上一个页面赋值
					  img_new: false,
					});
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onPullDownRefresh() {
			that.onRetry()
		},
		onReachBottom() {
			that.getdata()
		},
		onShareAppMessage(res) {
			
			if (res.from === 'button') {
				console.log(res.target.dataset.type)
				// this.setData({
				// 	sharetype:'share'
				// })
			}
			return {
			  title: '万屋智能',
			  path: '/pagesA/user_xq/user_xq?type=fwcz&id='+res.target.dataset.id,
			  success: function (res) {
			    console.log('成功', res)
			  }
			}
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
				var jkurl = '/user/my_dynamic'
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
	}

	.index_li+.index_li {
		margin-top: 20upx;
	}

	.li_d1 {
		width: 100%;
		padding: 30upx 20upx;
	}

	.li_user {
		font-size: 24upx;
		color: #666;
		display: flex;
		align-items: center;
		margin-bottom: 15upx;
	}

	.li_user image {
		width: 40upx;
		height: 40upx;
		border-radius: 20upx;
		margin-right: 10upx;
	}

	.li_msg {
		width: 100%;
		font-size: 28upx;
		color: #222;
	}

	.li_img {
		width: 100%;
		height: 345upx;
	}

	.li_img image{
		width: 100%;
		height: 100%;
	}

	.li_cz {
		width: 100%;
		height: 92upx;
		padding: 0 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cz_li {
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin-left: 20upx;
		margin-right: 30upx;
		position: relative;
	}
	.cz_li button{
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 10;
		opacity: 0;
	}
	
	.cz_li .iconfont {
		font-size: 32upx;
	}
	.cz_num{
		font-size: 20upx;
		color: #F4691A;
		position: absolute;
		top: -10upx;
		/* right: -18upx; */
		left: 30upx;
	}
	.user_add{
		width: 153upx;
		height: 153upx;
		position: fixed;
		bottom: 50upx;
		right: 30upx;
		z-index: 999;
	}
</style>
