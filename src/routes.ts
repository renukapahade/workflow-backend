import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { startWorkflow, updateTaskDecision, getWorkflowStatus } from './workflows';

const workflowRouter = Router();

// Wrap async functions to properly handle errors
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next); // Will catch any promise rejection and forward it to Express error handler
};

workflowRouter.post('/:id/start',  asyncHandler(startWorkflow));
workflowRouter.post('/task/:id/decision',  asyncHandler(updateTaskDecision));
workflowRouter.get('/:id/status',  asyncHandler(getWorkflowStatus));

export { workflowRouter };

