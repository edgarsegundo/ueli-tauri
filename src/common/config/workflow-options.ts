import { Workflow } from "../../plugins/workflow-plugin/workflow";

export interface WorkflowOptions {
    isEnabled: boolean;
    workflows: Workflow[];
}

export const defaultWorkflowOptions: WorkflowOptions = {
    isEnabled: false,
    workflows: [],
};
