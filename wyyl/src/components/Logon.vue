<template>
	<!-- 注册组件 -->
    <!-- 弹出式注册框 -->
		<div class="modal fade" id="Logon_ModalCenter" tabindex="-1" role="dialog" aria-labelledby="Logon_ModalCenter_Title"
		 aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<!-- 注册框标题部分 -->
					<div class="modal-header">
						<h5 class="modal-title" id="Logon_ModalCenter_Title">Logon&nbsp;System</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span><!-- 注册框关闭按钮 -->
						</button>
					</div>
					<!-- 注册框主体部分 -->
					<div class="modal-body">
						<form class="needs-validation" :model="formLogon" novalidate>
							<div class="form-group">
								<label>类型喜好</label>
								<div class="form-inline">
									<select v-model="formLogon.hobby1" class="custom-select col-auto mr-2" id="SelectPref1" required>
										<option disabled value="" selected>选择1</option>
										<option value="爱情">爱情</option>
										<option value="动作">动作</option>
										<option value="科幻">科幻</option>
										<option value="悬疑">悬疑</option>
										<option value="喜剧">喜剧</option>
										<option value="犯罪">犯罪</option>
										<option value="恐怖">恐怖</option>
										<option value="战争">战争</option>
										<option value="武侠">武侠</option>
										<option value="传记">传记</option>
									</select>
									<select v-model="formLogon.hobby2" class="custom-select col-auto mr-2" id="SelectPref2" required>
										<option disabled value="" selected>选择2</option>
										<option value="爱情">爱情</option>
										<option value="动作">动作</option>
										<option value="科幻">科幻</option>
										<option value="悬疑">悬疑</option>
										<option value="喜剧">喜剧</option>
										<option value="犯罪">犯罪</option>
										<option value="恐怖">恐怖</option>
										<option value="战争">战争</option>
										<option value="武侠">武侠</option>
										<option value="传记">传记</option>
									</select>
									<select v-model="formLogon.hobby3" class="custom-select col-auto" id="SelectPref3" required>
										<option disabled value="" selected>选择3</option>
										<option value="爱情">爱情</option>
										<option value="动作">动作</option>
										<option value="科幻">科幻</option>
										<option value="悬疑">悬疑</option>
										<option value="喜剧">喜剧</option>
										<option value="犯罪">犯罪</option>
										<option value="恐怖">恐怖</option>
										<option value="战争">战争</option>
										<option value="武侠">武侠</option>
										<option value="传记">传记</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label for="validationEmail">邮箱
                                    <small id="EmailHelp">{{blur.email_msg}}</small>
                                </label>
								<input v-model="formLogon.email" type="email" class="form-control" id="validationEmail" placeholder="注册邮箱" aria-describedby="EmailHelp"
								 required @blur="blur_email">
								<div class="invalid-feedback">
									请输入一个真实邮箱！
								</div>
							</div>
							<div class="form-group">
								<label for="validationUsername">用户名
                                    <small id="UsernameHelp">{{blur.username_msg}}</small>
                                </label>
								<input v-model="formLogon.username" type="text" class="form-control" id="validationUsername" placeholder="注册用户名" aria-describedby="UsernameHelp"
								 required @blur="blur_username">
								<div class="invalid-feedback">
									请输入一个用户名！
								</div>
							</div>
							<div class="form-group">
								<label for="validationPassword">密码
                                    <small id="PasswordHelp">{{blur.password_msg}}</small>
                                </label>
								<input v-model="formLogon.password" type="password" class="form-control" id="validationPassword" placeholder="注册密码" aria-describedby="PasswordHelp"
								 required @blur="blur_password">
								<div class="invalid-feedback">
									请输入一个密码！
								</div>
							</div>
							<div class="form-group">
								<label class="mr-3 mb-0">性别</label>
								<div class="form-check form-check-inline">
									<input v-model="formLogon.sex" class="form-check-input" type="radio" name="SexOptions" id="SexRadio1" value="男" checked>
									<label class="form-check-label" for="SexRadio1">男</label>
								</div>
								<div class="form-check form-check-inline">
									<input v-model="formLogon.sex" class="form-check-input" type="radio" name="SexOptions" id="SexRadio2" value="女">
									<label class="form-check-label" for="SexRadio2">女</label>
								</div>
							</div>
							<div class="form-group">
								<div class="form-check">
									<input v-model="formLogon.relus" value="read" type="checkbox" class="form-check-input" id="RuleCheck" required>
									<label class="form-check-label" for="RuleCheck">
										已阅读并同意《<a href="#" class="text-decoration-none">万有影力网站用户守则</a>》
									</label>
									<div id="relus" v-if="formLogon.relus==''?show:false">
										必须阅读且同意该守则！
									</div>
								</div>
							</div>
							<!-- <button class="btn btn-primary" type="button" @click="logonSubmit('formLogon')">&emsp;注册&emsp;</button> -->
							<button class="btn btn-success col-12" type="button" @click="logonSubmit('formLogon')">注册</button>
						</form>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
import qs from 'qs'
import $ from 'jquery'

export default {
  data() {
    return {
      formLogon: {
        email:'',
        username: '',
        password: '',
        sex:'男',
        hobby1:'',
        hobby2:'',
		hobby3:'',
		relus:''
      },
      blur:{
        email_msg:'',
        username_msg:'',
        password_msg:''
	  },
	  verfiy:{
		  email:false,
		  username:false,
		  password:false
	  },
	  formfinfsh:true,
	  show:false
    };
  },
  methods: {
	//   注册请求
    logonSubmit(){
		if(this.finish()){
			this.$axios.post('/api/logon',qs.stringify({
					email: this.formLogon.email,
					username: this.formLogon.username,
					password: this.formLogon.password,
					sex: this.formLogon.sex,
					hobby1: this.formLogon.hobby1,
					hobby2: this.formLogon.hobby2,
					hobby3: this.formLogon.hobby3
			})).then((response) => {
				const {status,data: { code, success }} = response;
				if (status === 200 && code === 1) {
					if (success) {
					this.$message({
						message: '注册成功！',
						type: 'success'
					});
					$('#Logon_ModalCenter').modal('hide');
					} else {
						this.$message({
							message: '服务器错误！',
							type: 'error'
						});
					}
				} else {
					this.$message({
						message: '服务器错误！',
						type: 'error'
					});
				}
			})
		}
	},
	// 邮箱验证
    blur_email(){
      // 检查正则匹配
      var re_email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if(re_email.test(this.formLogon.email)){
		  this.blur.email_msg = '';
		  this.verfiy.email=true;
      }
      else{
        this.blur.email_msg = '请输入正确的邮箱格式';
      }
	},
	// 用户名验证
    blur_username(){
      // 检查正则匹配
      var re_username = /^[a-zA-Z0-9_-]{8,20}$/;
      if(re_username.test(this.formLogon.username)){
		  this.blur.username_msg = '';
		  this.verfiy.username=true;
      }
      else{
        this.blur.username_msg = '用户名长度必须为8-20，且只能以数字或字母开头';
      }
	},
	// 密码验证
    blur_password(){
      // 检查正则匹配
      var re_password = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
      if(re_password.test(this.formLogon.password)){
		  this.blur.password_msg = '';
		  this.verfiy.password=true;
      }
      else{
        this.blur.password_msg = '密码长度必须为8-20，且包括至少1个大写字母，1个小写字母，1个数字';
      }
	},
	// 提示信息
	tis(){
		if(!this.verfiy.email){
			this.$message({
                message: '邮箱格式错误！',
                type: 'error'
            });
		}else if(!this.verfiy.username){
			this.$message({
                message: '用户名格式错误！',
                type: 'error'
            });
		}else if(!this.verfiy.password){
			this.$message({
                message: '密码格式错误！',
                type: 'error'
            });
		}else if(this.formLogon.relus==''){
			this.show=true;
		}
	},
	// 错误提交提示
	finish(){
		if(!this.verfiy.email){
			this.$message({
                message: '邮箱格式错误！',
                type: 'error'
			});
			this.formfinfsh=false;
		}else if(!this.verfiy.username){
			this.$message({
                message: '用户名格式错误！',
                type: 'error'
			});
			this.formfinfsh=false;
		}else if(!this.verfiy.password){
			this.$message({
                message: '密码格式错误！',
                type: 'error'
			});
			this.formfinfsh=false;
		}else if(this.formLogon.hobby1==''||this.formLogon.hobby2==''||this.formLogon.hobby3==''){
			this.$message({
                message: '类型喜好选择未完成',
                type: 'error'
			});
			this.formfinfsh=false;
		}else if(this.formLogon.relus==''){
			this.show=true;
			this.formfinfsh=false;
		}else{
			this.formfinfsh=true;
		}

		return this.formfinfsh;
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
#EmailHelp,#UsernameHelp,#PasswordHelp,#relus{
    color: red;
    /* margin-left: 8rem; */
    font-size: 0.8rem;
}
</style>
