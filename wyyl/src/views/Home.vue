<template>
    <!-- 电影首页 -->
    <div id="app">
        <Navigation></Navigation>
        <Login></Login>
        <Logon></Logon>
        <PlayBill></PlayBill>
        <Recommend></Recommend>
        <Hot></Hot>
        <End></End>
    </div>
</template>

<script>
import Navigation from '../components/Navigation'
import PlayBill from '../components/Home/PlayBill'
import Recommend from '../components/Home/Recommend'
import Hot from '../components/Home/Hot'
import End from '../components/End'
import Login from '../components/Login'
import Logon from '../components/Logon'

export default {
    name:'app',
    components:{
        Navigation,
        PlayBill,
        Recommend,
        Hot,
        End,
        Login,
        Logon
    }
}
</script>

<style lang="less" scoped>

</style>