<template>
  <!-- 电影轮播图组件 -->
  <div class="jumbotron jumbotron-fluid p-0" id="carousel-jum">
    <!-- 通栏背景 -->
    <div class="container">
      <!-- 容器主体 -->
      <div class="row">
        <div class="col-12">
          <div id="carousel" class="carousel slide" data-ride="carousel">
            <!-- 轮播图姿态指示器(图片底部的小按钮) -->
            <ol class="carousel-indicators">
              <li data-target="#carousel" data-slide-to="0" class="active"></li>
              <!-- 此处的active必不可少 -->
              <li data-target="#carousel" data-slide-to="1"></li>
              <li data-target="#carousel" data-slide-to="2"></li>
              <li data-target="#carousel" data-slide-to="3"></li>
              <li data-target="#carousel" data-slide-to="4"></li>
            </ol>
            <!-- 姿态指示器的个数与图片个数必须一致 -->
            <!-- 轮播图的图片(比例16:9) -->
            <div class="carousel-inner">
              <div class="carousel-item active" data-interval="4000">
                <!-- 此处的active必不可少 -->
                <a href="javasrcipt:;" @click="detailJump(Bill[0].mId)">
                  <img
                    :src="Bill[0].img"
                    class="d-block w-100"
                    alt="此处为图片描述"
                  />
                </a>
              </div>
              <div class="carousel-item" data-interval="4000">
                <a href="javasrcipt:;" @click="detailJump(Bill[0].mId)">
                  <img
                    :src="Bill[1].img"
                    class="d-block w-100"
                    alt="此处为图片描述"
                  />
                </a>
              </div>
              <div class="carousel-item" data-interval="4000">
                <a href="javasrcipt:;" @click="detailJump(Bill[0].mId)">
                  <img
                    :src="Bill[2].img"
                    class="d-block w-100"
                    alt="此处为图片描述"
                  />
                </a>
              </div>
              <div class="carousel-item" data-interval="4000">
                <a href="javasrcipt:;" @click="detailJump(Bill[0].mId)">
                  <img
                    :src="Bill[3].img"
                    class="d-block w-100"
                    alt="此处为图片描述"
                  />
                </a>
              </div>
              <div class="carousel-item" data-interval="4000">
                <a href="javasrcipt:;" @click="detailJump(Bill[0].mId)">
                  <img
                    :src="Bill[4].img"
                    class="d-block w-100"
                    alt="此处为图片描述"
                  />
                </a>
              </div>
            </div>
            <!-- 轮播图两侧的按钮 -->
            <a
              class="carousel-control-prev"
              href="#carousel"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carousel"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
		return{
      Bill:[
        {mId:0,img:''},
        {mId:0,img:''},
        {mId:0,img:''},
        {mId:0,img:''},
        {mId:0,img:''}
      ]
		}
  },
  create(){
    getBill();
  },
  methods:{
    // 获取电影轮播图信息
    getBill(){
      this.$axios.get("").then((response) => {
        const {status,data: { code, success ,data}} = response;
        if (status === 200 && code === 1) {
            this.Bill=data;           
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
}
</script>

<style lang="less" scoped>
#carousel-jum {
	background-color: #2e343b;
}
</style>