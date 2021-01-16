<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view style="width: 100%;height: 20upx;"></view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image  class="loading_def_img" src="/static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="pz2_box">
				<block v-if="datas.before">
					
					<view  class="jd_tit">
						<text class="iconfont iconduigou"></text>
						<text>施工前</text>
					</view>
					<view class="jd_msgbox">
						<view class="sg_bz">{{datas.before.comments}}</view>
						<view class="jd_msgbox_img">
							<view class="pz_img" v-for="(item,index) in getimgarr(datas.before.photo)">
								<image :src="item" mode="aspectFill" @tap="pveimg" :data-src="item" lazy-load="true"></image>
							</view>
						</view>
					</view>
				</block>
				
				<view class="jd_tit jd_tit1">
					<text class="iconfont iconxingzhuangjiehe"></text>
					<text>施工中</text>
				</view>
				<view class="jd_msgbox jd_msgbox1">
					<block v-if="datas.under">
						<block v-for="(item,index) in datas.under">
							<view v-if="item.comments!=undefined" class="sg_bz">{{item.comments?item.comments:''}}</view>
							<view class="sg_bz_time">{{item.created_at}}</view>
							<view class="jd_msgbox_img">
								<view class="pz_img" v-for="(item1,inde1x) in getimgarr(item.photo)">
									<image :src="item1" mode="aspectFill" @tap="pveimg" :data-src="item1" lazy-load="true"></image>
								</view>

							</view>
						</block>
					</block>
					<view class="bz_view">
						<input type="text" placeholder="备注（选填）" v-model="bz_content">
					</view>
					<view class="jd_msgbox_img">
						<view class="pz_img" v-for="(item,index) in sj_img">
							<image class="img_del" src="/static/images/img_del.png" mode="aspectFill" @tap="imgdel" :data-idx="index"
							 data-type="1"></image>
							<!-- <image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image> -->
							<image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image>
						</view>
						<view class="pz_img" v-if="sj_img.length<9">
							<image mode="aspectFit" src="/static/images/upimg1.png" @tap="upimg" data-type="1"></image>
						</view>
					</view>
				</view>

				<view class="jd_tit jd_tit2">
					<text class="iconfont iconquan"></text>
					<text>施工完成</text>
				</view>

				<view class="jd_msgbox jd_msgbox2">
					<view class="bz_view">
						<input type="text" placeholder="备注（选填）" v-model="bz_content2">
					</view>
					<view class="jd_msgbox_img">
						<view class="pz_img" v-for="(item,index) in sj_img2">
							<image class="img_del" src="/static/images/img_del.png" mode="aspectFill" @tap="imgdel" :data-idx="index"
							 data-type="2"></image>
							<!-- <image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image> -->
							<image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image>
						</view>
						<view class="pz_img" v-if="sj_img2.length<9">
							<image mode="aspectFit" src="/static/images/upimg1.png" @tap="upimg" data-type="2"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="pz2_btn" @tap="sub">保存</view>
			<view class="pz2_btn pz2_btn1" @tap="sub1">下一步</view>
			<view style="width: 100%;height: 20upx;"></view>
		</block>
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
				datas: '',
				htmlReset:-1,
				order_num: '',
				bz_content: '',
				sj_img: [],
				bz_content2: '',
				sj_img2: []
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onLoad(option) {
			that = this
			this.order_num = option.order_num
			this.getdata()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			onRetry(){
				this.getdata()
			},
			getdata() {
				var that = this

				if (that.data_last) {
					return
				}

				var datas = {
					order_num: that.order_num,
					token: that.loginDatas.token,
				}
				if (this.btn_kg == 1) {
					return
				}
				this.btn_kg = 1
				//selectSaraylDetailByUserCard
				var jkurl = '/engineer/show'
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

			sub() {
				if (this.sj_img.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请上传图片'
					})
					return
				}
				if(this.btn_kg==1){
					return
				}
				this.btn_kg=1
				var datas = {
					token: that.loginDatas.token,
					type: 'under',
					order_num: that.order_num,
					photo: that.sj_img.join(','),
					comments: that.bz_content
				}
				var jkurl = "/engineer/schedule"
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
							icon: 'none',
							title: '操作成功'
						})
						console.log(datas)
						var pages = getCurrentPages(); //当前页面
						var prevPage = pages[pages.length - 2]; //上一页面
						prevPage.setData({
							//直接给上一个页面赋值
							order_new: true,
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)

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
						title: '操作失败'
					})
				})
			},
			sub1() {
				if (this.sj_img2.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请上传图片'
					})
					return
				}
				if(this.btn_kg==1){
					return
				}
				this.btn_kg=1
				var datas = {
					token: that.loginDatas.token,
					type: ' finish',
					order_num: that.order_num,
					photo: that.sj_img2.join(','),
					comments: that.bz_content2
				}
				var jkurl = "/engineer/schedule"
				service.P_post(jkurl, datas).then(res => {
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
						uni.showToast({
							icon: 'none',
							title: '操作成功'
						})
						console.log(datas)
						var pages = getCurrentPages(); //当前页面
						var prevPage = pages[pages.length - 2]; //上一页面
						prevPage.setData({
							//直接给上一个页面赋值
							order_new: true,
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)

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
						title: '操作失败'
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
			pveimg(e) {
				service.pveimg(e)
			},
			upimg(e) {
				var that = this
				var datas = e.currentTarget.dataset
				// 从相册选择1张图
				var z_count = 9 - that.sj_img.length
				if (datas.type == 2) {
					z_count = 9 - that.sj_img2.length
				}
				uni.showActionSheet({
					itemList: ['拍照', '相册'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						var sourceType = ['camera', 'album']
						if (res.tapIndex == 0) {
							sourceType = ['camera']
						} else {
							sourceType = ['album']
						}
						uni.chooseImage({
							count: z_count,
							sizeType: ['original', 'compressed'],
							sourceType: sourceType,
							success: function(res) {
								console.log(res)
								const tempFilePaths = res.tempFilePaths


								// if(datas.type==2){
								// 	that.sj_img2=that.sj_img2.concat(res.tempFilePaths).slice(0,9)
								// }else{
								// 	that.sj_img=that.sj_img.concat(res.tempFilePaths).slice(0,9)
								// }

								// return
								that.upimg1(tempFilePaths, 0, datas.type)

							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});


			},
			upimg1(imgs, i, type) {
				var that = this
				service.wx_upload(imgs[i]).then(res => {

					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(i)
						var newdata
						if (type == 2) {
							that.sj_img2.push(datas)
							newdata = that.sj_img2.length
						} else {
							that.sj_img.push(datas)
							newdata = that.sj_img.length
						}


						console.log(newdata < 9)
						console.log(i < imgs.length - 1)
						console.log(newdata < 9 && i < imgs.length - 1)
						if (newdata < 9 && i < imgs.length - 1) {
							i++
							that.upimg1(imgs, i, type)
						}
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			},
			imgdel(e) {
				var that = this
				console.log(e.currentTarget.dataset.idx)
				var datas = e.currentTarget.dataset
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定', e.currentTarget.dataset.type)
							if (datas.type == 2) {
								that.sj_img2.splice(datas.idx, 1)
							} else {
								that.sj_img.splice(datas.idx, 1)
							}

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			}

		}
	}
</script>

<style scoped>
	.pz2_box {
		width: 100%;
		padding-left: 48upx;
		padding-top: 30upx;
		padding-bottom: 40upx;
		background: #fff;
	}

	/* .jd_box{
		padding-left: 38upx;
	} */
	.jd_tit {
		font-size: 28upx;
		color: #000;
		display: flex;
		align-items: center;
		padding-bottom: 10upx;
	}

	.iconfont {
		font-size: 36upx;
		margin-left: -18upx;
		margin-right: 20upx;
	}

	.jd_msgbox {
		border-left: 1px solid #3778FE;
		padding-left: 38upx;
		padding-top: 20upx;
		margin-bottom: 18upx;
	}

	.jd_msgbox_img {
		padding-top: 20upx;
		margin-bottom: 18upx;
		display: flex;
		flex-wrap: wrap;
		padding-right: 50upx;
	}

	.pz_img {
		width: 151upx;
		height: 151upx;
		border-radius: 10upx;
		margin-right: 17upx;
		margin-bottom: 17upx;
		position: relative;
	}

	.pz_img image {
		width: 151upx;
		height: 151upx;
	}

	.pz_img .img_del {
		width: 30upx;
		height: 30upx;
		background: #FF4B4B;
		border-radius: 15upx;
		position: absolute;
		top: -10upx;
		right: -10upx;
		z-index: 10;
	}

	.jd_tit1 {
		color: #3778FE;
	}

	.jd_msgbox1 {
		border-left: 1px solid #EEEEEE;
	}

	.sg_bz {

		font-size: 28upx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
		margin-bottom: 10upx;
	}

	.sg_bz_time {
		font-size: 28upx;
		color: #BBBBBB;
	}

	.bz_view {
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		width: 100%;

	}

	.bz_view input {
		width: 100%;
		height: 60upx;
		font-size: 28upx;
	}

	.jd_tit2 {
		color: #666;
	}

	.jd_tit2 .iconfont {
		color: #BBB;
	}

	.jd_msgbox2 {
		border-left: 1px solid rgba(0, 0, 0, 0);
		margin-bottom: 0;
	}

	.jd_msgbox2 .bz_view {
		border-top: 0;
	}

	.pz2_btn {
		margin: 20upx auto;
		width: 690upx;
		height: 88upx;
		background: rgba(255, 255, 255, 0);
		border: 1px solid #3778FE;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3778FE;
	}

	.pz2_btn1 {
		border: 0;
		background: rgba(55, 120, 254, 0.1);
		color: #3778FE;
	}
</style>
