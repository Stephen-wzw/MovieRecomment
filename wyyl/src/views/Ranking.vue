<template>
    <!-- 电影排行榜页面 -->
    <div id="app">
        <Navigation></Navigation>
        <Login></Login>
        <Logon></Logon>
        <RankingList></RankingList>
        <End></End>
    </div>
</template>

<script>
import Navigation from '../components/Navigation'
import RankingList from '../components/Ranking/RankingList'
import End from '../components/End'
import Login from '../components/Login'
import Logon from '../components/Logon'

export default {
    name:'app',
    components:{
        Navigation,
        RankingList,
        End,
        Login,
        Logon
    }
}
</script>


<style lang="less" scoped>
//深层选择，改变样式，当跳到分类页面时，字体颜色加深
/deep/ #r-active{
    color: #000;
}
</style>
