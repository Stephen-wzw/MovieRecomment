<template>
  <!-- 热门电影组件 -->
  <div class="container">
    <div class="row recommend-header mt-4">
      <div class="col-11">
        <h1>&equiv;&nbsp;近期热门</h1>
      </div>
      <!-- 刷新按钮 -->
      <div class="col-1" @click="getHot()">
        <a class="text-decoration-none" href="javasrcipt:;">
          <i class="fa fa-repeat ml-sm-4 mt-sm-4 mt-4" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <!-- 主体 -->
    <!-- 热门电影第一层 -->
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" v-for="(item,index) in Movie.slice(0,4)" :key="index">
        <div class="card mx-auto" style="width: 90%; height: 100%">
          <div class="p-0" style="height: 85%">
            <a href="javasrcipt:;" @click="detailJump(item.mId)">
              <img class="card-img-top img-fluid" :src="item.img" style="height: 100%"/>
              </a>
          </div>
          <div class="card-body p-2">
            <h4 class="card-title text-center mb-1">{{item.name}}</h4>
            <p class="card-text text-center">评分:{{item.score}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 热门电影第二层 -->
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" v-for="(item,index) in Movie.slice(4,8)" :key="index">
        <div class="card mx-auto" style="width: 90%; height: 100%">
          <div class="p-0" style="height: 85%">
            <a href="javasrcipt:;" @click="detailJump(item.mId)">
              <img class="card-img-top img-fluid" :src="item.img" style="height: 100%"/>
              </a>
          </div>
          <div class="card-body p-2">
            <h4 class="card-title text-center mb-1">{{item.name}}</h4>
            <p class="card-text text-center">评分:{{item.score}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 广告推荐栏 -->
    <div class="row">
      <div class="col-12" id="ad-box">
        <a href="#"><div class="ad-img" v-bind:style='{"background":"url("+Advert[0].img+") no-repeat center center"}'></div></a>
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
        {mId:0,img:'',name:'',score:''},
        {mId:0,img:'',name:'',score:''},
        {mId:0,img:'',name:'',score:''},
        {mId:0,img:'',name:'',score:''},
        {mId:0,img:'',name:'',score:''}
      ],
      Advert:[
        {mId:0,img:''},
        {mId:0,img:''},
        {mId:0,img:''},
        {mId:0,img:''}
      ]
    };
  },
  create(){
    getHot();
    getAdvert();
  },
  methods:{
    // 获取热门推荐电影信息
    getHot(){
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
    // 获取页面底部广告图片
    getAdvert(){
      this.$axios.get("").then((response) => {
        const {status,data: { code, success ,data}} = response;
        if (status === 200 && code === 1) {
            this.Advert=data;           
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
#ad-box {
  padding: 0.7rem 0;
  border-top: 2px solid #ccc;
}
.ad-img {
  width: 100%;
  height: 14rem;
  /* background: url(./../assets/img/ad2.png) no-repeat center center; */
}
</style>