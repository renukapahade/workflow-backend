
import { Task } from "./taskType";

export interface Workflow {
  id: string;
  name: string;
  tasks: Task[];
}