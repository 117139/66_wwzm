import Vue from 'vue'
import store from './store/index.js'
import event from 'common/event.js'
// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
// const IPurl = 'https://datixcx.com.aa.800123456.top/api/';
// const imgurl = 'https://datixcx.com.aa.800123456.top/';
// const imgurl = 'http://192.168.129.246/';
const map_key="7FEBZ-WLWK2-PMGUE-C4BFT-EKXB6-BFFNR"
// const imgurl="https://wanuzn.com.aa.800123456.top/"
const imgurl="https://www.wanuzn.com/"
const IPurl=imgurl+'api/'
// const IPurl='http://192.168.129.246/api/'
// const adminurl='https://datixcx.com.aa.800123456.top/admin/';
// appid:wxf61ecd472abe41cb  正式
// appid:wx49a560f7feac0feb   cj
/**
 * 请求头
 */
var header = {
	'content-type': 'application/x-www-form-urlencoded',
}

/**
 * 供外部post请求调用  
 */
function post(url, params, onSuccess, onFailed) {
	console.log("请求方式：", "POST")
	request(url, params, "POST", onSuccess, onFailed);

}

/**
 * 供外部get请求调用
 */
function get(url, params, onSuccess, onFailed) {
	console.log("请求方式：", "GET")
	request(url, params, "GET", onSuccess, onFailed);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */

function request(url, params, method, onSuccess, onFailed) {
	console.log('请求url：' + url);

	console.log("请求头：", header)
	uni.request({
		url: IPurl + url,
		data: dealParams(params),
		method: method,
		header: header,
		success: function(res) {
			uni.hideLoading();
			uni.stopPullDownRefresh();
			console.log('响应：', res.data);

			// if (res.data) {
			if (res.data.code == -1) {
				// if (params.login_type == 1) {
				// 	//一进来就登录失败
				// 	return

				// }
				// if (params.login_type == 2) {
				// 	//授权登录失败
				// 	uni.navigateBack()
				// 	return

				// }
				uni.showToast({
					icon: 'none',
					title: '请先授权登录'
				})
				store.commit('logout')
				setTimeout(function (){
					uni.navigateTo({
						url: './pages/login/login?haslogin=false'
					})
				},1000)
				return

			}

			/** start 根据需求 接口的返回状态码进行处理 */
			onSuccess(res);
			/** end 处理结束*/
			// }
		},
		fail: function(error) {

			uni.hideLoading();
			uni.stopPullDownRefresh();
			onFailed(error); //failure for other reasons
		}
	})
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
	console.log("请求参数:", params)
	return params;
}


const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let users = getUsers();
	users.push({
		account: userInfo.account,
		password: userInfo.password
	});
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

const gologin = function() {
	uni.navigateTo({
		url: '/pages/login_index/login_index'
	})
}


/**
 * function: 跳转页面
 ** author: wenxin
 ** @url URL地址
 ** @params e
 ** @method 请求方式：GET/POST
 ** @createTime: 2021-3-19 15:06:53
 */
function jump(e) {
	// console.log(e.currentTarget.dataset.type)
	var datas=e.currentTarget.dataset
	console.log(datas.login==true)
	
	if(datas.login==true){
		if(!datas.haslogin){
			uni.navigateTo({
				url: '../login/login',
			});
			return
		}
	}
	if(datas.type=='sp'){
		console.log(datas.spurl)
		store.commit('spurl_fuc', datas.spurl)
		uni.navigateTo({
			url: datas.url
		})
		return
	}
	if (datas.type == 2) {
		uni.switchTab({
			url: datas.url
		})
	} else if (datas.type == 3) {
		uni.redirectTo({
			url: datas.url
		})
	} else {
		uni.navigateTo({
			url: datas.url
		})
	}
}
/**
 * function: 查看图片
 ** author: wenxin
 ** @url URL地址
 ** @params e
 ** @method 请求方式：GET/POST
 ** @createTime: 2021-3-19 15:06:53
 */
const pveimg = function(e) {
	var current = e.currentTarget.dataset.src
	var urls = e.currentTarget.dataset.array

	let urls1 = []
	if (urls) {
		urls1 = urls

	} else {
		urls1[0] = current
	}
	// console.log(urls1)
	uni.previewImage({
		current: current, // 当前显示图片的http链接
		urls: urls1 // 需要预览的图片http链接列表
	})

}
/**
 * function: 打电话
 ** author: wenxin
 ** @url URL地址
 ** @params e
 ** @method 请求方式：GET/POST
 ** @createTime: 2021-3-19 15:06:53
 */
const call=  function (e){
	console.log(e)
	// return
	if(e.currentTarget.dataset.tel){
		// wx.makePhoneCall({
		// 	phoneNumber: e.currentTarget.dataset.tel+''
		// })
		uni.showModal({
		    title: '提示',
		    content: '是否拨打'+e.currentTarget.dataset.tel+'?',
		    success: function (res) {
		        if (res.confirm) {
							wx.makePhoneCall({
								phoneNumber: e.currentTarget.dataset.tel+''
							})
							console.log('用户点击确定');
		        } else if (res.cancel) {
		            console.log('用户点击取消');
		        }
		    }
		});
	}
}
/**
 * function: 登录
 ** author: wenxin
 ** @url URL地址
 * @params num
 ** @method 请求方式：GET/POST
 ** @createTime: 2021-3-19 15:06:53
 */
const wxlogin=function (num){
	var that =this
	// 获取用户信息
	if (num == 1) {
		uni.showLoading({
			title: '正在登录',
			mask: true
		})
	}
	var userInfo = uni.getStorageSync('userInfo')
	if(!userInfo){
	
	}else{
	  uni.login({
	    success: function (res) {
				
	      // 发送 res.code 到后台换取 openId, sessionKey, unionId
	      var uinfo = userInfo
	      let data = {
	        code: res.code,
	        nickname: uinfo.nickName,
	        cover: uinfo.avatarUrl
	      }
	      let rcode = res.code
	      console.log(res.code)
	      uni.request({
	        url: IPurl+'user/login',
	        data: data,
	        header: {
	          'content-type': 'application/x-www-form-urlencoded'
	        },
	        dataType: 'json',
	        method: 'POST',
	        success(res) {
						uni.hideLoading()
	          console.log(res.data)
	          if (res.data.code == 1) {
	            console.log('登录成功')
	            console.log(res.data)
	            uni.setStorageSync('token', res.data.data.token)
							//获取手机号
							/*
							if(!res.data.data.phone){
								if(num==1){
									uni.redirectTo({
										url:'/pages/login_tel/login_tel'
									})
								}
								return
							}*/
							store.commit('logindata', res.data.data)
							store.commit('login', res.data.data.nickname)
							
	            uni.setStorageSync('loginmsg', res.data.data)
							//0 商家端  1 用户端  2智能安装端
							console.log('store.xcx_status')
							console.log(store.state.xcx_status)
							if(num==1){
								console.log(res.data.data.is_engineer)
								if(res.data.data.is_owner==1){
									store.commit('set_xcx', 1)
									return
								}
								if(res.data.data.is_engineer==1){
									store.commit('set_xcx', 2)
									return
								}
								if(res.data.data.is_seller==1){
									store.commit('set_xcx', 0)
								}
							}
							// im login
							
							
							
							if(num==1){
								uni.showToast({
									icon:'none',
									title:'登录成功'
								})
								setTimeout(()=>{
									event.trigger({
									    type:'test',
									    page:'/pages/index/index',
									    //obj和test是举的例子，随意啥都行，这个传过去在on中的args中都可以获取到
									    obj:{
									
									    },
									    test:{
												'loginmsg': res.data.data
									    },
									    success:function(data){
									        //data为on中返回的数据
									    }
									});
								},1000)
								setTimeout(()=>{
									uni.navigateBack()
								},1500)
							}else{
								event.trigger({
								    type:'test',
								    page:'/pages/index/index',
								    //obj和test是举的例子，随意啥都行，这个传过去在on中的args中都可以获取到
								    obj:{
								
								    },
								    test:{
											'loginmsg': res.data.data
								    },
								    success:function(data){
								        //data为on中返回的数据
								    }
								});
							}
	          } else {
	            uni.removeStorageSync('userInfo')
	            uni.removeStorageSync('token')
	            if(res.msg){
								uni.showToast({
								  icon: 'none',
								  title: res.msg,
								})
							}else{
								uni.showToast({
								  icon: 'none',
								  title: '登录失败',
								})
							}
	          }
		
	        },
	        fail() {
						uni.hideLoading()
	          uni.showToast({
	            icon: 'none',
	            title: '登录失败'
	          })
	        }
	      })
	    }
	  })
	}
	return
	uni.getSetting({
	  success: res => {
	   console.log(res)
	    if (res.authSetting['scope.userInfo']==true) {
	      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
	      console.log('已经授权')
				uni.getUserInfo({
					success(res) {
						var userInfo = res.userInfo
						console.log(userInfo)
						uni.setStorageSync('userInfo', res.userInfo)
						if(!userInfo){
						
						}else{
	            uni.login({
	              success: function (res) {
									
	                // 发送 res.code 到后台换取 openId, sessionKey, unionId
	                var uinfo = userInfo
	                let data = {
	                  code: res.code,
	                  nickname: uinfo.nickName,
	                  cover: uinfo.avatarUrl
	                }
	                let rcode = res.code
	                console.log(res.code)
	                uni.request({
	                  url: IPurl+'user/login',
	                  data: data,
	                  header: {
	                    'content-type': 'application/x-www-form-urlencoded'
	                  },
	                  dataType: 'json',
	                  method: 'POST',
	                  success(res) {
											uni.hideLoading()
	                    console.log(res.data)
	                    if (res.data.code == 1) {
	                      console.log('登录成功')
	                      console.log(res.data)
	                      uni.setStorageSync('token', res.data.data.token)
												//获取手机号
												/*
												if(!res.data.data.phone){
													if(num==1){
														uni.redirectTo({
															url:'/pages/login_tel/login_tel'
														})
													}
													return
												}*/
												store.commit('logindata', res.data.data)
												store.commit('login', res.data.data.nickname)
												
	                      uni.setStorageSync('loginmsg', res.data.data)
												//0 商家端  1 用户端  2智能安装端
												console.log('store.xcx_status')
												console.log(store.state.xcx_status)
												if(num==1){
													console.log(res.data.data.is_engineer)
													if(res.data.data.is_owner==1){
														store.commit('set_xcx', 1)
														return
													}
													if(res.data.data.is_engineer==1){
														store.commit('set_xcx', 2)
														return
													}
													if(res.data.data.is_seller==1){
														store.commit('set_xcx', 0)
													}
												}
												// im login
												
												
												
												if(num==1){
													uni.showToast({
														icon:'none',
														title:'登录成功'
													})
													setTimeout(()=>{
														event.trigger({
														    type:'test',
														    page:'/pages/index/index',
														    //obj和test是举的例子，随意啥都行，这个传过去在on中的args中都可以获取到
														    obj:{
														
														    },
														    test:{
																	'loginmsg': res.data.data
														    },
														    success:function(data){
														        //data为on中返回的数据
														    }
														});
													},1000)
													setTimeout(()=>{
														uni.navigateBack()
													},1500)
												}else{
													event.trigger({
													    type:'test',
													    page:'/pages/index/index',
													    //obj和test是举的例子，随意啥都行，这个传过去在on中的args中都可以获取到
													    obj:{
													
													    },
													    test:{
																'loginmsg': res.data.data
													    },
													    success:function(data){
													        //data为on中返回的数据
													    }
													});
												}
	                    } else {
	                      uni.removeStorageSync('userInfo')
	                      uni.removeStorageSync('token')
	                      if(res.msg){
													uni.showToast({
													  icon: 'none',
													  title: res.msg,
													})
												}else{
													uni.showToast({
													  icon: 'none',
													  title: '登录失败',
													})
												}
	                    }
	
	                  },
	                  fail() {
											uni.hideLoading()
	                    uni.showToast({
	                      icon: 'none',
	                      title: '登录失败'
	                    })
	                  }
	                })
	              }
	            })
						}
					}
				})
				
	    }else{
			  uni.hideLoading()
	    }
	  }
	})
}

const setUsermsg=function(data){
	var jkurl='/user/amendInfo'
	
	post(jkurl, data,
		function(res) {
			
			// if (res.data.code == 1) {
			if (res.data.code == 1) {
				var datas = res.data.data
				// console.log(typeof datas)
				
				if (typeof datas == 'string') {
					datas = JSON.parse(datas)
				}
				wxlogin()
				uni.showToast({
					title:'操作成功'
				})
				
			} else {
				if (res.data.msg) {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				}
			}
		},
		function(err) {
			that.btnkg=0
			
				uni.showToast({
					icon: 'none',
					title: '获取数据失败'
				})
		
		}
	)
}

/**
 * function: 图片上传
 ** author: wenxin
 ** @url URL地址
 ** @params tximg
 ** @method 请求方式：GET/POST
 ** @createTime: 2021-3-19 15:06:53
 */
const wx_upload=function(tximg){
	return new Promise((resolve,reject)=>{
		uni.showLoading({
			mask:true,
			title:'正在上传'
		})
		uni.uploadFile({
			url: IPurl + 'user/upload_img', 
			filePath: tximg,
			name: 'img',
			formData: {
				token: uni.getStorageSync('token')
			},
			// success: (uploadFileRes) => {
			// 	console.log(uploadFileRes.data);
			// 	var ndata = JSON.parse(uploadFileRes.data)
			// 	resolve(uploadFileRes)
			// },
			complete:(res)=>{
			    uni.hideLoading();
			    uni.stopPullDownRefresh();//慎用hideLoading,会关闭wx.showToast弹窗
			    // console.log(`耗时${Date.now() - timeStart}`);
					console.log(res)
			    if(res.statusCode ==200){//请求成功
						var ndata = JSON.parse(res.data)
						if(ndata.code==-1){
							store.commit('logout')
							uni.navigateTo({
								url:'/pages/login/login'
							})
							return
						}else if(ndata.code==0){
							if(ndata.msg){
								
								uni.showToast({
									icon:'none',
									title:ndata.msg
								})
							}else{
								
								uni.showToast({
									icon:'none',
									title:'操作失败'
								})
							}
						}
			      resolve(ndata)
			    }else{
			      reject(res);
			    }
			}
		});
	})
	
}


/**
 * @description 配置接口请求的公共方法   
 * @example   
 * var animal = new Animal('恐龙',1000); 
 ** author: wenxin
 ** @url URL地址
 * @param {String} url = ''  接口请求地址  
 * @param {String} param = {}  接口请求参数 
 * @param {String} method = [get|post] 可选值域包括get和post，get是直接请求，post是提交数据  
 * @createTime: 2021-3-19 15:22:57
 */

const http =({url ='',param ={},method='',header={'content-type': 'application/x-www-form-urlencoded'}}={}) =>{
  
  let timeStart = Date.now();
  return new Promise((resolve,reject)=>{
		console.log('请求url：' + getUrl(url));
		
		console.log("请求头：", header)
		console.log("param：", param)
    uni.request({
      url: getUrl(url),
      data:param,
      method: method,
      header:header,
      complete:(res)=>{
          uni.hideLoading();
          uni.stopPullDownRefresh();//慎用hideLoading,会关闭wx.showToast弹窗
          console.log(`耗时${Date.now() - timeStart}`);
					console.log(res)
          if(res.statusCode ==200){//请求成功
					console.log(res)
						if(res.data.code==-1){
							store.commit('logout')
							uni.navigateTo({
								url:'/pages/login/login'
							})
							return
						}else if(res.data.code==0&&res.msg=='请先登录账号~'){
							uni.navigateTo({
								url:'/pages/login/login'
							})
							return
						}else if(res.data.code==0){
							if(res.data.msg){
								
								uni.showToast({
									icon:'none',
									title:res.data.msg
								})
							}else{
								
								uni.showToast({
									icon:'none',
									title:'操作失败'
								})
							}
						}
            resolve(res.data)
          }else{
            reject(res);
          }
      }
    })
  })
}
// 获取url
const getUrl = (url)=>{
	if(!url){
		return url
	}
	if(url.slice(0,1) == "/"){
	    console.log(true);
			url = url.substr(1);
	}
  if(url.indexOf('://')== -1){
    url = IPurl +url ;
  }
  return url;
}
//暴露出去调用的方法
 

// get方法
const P_get = (url, param = {}) => {
		if(!param.load_mode){
			wx.showLoading({
			  title: '请求中，请耐心等待...',
			});
		}
    return http({
        url,
        param,
				method: 'GET'
    })
}

const P_post = (url, param = {}) => {
    return http({
        url,
        param,
        method: "POST"
    })
}

const P_put = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'put'
    })
}

const P_delete = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'put'
    })
}
// // 单个请求
// service.P_get('/cate/list').then(res => {
// 	console.log(res)
// }).catch(e => {
// 	console.log(e)
// })

// // 一个页面多个请求
// Promise.all([
//   service.P_get('/cate/list'),
//   service.P_get(`detail/${id}`)
// ]).then(result => {
//   console.log(result)
// }).catch(e => {
//   console.log(e)
// })
const getimg=function (img){
	if(!img) return
	// console.log(imgurl+img)
	if(img.indexOf('://')== -1){
	  img = imgurl+img
	}
	return img
}
const getimgarr=function (imgs,type){
	if(!imgs) return
	if(!type){
		type=','
	}
	imgs=imgs.split(type)
	// console.log(imgurl+img)
	var newimgs=[]
	for(var i=0;i<imgs.length;i++){
		var img=imgs[i]
		if(img.indexOf('://')== -1){
		  img = imgurl+img
		}
		newimgs.push(img)
	}
	// console.log(newimgs)
	return newimgs
}
const gettime=function (mj){
	if(!mj) {
		return {}
	}
	// // console.log(mj.indexOf('今天')!=-1)
	// if(mj.indexOf('今天')!=-1){
	// 	return {
	// 		type:2,
			
	// 		time:mj
	// 	}
	// }
	// mj = mj.replace(/-/g,'/')
	var ntime=new Date(mj*1000)
	// console.log(ntime)
	var n_year = ntime.getFullYear();
	var n_month = ntime.getMonth() + 1;
	var n_date = ntime.getDate();
	var n_hour = ntime.getHours();
	var n_minute = ntime.getMinutes();
	
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hour = time.getHours();
	var minute = time.getMinutes();
	// n_month=n_month<10? '0'+n_month:n_month
	n_date=n_date<10? '0'+n_date:n_date
	n_hour=n_hour<10? '0'+n_hour:n_hour
	n_minute=n_minute<10? '0'+n_minute:n_minute
	if(n_year==year){
		
		return {
			type:1,
			year:n_year,
			month:n_month,
			date:n_date,
			hour:n_hour,
			minute:n_minute,
			time:'今天 '+n_hour+':'+n_minute
		}
	}else{
		
		return {
			type:2,
			year:n_year,
			month:n_month,
			date:n_date,
			hour:n_hour,
			minute:n_minute,
			time:n_year+'-'+n_month+'-'+n_date
		}
	}
}


const get_fwb=function (str){
	if(!str){
		return
	}
				str = str // .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
				          .replace(/<p([\s\w"-=\/\.:;]+)((?:(class="[^"]+")))/ig, '<p $1')
				          .replace(/<p([\s\w"-=\/\.:;]+)/ig, '<p$1 class="xcx_fwb_p"')
									// .replace(/<div([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<div')
				          .replace(/<div([\s\w"-=\/\.:;]+)((?:(class="[^"]+")))/ig, '<div $1')
				          .replace(/<div([\s\w"-=\/\.:;]+)/ig, '<div$1 class="xcx_fwb_div"')
				
				          // .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img $1')
				          // .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img $1')
				          // .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img $1')
				          .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img $1')
				          .replace(/<img([\s\w"-=\/\.:;]+)((?:(class="[^"]+")))/ig, '<img $1')
				          .replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img$1 class="xcx_fwb_img"')
				return str
			}
export default {
	getUsers,
	addUser,
	get,
	post,
	IPurl,
	map_key,
	imgurl,
	gologin,
	jump,
	pveimg,
	call,
	wxlogin,
	setUsermsg,
	P_get,
	P_post,
	P_put,
	P_delete,
	gettime,
	getimg,
	getimgarr,
	get_fwb,
	wx_upload
}
