<template>
	<view style="min-height: 100vh;background-color: #fff;">
		<view style="width: 100%;height: 20upx;background: #fafafa;"></view>
		<view class="order_box">
			<view class="order_main">
				<view  v-if="type==1" class="order_status">待结单</view>
				<view  v-if="type!=1" class="order_status" style="color: #4793FA;">施工中</view>
				<view class="order_li">
					<view class="order_li_tit">业主名称</view>
					<view class="order_li_msg">
						刘也
					</view>
				</view>
				<view class="order_li">
					<view class="order_li_tit">业主联系电话</view>
					<view class="order_li_msg">
						18300000000
					</view>
				</view>
				<view class="order_li" @tap="map_dp()">
					<view class="order_li_tit">业主地址</view>
					<view class="order_li_msg" >
						<view class="flex_1">新天地世纪百货写字楼16-26号</view>
						<view class="flex_0 iconfont icondizhizhuanhuan" style="opacity: 1;color: #222;"></view>
					</view>
				</view>
				<view class="order_li">
						<view class="order_li_tit">套内详单</view>
						<view class="order_li_msg">
							
							<scroll-view class="weixin_dblist" scroll-x="true" bindscroll="scroll" style="width: 100%">
								
									<view v-for="(item,index) in taocan_list" class="taocan_li">
										<image class="taocan_li_img" :src="getimg('/static/images/business/tc_img_03.png')" mode="aspectFit"></image>
										<view class="taocan_li_msg oh2">{{item.name}}</view>
										<view class="taocan_li_pri"><text style="font-size: 18upx;">￥</text>998</view>
									</view>
							</scroll-view>
						</view>
				</view>
				<view class="order_li">
					<view class="order_li_tit">负责人</view>
					<view class="order_li_msg">
						刘明
					</view>
				</view>
				<view class="order_li">
					<view class="order_li_tit">负责人联系方式</view>
					<view class="order_li_msg">
						15963520110
					</view>
				</view>
				<view class="order_li">
						<view class="order_li_tit">时间</view>
						<view class="order_li_msg">
							2020/10/10
						</view>
				</view>
				<view class="order_li">
						<view class="order_li_tit">合同</view>
						<view class="order_li_msg">
							中国房屋安装合同
						</view>
				</view>
				<view v-if="type!=1" class="order_li">
					<view class="order_li_tit">施工团队</view>
					<view class="order_li_msg">
						刘三珠施工团队
					</view>
				</view>
				<view v-if="type!=1" class="order_li">
					<view class="order_li_tit">施工团队联系方式</view>
					<view class="order_li_msg">
						1564283332
					</view>
				</view>
				<view v-if="type!=1" class="order_li">
					<view class="order_li_tit">客户要求</view>
					<view class="order_li_msg">
						比较着急，三天之内必须完成
					</view>
				</view>
				<view class="order_bottom"></view>
			</view>
		</view>
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
				taocan_list:[
					{
						name:'Mini 主机',
						id:1
					},
					{
						name:'门窗传感器',
						id:2
					},
					{
						name:'智能可燃气体报警器多功能更安全快速防',
						id:3
					},
					{
						name:'智能门锁 T1C',
						id:4
					},
					{
						name:'Mini 主机',
						id:1
					},
					{
						name:'门窗传感器',
						id:2
					},
					{
						name:'智能可燃气体报警器多功能更安全快速防',
						id:3
					},
					{
						name:'智能门锁 T1C',
						id:4
					},
				],
				taocan_index:0,
				fzr_name:'',
				fzr_tel:'',
				date:currentDate,
				hetong_list:[
					{
						name:'合同1',
						id:1
					},
					{
						name:'合同2',
						id:2
					},
					{
						name:'合同3',
						id:3
					},
					{
						name:'合同4',
						id:4
					},
				],
				hetong_index:0,
				yz_yaoqiu:''
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
			startDate() {
					return this.getDate('start');
			},
			endDate() {
					return this.getDate('end');
			}
		},
		onLoad(option){
			that=this
			this.type=option.type||0
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			getimg(e){
				return service.getimg(e)
			},
			map_dp(data) {
				let that = this
				let plugin = requirePlugin('routePlan');
				let key = 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'; //使用在腾讯位置服务申请的key
				let referer = '万屋智能'; //调用插件的app的名称
				let endPoint = JSON.stringify({ //终点
					'name': 'dd',
					'latitude':  parseFloat('38.912884929705875')||'',
					'longitude':parseFloat('115.37814606640623')||'',
				});
				console.log(endPoint)
				uni.navigateTo({
					url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=1'
				});
			},
			
			sub(){
				
				if(!this.yz_name){
					uni.showToast({
						icon:'none',
						title:'请填写业主姓名'
					})
					return
				}
				if(!this.yz_tel){
					uni.showToast({
						icon:'none',
						title:'请填写业主联系方式'
					})
					return
				}
				if(!this.yz_address){
					uni.showToast({
						icon:'none',
						title:'请填写业主地址'
					})
					return
				}
				if(!this.fzr_name){
					uni.showToast({
						icon:'none',
						title:'请填写负责人姓名'
					})
					return
				}
				if(!this.fzr_tel){
					uni.showToast({
						icon:'none',
						title:'请填写负责人联系方式'
					})
					return
				}
				if(!this.yz_yaoqiu){
					uni.showToast({
						icon:'none',
						title:'请填写业主要求'
					})
					return
				}
				var datas={
					yz_name:that.yz_name,
					yz_tel:that.yz_tel,
					yz_address:that.yz_address,
					taocan_list:that.taocan_list[that.taocan_index].id||0,
					fzr_name:that.fzr_name,
					fzr_tel:that.fzr_tel,
					date:that.date,
					hetong_list:that.hetong_list[that.hetong_index].id||0,
					yz_yaoqiu:that.yz_yaoqiu
				}
				console.log(datas)
				uni.showToast({
					icon:'none',
					title:'提交成功'
				})
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},1000)
			},
			bindPickerChange: function(e) {
					console.log('picker发送选择改变，携带值为', e.currentTarget.dataset)
					console.log('picker发送选择改变，携带值为', e.target.value)
					var datas=e.currentTarget.dataset
					if(datas.type==1){ //套餐
						this.taocan_index = e.target.value
					}
					if(datas.type==2){ //时间
						this.date = e.target.value
					}
					if(datas.type==3){ //合同
						this.hetong_index = e.target.value
					}
					
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
