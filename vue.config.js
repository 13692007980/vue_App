const data = require('./data/header-data.json')
const header = data.header
const songmenu = data.songmenu
const musicpor = data.musicpor
const gdcontent = data.gdcontent
const phbcontent = data.phbcontent
const searchMusic = data.searchMusic
const musicList = data.musicList

module.exports = {
    configureWebpack: {
        devServer: {
            before(app){
                app.get('/api/header',function(req,res){
                    res.json({ data: header });
                });
                app.get('/api/songmenu',function(req,res){
                    res.json({ data: songmenu });
                });
                app.get('/api/musicpor',function(req,res){
                    res.json({ data: musicpor });
                });
                app.get('/api/gdcontent',function(req,res){
                    res.json({ data: gdcontent });
                });
                app.get('/api/phbcontent',function(req,res){
                    res.json({ data: phbcontent });
                });
                app.get('/api/searchMusic',function(req,res){
                    res.json({ data: searchMusic });
                });
                app.get('/api/musicList',function(req,res){
                    res.json({ data: musicList });
                });
            },
            proxy: {
                "/gd": {
                    target: "https://api.apiopen.top/",
                    changeOrigin: true,
                    pathRewrite: { "^/gd": "" }
                },
                "/kg": {
                    target: "http://mobilecdnbj.kugou.com/",
                    changeOrigin: true,
                    pathRewrite: { "^/kg": "" }
                }
            }
        }
        
    }
}