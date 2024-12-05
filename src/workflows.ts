import { Request, Response } from 'express';
import { workflows } from './data/sample_workflow'; 
import { taskLibrary } from './taskLibrary';

export const startWorkflow = async (req: Request, res: Response) => {
  const workflowId = req.params.id;
  const workflow = workflows.find((w) => w.id === workflowId);

  if (!workflow) return res.status(404).send({ error: 'Workflow not found' });

  for (const task of workflow.tasks) {
    // Check if all dependencies are completed before running the task
    if (task.dependsOn) {
      const dependenciesCompleted = task.dependsOn.every((dep: string) => 
        workflow.tasks.find(t => t.id === dep && t.status === 'completed')
      );
      
      if (!dependenciesCompleted) {
        task.status = 'waiting';  // Mark the task as waiting if dependencies are not completed
        continue; // Skip this task and move to the next one
      }
    }

    // Process the task if no dependencies or dependencies are met
    if (task.status === 'pending') {
      console.log(`Executing: ${task.name}`);
      const taskFunction = taskLibrary[task.function];
      if (taskFunction) {
        const result = await taskFunction();
        if (result.status === 'flagged') {
          task.status = 'flagged';
          return res.status(200).send({ message: `Task ${task.name} flagged` });
        }
        task.status = 'completed';
      }
    }
  }

  res.status(200).send({ message: 'Workflow completed' });
};



export const updateTaskDecision = (req: Request, res: Response) => {
  const { id } = req.params;
  const { decision } = req.body;

  for (const workflow of workflows) {
    const task = workflow.tasks.find((t) => t.id === id);
    if (task && task.status === 'flagged') {
      if (decision === 'approve') {
        task.status = 'completed';
      } else if (decision === 'escalate') {
        task.status = 'escalated';
      }
      return res.status(200).send({ message: `Task ${id} updated with decision: ${decision}` });
    }
  }

  res.status(404).send({ error: 'Task not found or not flagged' });
};



export const getWorkflowStatus = (req:Request, res:Response) => {
  const workflowId = req.params.id;
  const workflow = workflows.find((w) => w.id === workflowId);

  if (!workflow) return res.status(404).send({ error: 'Workflow not found' });

  res.status(200).send(workflow);
};


