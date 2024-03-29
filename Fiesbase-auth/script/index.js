const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if (user) {
        if(user.admin) {
            adminItems.forEach(item => item.style.display= 'block')
        }
        //account Info
        db.collection('users').doc(user.uid).get().then(doc => { 
            const html = `
            <div>Loggen In As ${user.email}</div>
            <div>${doc.data().bio}</div>
            <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
            `;
            accountDetails.innerHTML = html;  
        });
        //Toggel UI Elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none')
    } else {
        adminItems.forEach(item => item.style.display= 'none')
        // Hide Account Info
        accountDetails.innerHTML = '';
        //Toggel UI Elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block')
    }
}

//Setup Guides
const setupGuides = (data) => {

    if(data.length) {
        let html = '';

        data.forEach(doc => {
            const guide = doc.data();
            const li = `
            <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white">${guide.content}</div>
            </li>
            `;
            html += li
        });
        guideList.innerHTML = html;
    } else {
        guideList.innerHTML = `<h5 style="text-align: center;">Loggin To View Guides</h5>`
    }
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});