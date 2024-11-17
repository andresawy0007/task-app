<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Models\Task;

class TaskController extends Controller
{
    private $request;

    public function __construct(Request $request){
        $this->request = $request;
    }

    public function viewTasks(){
        return view('tasks');
    }

    /**
     * Retrieves all tasks and returns them as a JSON response.
     *
     * @return \Illuminate\Http\JsonResponse JSON response containing all tasks.
     */
    public function index(){
        $user = Auth::user();
        $tasks = Task::where('user_id', $user->id)
              ->orderBy('status', 'asc')
              ->get();
        return response()->json($tasks);
    }

    /**
     * Store a new task in the database after validating the request data.
     *
     * Validates the incoming request data against predefined rules. If validation
     * fails, returns a JSON response with validation errors and a 422 status code.
     * If validation succeeds, creates a new task with the provided data, saves it
     * to the database, and returns a JSON response with the created task and a 201
     * status code.
     *
     * @param Request $request The incoming request containing task data.
     * @return \Illuminate\Http\JsonResponse JSON response with validation errors or the created task.
     */
    public function store(Request $request)
    {   
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|integer', 
            'expiration' => 'required|date',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors occurred.',
                'errors' => $validator->errors()
            ], 422);
        }
        $user = Auth::user();

        $task = new Task();
        $task->title = $request->input('title');
        $task->description = $request->input('description');
        $task->status = $request->input('status');
        $task->expiration = $request->input('expiration');
        $task->user_id = $user->id;

        $task->save();


        return response()->json($task, 201);
    }

    /**
     * Display the specified task as a JSON response.
     *
     * @param int $id The ID of the task to retrieve.
     * @return \Illuminate\Http\JsonResponse The JSON representation of the task.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException If the task is not found.
     */
    public function show($id)
    {
        $user = Auth::user();
        $task = Task::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        return response()->json($task); 
    }

    /**
     * Updates a task with the given ID using the provided request data.
     *
     * Validates the request data against predefined rules. If validation fails,
     * returns a JSON response with validation errors and a 422 status code.
     * If validation passes, updates the task and returns a success message.
     *
     * @param Request $request The request object containing input data.
     * @param int $id The ID of the task to update.
     * @return \Illuminate\Http\JsonResponse JSON response indicating success or validation errors.
     */
    public function update(Request $request, $id)
    {
        $rules = [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'expiration' => 'nullable|date',
            'status' => 'nullable|integer', 
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors occurred.',
                'errors' => $validator->errors()
            ], 422);
        }
        $user = Auth::user();

        $task = Task::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();
        $task->update($request->all());
        return response()->json(['Task updated successfully.']); 
    }

    /**
     * Deletes a task by its ID.
     *
     * Finds the task with the specified ID and deletes it from the database.
     * Returns a JSON response indicating successful deletion.
     *
     * @param int $id The ID of the task to be deleted.
     * @return \Illuminate\Http\JsonResponse JSON response confirming task deletion.
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $task = Task::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();
        $task->delete();

        return response()->json(['Task deleted successfully.']); 
    }
}
