# Agent Contract Test Report

Generated: 2026-06-21T07:13:38.709Z
Repository: /home/adrian/Projects/treeseed/market/.treeseed/worktrees/demo-2a97516c35/starters/engineering/template
Status: PASS

## architect-agent

Handler: plan
Project agent class: architecture
Enabled: true
Triggers: message
Declared outputs: architecture_updated
Permissions: objective:search,get; knowledge:create; message:create,pick,update
Status: PASS
Issues: none

## engineer-agent

Handler: act
Project agent class: implementation
Enabled: true
Triggers: message
Declared outputs: task_complete, task_waiting, task_failed
Permissions: knowledge:search,get; message:create,pick,update
Status: PASS
Issues: none

## planner-agent

Handler: plan
Project agent class: planning
Enabled: true
Triggers: startup
Declared outputs: question_priority_updated, objective_priority_updated
Permissions: question:search,get; objective:search,get; message:create,pick,update
Status: PASS
Issues: none

## releaser-agent

Handler: report
Project agent class: release
Enabled: true
Triggers: message
Declared outputs: release_started, release_completed, release_failed
Permissions: knowledge:create; message:create,pick,update
Status: PASS
Issues: none

## reporter-agent

Handler: report
Project agent class: reporting
Enabled: true
Triggers: schedule
Declared outputs: report_created
Permissions: note:search,get; knowledge:search,get; message:create,pick,update
Status: PASS
Issues: none

## researcher-agent

Handler: research
Project agent class: research
Enabled: true
Triggers: message
Declared outputs: research_started, research_completed
Permissions: question:search,get; note:create; message:create,pick,update
Status: PASS
Issues: none

## reviewer-agent

Handler: review
Project agent class: review
Enabled: true
Triggers: message
Declared outputs: task_verified, review_failed
Permissions: message:create,pick,update
Status: PASS
Issues: none

