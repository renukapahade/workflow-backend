import { Workflow } from './types/workflowType'; 

export let workflows: Workflow[] = [
  {
    id: 'workflow_1',
    name: 'Prescription Processing',
    tasks: [
      { id: 'task_1', name: 'Parse Prescription', function: 'parsePrescription', status: 'pending' },
      { id: 'task_2', name: 'Validate Data', function: 'validateData', status: 'pending' },
      { id: 'task_3', name: 'Escalate to Doctor', function: 'escalateToDoctor', status: 'pending', dependsOn: ['task_2'] }
    ]
  }
];
