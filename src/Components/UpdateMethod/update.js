

const update = async (user) => {
    let response = await fetch('https://damp-caverns-01669.herokuapp.com/updateUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(user)
    }).then((data) => data.json());
    if (response.code === 'green') {
        localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
}

const pushToHistory = async (user, video) => {
    if (user) {
        let flag = false;
        let resp = ''
        for (let i in user.history) {
            if (user.history[i].id.videoId === video.id.videoId) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            const usr = { ...user };
            usr.history.push(video);
            resp = await update(usr);
        }
        return resp
    }
}

module.exports = { update, pushToHistory }