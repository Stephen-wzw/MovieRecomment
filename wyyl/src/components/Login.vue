<template>
	<!-- 登录组件 -->
  	<!-- 弹出式登录框 -->
		<div class="modal fade" id="Login_ModalCenter" tabindex="-1" role="dialog" aria-labelledby="Login_ModalCenter_Title"
		 aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<!-- 登录框标题部分 -->
					<div class="modal-header">
						<h5 class="modal-title" id="Login_ModalCenter_Title">Login&nbsp;System</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span><!-- 登录框关闭按钮 -->
						</button>
					</div>
					<!-- 登录框主体部分 -->
					<div class="modal-body">
						<!-- 登录方式选择部分 -->
						<ul class="nav nav-tabs nav-justified mb-2" id="myTab" role="tablist">
							<li class="nav-item">
								<a class="nav-link active" id="Username-tab" data-toggle="tab" href="#Tab1" role="tab" aria-controls="Tab1"
								 aria-selected="true">用户名登录</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" id="Email-tab" data-toggle="tab" href="#Tab2" role="tab" aria-controls="Tab2" aria-selected="false">邮箱登录</a>
							</li>
						</ul>
						<div class="tab-content" id="myTabContent">
							<!-- 用户名登录Tab -->
							<div class="tab-pane fade show active" id="Tab1" role="tabpanel" aria-labelledby="Username-tab">
								<form ref="formLogin" :model="formLogin">
									<div class="form-group">
										<label for="InputUsername">用户名</label>
										<input v-model="formLogin.username" type="text" class="form-control" id="InputUsername" placeholder="请输入用户名" required>
									</div>
									<div class="form-group">
										<label for="InputPassword">密码</label>
										<input v-model="formLogin.password" type="password" class="form-control" id="InputPassword" placeholder="请输入密码" required>
									</div>
									<div class="form-group">
										<div class="form-check">
											<input type="checkbox" class="form-check-input" id="RememberCheck">
											<label class="form-check-label" for="RememberCheck">
												记住我的登录状态
											</label>
										</div>
									</div>
									<!-- <button type="button" class="btn btn-primary" @click="loginSubmit('formLogin')">&emsp;登录&emsp;</button> -->
									<button type="button" class="btn btn-primary col-12" @click="loginSubmit('formLogin')">登录</button>
									<button type="button" class="btn btn-success col-12 mt-2" data-toggle="modal" data-target="#Logon_ModalCenter" @click="closeModal()">
										没有账号？点我注册
									</button>
								</form>
							</div>
							<!-- 邮箱登录Tab -->
							<div class="tab-pane fade" id="Tab2" role="tabpanel" aria-labelledby="Email-tab">
								<form ref="formLoginEmail" :model="formLoginEmail">
									<div class="form-group">
										<label for="InputEmail">邮箱</label>
										<input v-model="formLoginEmail.username" type="email" class="form-control" id="InputEmail" placeholder="请输入邮箱" required>
									</div>
									<div class="form-group">
										<label for="InputPassword">密码</label>
										<input v-model="formLoginEmail.password" type="password" class="form-control" id="InputPassword" placeholder="请输入密码" required>
									</div>
									<div class="form-group">
										<div class="form-check">
											<input type="checkbox" class="form-check-input" id="RememberCheck">
											<label class="form-check-label" for="RememberCheck">
												记住我的登录状态
											</label>
										</div>
									</div>
									<button type="button" class="btn btn-primary col-12" @click="loginSubmit('formLoginEmail')">登录</button>
									<button type="button" class="btn btn-success col-12 mt-2" data-toggle="modal" data-target="#Logon_ModalCenter" @click="closeModal()">
										没有账号？点我注册
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
import qs from 'qs'
import $ from 'jquery'
import { EventBus } from "../../event-bus.js";

export default {
  data() {
    return {
      formLogin: {
        username: '',
        password: '',
      },
      formLoginEmail: {
        username: '',
        password: '',
      },
      usermessage:{
		userId:0,
        userimg:'',
        username:''
      }
    }
  },
  methods: {
	//登录请求
    loginSubmit(name) {
      this.$axios.post("/api/login",qs.stringify({
                username: this.formLogin.username,
                password: this.formLogin.password
        }))
        .then((response) => {
          const {status,data: { code, success ,user}} = response;
          if (status === 200 && code === 1) {
            if (success) {
            this.usermessage=user;
			this.$store.commit("login",{
				userId:this.usermessage.userId,
				username:this.usermessage.username,
				userimg:this.usermessage.userimg
			});
			// 用session存储登录状态
			sessionStorage.setItem('user', JSON.stringify(this.usermessage));
			// 改变登录状态
			EventBus.$emit("checkLogin");
            $('#Login_ModalCenter').modal('hide');
            this.$message({
                message: '登录成功！',
                type: 'success'
            });
            } else {
              this.$message({
                message: '用户名或密码错误！',
                type: 'error'
              });
            }
          } else {
            this.$message({
                message: '服务器错误！',
                type: 'error'
            });
          }
        });
    },
    closeModal(){
      	$('#Login_ModalCenter').modal('hide');
		$('#Logon_ModalCenter').modal('show');
    }
	}
};
</script>

<style lang="less" scoped>
.modal-header>h5 {
	font-size: 1.5rem;
	color: #00A4FF;
}
.modal-body .form-group>label {
	font-size: 1.3rem;
}
.modal-body a {
	cursor: pointer;
}
</style>