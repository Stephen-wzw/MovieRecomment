<template>
  <!-- 电影推荐栏组件 -->
  <div class="container">
    <!-- 顶部 -->
    <div class="row recommend-header">
      <div class="col-11">
        <h1>&equiv;&nbsp;电影推荐</h1>
      </div>
      <!-- 刷新按钮 -->
      <div class="col-1" @click="getRecommend()">
        <a class="text-decoration-none" href="javasrcipt:;">
          <i class="fa fa-repeat ml-sm-4 mt-sm-4 mt-4" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <!-- 主体 -->
    <!-- 电影推荐栏 -->
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" v-for="(item,index) in Movie" :key="index">
        <div class="card mx-auto" style="width: 90%; height: 100%">
          <div class="p-0" style="height: 85%">
            <a href="javasrcipt:;" @click="detailJump(item.mId)"
              ><img
                class="card-img-top img-fluid"
                :src="item.img"
                style="height: 100%"
            /></a>
          </div>
          <div class="card-body p-2">
            <h4 class="card-title text-center mb-1">{{item.name}}</h4>
            <p class="card-text text-center">评分:{{item.score}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      Movie:[
        {mId:0,img:'',name:'',score:''},
        {mId:0,img:'',name:'',score:''},
        {mId:0,img:'',name:'',score:''},
        {mId:0,img:'',name:'',score:''}
      ]
    };
  },
  create(){
    getRecommend();
  },
  methods:{
    // 获取电影推荐信息
    getRecommend(){
      this.$axios.get("").then((response) => {
        const {status,data: { code, success ,data}} = response;
        if (status === 200 && code === 1) {
            this.Movie=data;           
        }else {
            this.$message({
                message: '服务器错误,获取图片失败！',
                type: 'error'
            });
          }
      })
    },
    // 电影详情跳转
    detailJump(movieId){
      this.$router.push({
        path: "/detail",
        query: {         //参数携带方式
          mId: movieId
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.recommend-header {
  margin-bottom: 0.6rem;
  border-bottom: 2px solid #ccc;
}
</style>