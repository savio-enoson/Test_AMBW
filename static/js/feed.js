const init_url = 'https://test1-ambw-default-rtdb.asia-southeast1.firebasedatabase.app/workout.json';
let networkDataReceived = false;

fetch(init_url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      networkDataReceived = true;
      // alert("fetched data from web");
      // console.log(data);
      localStorage.setItem('workouts', JSON.stringify(data));
    });

if ('indexedDB' in window) {
  readAllData('classes')
      .then(function (data) {
        if (!networkDataReceived) {
          // alert("data in cache");
        }
      });
}



