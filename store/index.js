import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		platform:'',
		userName: "游客",
		loginDatas:{
				// address: "北京市海淀区长春桥路",
				// company: "",
				// cover: "imgs/20210111134350305.png",
				// engineer_status: 2,
				// id_front: "imgs/20210116183627551.jpg",
				// id_in_hand: "imgs/20210116183644825.jpg",
				// id_number: "142625199406223911",
				// id_the_back: "imgs/20210116183638217.jpg",
				// is_engineer: 1,
				// is_owner: 1,
				// is_seller: 1,
				// lat: "39.95933",
				// long: "116.29845",
				// nickname: "问·心",
				// phone: "18300000000",
				// sex: 1,
				// token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd2FudXpuLmNvbS5hYS44MDAxMjM0NTYudG9wXC9hcGlcL3VzZXJcL2xvZ2luIiwiaWF0IjoxNjE2MTE4Njg4LCJleHAiOjE2MjIxMTg2ODgsIm5iZiI6MTYxNjExODY4OCwianRpIjoiWnpLRGd0WFRmaXZIM25XMCIsInN1YiI6NSwicHJ2IjoiMWY2MDc4MDZhZWFjN2YyNmVlYjM0OTViMDFkMTMyYWNiN2RmY2NiZCJ9.s_gCL9N6rKppRWipAR-szFEj5QKJQzJeOZGn0dGp0HY",
				// truename: "问心",
		},
		company:'',
		uid:'',
		phone:'',
		token:'',
		laheiArr:[],
		uuid:'',
		
		
		
		new_xz:[],    //批量操作
		new_problem:'' ,//新问题
		ls_prodata:'',
		ls_pro_yh:'',
		fj_data:'',
		bj_prodata:'',
		
		
		
		
		
		xcx_status:1,     //0 商家端  1 用户端  2智能安装端
		add_goods:[]
	},
	mutations: {
		setadd_goods(state, add_goods) {
			state.add_goods = add_goods || '新用户';
			
		},
		set_xcx(state, xcx_status){
			var tip_text='正在切换至'
			if(xcx_status==0){
				if(state.loginDatas.is_seller!=1){
					uni.showToast({
						icon:'none',
						title: '暂无权限'
					});
					return
				}
				tip_text+='商家端'
			}
			if(xcx_status==1){
				if(state.loginDatas.is_owner!=1){
					uni.showToast({
						icon:'none',
						title: '暂无权限'
					});
					return
				}
				tip_text+='用户端'
			}
			if(xcx_status==2){
				if(state.loginDatas.is_engineer!=1){
					uni.showToast({
						icon:'none',
						title: '暂无权限'
					});
					return
				}
				tip_text+='智能安装端'
			}
			uni.showToast({
				icon:'none',
				title:tip_text
			})
			state.xcx_status = xcx_status || 0;
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
			console.log(userName)
			console.log(state.userName)
		},
		lahei(state, id) {
			// state.userName = userName || '新用户';
			// state.hasLogin = true;
			state.laheiArr.push(id)
			console.log(state.laheiArr)
		},
		logindata(state, logindata) {
			state.loginDatas = logindata || '';
			Vue.set(state,'loginDatas',logindata)
			// state.company=logindata.company
			// state.uid= logindata.id
			// state.phone= logindata.phone
			// state.token= logindata.token
			console.log(logindata)
			console.log(state.loginDatas)
		},
		setplatform(state, platform) {
			state.platform = platform || 'android';
		},
		logout(state) {
			state.userName = "游客";
			state.hasLogin = false;
		},
		
		// ****************************************
		//评论操作
		setnew_xz(state, new_xz) {
			state.new_xz = new_xz||[];
		},
		//新题
		setnew_problem(state, new_problem) {
			state.new_problem = new_problem||[] ;
		},
	}
})

export default store
