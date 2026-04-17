import { toggleEditMode, propagateTaskDataToUI } from "./ui-manage.js"
import TaskData from "./task-data.js"

const formEl = document.forms.taskEditForm


const titleEl = formEl.querySelector("[name='task_title']")
const descriptionEl = formEl.querySelector("[name='task_description']")
const priorityEl = formEl.querySelector("[name='task_priority']")
const dueDateEl = formEl.querySelector("[name='due_date']")


const cancelEdit = formEl.querySelector(".task-cancel-btn")


titleEl.value = TaskData.title
descriptionEl.value = TaskData.description
priorityEl.value = TaskData.priority
dueDateEl.value = TaskData.dueDate

cancelEdit.addEventListener("click", () => {
    toggleEditMode()
})

formEl.addEventListener("submit", event => {
    event.preventDefault()



    // CLEAR POSSIBLE ERROR STATES
    titleEl.parentElement.classList.remove("invalid")
    descriptionEl.parentElement.classList.remove("invalid")
    priorityEl.parentElement.classList.remove("invalid")
    dueDateEl.parentElement.classList.remove("invalid")

    const titleV = titleEl.value?.trim()
    const descriptionV = descriptionEl.value?.trim()
    const priorityV = priorityEl.value?.trim()
    const dueDateV = dueDateEl.value?.trim()

    if (titleV && descriptionV && priorityV && dueDateV) {
        /* NO FIELD ERROR SAVE DATA */
        TaskData.title = titleV
        TaskData.description = descriptionV
        TaskData.priority = priorityV
        TaskData.dueDate = dueDateV

        propagateTaskDataToUI()
        toggleEditMode()
    }


    // HANDLE FIELD ERRORS
    if (!titleV) {
        titleEl.setAttribute("aria-invalid", "true")
        titleEl.parentElement.classList.toggle("invalid")
    }
    if (!descriptionV) {
        descriptionEl.setAttribute("aria-invalid", "true")
        descriptionEl.parentElement.classList.toggle("invalid")
    }
    if (!priorityV) {
        priorityEl.setAttribute("aria-invalid", "true")
        priorityEl.parentElement.classList.toggle("invalid")
    }
    if (!dueDateV) {
        dueDateEl.setAttribute("aria-invalid", "true")
        dueDateEl.parentElement.classList.toggle("invalid")
    }



    // if(titleEl.value)
})


