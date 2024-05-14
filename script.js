let aadharValid = false;
let voterValid = false;

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById('submit-ans');
    submitButton.disabled = true;
    submitButton.style.backgroundColor='#809cb9';

    document.getElementById('aadhar-verify').addEventListener('click', validaadhar);
    document.getElementById('voter-verify').addEventListener('click', validvoter);
    document.getElementById('submit-ans').addEventListener('click', submitForm);
    document.getElementById('voterid').addEventListener('focusin', function () { changecolor1('voterid') });
    document.getElementById('Aadhar').addEventListener('focusin', function () { changecolor1('Aadhar') });
    document.getElementById('voterid').addEventListener('focusout', function () { changecolor2('voterid') });
    document.getElementById('Aadhar').addEventListener('focusout', function () { changecolor2('Aadhar') });

    function checkValidation() {
        if (aadharValid && voterValid) {
            submitButton.disabled = false;
            submitButton.style.backgroundColor='#007bff';
        } else {
            submitButton.disabled = true;
            submitButton.style.backgroundColor='#809cb9';
        }
    }

    function changecolor1(id) {
        document.getElementById(id).style.backgroundColor = 'aqua';
    }

    function changecolor2(id) {
        document.getElementById(id).style.backgroundColor = '';
    }

    function validaadhar() {
        const aadhar = document.getElementById('Aadhar').value;
        if (aadhar==='') {
            alert('Field Must not be empty');
            return;
        }
        if (aadhar.length !== 12) {
            alert('Aadhar must be in the length 12')
            return;
        }
        var regex = /^[a-zA-Z]+$/;
        if (regex.test(aadhar)) {
            alert('Aadhar must contain only number');
            return;
        }

        regex = /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)/;
        if (regex.test(aadhar)) {
            aadharValid = true;
            document.getElementById('Aadhar').disabled=true;
            alert('Aadhar Number is in Valid Format');
        }
        else {
            alert('Aadhar is not in valid format.Must contain only number')
        }
        checkValidation();
    }

    function validvoter() {
        const voter = document.getElementById('voterid').value;

        if (voter==='') {
            alert('Field Must not be empty');
            return;
        }
        if (voter.length !== 10) {
            alert('Voter ID must Contain 10 Character and in format of ABC1234567');
            return;
        }
        const regex = /^[A-Za-z]{3}\d{7}$/;
        if (regex.test(voter)) {
            voterValid = true;
            document.getElementById('voterid').disabled=true;
            alert('Voter id is in Valid Format');
        }
        else {
            alert('Voter id is not in valid format. Format - ABC1234567');
        }
        checkValidation();
    }

    function submitForm() {
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('e-mail').value;
        const aadhar= document.getElementById('Aadhar').value;
        const vote=document.getElementById('voterid').value;

        if (name === '') {
            alert('Name field must not be empty');
            return;
        }

        if (isNaN(age) || age === '' || age < 18) {
            alert('Age must be a number greater than or equal to 18');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format');
            return;
        }

        const data = {
            'Name': name,
            'Age': age,
            'Email': email,
            'Aadhar':aadhar,
            'VoterId':vote
        };

        const table = document.createElement('table');
        const tbody = document.createElement('tbody');

        for (const key in data) {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.textContent = key + ':';
            const td2 = document.createElement('td');
            td2.textContent = data[key];
            tr.appendChild(td1);
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        document.body.appendChild(table);
    }
});
