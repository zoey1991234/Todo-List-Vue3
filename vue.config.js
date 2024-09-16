const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost', // 或 '0.0.0.0' 允許來自所有地址的連接
    port: 8080, // 默認端口，如果你的伺服器在其他端口，請調整
    hot: true, // 啟用熱重載
    open: true, // 啟動伺服器後自動打開瀏覽器
    proxy: {
      // 如果你的 API 伺服器在不同端口，這樣配置可以解決跨域問題
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
    
  }
});
