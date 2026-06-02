import type { AgentHandler } from '@treeseed/agent/runtime-types';

interface ArchitectInputs {
  objectiveId: string | null;
  reason: string | null;
}

interface ArchitectResult extends ArchitectInputs {
  knowledgeSlug: string | null;
}

export const architectHandler: AgentHandler<ArchitectInputs, ArchitectResult> = {
  kind: 'architect',
  async resolveInputs(context) {
    const objective = await context.sdk.search({
      model: 'objective',
      sort: [{ field: 'date', direction: 'desc' }],
      limit: 1
    });
    const objectiveId = (objective.payload as Array<{ id?: string }>)[0]?.id ?? null;
    return { objectiveId, reason: 'Latest active objective selected for architecture guidance.' };
  },
  async execute(context, inputs) {
    if (!inputs.objectiveId) return { ...inputs, knowledgeSlug: null };
    const knowledgeSlug = `architecture/${inputs.objectiveId}-${context.runId}`;
    await context.sdk.create({
      model: 'knowledge',
      data: {
        slug: knowledgeSlug,
        title: `Architecture guidance for ${inputs.objectiveId}`,
        body: `# Architecture Guidance\n\nObjective: ${inputs.objectiveId}\n\nReason: ${inputs.reason}`,
        tags: ['architecture', 'agent'],
        branchPrefix: context.agent.execution.branchPrefix
      }
    });
    return { ...inputs, knowledgeSlug };
  },
  async emitOutputs(context, result) {
    if (!result.objectiveId || !result.knowledgeSlug) {
      return { status: 'waiting', summary: 'Architect found no objective to process.' };
    }
    await context.sdk.createMessage({
      type: 'architecture_updated',
      payload: {
        objectiveId: result.objectiveId,
        knowledgeId: result.knowledgeSlug,
        architectRunId: context.runId
      }
    });
    return { status: 'completed', summary: `Architect created ${result.knowledgeSlug}.` };
  }
};

