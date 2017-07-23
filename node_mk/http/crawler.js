const http = require('http');
const cheerio = require('cheerio');
const url = 'http://www.baidu.com';

http.get(url, function(res){
    console.log(res.statusCode)
    res.setEncoding('utf8');
    let html = '';
    res.on('data', (data)=>{
        html += data;
    })
    res.on('end', ()=>{
        // let courseData = filterChapters(html)
        // renderData(courseData)
        console.log(html)
    })
}).on('error', function(){
    console.log('获取课程数据出错')
})

function filterChapters(html){
    let $ = cheerio.load(html)
    let chapters = $('.chapter')

    //TODO mock
    // [{
    //     chapterTitle:'',
    //     videos:[{
    //         title,
    //         id
    //     }]
    // }]

    let courseData = [];

    chapters.each(function(item){
        let chapter = $(this);
        let chapterTitle = chapter.find('strong').text();
        let videos = chapter.find('.video').children('li')

        let chapterData = {
            chapterTitle,
            videos: []
        }

        videos.each(function(item){
            let video = $(this).find('.J-media-item'),
                videoTitle = video.text(),
                id = video.data('media-id');

            chapterData.videos.push({
                videoTitle,
                id
            })

        })
        courseData.push(chapterData)
    })
    return courseData
}

function renderData(courseData){
    courseData.forEach(function(item){
        console.log(item.chapterTitle + '\n')

        item.videos.forEach(function(video){
            console.log(`[${video.id}] --- ${video.videoTitle} \n`)
        })
    })
}

// http.get('http://nodejs.org/dist/index.json', (res) => {
//   const statusCode = res.statusCode;
//   const contentType = res.headers['content-type'];

//   let error;
//   if (statusCode !== 200) {
//     error = new Error(`Request Failed.\n` +
//                       `Status Code: ${statusCode}`);
//   } else if (!/^application\/json/.test(contentType)) {
//     error = new Error(`Invalid content-type.\n` +
//                       `Expected application/json but received ${contentType}`);
//   }
//   if (error) {
//     console.log(error.message);
//     // consume response data to free up memory
//     res.resume();
//     return;
//   }

//   res.setEncoding('utf8');
//   let rawData = '';
//   res.on('data', (chunk) => rawData += chunk);
//   res.on('end', () => {
//     try {
//       let parsedData = JSON.parse(rawData);
//       console.log(parsedData);
//     } catch (e) {
//       console.log(e.message);
//     }
//   });
// }).on('error', (e) => {
//   console.log(`Got error: ${e.message}`);
// });