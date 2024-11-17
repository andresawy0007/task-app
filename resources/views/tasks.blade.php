@extends('templates/html')
@section('title', 'All tasks')

@section('content')
    <div class="tasks-container container text-center">
        <h1 class="text-start">All my tasks</h1>
        <div class="row">
            <div class="col">
                Title
            </div>
            <div class="col">
                Description 
            </div>
            <div class="col">
                Deu date
            </div>
            <div class="col">
                Actions
            </div>
        </div>
        <div id="tasks-result">
            <div class="row single-task">
                <div class="col">
                    Sacar al perro
                </div>
                <div class="col">
                    ver series
                </div>
                <div class="col">
                    Deu date
                </div>
                <div class="col">
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" class="btn btn-light">Open</button>
                        <button type="button" class="btn btn-light" style="color: #e74c3c ">Delete</button>
                        <button type="button" class="btn btn-success">Done</button>
                    </div>    
                </div>
            </div>
        </div>
    </div>
@endsection
    