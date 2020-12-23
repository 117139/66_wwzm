<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view style="width: 100%;height: 20upx;"></view>
		<view class="pz1_box">
			<view class="pz1_tit">业主签字：</view>
			<view class="pz_imgs">
				<view v-if="sj_img.length>0" class="pz_img" v-for="(item,index) in sj_img">
					<image class="img_del" src="/static/images/img_del.png" mode="aspectFill" @tap="imgdel" :data-idx="index" data-type="1"></image>
					<!-- <image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image> -->
					<image mode="aspectFill" :src="item" @tap="pveimg" :data-src="item"></image>
				</view>
				<view class="pz_img" v-if="sj_img.length<9">
					<image src="/static/images/upimg2.png" @tap="upimg" mode="aspectFit" data-type="1 "></image>
				</view>
			</view>
			<view class="pz1_tit">工程师签字：</view>
			<view class="pz_imgs">
				<view v-if="sj_img2.length>0" class="pz_img" v-for="(item,index) in sj_img2">
					<image class="img_del" src="/static/images/img_del.png" mode="aspectFill" @tap="imgdel" :data-idx="index" data-type="2"></image>
					<!-- <image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image> -->
					<image mode="aspectFill" :src="item" @tap="pveimg" :data-src="item"></image>
				</view>
				<view class="pz_img" v-if="sj_img2.length<9">
					<image src="/static/images/upimg2.png" @tap="upimg" data-type="2" mode="aspectFit"></image>
				</view>
			</view>
		
		</view>
		<view @tap="sub"  class="pz_btn">提交</view>
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
				sj_img:[],
				sj_img2:[],
				content:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onLoad() {
			that=this
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			sub(){
				
				if(that.sj_img.length==0){
					uni.showToast({
						icon:'none',
						title:'请上传业主签字图片'
					})
					return
				}
				if(that.sj_img2.length==0){
					uni.showToast({
						icon:'none',
						title:'请上传工程师签字图片'
					})
					return
				}
				uni.showToast({
					icon:'none',
					title:'上传成功'
				})
				var datas={
					sj_img:that.sj_img.join(','),
					content:that.content
				}
				console.log(datas)
				setTimeout(()=>{
					uni.navigateBack({
						delta:2
					})
				},1000)
			},
			pveimg(e) {
				service.pveimg(e)
			},
			upimg(e) {
				var that = this
				var datas=e.currentTarget.dataset
				// 从相册选择1张图
				var z_count = 9 - that.sj_img.length
				if(datas.type==2){
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
			
								
								if(datas.type==2){
									that.sj_img2=that.sj_img2.concat(res.tempFilePaths).slice(0,9)
								}else{
									that.sj_img=that.sj_img.concat(res.tempFilePaths).slice(0,9)
								}
								
								return
								that.upimg1(tempFilePaths, 0,datas.type)
			
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			
			
			},
			upimg1(imgs, i,type) {
				var that = this
				// const imglen = that.sj_img.length
				// var newlen = Number(imglen) + Number(i)
				// if (imglen == 9) {
				// 	wx.showToast({
				// 		icon: 'none',
				// 		title: '最多可上传九张'
				// 	})
				// 	return
				// }
				// var newdata = that.sj_img
			
				uni.uploadFile({
					url: service.IPurl + '/upload', //仅为示例，非真实的接口地址
					filePath: imgs[i],
					name: 'file',
					formData: {
						token: that.loginDatas.token
					},
					success(res) {
						// console.log(res.data)
						var ndata = JSON.parse(res.data)
						if (ndata.code == 1) {
							console.log(imgs[i], i, ndata.data)
							var newdata
							if(datas.type==2){
								that.sj_img2 = that.sj_img2.push(ndata.data)
								newdata=that.sj_img2
							}else{
								that.sj_img = that.sj_img.push(ndata.data)
								newdata=that.sj_img
							}
							console.log(i)
							
							// i++
							// that.upimg(imgs, i)
							
			
							var news1 = newdata.length
							if (news1 < 9 && i < imgs.length - 1) {
								i++
								that.upimg1(imgs, i,type)
							}
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
							})
						}
					}
				})
			},
			imgdel(e) {
				var that = this
				console.log(e.currentTarget.dataset.idx)
				var datas=e.currentTarget.dataset
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定', e.currentTarget.dataset.type)
							if(datas.type==2){
								that.sj_img2.splice(e.datas.idx, 1)
							}else{
								that.sj_img.splice(e.datas.idx, 1)
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
	.pz1_box {
		width: 100%;
		background: #FFFFFF;
		padding: 0 30upx 50upx;
	}

	.pz1_tit {
		width: 100%;
		font-size: 30upx;
		color: #222;
		line-height: 88upx;
	}

	.pz_imgs {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 30upx;
		border-bottom: 1px solid #eee;
	}

	.pz_img {
		width: 180upx;
		height: 140upx;
		border-radius: 10upx;
		margin-right: 15upx;
		margin-bottom: 15upx;
		position: relative;
	}

	.pz_img image {
		width: 180upx;
		height: 140upx;
	}

	.pz_img .img_del {
		width: 30upx;
		height: 30upx;
		/* background: #FF4B4B; */
		border-radius: 15upx;
		position: absolute;
		top: -10upx;
		right: -10upx;
		z-index: 10;
	}
	.pz1_cont{
		width: 100%;
		height: 200upx;
		background: #fff;
		border: 1px solid #EEEEEE;
		padding: 20upx;
		line-height: 40upx;
		font-size: 30upx;
	}
	.cont_num{
		margin-top: 15upx;
		margin-bottom: 15upx;
		font-size: 24upx;
		color: #666;
	}
	.pz_tip{
		font-size: 24upx;
		color: #000;
	}
	.pz_tip .iconfont{
		color: #3778FE;
		font-size: 24upx;
		margin-right: 4upx;
	}
	.pz_tip_tit{
		color: #999;
	}
	.pz_btn{
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
</style>
