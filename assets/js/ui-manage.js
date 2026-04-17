
import TaskData, { updateStatus } from "./task-data.js"
const taskItemEl = document.querySelector(".task-item")
const taskItemEditEl = document.querySelector(".task-item-edit")


export function toggleEditMode() {
    taskItemEl.classList.toggle("hide")
    taskItemEditEl.classList.toggle("hide")
}


export async function propagateTaskDataToUI() {
    const TaskData = await import("./task-data.js").then(res => res.default)

    const checkBoxEl = document.querySelector('[type="checkbox"]')
    const titleEl = document.querySelector(".task-title")
    const descriptionEl = document.querySelector(".task-description")
    const dueDateEl = document.querySelector(".due-date")
    const statusEl = document.querySelector("select.task-status")
    const priorityEl = document.querySelector(".task-priority")

    const date = new Date(TaskData.dueDate)

    titleEl.textContent = TaskData.title
    descriptionEl.textContent = TaskData.description
    dueDateEl.setAttribute("datetime", TaskData.dueDate)
    dueDateEl.textContent = date.toDateString()
    priorityEl.textContent = TaskData.priority
    statusEl.value = TaskData.status


    taskItemEl.setAttribute("task-priority", TaskData.priority)
    taskItemEl.setAttribute("task-status", TaskData.status)


    if (TaskData.status == "done") checkBoxEl.checked = true
    if (TaskData.status == "pending") checkBoxEl.checked = false

    updateTimeRemaining(new Date(TaskData.dueDate))
    handleDescriptionCollapsing()
}




function getTimeRemaining() {
    const diff = new Date(TaskData.dueDate) - Date.now();
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

export function updateTimeRemaining() {
    const el = document.querySelector('.time-remaining');

    if (TaskData.status == "done") {
        el.textContent = "Completed"
        el.classList.remove("overdue")
        return
    }
    const { text, overdue } = getTimeRemaining();
    el.textContent = text;
    el.classList.toggle('overdue', overdue);
}



function editEventAction(e) {
    toggleEditMode()
}

export function handleActionButtons() {

    const editBtnEl = document.querySelector(".task-edit-btn")
    const deleteBtnEl = document.querySelector(".task-delete-btn")

    editBtnEl?.addEventListener("click", editEventAction)

    deleteBtnEl?.addEventListener("click", e => {
        alert("Delete Item")
    })
}



export function handleStatusOptionChange() {

    const selectEl = document.querySelector('select.task-status')

    selectEl?.addEventListener("change", e => {

        updateStatus(e.target.value)
        propagateTaskDataToUI()

    })
}


export function handleCheckChange() {

    const checkboxInputEl = document.querySelector('[type="checkbox"]')
    const taskItemEl = document.querySelector(".task-item")
    const taskItemStatusEl = document.querySelector(".status")



    checkboxInputEl?.addEventListener("change", e => {
        const isChecked = e.target.checked

        if (isChecked) {
            updateStatus("done")
            taskItemEl.classList.add("completed")
        } else {
            taskItemEl.classList.remove("completed")
            updateStatus("pending")
        }

        propagateTaskDataToUI()

    })
}


function handleDescriptionCollapsing() {
    const canCollapse = TaskData.description.length > 400

    const toggleDescriptionBtnEl = document.querySelector(".toggle-description")

    if (canCollapse) toggleDescriptionBtnEl.classList.toggle("hide")
    else toggleDescriptionBtnEl.classList.remove("hide")

    const collapseableEl = document.querySelector(".collapseable")


    toggleDescriptionBtnEl.textContent = "E"
    toggleDescriptionBtnEl.setAttribute("title", "Expand")
    toggleDescriptionBtnEl.setAttribute("aria-label", "Expand")


    toggleDescriptionBtnEl.addEventListener("click", () => {
        collapseableEl.classList.toggle("expand")
        console.log("C: ", collapseableEl.classList.contains("expand"))
        if (!collapseableEl.classList.contains("expand")) {
            toggleDescriptionBtnEl.textContent = "E"
            toggleDescriptionBtnEl.setAttribute("aria-label", "Expand")
            toggleDescriptionBtnEl.setAttribute("title", "Expand")
        } else {
            toggleDescriptionBtnEl.textContent = "C"
            toggleDescriptionBtnEl.setAttribute("aria-label", "Collapse")
            toggleDescriptionBtnEl.setAttribute("title", "Collapse")

        }
    })


}