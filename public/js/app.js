
"use strict";

(function ($) {
    $(document).ready(function() {
        if($(".tasks-container").length){
            // Get all user tasks.
            fetchTasks();
        }
        // Open the create new task form 
        $(document).on('click', '#task-action-new', function(){
            $('#new-task-form').modal('show');
        });
        // Handle the creation of a task function
        $(document).on('click', '#createNewTask', function(){
            $("#new-task-form .error-result").html('')
            const title = $("#taskTitle").val().trim();
            const description = $("#taskDescription").val().trim();
            const date = $("#taskDate").val().trim();
            if (title == ""){
                $("#new-task-form .error-result").append(renderHTMLElement('p', {}, 'You need to fill the Task title.'));
            }
            if (description == ""){
                $("#new-task-form .error-result").append(renderHTMLElement('p', {}, 'You need to fill the Task description.'));
            }
            if (date == ""){
                $("#new-task-form .error-result").append(renderHTMLElement('p', {}, 'You need to fill the Task date.'));
            }
            if (title == "" || description == "" || date == ""){
                return;
            }
            createNewTask(title, description, date)
        });
        // Handle the open task function
        $(document).on('click', '.task-action-open', function(){
            const taskId = parseInt($(this).data('taskid'));
            if (taskId > 0){
                openTask(taskId);
            }else{
                console.error('Error with the task id to open')
            }
        });
        // Handle the pre-delete task function (it will confirm before actually delete the task)
        $(document).on('click', '.task-action-delete, #deleteInModalButton', function(){
            const taskId = parseInt($(this).data('taskid'));
            if (taskId > 0){
                askBeforeDeleteTask(taskId);
            }else{
                console.error('Error with the task id to delete')
            }
        });
        // Handle the delete task function
        $(document).on('click', '#deleteTaskConfirmation', function(){
            const taskId = parseInt($("#taskIdToDelete").val());
            if (taskId > 0){
                deleteteTast(taskId);
            }else{
                console.error('Error with the task id to delete')
            }
        });
        // Handle the complete task function
        $(document).on('click', '.task-action-done, #maskAsDoneInModalButton', function(){
            const taskId = parseInt($(this).data('taskid'));
            if (taskId > 0){
                completeTask(taskId);
            }else{
                console.error('Error with the task id to complete')
            }
        });
    });
})(jQuery);

function createNewTask(title, description, date){
    $.ajax({
        url: '/tasks',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "title": title,
            "description": description,
            "expiration": date,
            "status": 0
        }),
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
            $('#new-task-form').modal('hide');
            $("#taskTitle").val('')
            $("#taskDescription").val('')
            $("#taskDate").val('')
            console.log('Tasks retrieved:', response);
            fetchTasks();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error deleting tasks:', textStatus, errorThrown);
        }
    });
}

/**
 * Opens a task detail modal and retrieves task data from the server.
 *
 * This function displays a loading indicator in the task detail modal body,
 * then shows the modal. It performs an AJAX GET request to fetch task data
 * using the provided task ID. On successful retrieval, it logs the response
 * and displays the task details using the `displayASingleTask` function.
 * Logs an error message if the request fails.
 *
 * @param {number} taskId - The ID of the task to be retrieved and displayed.
 */
function openTask(taskId){
    $("#deleteInModalButton").data("taskid", taskId)
    $("#maskAsDoneInModalButton").data("taskid", taskId)
    addLoader("#task-detail .modal-body");
    
    $('#task-detail').modal('show');
    $.ajax({
        url: '/tasks/' + taskId,
        method: 'GET',
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
            console.log('Tasks retrieved:', response);
            displayASingleTask(response)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error retrieving tasks:', textStatus, errorThrown);
        }
    });
}

/**
 * Sends a PUT request to update the status of a task identified by taskId.
 * The request payload includes a JSON object with task details.
 * On success, logs the response and refreshes the task list by calling fetchTasks().
 * On error, logs an error message with details.
 *
 * @param {string} taskId - The unique identifier of the task to be updated.
 */
function completeTask(taskId){
    $.ajax({
        url: '/tasks/' + taskId,
        method: 'PUT',
        dataType: 'json',
        contentType: 'application/json', // Ensure the server knows you're sending JSON
        data: JSON.stringify({
            "status": 1
        }),
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
            console.log('Tasks retrieved:', response);
            fetchTasks();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error deleting tasks:', textStatus, errorThrown);
        }
    });
}

/**
 * Displays a confirmation modal before deleting a task.
 *
 * Sets the task ID to be deleted in a hidden input field and shows
 * the task deletion confirmation modal.
 *
 * @param {string} taskId - The ID of the task to be deleted.
 */
function askBeforeDeleteTask(taskId){
    $("#taskIdToDelete").val(taskId);
    $('#task-delete-confirmation').modal('show');
    
}

/**
 * Sends an AJAX request to delete a task by its ID.
 * 
 * @param {string} taskId - The ID of the task to be deleted.
 * 
 * The function makes a DELETE request to the server to remove the specified task.
 * On success, it hides the task deletion confirmation modal and refreshes the task list.
 * Logs an error message to the console if the request fails.
 */
function deleteteTast(taskId){
    $.ajax({
        url: '/tasks/' + taskId,
        method: 'DELETE',
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
            console.log('Tasks retrieved:', response);
            $('#task-delete-confirmation').modal('hide');
            fetchTasks();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error deleting tasks:', textStatus, errorThrown);
        }
    });
    
}

/**
 * Fetches tasks from the server using an AJAX GET request to the '/tasks' endpoint.
 * On success, logs the retrieved tasks to the console and displays them using the displayTasks function.
 * On error, logs an error message to the console with details of the failure.
 */
function fetchTasks() {
    addLoader("#tasks-result");
    $.ajax({
        url: '/tasks',
        method: 'GET',
        dataType: 'json',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) {
            console.log('Tasks retrieved:', response);
            displayTasks(response)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error retrieving tasks:', textStatus, errorThrown);
        }
    });
}

/**
 * Displays a single task's details in a modal dialog.
 *
 * This function renders the task's title, description, status, and due date
 * into a structured HTML format and inserts it into the modal body of the
 * task detail section. The task's status is displayed as a badge, indicating
 * whether it is 'Completed' or 'Not complete'. The due date is formatted
 * using the formatDate function.
 *
 * @param {Object} taskData - An object containing the task details.
 * @param {string} taskData.title - The title of the task.
 * @param {string} taskData.description - The description of the task.
 * @param {string} taskData.status - The status of the task, where '1' indicates completed.
 * @param {string} taskData.expiration - The expiration date of the task.
 */
function displayASingleTask(taskData){
    let statusHtml = renderHTMLElement('span', {'class': 'badge text-bg-secondary'}, 'Not complete');
    if(parseInt(taskData.status) == 1){
        statusHtml = renderHTMLElement('span', {'class': 'badge text-bg-success'}, 'Done');
    }
    $("#task-detail .modal-body").html(
        renderHTMLElement('div', {'class': 'container'}, [
            {
                'tag': 'h3',
                'attr': {'class': 'col'},
                'content': taskData.title
            },
            {
                'tag': 'table',
                'attr': {'class': 'table'},
                'content': [
                    {
                        'tag': 'tr',
                        'attr': {},
                        'content': [
                            {
                                'tag': 'td',
                                'attr': {},
                                'content': 'Description'
                            },
                            {
                                'tag': 'td',
                                'attr': {},
                                'content': taskData.description
                            },
                        ]
                    },
                    {
                        'tag': 'tr',
                        'attr': {},
                        'content': [
                            {
                                'tag': 'td',
                                'attr': {},
                                'content': 'Status'
                            },
                            {
                                'tag': 'td',
                                'attr': {},
                                'content': statusHtml
                            },
                        ]
                    },
                    {
                        'tag': 'tr',
                        'attr': {},
                        'content': [
                            {
                                'tag': 'td',
                                'attr': {},
                                'content': 'Due Date'
                            },
                            {
                                'tag': 'td',
                                'attr': {},
                                'content': formatDate(taskData.expiration)
                            },
                        ]
                    },
                ]
            },

        ])
    );
}

/**
 * Displays a list of tasks in the HTML element with the ID 'tasks-result'.
 * 
 * This function clears any existing content in the 'tasks-result' element and
 * appends a new set of task elements based on the provided tasks data. Each task
 * is rendered as a row containing columns for the task title, description, and
 * a button group with 'Open', 'Delete', and 'Done' actions.
 * 
 * @param {Array} tasksData - An array of task objects, where each object contains
 *                            'title', 'expiration', and 'description' and others properties.
 */
function displayTasks(tasksData) {
    const taskList = $('#tasks-result');
    taskList.empty(); 
    for (let index = 0; index < tasksData.length; index++) {
        let statusHtml = renderHTMLElement('span', {'class': 'badge text-bg-secondary'}, 'Not complete');
        if(parseInt(tasksData[index].status) == 1){
            statusHtml = renderHTMLElement('span', {'class': 'badge text-bg-success'}, 'Done');
        }
        taskList.append(renderHTMLElement('div', {'class': 'row single-task'}, [
            {
                'tag': 'div',
                'attr': {'class': 'col text-start align-middle'},
                'content': tasksData[index].title
            },
            {
                'tag': 'div',
                'attr': {'class': 'col text-start align-middle'},
                'content': formatDate(tasksData[index].expiration)
            },
            {
                'tag': 'div',
                'attr': {'class': 'col text-start align-middle'},
                'content': statusHtml
            },
            {
                'tag': 'div',
                'attr': {'class': 'col text-end align-middle'},
                'content': [
                    {
                        'tag': 'div',
                        'attr': {'class': "btn-group", 'role': 'group', 'aria-label': 'Mixed styles action buttom'},
                        'content': [
                            {
                                'tag': 'button',
                                'attr': {'type': "button", 'class': 'btn btn-light task-action-open', 'data-taskid': tasksData[index].id},
                                'content': 'Open'
                            },
                            {
                                'tag': 'button',
                                'attr': {'type': "button", 'class': 'btn btn-light task-action-delete', 'style': 'color: #e74c3c', 'data-taskid': tasksData[index].id},
                                'content': 'Delete'
                            },
                            {
                                'tag': 'button',
                                'attr': {'type': "button", 'class': 'btn btn-success task-action-done', 'data-taskid': tasksData[index].id},
                                'content': 'Done'
                            }
                        ]
                    }
                ]
            }
        ]))
    }
}

/**
 * Renders an HTML element as a string using the specified tag, attributes, and content.
 * Supports both self-closing and standard HTML tags. If the content is an object with
 * nested elements, it recursively renders them.
 *
 * @param {string} tag - The HTML tag name.
 * @param {object} attr - An object representing the HTML attributes.
 * @param {string|object} content - The content inside the HTML element or an object for nested elements.
 * @returns {string} The HTML element as a string.
 */
function renderHTMLElement(tag, attr, content){
    const selfClosingTags = [
        'area',
        'base',
        'br',
        'col',
        'embed',
        'hr',
        'img',
        'input',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr'
    ];
    const htmlAttributes = Object.entries(attr)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
    if (selfClosingTags.includes(tag)) {
        return `<${tag} ${htmlAttributes}>`
    }

    let processedContent = '';
    if(typeof content == "object"){
        for (let index = 0; index < content.length; index++) {
            const element = content[index];
            if(element.hasOwnProperty("tag") && element.hasOwnProperty("attr") && element.hasOwnProperty("content")){
                processedContent += renderHTMLElement(
                    element.tag,
                    element.attr,
                    element.content
                );
            }
        }
    }else{
        processedContent = content;
    }
    return `<${tag} ${htmlAttributes}>${processedContent}</${tag}>`
}

/**
 * Formats a date string into a human-readable format.
 *
 * Converts a given date string into a format that includes the day of the week,
 * month, and day of the month. If the year of the date differs from the current year,
 * it appends the year to the formatted string.
 *
 * @param {string} dateStr - The date string to format.
 * @returns {string} The formatted date string.
 */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const currentYear = new Date().getFullYear();
    const yearOfDate = date.getFullYear();

    let formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;
    
    // If the year of the date differs from the current year, add it
    if (yearOfDate !== currentYear) {
        formattedDate += `, ${yearOfDate}`;
    }

    return formattedDate;
}

/**
 * Adds a loader element to the specified HTML element.
 *
 * This function uses jQuery to select an element by the given selector
 * and replaces its content with a loader div element. The loader is
 * centered using a 'text-center' class and contains a nested div with
 * a 'loader' class.
 *
 * @param {string} selector - The jQuery selector for the target HTML element.
 * @returns {boolean} Returns true after adding the loader.
 */
function addLoader(selector){
    $(selector).html(renderHTMLElement('div', {'class': 'text-center'}, [
        {
            'tag': 'div',
            'attr': {'class': 'loader'},
            'content': ''
        }
    ]));
    return true;
}



