<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view style="width: 100%;height: 20upx;"></view>
		<view class="pz1_box">
			<view class="pz1_tit dis_flex aic ju_b" style="border-bottom: 1px solid #eee;">
				产品名称*
				<input class="flex_1" type="text" placeholder="请填写" v-model="cp_name">
			</view>
			<view class="pz1_tit">故障描述*</view>
			<textarea class="pz1_cont" value="" placeholder="请输入内容" v-model="content" maxlength="200"/>
			<view class="dis_flex aic ju_b cont_num">
				<view></view>
				<view>{{content.length}}/200</view>
			</view>
			<view class="pz1_tit">图片上传</view>
			<view class="pz_imgs">
				<view class="pz_img" v-for="(item,index) in sj_img">
					<image class="img_del" src="../../static/images/img_del.png" mode="aspectFill" @tap="imgdel" :data-idx="index"></image>
					<!-- <image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image> -->
					<image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image>
				</view>
				<view class="pz_img" v-if="sj_img.length<9">
					<image mode="aspectFill" :src="getimg('/static/images/upimg1.png')" @tap="upimg"></image>
				</view>
			</view>
		</view>
		<view @tap="sub"  class="pz_btn">提交</view>
		<view style="width: 100%;height: 10upx;"></view>
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
				cp_name:'',
				sj_img:[],
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
				if(!this.cp_name){
					uni.showToast({
						icon:'none',
						title:'请填写产品名称'
					})
					return
				}
				if(that.content.length==0){
					uni.showToast({
						icon:'none',
						title:'请填写故障描述*'
					})
					return
				}
				// if(that.sj_img.length==0){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请上传图片'
				// 	})
				// 	return
				// }
				
				var datas={
					token:that.loginDatas.token,
					goods_name:this.cp_name,
					photo:that.sj_img.join(','),
					hitch_content:that.content
				}
				var jkurl='/aftersale/create'
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
							icon:'none',
							title:'操作成功'
						})
						console.log(datas)
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
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
			pveimg(e) {
				service.pveimg(e)
			},
			getimg(img) {
				return service.getimg(img)
			},
			upimg() {
				var that = this
				// 从相册选择1张图
				var z_count = 9 - that.sj_img.length
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

								const imglen = that.sj_img.length

								if (imglen == 9) {
									wx.showToast({
										icon: 'none',
										title: '最多可上传九张'
									})
									return
								} else {
									// that.sj_img=that.sj_img.concat(res.tempFilePaths).slice(0,9)
								}
								// return
								that.upimg1(tempFilePaths, 0)

							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});


			},
			upimg1(imgs, i) {
				var that = this
				const imglen = that.sj_img.length
				var newlen = Number(imglen) + Number(i)
				if (imglen == 9) {
					wx.showToast({
						icon: 'none',
						title: '最多可上传九张'
					})
					return
				}
				var newdata = that.sj_img
				service.wx_upload(imgs[i]).then(res => {

					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(i)
						that.sj_img.push(datas)
						
						var news1 = that.sj_img.length
						if (news1 < 9 && i < imgs.length - 1) {
							i++
							that.upimg1(imgs, i)
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
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定', e.currentTarget.dataset.type)
							that.sj_img.splice(e.currentTarget.dataset.idx, 1)

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
		padding: 0 30upx 20upx;
	}

	.pz1_tit {
		width: 100%;
		font-size: 30upx;
		color: #222;
		line-height: 88upx;
	}
	.pz1_tit input{
		height: 88upx;
		text-align: right;
		font-size: 30upx;
	}
	.pz_imgs {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 30upx;
		/* border-bottom: 1px solid #eee; */
	}

	.pz_img {
		width: 220upx;
		height: 220upx;
		border-radius: 10upx;
		margin-right: 15upx;
		margin-bottom: 15upx;
		position: relative;
	}
	.pz_img:nth-child(3n){
		margin-right: 0;
	}
	.pz_img image {
		width: 220upx;
		height: 220upx;
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
		background: #11A078;
		border-radius: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		margin: 140upx auto;
	}
</style>
