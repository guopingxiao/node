const http = require('http')
const querystring = require('querystring')

let postData = querystring.stringify({
    'content':'我来测试一下，不要封号哈',
    'cid':8837
})

let options ={
    hostname: 'www.imooc.com',
    port: 80,
    path: '/course/docomment',
    method:'POST',
    headers:{
        'Accept':'application/json, text/javascript', 
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
        'Connection':'keep-alive',
        'Content-Length':postData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'imooc_uuid=eb431d93-a6d0-4c2d-b0ad-0edceb3fe02f; imooc_isnew_ct=1488176133; loginstate=1; apsid=czN2U0ZjFlNjVlMmZmMzBkYWYyMzZkMTg4NDQ2ZDIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTg3ODUyMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3NjUxNjY5NjFAcXEuY29tAAAAAAAAAAAAAAAAAAAAADBmOWQ2Y2RiMzIyNGVlMmE3MGY2MTk0ZTNjMTM3MGJitGFaWbRhWlk%3DYj; last_login_username=765166961%40qq.com; PHPSESSID=5un3d2m08mf3c7eh552g86v5o2; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1500687999,1500688322,1500707163,1500798352; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1500823132; imooc_isnew=2; cvde=5972ae86490fe-243',
        'Host':'www.imooc.com',
        'Origin':'http://www.imooc.com',
        'Referer':'http://www.imooc.com/video/8837',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
        'X-Requested-With':'XMLHttpRequest'
    }
}

const req = http.request(options, function(res){
    console.log(`status: ${res.statusCode}`)
    console.log(`headers: ${JSON.stringify(res.headers)}`)

    res.on('data', function(chunk){
        console.log(Buffer.isBuffer(chunk))
        console.log(typeof chunk)
    })

    res.on('end', function(){
        console.log('评论完毕')
    })
})

req.on('error', function(){
    console.log(`Error:${e.message}`)
})

req.write(postData)

req.end();

