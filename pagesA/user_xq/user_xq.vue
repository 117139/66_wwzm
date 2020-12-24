<template>
	<view style="min-height: 100vh;background: #fff;">
		<view class="xq_box">
			<view class="xq_tit">客户的实际装修美图</view>
			<view class="li_user ">
				<image class="flex_0" :src="getimg('/static/images/tx_m.jpg')" mode="aspectFill"></image>
				<text class="oh1">智能小管家</text>
			</view>
			<view class="xq_img">
				<image :src="getimg('/static/images/user/banner_01.jpg')" mode="widthFix" lazy-load="true"></image>
				<image :src="getimg('/static/images/user/banner_01.jpg')" mode="widthFix" lazy-load="true"></image>
				<image :src="getimg('/static/images/user/banner_01.jpg')" mode="widthFix" lazy-load="true"></image>
			</view>
			<view class="xq_pl_tit">评论</view>
			<view class="pl_list">
				<view class="pl_li" v-for="(item,index) in datas">
					<image class="pl_li_tx" :src="getimg('/static/images/tx_m.jpg')" mode="aspectFill"></image>
					<view class="pl_li_msg">
						<view class="pl_user">Uzi</view>
						<view class="pl_time">2020.04.03</view>
						<view class="pl_text">真棒，我也想住上这样的家，期待我的家能装 成这样</view>
						<view class="pl_num" @tap="pl_show(item)">1条评论<text class="iconfont iconduobianxing"></text></view>
					</view>
				</view>
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<!-- <view v-if="data_last" class="data_last">我可是有底线的哟~~~</view> -->
				<view class="data_last">我可是有底线的哟~~~</view>
			</view>
		</view>
		<view class="pl_bbox">
			<view class="xq_cz">
				<!-- <input type="text" value="" placeholder="请输入您的评论" v-model="content" /> -->
				<view class="xq_cz_int" @tap="tk_show=true">请输入您的评论</view>
				<view class="cz_li">
					<button type="default" open-type="share" :data-id="index"></button>
					<text class="iconfont iconfenxiang1"></text>
				</view>
				<!-- <view class="cz_li" @tap="shoucang">
					<text v-if="shoucang_type" class="iconfont iconshoucang1" style="color: #F4691A;"></text>
					<text v-else class="iconfont iconshoucang"></text>
					<text class="cz_num">{{shoucang_num}}</text>
				</view> -->
				<view class="cz_li" @tap="zan">
					<text v-if="zan_type" class="iconfont iconzan3" style="color: #F4691A;"></text>
					<text v-else class="iconfont iconzan2"></text>
					<text class="cz_num">{{zan_num}}</text>
				</view>
			</view>
		</view>

		<view class="pl_bbox" style="opacity: 0;position: relative;z-index: 0;">
			<view class="xq_cz">
				<view class="xq_cz_int" >请输入您的评论</view>
			</view>
		</view>


		<view v-if="tk_show" class="tk_box dis_flex_c" @touchmove.stop.prevent='test'>
			<view class="tk_off" @tap="tk_show=false"></view>
			<view class="tk_main" :style="jt_h">
				<!-- <view class="tk_main"> -->
				<view class="tk_tit">
					<!-- 添加联系人 -->
					<view @tap="tk_show=false"><text class="iconfont iconcuowu"></text></view>
				</view>
				<view class="tk_sq_box">
					<textarea value="" placeholder="请输入您的评论" v-model="content" cursor-spacing="200" confirm-type='done' @confirm="new_sub" :show-confirm-bar='false'/>

				</view>
				<view class="sub_btn" @tap="new_sub">发布</view>
			</view>
		</view>
		<view v-if="tk_show1" class="tk_box dis_flex_c" @touchmove.stop.prevent='test'>
			<view class="tk_off" @tap="tk_show1=false"></view>
			<view class="tk_main" >
				<!-- <view class="tk_main"> -->
				<view class="tk_tit">
					<!-- 添加联系人 -->
					<view @tap="tk_show1=false"><text class="iconfont iconcuowu"></text></view>
				</view>
				<view class="tk_sq_box">
					<scroll-view class="tk_sq_box_scroll" scroll-y="true" @scrolltolower="getpl_hf">
						<view class="pl_li" style="border-bottom: 0;">
							<image class="pl_li_tx" :src="getimg('/static/images/tx_m.jpg')" mode="aspectFill"></image>
							<view class="pl_li_msg">
								<view class="pl_user">Uzi</view>
								<view class="pl_time">2020.04.03</view>
								<view class="pl_text">真棒，我也想住上这样的家，期待我的家能装 成这样</view>
							</view>
						</view>
						<view class="pl_hf_tit">回复(10)</view>
						<view class="pl_list">
							
							<view class="pl_li" v-for="(item,index) in datas">
								<image class="pl_li_tx" :src="getimg('/static/images/tx_m.jpg')" mode="aspectFill"></image>
								<view class="pl_li_msg">
									<view class="pl_user">Uzi</view>
									<view class="pl_time">2020.04.03</view>
									<view class="pl_text">真棒，我也想住上这样的家，期待我的家能装 成这样</view>
								</view>
							</view>
							<view v-if="datas.length==0" class="zanwu">暂无数据</view>
							<!-- <view v-if="data_last" class="data_last">我可是有底线的哟~~~</view> -->
							<view class="data_last">我可是有底线的哟~~~</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that =this
	export default {
		data() {
			return {
				index:'',
				content:'',
				datas:[1,1,1,1,1,1,1,1,1,1,1],
				tk_show:false,
				tk_show1:false,
				shoucang_type:false,
				shoucang_num:33,
				zan_type:false,
				zan_num:33,
				Height:0
			}
		},
		onLoad(option) {
			that =this
			this.id=option.id
			uni.onKeyboardHeightChange(res => {
			  console.log(res.height)
				this.Height=res.height
			})
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
			
			jt_h(){
				var Height1=0
				if(this.tk_show){
					Height1=this.Height
				}else{
					Height1=0
				}
				return `transform: translate3d(0, -${Height1}px, 0);`
			},
		},
		
		onShareAppMessage(res) {
			wx.showShareMenu({
			  withShareTicket: true,
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			if (res.from === 'button') {
				console.log(res.target.dataset.type)
				// this.setData({
				// 	sharetype:'share'
				// })
			}
			// return {
			//   title: '万屋智能',
			//   path: '/pagesA/user_xq/user_xq?type=fwcz&id='+res.target.dataset.id,
			//   success: function (res) {
			//     console.log('成功', res)
			//   }
			// }
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			test(){},
			shoucang(){
				this.shoucang_type=!this.shoucang_type
				if(this.shoucang_type){
					this.shoucang_num++
				}else{
					this.shoucang_num--
				}
			},
			zan(){
				this.zan_type=!this.zan_type
				if(this.zan_type){
					this.zan_num++
				}else{
					this.zan_num--
				}
			},
			pl_show(item){
				this.tk_show1=true
			},
			getpl_hf(){
				console.log('触底')
			},
			new_sub(){
				if(!this.content){
					uni.showToast({
						icon:'none',
						title:'请输入您的评论'
					})
					return
				}
				var datas={
					token: that.loginDatas.token,
					content:that.content
				}
				that.tk_show=false
				that.content=''
				uni.showToast({
					icon:'none',
					title:'提交成功'
				})
				return
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.count
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
							
						that.datas = datas
							
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
						title: '获取数据失败'
					})
				})
			},
			getdata() {
				var that =this
				var jkurl = '/data/refer_record'
				var datas = {
					token: that.loginDatas.token||'',
					id:that.id
				}
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.count
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
			
						that.datas = datas
			
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
						title: '获取数据失败'
					})
				})
			},
			
			getimg(img) {
				return service.getimg(img)
			},
		}
	}
</script>

<style scoped>
	.xq_box{
		width: 100%;
		padding: 0 30upx;
	}
	.xq_tit{
		font-size: 34upx;
		color: #222;
		line-height: 70upx;
	}
	.li_user {
		font-size: 24upx;
		color: #666;
		display: flex;
		align-items: center;
		margin-bottom: 30upx;
	}
	
	.li_user image {
		width: 40upx;
		height: 40upx;
		border-radius: 20upx;
		margin-right: 10upx;
	}
	.xq_img image{
		width: 100%;
	}
	.xq_img image+image{
		margin-top: 23upx;
	}
	.xq_img{
		margin-bottom: 48upx;
	}
	
	.xq_pl_tit{
		font-size: 34upx;
		color: #11a078;
		padding-left: 22upx;
		line-height: 35upx;
		position: relative;
		padding-bottom: 22upx;
	}
	.xq_pl_tit::before{
		content: '';
		position: absolute;
		top: 1upx;
		left: 0;
		width: 4upx;
		height: 33upx;
		background: #11A078;
	}
	.pl_li{
		width: 100%;
		border-bottom: 1px solid #EDEDED;
		padding: 30upx 0;
		display: flex;
		align-items: flex-start;
	}
	.pl_li_tx{
		width: 71upx;
		height: 71upx;
		border-radius: 50%;
		margin-right: 16upx;
		flex: none;
	}
	.pl_li_msg{
		flex: 1;
	}
	.pl_user{
		font-size: 30upx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
		line-height: 45upx;
	}
	.pl_time{
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		line-height: 30upx;
	}
	.pl_text{
		line-height: 50upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}
	.pl_bbox{
		width: 100%;
		padding-bottom: 50upx;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		z-index: 100;
	}
	.xq_cz{
		width: 100%;
		height: 95upx;
		
		box-shadow: 0px -3upx 10upx 0px rgba(0, 0, 0, 0.1);
		padding: 14upx 30upx;
		display: flex;
		align-items: center;
	}
	.xq_cz input{
		width: 436upx;
		height: 67upx;
		background: #F6F7F9;
		border-radius: 4upx;
		padding: 0 30upx;
		font-size: 24upx;
	}
	.xq_cz_int{
		/* width: 436upx; */
		flex: 1;
		height: 67upx;
		background: #F6F7F9;
		border-radius: 4upx;
		padding: 0 30upx;
		font-size: 24upx;
		display: flex;
		align-items: center;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
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
		right: -18upx;
	}
	.pl_num{
		font-size: 24upx;
		color: #333;
		display: flex;
		align-items: center;
	}
	.pl_num text{
		font-size: 14upx;
		margin-left: 10upx;
	}
	
	
	
	.tk_box{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 900;
		background: rgba(0,0,0,.5);
		align-items: stretch;
	}
	.tk_off{
		flex: 1;
	}
	.xmfwb_box image{
		max-width: 100%;
	}
	
	
	
	.tk_main{
		width: 100%;
		/* height: 647upx; */
		background: #FFFFFF;
		border-radius: 15upx 15upx 0px 0px;
		transform: translate3d(0, 0, 0);
		transition: all .15s;
	}
	.tk_tit{
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #454545;
		position: relative;
		border-bottom: 1px solid #E7E7E7;
	}
	.tk_tit view{
		position: absolute;
		top: 0;
		right: 30upx;
		height: 100upx;
		display: flex;
		align-items: center;
		
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
	}
	.tk_sq_box{
		width: 100%;
		padding: 0 30upx 0;
		/* border-bottom: 1px solid #E7E7E7; */
	}
	.tk_sq_box_scroll{
		height: 70vh;
	}
	.tk_sq_box textarea{
		width: 100%;
		padding: 30upx;
		height: 250upx;
	}
	.sub_btn{
		width: 667upx;
		height: 77upx;
		background: #11A078;
		border-radius: 4upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		margin: 38upx auto;
		color: #FFFFFF;
	}
	.pl_hf_tit{
		width: 100%;
		display: flex;
		align-items: center;
		height: 100upx;
		border-bottom: 2px solid #eee;
	}
</style>
