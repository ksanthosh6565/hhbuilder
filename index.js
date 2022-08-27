// your code goes here ...
window.onload = function () {
    const householdLists = [];

    const init = function () {
        loadListeners();
    };

    const getElements = function () {
        return {
            formEl: document.querySelector(".builder form"),
            ageEl: document.getElementById('age'),
            relEl: document.getElementById('rel'),
            smokerEl: document.getElementById('smoker'),
            addBtn: document.getElementsByClassName("add")[0],
            debugEl: document.getElementsByClassName("debug")[0]
        }
    }

    const loadListeners = function () {
        const { formEl, ageEl, relEl, smokerEl, addBtn, debugEl } = getElements();
        
        addBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (validateForm()) {
                const existIndex = householdLists.findIndex(function (houseHold) {
                    return houseHold.rel === relEl.value;
                });

                const newHousehold = {
                    age: ageEl.value,
                    rel: relEl.value,
                    smoker: smokerEl.checked
                };

                if (existIndex > -1) {
                    householdLists[existIndex] = newHousehold;
                } else {
                    householdLists.push(newHousehold);
                }

                updateHouseholdList();
                resetForm();
            }

            return;
        });

        formEl.addEventListener('submit', function (e) {
            
            e.preventDefault();
            debugEl.innerHTML = JSON.stringify(householdLists);
            debugEl.style.display = "block";
        });
    };

    const validateForm = function () {
        const { ageEl, relEl } = getElements();
        let isValid = true;

        ageEl.parentElement.style.color = 'initial';
        ageEl.style.border = '';
        relEl.parentElement.style.color = 'initial';
        relEl.style.border = '';

        if (!ageEl.value || parseInt(ageEl.value) === 0) {
            ageEl.parentElement.style.color = 'red';
            ageEl.style.border = '1px solid red';
            isValid = false;
        }

        if (relEl.value === '') {
            relEl.parentElement.style.color = 'red';
            relEl.style.border = '1px solid red';
            isValid = false;
        }
        
        return isValid;
    }

    const resetForm = function () {
        const { ageEl, relEl, smokerEl } = getElements();

        ageEl.value = '';
        relEl.value = '';
        smokerEl.checked = false;
    };

    const updateHouseholdList = function () {
        let householdDetails = '';

        householdLists.forEach(function (houseHold) {
            householdDetails += `
                <tr>
                    <td>${houseHold.rel}</td>
                    <td>${houseHold.age}</td>
                    <td>${houseHold.smoker ? 'Yes' : 'No'}</td>
                </tr>
            `;
        })

        const houseHoldTbl = `
            <div>
                <ol class="household">Household details</ol>
                <table>
                    <tr>
                        <th>Relationship</th>
                        <th>Age</th>
                        <th>Is Smoker ?</th>
                    </tr>
                    ${householdDetails}
                </table>
            </div>
        `;

        document.getElementsByClassName('household-details')[0].innerHTML = houseHoldTbl;
    };

    init();
}