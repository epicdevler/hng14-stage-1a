const TaskData = {
    title: "Title",
    description: "Create wireframes and high-fidelity mockups for the new marketing landing page, covering both mobile and desktop breakpoints. - Create wireframes and high-fidelity mockups for the new marketing landing page, covering both mobile and desktop breakpoints.",
    dueDate: "2026-04-16T23:59:00",
    priority: "high",
    status: "done",
}


export default TaskData


export function updateData(data){
    TaskData.title = data.title
    TaskData.description = data.description
    TaskData.dueDate = data.dueDate
    TaskData.priority = data.priority
    TaskData.status = data.status
}
export function updateStatus(status){
    TaskData.status = status
}