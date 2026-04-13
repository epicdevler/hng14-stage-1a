
const dueDateEl = document.querySelector(".due-date")

const DUE_DATE = new Date(dueDateEl.getAttribute("datetime"))


function getTimeRemaining() {
    const diff = DUE_DATE - Date.now();
    const mins = Math.round(diff / 60000);
    if (diff < 0) {
        const absMins = Math.abs(mins);
        if (absMins < 60) return { text: 'Overdue by ' + absMins + ' min' + (absMins !== 1 ? 's' : ''), overdue: true };
        if (absMins < 1440) return { text: 'Overdue by ' + Math.round(absMins / 60) + ' hr' + (Math.round(absMins / 60) !== 1 ? 's' : ''), overdue: true };
        return { text: 'Overdue by ' + Math.round(absMins / 1440) + ' day' + (Math.round(absMins / 1440) !== 1 ? 's' : ''), overdue: true };
    }
    if (mins === 0) return { text: 'Due now!', overdue: false };
    if (mins < 60) return { text: 'Due in ' + mins + ' min' + (mins !== 1 ? 's' : ''), overdue: false };
    if (mins < 1440) return { text: 'Due in ' + Math.round(mins / 60) + ' hr' + (Math.round(mins / 60) !== 1 ? 's' : ''), overdue: false };
    if (mins < 2880) return { text: 'Due tomorrow', overdue: false };
    return { text: 'Due in ' + Math.round(mins / 1440) + ' days', overdue: false };
}

function updateTimeRemaining() {
    const el = document.querySelector('.time-remaining');
    const { text, overdue } = getTimeRemaining();
    el.textContent = text;
    el.classList.toggle('overdue', overdue);
}

updateTimeRemaining();
setInterval(updateTimeRemaining, 60000);






function handleTaskStatus() {

    const checkboxInputEl = document.querySelector('[type="checkbox"]')
    const taskItemEl = document.querySelector(".task-item")
    const taskItemStatusEl = document.querySelector(".status")

    checkboxInputEl?.addEventListener("change", e => {
        const isChecked = e.target.checked

        taskItemEl.classList.toggle("completed")
        if (isChecked) {
            taskItemStatusEl.innerHTML = "Done"
        } else {
            // taskItem.classList.toggle("completed")
            taskItemStatusEl.innerHTML = "Pending"
        }

    })
}

function handleActionButtons() {


    const editBtnEl = document.querySelector(".task-edit-btn")
    const deleteBtnEl = document.querySelector(".task-delete-btn")

    editBtnEl?.addEventListener("click", e => {
        alert("Edit Item")
    })

    deleteBtnEl?.addEventListener("click", e => {
        alert("Delete Item")
    })
}




handleActionButtons()

handleTaskStatus()