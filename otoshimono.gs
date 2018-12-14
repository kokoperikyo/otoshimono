function saveImage(url) {
  var folderId = '1YPN_HljjprhHbQldy6Kj2HSnnIQxhtX2'; // ここに保存先GoogleドライブID
  var today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'YYYY-MM-dd');
  var value = url + '?d=' + today;
  var requestUrl = 'https://blinky.nemui.org/shot?uri=' + encodeURIComponent(value) + ';noresize=true;win_x=1000;effect=false;keepratio=true';
  try {
    UrlFetchApp.fetch(requestUrl); // ここで1回リクエストを送って画像を作らせる
    Utilities.sleep(1000 * 60); // 画像出来上がるまでn分待機
    var image = UrlFetchApp.fetch(requestUrl).getBlob(); // ここで画像DL
    var folder = DriveApp.getFolderById(folderId);
    folder.createFile(image).setName("test");
  } catch (e) {
     Logger.log(e);
  }
}

function makeURLs(){
  //yahooと２チャンネルのURL
  var urls = [
      { front: 'https://search.yahoo.co.jp/realtime/search;_ylt=A2RimE1PIxNcYgMAhA1ol_p7?p=', back: '&ei=UTF-8' },
      { front: 'http://find.2ch.sc/?STR=', back: '&COUNT=50&TYPE=TITLE&BBS=ALL' },
  ];
  //yahoo用の検索ワード
  var wordForYahoo = ['%e4%b8%89%e9%b7%b9%e3%81%a1%e3%81%97%e3%82%8d%e3%81%ae%e6%9c%a8%e4%bf%9d%e8%82%b2%e5%9c%92','%e3%81%a1%e3%81%97%e3%82%8d%e3%81%ae%e6%9c%a8%e4%bf%9d%e8%82%b2%e5%9c%92','%e3%81%a1%e3%81%97%e3%82%8d%e3%81%ae%e6%9c%a8','%e7%a4%be%e4%bc%9a%e7%a6%8f%e7%a5%89%e6%b3%95%e4%ba%ba%e3%81%a1%e3%81%97%e3%82%8d%e3%81%ae%e6%a3%ae','%e3%81%a1%e3%81%97%e3%82%8d%e3%81%ae%e6%a3%ae'];
  //２チャン用の検索ワード
  var wordForNichann = ['%BB%B0%C2%EB%A4%C1%A4%B7%A4%ED%A4%CE%CC%DA%CA%DD%B0%E9%B1%E0','%A4%C1%A4%B7%A4%ED%A4%CE%CC%DA%CA%DD%B0%E9%B1%E0','%A4%C1%A4%B7%A4%ED%A4%CE%CC%DA','%BC%D2%B2%F1%CA%A1%BB%E3%CB%A1%BF%CD%A4%C1%A4%B7%A4%ED%A4%CE%BF%B9','%A4%C1%A4%B7%A4%ED%A4%CE%BF%B9'];

  //yahooの時と２ちゃんの時で分岐してURLを作成してsaveImageに渡してあげる
  urls.forEach(function( url,index ) {
    if (index == 0) {
      wordForYahoo.forEach(function( word ) {
        // console.log( url.front + word + url.back );
        saveImage(url.front + word + url.back);
      });
    }else{
      wordForNichann.forEach(function( word ) {
        // console.log( url.front + word + url.back );
        saveImage(url.front + word + url.back);
      });
    }

   });
}
