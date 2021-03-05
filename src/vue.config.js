export default {
    devServer : {
        proxy : {
            '/ajax' : {
                target : 'http://m.maizuo.com',
                changeOrigin : true
            }
        }
    }
}