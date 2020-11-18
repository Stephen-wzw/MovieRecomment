<template>
  <!-- 分类电影列表组件 -->
  <div class="container mt-4">
    <!-- 两张电影卡为一个单元 -->
    <!-- 单元 1-->
    <div class="row" v-for="(item,index) in movielist" :key="index">
      <div class="col-12 col-lg-6" v-for="(item,cindex) in movieMessage.slice(index*2,(index+1)*2)" :key="cindex">
        <div class="card mb-3" style="height: 95%">
          <div class="row no-gutters" style="height: 100%">
            <div class="col-4">
              <a href="javasrcipt:;" @click="detailJump(item.mId)">
                <img :src="item.pictureName" class="card-img" style="height: 100%"/>
                </a>
            </div>
            <div class="col-8 bg-light">
              <div class="card-body">
                <h3 class="card-title mb-3">
                  {{item.mName}}
                  <span class="float-right" id="movie-score">评分：{{item.score}}</span>
                </h3>
                <p class="card-text">
                  <strong>类型：</strong>{{item.types}}
                </p>
                <p class="card-text"><strong>地区：</strong>{{item.location}}</p>
                <p class="card-text"><strong>导演：</strong>{{item.director}}</p>
                <p class="card-text"><strong>年份：</strong>{{item.time}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import $ from "jquery";
import qs from 'qs'
import { EventBus } from "../../../event-bus";

export default {
  data() {
    return {
	  movieMessage:[
		  {mId:12,pictureName:'',mName:'Joker',score:9.2,types:'剧情 / 惊悚 / 犯罪',
		  location:'美国 / 加拿大',time:'2019',director:'托德·菲利普斯'},

		  {mId:19,pictureName:'',mName:'Joker',score:9.2,types:'剧情 / 惊悚 / 犯罪',
		  location:'美国 / 加拿大',time:'2019',director:'托德·菲利普斯'},

		  {mId:1,pictureName:'',mName:'Joker',score:9.2,types:'剧情 / 惊悚 / 犯罪',
		  location:'美国 / 加拿大',time:'2019',director:'托德·菲利普斯'},

		  {mId:1,pictureName:'',mName:'Joker',score:9.2,types:'剧情 / 惊悚 / 犯罪',
		  location:'美国 / 加拿大',time:'2019',director:'托德·菲利普斯'},

		  {mId:1,pictureName:'',mName:'Joker',score:9.2,types:'剧情 / 惊悚 / 犯罪',
		  location:'美国 / 加拿大',time:'2019',director:'托德·菲利普斯'},

		  {mId:1,pictureName:'',mName:'Joker',score:9.2,types:'剧情 / 惊悚 / 犯罪',
		  location:'美国 / 加拿大',time:'2019',director:'托德·菲利普斯'},

		  {mId:1,pictureName:'',mName:'Joker',score:9.2,types:'剧情 / 惊悚 / 犯罪',
		  location:'美国 / 加拿大',time:'2019',director:'托德·菲利普斯'},

		  {mId:1,pictureName:'',mName:'Joker',score:9.2,types:'剧情 / 惊悚 / 犯罪',
		  location:'美国 / 加拿大',time:'2019',director:'托德·菲利普斯'},

		  {mId:1,pictureName:'',moName:'Joker',score:9.2,types:'剧情 / 惊悚 / 犯罪',
		  location:'美国 / 加拿大',time:'2019',director:'托德·菲利普斯'},

		  {mId:1,pictureName:'',mName:'Joker',score:9.2,types:'剧情 / 惊悚 / 犯罪',
		  location:'美国 / 加拿大',time:'2019',director:'托德·菲利普斯'},
	  ],
	  movielist:[
		  {id:1},
		  {id:2},
		  {id:3},
		  {id:4},
		  {id:5}
    ],
    type:'all',
		location:'all',
    time:'all',
    page:1,
    pages:10
    };
  },
  created(){
    // 进入页面获取电影信息
    this.getMovieMessage();
    // 当分类导航选择变化时获取对应电影信息
    EventBus.$on("getMovie",(typeName,locationName,timeName,pageName)=>{
      this.type=typeName;
      this.location=locationName;
      this.time=timeName;
      this.getSelectMovieMessage(typeName,locationName,timeName,this.page);
    });
    // 页码变化获取电影信息
    EventBus.$on("getPageMovie",(pageName)=>{
      this.page=pageName;
      this.getSelectMovieMessage(this.type,this.location,this.time,pageName);
    })
  },
  methods:{
    // 获取电影信息
    getMovieMessage(){
      this.$axios.get("/api/movies").then((response) => {
        const {status,data: { code, success ,data}} = response;
        if (status === 200 && code === 1) {
          if (success) {
            this.movieMessage=data.list;
            this.pages=data.pages;
            EventBus.$emit("getPageTotal",this.pages);
            }else{
            this.$message({
            message: '信息错误,获取图片失败！',
            type: 'error'
          });
          }            
        }else {
            this.$message({
                message: '服务器错误,获取图片失败！',
                type: 'error'
            });
          }
      })
    },
    // 获取对应分类选择的电影信息
    getSelectMovieMessage(typeName,locationName,timeName,pageName){
      this.$axios.post("/api/movies",qs.stringify({
        type:typeName,
        location:locationName,
        time:timeName,
        page:pageName
      })).then((response) => {
        const {status,data: { code, success ,data}} = response;
        if (status === 200 && code === 1) {
          if (success) {
            this.movieMessage=data.list;
            this.pages=data.pages;
            EventBus.$emit("getPageTotal",this.pages);
          }else{
            this.$message({
            message: '信息错误,获取图片失败！',
            type: 'error'
          });
          }           
        }else {
          this.$message({
            message: '服务器错误,获取图片失败！',
            type: 'error'
          });
        }
      })
    },
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

// 分类导航栏选择状态改变样式
$(function () {
  $("#type-selector ul li").click(function () {
    $(this).children().addClass("onClick-div");
    $(this).children().children().css({
      "font-size": "1.1rem",
      color: "#007bff",
    });
    $(this).siblings().children().removeClass();
    $(this).siblings().children().children().css({
      "font-size": "1.1rem",
      color: "black",
    });
  }),
    $("#area-selector ul li").click(function () {
      $(this).children().addClass("onClick-div");
      $(this).children().children().css({
        "font-size": "1.1rem",
        color: "#007bff",
      });
      $(this).siblings().children().removeClass();
      $(this).siblings().children().children().css({
        "font-size": "1.1rem",
        color: "black",
      });
    }),
    $("#date-selector ul li").click(function () {
      $(this).children().addClass("onClick-div");
      $(this).children().children().css({
        "font-size": "1.1rem",
        color: "#007bff",
      });
      $(this).siblings().children().removeClass();
      $(this).siblings().children().children().css({
        "font-size": "1.1rem",
        color: "black",
      });
    });
});
</script>

<style lang="less" scoped>
#movie-score {
  font-size: 1rem;
  color: #00a4ff;
}
</style>
