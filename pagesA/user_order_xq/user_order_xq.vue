<template>
	<view style="min-height: 100vh;background: #fafafa;">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			
				<view class="order_status dis_flex aic ju_b">
					<view v-if="datas.status==1" style="font-size: 30upx;">待处理</view>
					<view v-else-if="datas.status==2"  style="font-size: 30upx;color: #F34826;">施工中</view>
					<view v-else-if="datas.status==3"  style="font-size: 30upx;color: #F34826;">待签字</view>
					<view v-else  style="font-size: 30upx;color:#52B0FF;">已结束</view>
					<view style="font-size: 24upx;color: #222;">{{datas.order_num}}</view>
				</view>
				<view class="index_li_d1">
					<!-- <image class="index_tx" :src="getimg('/static/images/tx_m2.jpg')" lazy-load="true" mode="aspectFill"></image> -->
					<view class="index_yz">施工师傅：<text>{{datas.engineer_name?datas.engineer_name:'暂无'}}</text></view>
					<view v-if="datas.engineer_phone" @tap="call" :data-tel="datas.engineer_phone" class="iconfont iconphone" style="color: #11A078;"></view>
				</view>
				<view class="order_li_tit">
					
					<text>安防套餐</text>
					<text style="font-size: 30upx;color: #F4691A;">总价:{{datas.total_money?datas.total_money*1:0}}</text>
					<text style="font-size: 30upx;color: #F4691A;">成交金额:{{datas.final_money?datas.final_money*1:0}}</text>
				</view>
				<view class="order_li_msg">
				
					<scroll-view class="weixin_dblist" scroll-x="true" bindscroll="scroll" style="width: 100%">
				
						<view v-for="(item,index) in datas.goods_list" class="taocan_li" @tap="jump" :data-url="'/pagesA/user_goods_xq/user_goods_xq?id='+item.id">
							<image class="taocan_li_img" :src="getimg(item.cover)" mode="aspectFit"></image>
							<view class="taocan_li_msg oh2">{{item.title}}</view>
							<view class="taocan_li_pri"><text style="font-size: 18upx;">￥</text>{{item.price}}</view>
						</view>
					</scroll-view>
				</view>
				
				<view class="pz2_box">
					<view class="pz2_box_tit">施工进度</view>
					<block v-if="datas.before">
						<view class="jd_tit">
							<text class="iconfont iconxingzhuangjiehe"></text>
							<text>施工前</text>
						</view>
						<view class="jd_msgbox">
							<view v-if="datas.before.comments" class="sg_bz">{{datas.before.comments}}</view>
							<view class="jd_msgbox_img">
								<view class="pz_img" v-for="(item,index) in getimgarr(datas.before.photo)">
									<image :src="item" mode="aspectFill"  @tap="pveimg" :data-src="item" ></image>
								</view>
							</view>
						</view>
					</block>
					<view v-else class="zanwu">暂无数据</view>
					
					<block v-if="datas.under">
						<view v-if="datas.under.length>0" class="jd_tit jd_tit1">
							<text class="iconfont iconduigou"></text>
							<text>施工中</text>
						</view>
						
						<view v-if="datas.under.length>0" class="jd_msgbox jd_msgbox1">
							<block v-for="(item,index) in datas.under">
								<view class="sg_bz" v-if="item.comments">{{item.comments}}</view>
								<view class="sg_bz_time">{{item.created_at}}</view>
								<view class="jd_msgbox_img">
									<view class="pz_img" v-for="(item1,index1) in getimgarr(item.photo)">
										<image :src="item1" mode="aspectFill"  @tap="pveimg" :data-src="item1" ></image>
									</view>
									
								</view>
							</block>
							
						</view>
					</block>
					<block v-if="datas.finish">
						<view  class="jd_tit jd_tit2">
							<text class="iconfont iconduigou"></text>
							<text>待签字</text>
						</view>
						
						<view class="jd_msgbox jd_msgbox1">
							
								<view v-if="datas.finish.comments" class="sg_bz">{{datas.finish.comments}}</view>
								<view class="sg_bz_time">{{datas.finish.created_at}}</view>
								<view class="jd_msgbox_img">
									<view class="pz_img" v-for="(item1,index1) in getimgarr(datas.finish.photo)">
										<image :src="item1" mode="aspectFill"  @tap="pveimg" :data-src="item1" ></image>
									</view>
									
								</view>
							
						</view>
					</block>
					<block v-if="datas.done">
						<view  class="jd_tit jd_tit2">
							<text class="iconfont iconduigou"></text>
							<text>已签字</text>
						</view>
						
						<view class="jd_msgbox jd_msgbox1">
							
								<view v-if="datas.done.comments" class="sg_bz">{{datas.finish.comments}}</view>
								<view class="sg_bz_time">{{datas.done.created_at}}</view>
								<view class="jd_msgbox_img">
									<view class="pz_img">
										<image :src="getimg(datas.done.owner_sign_photo)" mode="aspectFill"  @tap="pveimg" :data-src="getimg(datas.done.owner_sign_photo)" ></image>
									</view>
									<view class="pz_img" >
										<image :src="getimg(datas.done.engineer_sign_photo)" mode="aspectFill"  @tap="pveimg" :data-src="getimg(datas.done.engineer_sign_photo)" ></image>
									</view>
									
								</view>
							
						</view>
					</block>
					
					
					
				</view>
				
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
				id:'',
				bz_content:'',
				sj_img:[],
				bz_content2:'',
				sj_img2:[],
				datas: '',
				htmlReset: -1,
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
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			onRetry(){
				this.getdata()
			},
			getdata() {
				var that =this
				var jkurl = '/user/rate'
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
				console.log('imgarr------------------------------------>')
				console.log(img)
				console.log(service.getimgarr(img))
				return service.getimgarr(img)
			},
			pveimg(e){
				service.pveimg(e)
			},
			call(e){
				service.call(e)
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
			},
			jump(e) {
				var that = this
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
					}, 1000)
				}
			
				service.jump(e)
			},
		}
	}
</script>

<style scoped>
	.order_status{
		width: 100%;
		height: 100upx;
		padding: 0 30upx;
		background: #fff;
		margin-bottom: 20upx;
	}
	.index_li_d1{
		display: flex;
		align-items: center;
		width: 100%;
		height: 85upx;
		padding: 0 30upx;
		/* border-bottom: 1px solid #EEEEEE; */
		background: #fff;
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
	.order_li_tit{
		line-height: 90upx;
		font-size: 34upx;
		font-family: PingFang;
		font-weight: bold;
		color: #000000;
		padding: 0 30upx;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.weixin_dblist {
		width: 100%;
		height: 300upx;
		white-space: nowrap;
		padding-top:0;
		background: #fff;margin-bottom: 20upx;
	}
	
	.taocan_li {
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
	
	.taocan_li_img {
		width: 152upx;
		height: 152upx;
		margin-bottom: 15upx;
	}
	
	.taocan_li_msg {
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
	
	.taocan_li_pri {
		color: #F4691A;
		font-size: 22upx;
	}
	
	
	
 .pz2_box{
 	width: 100%;
 	padding-left: 48upx;
 	/* padding-top: 30upx; */
 	padding-bottom: 40upx;
 	background: #fff;
 }
 .pz2_box_tit{
	 width: 100%;
	 border-bottom: 1px solid #eee;
	 height: 74upx;
	margin-left: -18upx;
	display: flex;
	align-items: center;
	margin-bottom: 40upx;
	font-size: 26upx;
	color: #111;
 }
 /* .jd_box{
 	padding-left: 38upx;
 } */
 .jd_tit{
 	font-size: 28upx;
 	color: #11A078;
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
 	/* border-left: 1px solid #3778FE; */
 	border-left: 1px solid #eee;
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
 	color: #222222;
 }
 .jd_tit2{
	 color: #52B0FF;
 }
 .jd_msgbox1{
 	border-left: 1px solid #EEEEEE;
 }
 .sg_bz{
 	
 	font-size: 28upx;
 	font-family: PingFang;
 	/* font-weight: bold; */
 	color: #333333;
 	margin-bottom: 10upx;
	padding-right: 40upx;
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
 /* .jd_tit2{
 	color: #666;
 }
 .jd_tit2 .iconfont{
 	color: #BBB;
 } */
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
