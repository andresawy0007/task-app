(function ($) {
    

    $(document).ready(function() {
        if($(".tasks-container").length){
            // Get all user tasks.
            fetchTasks();
        }
        $("#myButton").on("click", function() {
            alert("Button clicked!");
            
        });
    });


})(jQuery);
"use strict";
/**
 * Fetches tasks from the server using an AJAX GET request to the '/api/tasks' endpoint.
 * On success, logs the retrieved tasks to the console and displays them using the displayTasks function.
 * On error, logs an error message to the console with details of the failure.
 */
function fetchTasks() {
    $.ajax({
        url: '/api/tasks',
        method: 'GET',
        dataType: 'json',
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
        taskList.append(renderHTMLElement('div', {'class': 'row single-task'}, [
            {
                'tag': 'div',
                'attr': {'class': 'col'},
                'content': tasksData[index].title
            },
            {
                'tag': 'div',
                'attr': {'class': 'col'},
                'content': tasksData[index].description
            },
            {
                'tag': 'div',
                'attr': {'class': 'col'},
                'content': formatDate(tasksData[index].expiration)
            },
            {
                'tag': 'div',
                'attr': {'class': 'col'},
                'content': [
                    {
                        'tag': 'div',
                        'attr': {'class': "btn-group", 'role': 'group', 'aria-label': 'Mixed styles action buttom'},
                        'content': [
                            {
                                'tag': 'button',
                                'attr': {'type': "button", 'class': 'btn btn-light', 'data-taskid': tasksData[index].id},
                                'content': 'Open'
                            },
                            {
                                'tag': 'button',
                                'attr': {'type': "button", 'class': 'btn btn-light', 'style': 'color: #e74c3c', 'data-taskid': tasksData[index].id},
                                'content': 'Delete'
                            },
                            {
                                'tag': 'button',
                                'attr': {'type': "button", 'class': 'btn btn-success', 'data-taskid': tasksData[index].id},
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



