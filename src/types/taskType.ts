export interface Task {
  id: string;
  name: string;
  function: string;
  status: 'waiting'| 'pending' | 'completed' | 'flagged' | 'escalated';
  dependsOn?: string[];  // Array of task IDs that this task depends on
}