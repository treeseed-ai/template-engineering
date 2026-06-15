import type { AgentHandler, AgentExecutionResult } from '@treeseed/agent/runtime-types';

type Inputs = {
  objective: string | null;
  triggerKind: string;
};

type Result = Inputs & {
  summary: string;
  messageType: string;
};

function objectiveText(context: Parameters<AgentHandler<Inputs, Result>['resolveInputs']>[0]) {
  return context.coreObjective?.content ?? context.coreObjective?.message ?? null;
}

function completed(summary: string, metadata: Record<string, unknown> = {}): AgentExecutionResult {
  return { status: 'completed', summary, metadata };
}

function createSecureHandler(kind: string, messageType: string, verb: string): AgentHandler<Inputs, Result> {
  return {
    kind,
    async resolveInputs(context) {
      return {
        objective: objectiveText(context),
        triggerKind: context.trigger.kind,
      };
    },
    async execute(_context, inputs) {
      const objective = inputs.objective ?? 'No approved engineering objective was available.';
      return {
        ...inputs,
        messageType,
        summary: `${verb} for objective: ${objective}`,
      };
    },
    async emitOutputs(context, result) {
      await context.sdk.createMessage({
        type: result.messageType,
        payload: {
          objective: result.objective,
          triggerKind: result.triggerKind,
          handler: kind,
          runId: context.runId,
          approvalRequiredForMutation: true,
          allowedWriteRoots: ['src/**', 'docs/**', 'tests/**', 'README.md', 'package.json', 'package-lock.json'],
          contextSource: 'treedx-rendered-mdx',
        },
      });
      return {
        ...completed(result.summary, {
          projectOwnedHandler: true,
          approvalRequiredForMutation: true,
          contextSource: 'treedx-rendered-mdx',
        }),
        status: result.objective ? 'completed' : 'waiting',
      };
    },
  };
}

export const plannerHandler = createSecureHandler('planner', 'objective_priority_updated', 'Prepared delivery planning proposal');
export const researcherHandler = createSecureHandler('researcher', 'research_completed', 'Prepared implementation research proposal');
export const architectHandler = createSecureHandler('architect', 'architecture_updated', 'Prepared architecture guidance proposal');
export const engineerHandler = createSecureHandler('engineer', 'task_waiting', 'Prepared implementation plan awaiting approval');
export const reviewerHandler = createSecureHandler('reviewer', 'task_verified', 'Prepared verification review');
export const releaserHandler = createSecureHandler('releaser', 'release_started', 'Prepared release handoff proposal');
export const reporterHandler = createSecureHandler('reporter', 'report_created', 'Prepared engineering progress report');
