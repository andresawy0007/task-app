@extends('templates/html')
@section('title', 'All tasks')

@section('content')

    <div class="tasks-container container text-center">
        <div class="row">
            <div class="col">
                <h1 class="text-start align-middle">All my tasks</h1>
            </div>
            <div class="col align-middle text-end">
                <div class="row">
                    <div class="col-10 text-end"><button type="button" class="btn btn-primary" id="task-action-new">New task</button></div>
                    <div class="col-2 text-end">
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" >
                            {{ csrf_field() }}
                            <button type="submit" class="btn btn-light">Logout</button>
                        </form>
                    </div>
                </div>
                
                
            </div>
        </div>
        <section class="tasks-list-container">
            <div class="row head-list">
                <div class="col text-start align-middle">
                    Title
                </div>
                <div class="col text-start align-middle">
                    Deu date
                </div>
                <div class="col text-start align-middle">
                    Status
                </div>
                <div class="col text-center align-middle">
                    Actions
                </div>
            </div>
            <div id="tasks-result">
                <div class="row single-task">
                    <div class="text-center">
                        <div class="loader"></div>
                    </div>
                </div>
            </div>
        </section>
        
    </div>

    <div class="modal" id="task-detail" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="text-center">
                        <div class="loader"></div>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="deleteInModalButton">Delete</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" id="maskAsDoneInModalButton">Mark as Done</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="task-delete-confirmation" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <input type="hidden" id="taskIdToDelete" value="0">
                    Are you sure you want to delete this task?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" id="deleteTaskConfirmation">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="new-task-form" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="taskTitle" class="form-label">Task Title</label>
                        <input type="text" class="form-control" id="taskTitle" placeholder="Do dinner">
                    </div>
                    <div class="mb-3">
                        <label for="taskDescription" class="form-label">Task Description</label>
                        <textarea class="form-control" id="taskDescription" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="taskDate" class="form-label">Due Date</label>
                        <input type="date" class="form-control" id="taskDate" placeholder="Do dinner">
                    </div>
                    <div class="error-result"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="createNewTask">Create</button>
                </div>
            </div>
        </div>
    </div>
@endsection
    