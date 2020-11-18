<template>
  <!-- 电影导航栏组件 -->
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <!-- 导航栏左侧Logo -->
      <a class="navbar-brand" href="/home"><img :src="logourl" /></a>
      <!-- 导航栏MENU切换按钮 用于适配移动设备 -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 导航栏功能 -->
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a id="s-active" class="nav-link" href="/sortmenu">分类导航</a>
          </li>
          <li class="nav-item">
            <a id="r-active" class="nav-link" href="/Ranking">Top排行榜</a>
          </li>
        </ul>

        <!-- 未登录时显示 登录按钮 -->
        <button
          type="button"
          class="btn btn-primary mr-5"
          data-toggle="modal"
          data-target="#Login_ModalCenter"
          v-if="show"
        >
          点此登录
        </button>

        <!-- 登录后显示 用户头像 -->
        <a class="text-decoration-none text-dark" id="User-a" href="userIndex.html" v-if="imguser"></a>
						<a href="#" v-if="imguser"><img class="rounded-circle img-fluid" id="User-img" :src="this.userMessage.userimg"></a>
              <div class="dropdown" v-if="imguser">
                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{this.userMessage.username}}
                </button>
                <!-- 下拉菜单 -->
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item px-3 py-2" href="#">
                    <i class="fa fa-user"></i>&nbsp;&nbsp;个人中心<span class="float-right">&gt;</span>
                  </a>
                  <a class="dropdown-item px-3 py-2" href="#">
                    <i class="fa fa-comments"></i>&nbsp;消息通知<span class="float-right">&gt;</span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item text-center" href="javasrcipt:;" style="font-size: 0.9rem;" @click="quit()">
                    <i class="fa fa-sign-out"></i>&nbsp;退出登录
                  </a>
                </div>
              </div>
					

        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="请输入关键字"
          />
          <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from './../assets/img/logo.png'
import $ from 'jquery'
import { EventBus } from "../../event-bus";

export default {
	data(){
		return{
      logourl:Logo,
      show:true,
      imguser:false,
      userMessage:{
        userId:0,
        userimg:"",
        username:""
      }
		}
  },
  created(){
    this.login();
    EventBus.$on("checkLogin",()=>{
      this.login();
    })
  },
  beforeDestroy(){
    this.$store.commit('login','');
  },
  methods:{
    // 登录状态验证
    login(){
      if (sessionStorage.getItem("user")) {
        this.userMessage.userId=JSON.parse(sessionStorage.getItem("user")).userId;
        this.userMessage.username=JSON.parse(sessionStorage.getItem("user")).username;
        this.userMessage.userimg=JSON.parse(sessionStorage.getItem("user")).userimg;
        this.show=false;
        this.imguser=true;
      }else{
        this.show=true;
        this.imguser=false;
      }
    },
    // 退出登录
    quit(){
      sessionStorage.removeItem("user");
      this.userMessage.userId=null;
			this.userMessage.username='';
			this.userMessage.userimg='';
      EventBus.$emit("quitLogin");
      this.show=true;
      this.imguser=false;
    }
  }
}
</script>

<style lang="less" scoped>
.navbar > .container > .navbar-brand {
  width: 20%;
  height: 20%;
}
.navbar > .container > .navbar-brand > img {
  width: 90%;
  height: 90%;
}
.navbar ul li a {
  font-size: 1.3rem;
}
.navbar form button {
  color: #00a4ff;
  border-color: #00a4ff;
}
#User-img {
  width: 3rem;
  height: 3rem;
}
#User-a {
	margin-right: 3rem;
}
#dropdownMenuButton {
	margin-left: 0.2rem;
  margin-right: 1rem;
}
</style>
