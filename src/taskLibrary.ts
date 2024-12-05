export const taskLibrary: Record<string, () => Promise<{ status: string }>> = {
  parsePrescription: async () => {
    console.log('Parsing prescription...');
    return { status: 'completed' };
  },
  validateData: async () => {
    console.log('Validating data...');
    return { status: 'flagged' }; // Simulates flagging the task.
  },
  escalateToDoctor: async () => {
    console.log('Escalating to doctor...');
    return { status: 'completed' };
  },
};
