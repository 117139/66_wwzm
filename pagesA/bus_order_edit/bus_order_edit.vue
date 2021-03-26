<template>
	<view style="min-height: 100vh;background-color: #fafafa;">
		<view class="order_box">
			<view class="order_main">
				<view class="order_li">
					<view class="order_li_tit">工程名称</view>
					<view class="order_li_msg">
						<input v-model="gc_name" placeholder="请输入工程姓名" />
					</view>
				</view>
				<view class="order_li">
					<view class="order_li_tit">业主名称</view>
					<view class="order_li_msg">
						<input v-model="yz_name" placeholder="请输入业主姓名" />
					</view>
				</view>
				<view class="order_li">
					<view class="order_li_tit">业主联系电话</view>
					<view class="order_li_msg">
						<input v-model="yz_tel" placeholder="请输入业主联系电话" />
					</view>
				</view>
				<view class="order_li" style="position: relative;">
					<view class="order_li_tit">业主地址</view>
					<view @tap="moveToLocation" class="order_li_msg">
						<!-- <input v-model="yz_address.name" placeholder="请输入业主地址"  disabled="true"/> <-->
							
							<text v-if="!yz_address.address" style="line-height: 87upx;font-size: 30upx;color: #666;">请选择地址</text>
							<text v-else style="line-height: 87upx;font-size: 30upx;">{{yz_address.address}}</text>
					</view>
					<button v-if="!ldata" class="" open-type="openSetting" @opensetting='handler'>点击授权</button>
				</view>
				<view class="order_li">
					<view class="order_li_tit">负责人</view>
					<view class="order_li_msg">
						<input v-model="fzr_name" placeholder="请输入负责人姓名" />
					</view>
				</view>
				<view class="order_li">
					<view class="order_li_tit">负责人联系方式</view>
					<view class="order_li_msg">
						<input v-model="fzr_tel" placeholder="请输入负责人联系方式" />
					</view>
				</view>
				 <picker  class="order_li" mode="date" :value="date" :start="startDate" :end="endDate"  data-type="2">
						<view class="order_li_tit">时间</view>
						<view class="order_li_msg">
							<input v-model="date" placeholder="请选择时间" disabled="true" />
						</view>
				</picker>
				<picker v-if="hetong_list.length>0" class="order_li" @change="bindPickerChange" :value="hetong_index" :range="hetong_list" range-key="title" data-type="3">
						<view class="order_li_tit">合同</view>
						<view class="order_li_msg">
							<input v-model="hetong_list[hetong_index].title" placeholder="请选择合同" disabled="true" />
						</view>
				</picker>
				<picker v-if="taocan_list.length>0" class="order_li" @change="bindPickerChange" :value="taocan_index" :range="taocan_list" range-key="goods_package_name" data-type="1">
						<view class="order_li_tit">套内详单</view>
						<view class="order_li_msg">
							<input v-model="taocan_list[taocan_index].goods_package_name" placeholder="请选择套餐" disabled="true" />
						</view>
				</picker>
				<!-- bus_add_goods -->
				<view class="order_li" @tap="jump" data-url='/pagesA/bus_add_goods/bus_add_goods'>
					<view class="order_li_tit">添加其他商品</view>
					<view class="order_li_msg dis_flex aic">
						已添加{{add_goods.length}}种 <text style="font-size: 24upx;color: #00A079;margin-left: 10upx;">查看详情</text><text class="iconfont iconnext-m" style="font-size: 24upx;color: #00A079;"></text>
					</view>
				</view>
				<view class="order_li">
					<view class="order_li_tit">业主要求</view>
					<view class="order_li_msg">
						<input v-model="yz_yaoqiu" placeholder="请输入业主要求" />
					</view>
				</view>
			</view>
		</view>
		<view class="order_bottom"></view>
		<view class="order_bottom" style="position: fixed;">
			<view class="order_bottom_btn" @tap="sub">完成</view>
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
	var qqmapsdk
	var that
	export default {
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				ldata:false,
				gc_name:'',
				yz_name:'',
				yz_tel:'',
				yz_address:'',
				taocan_list:[],
				taocan_index:0,
				fzr_name:'',
				fzr_tel:'',
				date:currentDate,
				hetong_list:[],
				hetong_index:0,
				yz_yaoqiu:''
				
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas','add_goods']),
			startDate() {
					return this.getDate('start');
			},
			endDate() {
					return this.getDate('end');
			}
		},
		onLoad(){
			that=this
			
			that.gethetong()
			wx.getSetting({
			  success: (res) => {
			    console.log(res.authSetting['scope.userLocation'])
			    if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {//非初始化进入该页面,且未授权
			      that.ldata= false
			    } else if (res.authSetting['scope.userLocation'] == undefined) {//初始化进入
			      // that.getLocation(that);
			      that.ldata= false
			    }
			    else { //授权后默认加载
			      console.log('授权后默认加载')
			      // that.getLocation(that);
			     that.ldata=  true
			    }
			  }
			})
			qqmapsdk = new QQMapWX({
			  //此key需要用户自己申请
			  // key: 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'
				key:service.map_key
			});
			// 调用接口
			qqmapsdk.reverseGeocoder({
			  success: function (res) {
			    console.log(res);
			  },
			  fail: function (res) {
			    //console.log(res);
			
			  },
			  complete: function (res) {
			    console.log(res);
			  }
			});
		},
		onUnload() {
			that.that.setadd_goods('')
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform', 'setfj_data']),
			handler: function (e) {
			  var that = this;
			  if (!e.detail.authSetting['scope.userLocation']) {
			   that.ldata=false
			  } else {
			    that.ldata=true
			//     // 调用接口
			//     // 实例化API核心类
			    qqmapsdk = new QQMapWX({
			      //此key需要用户自己申请
			      // key: 'FORBZ-KIPEF-WECJR-NFZKA-MREDV-FCF3O'
						key:service.map_key
			    });
			    qqmapsdk.reverseGeocoder({
			      success: function (res) {
			        console.log(res);
			       
			      },
			      fail: function (res) {
			        //console.log(res);
			
			      },
			      complete: function (res) {
			        //console.log(res);
			      }
			    });
			    
			  }
			},
			
			//移动选点
			moveToLocation: function () {
			  var that = this;
			  wx.chooseLocation({
			    success: function (res) {
			      console.log(res);
			      console.log(res.name);
						var add_data={
							address: res.address,
							latitude: res.latitude,
							longitude: res.longitude,
							name: res.name,
						}
			     that.yz_address=add_data
			      // that.set_add(res.name)
			    
			    },
			    fail: function (err) {
			      console.log(err)
			    }
			  });
			},
			sub(){
				if(!this.gc_name){
					uni.showToast({
						icon:'none',
						title:'请填写工程名称'
					})
					return
				}
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
				if (this.yz_tel == '' || !(/^1\d{10}$/.test(this.yz_tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
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
				if (this.fzr_tel == '' || !(/^1\d{10}$/.test(this.fzr_tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				// if(!this.yz_yaoqiu){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请填写业主要求'
				// 	})
				// 	return
				// }
				var datas={
					token:that.loginDatas.token,
					order_name:that.gc_name,
					owner_name:that.yz_name,
					owner_phone:that.yz_tel,
					owner_address:that.yz_address.address,
					long:that.yz_address.longitude,
					lat:that.yz_address.latitude,
					goods_id:that.taocan_list[that.taocan_index].id||0,
					functionary:that.fzr_name,
					functionary_phone:that.fzr_tel,
					time:that.date,
					agreement_id:that.hetong_list[that.hetong_index].id||0,
					owner_demand:that.yz_yaoqiu,
					add_goods:JSON.stringify(that.add_goods)
				}
				console.log(datas)
				// return
				///order/create
				var jkurl='/order/create'
				if(that.btn_kg==1){
					return
				}
				that.btn_kg=1
				service.P_post(jkurl, datas).then(res => {
					
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
						var pages = getCurrentPages();   //当前页面
						var prevPage = pages[pages.length - 2];   //上一页面
						prevPage.setData({
						  //直接给上一个页面赋值
						  order_new: true,
						});
						setTimeout(()=>{
							that.btn_kg = 0
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
			gettaocan(id) {
				var that = this
			
				var datas = {
					token: that.loginDatas.token || '',
					agreement_id:id
					// page: that.page,
					// size: that.size,
					// status: this.type,
				}
			
				//selectSaraylDetailByUserCard
				var jkurl = '/order/contract'
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = that.page
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
			
						that.taocan_list = datas
			
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
								title: '获取套餐数据失败'
							})
						}
					}
				}).catch(e => {
						that.htmlReset=1
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取套餐数据失败，请检查您的网络连接'
					})
				})
			
			},
			gethetong(){
				var that = this
			
				var datas = {
					token: that.loginDatas.token || '',
					// page: that.page,
					// size: that.size,
					// status: this.type,
				}
			
				//selectSaraylDetailByUserCard
				var jkurl = '/order/contract'
				uni.showLoading({
					title: '正在获取数据'
				})
				var page_that = that.page
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
			
						that.hetong_list = datas
						if(datas.length>0){
							that.gettaocan(datas[0].id)
						}else{
							uni.showToast({
								icon:'none',
								title:'暂无关联合同请联系客服添加'
							})
						}
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
								title: '获取合同数据失败'
							})
						}
					}
				}).catch(e => {
						that.htmlReset=1
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取合同数据失败，请检查您的网络连接'
					})
				})
			
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
						that.gettaocan(that.hetong_list[e.target.value].id)
						this.taocan_index=0
					}
					
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
		height: 87upx;
	}
	.order_li_msg input{
		width: 100%;
		height: 87upx;
		font-size: 30upx;
	}
	
	.order_bottom {
		width: 100%;
		height: 180upx;
		padding-bottom: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fafafa;
		bottom: 0;
		left: 0;
		z-index: 100;
	}

	.order_bottom_btn {
		width: 690upx;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #00A079;
		background: #FFFFFF;
		border-radius: 10px;
	}
	
	.order_li button {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 10;
		opacity: 0;
	}
</style>
