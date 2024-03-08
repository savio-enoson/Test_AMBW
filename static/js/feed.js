const init_url = 'https://test1-ambw-default-rtdb.asia-southeast1.firebasedatabase.app/workout.json';
let networkDataReceived = false;

if ('indexedDB' in window) {
    readAllData('workouts')
    .then(function (data) {
        console.log("data in indexedDB");
        console.log(data)
    });
}

fetch(init_url)
.then(function (res) {
  return res.json();
})
.then(function (data) {
  networkDataReceived = true;
  console.log("fetched data from web");
  console.log(data)
  localStorage.setItem('workouts', JSON.stringify(data));
});




