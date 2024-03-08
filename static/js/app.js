let deferredPrompt;

if (!window.Promise) {
    window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then(function () {
            console.log('Service worker registered!');
        })
        .catch(function(err) {
            console.log(err);
        });
}else{
}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

function parse_snakecase(text) {
    return text.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function render_workout_cards() {
    const container = $('#workout_container')
    const workouts = JSON.parse(localStorage.getItem('workouts'));

    Object.entries(workouts).forEach(([key, value]) => {
        const s_cat = (value.category === 'Strength')? 'str' : '';
        const workout_name = parse_snakecase(key)
        container.append(`
            <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="card" onclick="get_workout_detail('${key}')">
                    <i class="${value.icon} workout_logo"></i>
                    <h1 class="card-title">${workout_name}</h1>
                    <div class="go-corner">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div class="badge_container">
                        <span class="badge ${s_cat}">${value.category}</span>
                    </div>
                </div>
            </div>
            `)
    })
}

function get_workout_detail(workout_pk) {
    const workout_url = `https://test1-ambw-default-rtdb.asia-southeast1.firebasedatabase.app/workout_details/wd_${workout_pk}.json`;
    let wd_retrieved = false;
    sessionStorage['current_page'] = workout_pk;

    if (!sessionStorage.getItem(workout_pk)) {
        fetch(workout_url)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                wd_retrieved = true;

                sessionStorage.setItem(workout_pk, JSON.stringify(data))
                window.location.href = 'workout_detail.html';
            })
            .catch(function (error) {
                window.location.href = 'offline.html';
            });
    } else {
        window.location.href = 'workout_detail.html';
    }
}