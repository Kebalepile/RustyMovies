package spider

// pesudo code
// go to http://www.streamlord.com/index.html
// execute javascript code
// var mLists = Array.from(document.querySelectorAll("#movieslist"));
// var categories = {"latest":null, "featured":null};
// if (mLists.length){
// mLists.forEach((l,i) => {
// i === 0 ? categories.featured = document.querySelectorAll(".item.movie"): categories.latest = document.querySelectorAll(".item.movie")
// });
// categories.featured = categories.featured.map(i => {
// const data = {}
// const img i.querySelector('a img');
// data.poster = img.src;
// data.href = i.parentElement.href;
// data.title = data.href.match(/watch-movie-(.*?)-\d+\.html/)[1].replaceAll("-", " ");
// return data;
// });
//categories.latest =  categories.latest.map(i => {
// const data = {}
// const img i.querySelector('a img');
// data.poster = img.src;
// data.href = i.parentElement.href;
// data.title = data.href.match(/watch-movie-(.*?)-\d+\.html/)[1].replaceAll("-", " ");
// return data;
// });
// return categories;
// }
// use golang
// for _, data := range  categories.features {
// navigate to data.href
// check if url location is same as data.href
// execute javaScript code

// const iframe = document.querySelector("#iframe");
// return iframe.src;

// }
