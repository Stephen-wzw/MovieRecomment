<template>
    <!-- 电影分类导航页面 -->
    <div id="app">
        <Navigation></Navigation>
        <Login></Login>
        <Logon></Logon>
        <Classify></Classify>
        <MovieList></MovieList>
        <Paging></Paging>
        <End></End>
    </div>
</template>

<script>
import Navigation from '../components/Navigation'
import Classify from '../components/Class/Classify'
import MovieList from '../components/Class/MovieList'
import Paging from '../components/Class/Paging'
import End from '../components/End'
import Login from '../components/Login'
import Logon from '../components/Logon'

export default {
    name:'app',
    components:{
        Navigation,
        Classify,
        MovieList,
        Paging,
        End,
        Login,
        Logon
    }
}


</script>

<style lang="less" scoped>
//深层选择，改变样式，当跳到分类页面时，字体颜色加深
/deep/ #s-active{
    color: #000;
}
</style>
