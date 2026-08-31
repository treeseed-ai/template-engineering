# Engineering template guidance

Generated projects must preserve governed TreeDX knowledge and exact repository evidence.

## Branch and deployment boundary

`main` is the only production branch and maps only to the `production` deployment environment. `staging` is the only development-integration branch and maps only to the `staging` deployment environment. Short-lived pull-request branches may validate without deploying, but they must never define another deployment environment. Do not create or use `development`, `preview`, `stable`, or any other GitHub deployment environment; preview deployments are prohibited. Release tags may promote an exact reviewed `staging` commit to `production` without creating another branch or environment. Artifact channel names must never become GitHub deployment environments.

## Project library

Use `trsd library show template-engineering` and `status` before querying `treeseed-ai/template-engineering-library`. Library collections are root-level. Author only through governed library workspaces and reviews; never recreate `src/content` or edit `.treeseed/data` directly.
