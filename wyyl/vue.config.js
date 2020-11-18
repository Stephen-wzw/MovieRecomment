module.exports={
   devServer:{
       open:true,
       port:3000,
       https: false,
       host: 'localhost',
       proxy: {
        '/api': {
            target: 'http://localhost:8081', // 后端端口修改
            secure: false,
            ws: true,
            changeOrigin: true,
            pathRewrite:{
                '^/api' : '',
            }
        }
    }, // 配置多个代理
   },
   lintOnSave: false   // 取消 eslint 验证
}