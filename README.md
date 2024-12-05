# Backend API for Workflow Management

This is the backend for managing workflows in a prescription processing system. It allows users to create and start workflows, manage task statuses, and make decisions on flagged or escalated tasks.

## Features
- Start a workflow
- Update task decisions (approve or escalate)
- Get workflow status

## Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Setup

Clone the repository to your local machine using the following command:
```bash
git clone https://github.com/renukapahade/workflow-backend.git
```

Install Dependencies
```bash
cd workflow-backend
npm install
```

Start the Server
```bash
npm start
```

## API Endpoints
1. Start Workflow
POST http://localhost:3000/workflow/[workflow_id]/start
Start a workflow by passing its ID in the URL. This will execute tasks in the workflow sequentially. If a task is flagged or escalated, the execution will stop, and the decision will be awaited.


2. Update Task Decision
POST http://localhost:3000/workflow/task/[task_id]/decision
This endpoint allows users to make decisions on tasks that are flagged or escalated. You can either approve or escalate the task.
Request Body:
{
  "decision": "approve" // or "escalate"
}


4. Get Workflow Status
GET http://localhost:3000/workflow/[workflow_id]/status
This endpoint retrieves the current status of the workflow and its tasks.


## Task Functions
The backend includes several task functions that are invoked in sequence when a workflow is started. The task functions are currently mocked as:

1. parsePrescription
2. validateData
3. escalateToDoctor
Each function returns a status (completed, flagged, or escalated), and based on that, tasks are either marked as completed or flagged for further action.


## Folder Structure
src/
  ├── routes/                # Contains routes for managing workflows
  │   └── workflows.ts       # Defines routes for starting workflows, updating task decisions, and getting workflow status
  ├── taskLibrary.ts         # Contains task functions (parse, validate, escalate)
  ├── types/                 # Defines the structure of workflows and tasks
  │   ├── workflowType.ts    # Workflow structure definition
  │   └── taskType.ts        # Task structure definition
  ├── data/                  # Contains mock workflow data
  │   └── sample_workflows.ts # Mock workflows used in the application
  ├── app.ts                 # Main Express server setup







