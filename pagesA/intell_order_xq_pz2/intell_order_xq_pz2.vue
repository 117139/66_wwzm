<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view style="width: 100%;height: 20upx;"></view>
		<view class="pz2_box">
			<view class="jd_tit">
				<text class="iconfont iconduigou"></text>
				<text>施工前</text>
			</view>
			<view class="jd_msgbox">
				<view class="sg_bz">施工前备注</view>
				<view class="jd_msgbox_img">
					<view class="pz_img" v-for="(item,index) in 6">
						<image src="/static/images/tx_m2.jpg" mode="aspectFill"  @tap="pveimg"
						data-src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1306508493,2006189766&fm=26&gp=0.jpg" ></image>
					</view>
				</view>
			</view>
			<view class="jd_tit jd_tit1">
				<text class="iconfont iconxingzhuangjiehe"></text>
				<text>施工中</text>
			</view>
			
			<view class="jd_msgbox jd_msgbox1">
				<block v-for="(item,index) in 3">
					<view class="sg_bz">今天干了点这个</view>
					<view class="sg_bz_time">2020.06.08 12:00</view>
					<view class="jd_msgbox_img">
						<view class="pz_img" v-for="(item,index) in 6">
							<image src="/static/images/tx_m2.jpg" mode="aspectFill"  @tap="pveimg"
							data-src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1306508493,2006189766&fm=26&gp=0.jpg" ></image>
						</view>
						
					</view>
				</block>
				<view class="bz_view">
					<input type="text" placeholder="备注（选填）" v-model="bz_content">
				</view>
					<view class="jd_msgbox_img">
						<view class="pz_img" v-for="(item,index) in sj_img">
							<image class="img_del" src="/static/images/img_del.png" mode="aspectFill" @tap="imgdel" :data-idx="index" data-type="1"></image>
							<!-- <image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image> -->
							<image mode="aspectFill" :src="item" @tap="pveimg" :data-src="item"></image>
						</view>
						<view class="pz_img" v-if="sj_img.length<9">
							<image mode="aspectFill" src="/static/images/upimg1.png" @tap="upimg"  data-type="1"></image>
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
							<image class="img_del" src="/static/images/img_del.png" mode="aspectFill" @tap="imgdel" :data-idx="index" data-type="2"></image>
							<!-- <image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image> -->
							<image mode="aspectFill" :src="item" @tap="pveimg" :data-src="item"></image>
						</view>
						<view class="pz_img" v-if="sj_img2.length<9">
							<image mode="aspectFill" src="/static/images/upimg1.png" @tap="upimg" data-type="2"></image>
						</view>
					</view>
			</view>
		</view>
		<view class="pz2_btn" @tap="sub">保存</view>
		<view class="pz2_btn pz2_btn1" @tap="sub1">下一步</view>
		<view style="width: 100%;height: 20upx;"></view>
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
				bz_content:'',
				sj_img:[],
				bz_content2:'',
				sj_img2:[]
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
				if(this.sj_img.length==0){
					uni.showToast({
						icon:'none',
						title:'请上传图片'
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
			sub1(){
				if(this.sj_img2.length==0){
					uni.showToast({
						icon:'none',
						title:'请上传图片'
					})
					return
				}
				uni.showToast({
					icon:'none',
					title:'上传成功'
				})
				var datas={
					sj_img:that.sj_img2.join(','),
					content:that.content2
				}
				console.log(datas)
				setTimeout(()=>{
					uni.navigateBack({
						delta:2
					})
				},1000)
			},
			getimg(img) {
				console.log(service.getimg(img))
				return service.getimg(img)
			},
			pveimg(e){
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
	.pz2_box{
		width: 100%;
		padding-left: 48upx;
		padding-top: 30upx;
		padding-bottom: 40upx;
		background: #fff;
	}
	/* .jd_box{
		padding-left: 38upx;
	} */
	.jd_tit{
		font-size: 28upx;
		color: #000;
		display: flex;
		align-items: center;
		padding-bottom: 10upx;
	}
	.iconfont{
		font-size: 36upx;
		margin-left: -18upx;
		margin-right: 20upx;
	}
	.jd_msgbox{
		border-left: 1px solid #3778FE;
		padding-left: 38upx;
		padding-top: 20upx;
		margin-bottom: 18upx;
	}
	.jd_msgbox_img{
		padding-top: 20upx;
		margin-bottom: 18upx;
		display: flex;
		flex-wrap: wrap;
		padding-right: 50upx;
	}
		
	.pz_img{
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
	.jd_tit1{
		color: #3778FE;
	}
	.jd_msgbox1{
		border-left: 1px solid #EEEEEE;
	}
	.sg_bz{
		
		font-size: 28upx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
		margin-bottom: 10upx;
	}
	.sg_bz_time{
		font-size: 28upx;
		color: #BBBBBB;
	}
	.bz_view{
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		width: 100%;
		
	}
	.bz_view input{
		width: 100%;
		height: 60upx;
		font-size: 28upx;
	}
	.jd_tit2{
		color: #666;
	}
	.jd_tit2 .iconfont{
		color: #BBB;
	}
	.jd_msgbox2{
		border-left: 1px solid rgba(0,0,0,0);
		margin-bottom: 0;
	}
	.jd_msgbox2 .bz_view{
		border-top: 0;
	}
	.pz2_btn{
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
	.pz2_btn1{
		border: 0;
		background: rgba(55, 120, 254, 0.1);
		color: #3778FE;
	}
</style>
