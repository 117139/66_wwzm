<template>
	<view style="min-height: 100vh; background: #fff;">
		<view class="al_xq">
			<view class="al_tit">{{datas.title}}</view>
			<view v-if="type==2" class="order_bqs">
				<view v-if="datas.tag" class="order_bq" v-for="(item1,index1) in getarr(datas.tag)">{{item1}}</view>
			</view>
			
			<view class="xq_img">
				<image v-for="(item,index) in getimgarr(datas.photo)" :src="getimg(item)" mode="widthFix" lazy-load="true"  @tap="pveimg" :data-src="getimg(item)"></image>
			</view>
			<view class="xq_xq" v-html="get_fwb(datas.content)"></view>
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
				type:'',
				id:'',
				datas:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data']),
		},
		onPullDownRefresh() {
			this.getdata()
		},
		onLoad(option) {
			this.type=option.type
			this.id=option.id
			this.getdata()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			getdata() {
				var that =this
				var jkurl = '/data/refer_record'
				var datas
				if(this.type==2){
					datas = {
						token: that.loginDatas.userToken || '',
						id:this.id,
						type: 'case',
					}
					jkurl = '/caseinfo/list'
				}else{
					datas = {
						token: that.loginDatas.userToken || '',
						id:this.id,
						type: 'info',
					}
					jkurl = '/caseinfo/list'
				}
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
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
			pveimg(e){
				service.pveimg(e)
			},
			getimgarr(img) {
				// console.log(service.getimgarr(img))
				return service.getimgarr(img)
			},
			getarr(str){
				if(!str){
					return
				}				
				console.log(str)
				str=str.split(',')
				console.log(str)
				return str
			},
			get_fwb(str){
				return service.get_fwb(str)
			},
		}
	}
</script>

<style scoped>
	.al_xq{
		width: 100%;
		padding: 20upx 30upx;
	}
	.al_tit{
		font-size: 36upx;
		font-family: PingFang;
		font-weight: bold;
		color: #222222;
		margin-bottom: 30upx;
	}
	.order_bqs{
		margin-bottom: 25upx;
		display: flex;
		flex-wrap: wrap;
	}
	.order_bq{
		padding: 10upx 20upx;
		font-size: 24upx;
		line-height: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #F4691A;
		margin-right: 15upx;
		margin-bottom: 15upx;
		border: 1px solid #F4691A;
		border-radius: 10upx;
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
	.xq_xq{
		margin-top: 20upx;
	}
</style>
