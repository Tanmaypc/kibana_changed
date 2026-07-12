# Project Context

This is a typescript project using express.

The API has 1 routes. See .codesight/routes.md for the full route map with methods, paths, and tags.
The UI has 8038 components. See .codesight/components.md for the full list with props.
Middleware includes: custom, auth, validation, logging, rate-limit, cors, error-handler.

High-impact files (most imported, changes here affect many other files):
- x-pack/solutions/security/plugins/security_solution/public/common/lib/kibana/index.ts (imported by 613 files)
- x-pack/platform/test/functional/ftr_provider_context.ts (imported by 590 files)
- x-pack/solutions/security/plugins/security_solution/public/common/mock/index.ts (imported by 544 files)
- x-pack/platform/plugins/shared/cases/common/types/domain/index.ts (imported by 489 files)
- x-pack/solutions/security/plugins/security_solution/common/constants.ts (imported by 431 files)
- x-pack/platform/plugins/shared/alerting/server/types.ts (imported by 352 files)
- x-pack/platform/plugins/private/canvas/types/index.ts (imported by 315 files)
- x-pack/platform/plugins/shared/maps/common/constants.ts (imported by 307 files)

Required environment variables (no defaults):
- ALERTING_PROXY_PORT (x-pack/platform/test/alerting_api_integration/common/config.ts)
- ALLOW_PERFORMANCE_HOOKS_IN_TASK_MANAGER (x-pack/scripts/functional_tests_server.js)
- APM_TEST_GREP_FILES (x-pack/solutions/observability/test/apm_api_integration/tests/index.ts)
- ARTIFACTS_FOLDER (x-pack/solutions/observability/plugins/observability_onboarding/e2e/playwright/playwright.config.ts)
- AZURE_OPENAI_API_KEY (x-pack/platform/packages/shared/kbn-sample-parser/src/create_openai_client.ts)
- AZURE_OPENAI_API_VERSION (x-pack/platform/packages/shared/kbn-sample-parser/src/create_openai_client.ts)
- AZURE_OPENAI_DEPLOYMENT (x-pack/platform/packages/shared/kbn-sample-parser/src/create_openai_client.ts)
- AZURE_OPENAI_ENDPOINT (x-pack/platform/packages/shared/kbn-sample-parser/src/create_openai_client.ts)
- AZURE_OPENAI_MODEL (x-pack/platform/packages/shared/kbn-sample-parser/src/create_openai_client.ts)
- BASE_URL (x-pack/solutions/security/test/security_solution_playwright/api_utils/api_key.ts)
- BEATS (x-pack/platform/test/stack_functional_integration/apps/monitoring/_monitoring_metricbeat.js)
- BUILD_ID (x-pack/platform/test/load/config.ts)
- BUILDKITE_BRANCH (x-pack/platform/test/scalability/config.ts)
- BUILDKITE_BUILD_ID (x-pack/platform/test/scalability/config.ts)
- BUILDKITE_BUILD_NUMBER (x-pack/platform/test/scalability/runner.ts)

Read .codesight/wiki/index.md for orientation (WHERE things live). Then read actual source files before implementing. Wiki articles are navigation aids, not implementation guides.
Read .codesight/CODESIGHT.md for the complete AI context map including all routes, schema, components, libraries, config, middleware, and dependency graph.

Project Guardrails
- Never compile or build the project.
- Always type-check the code after making changes.
- Only make changes that affect the UI.
- Do not make backend changes.
- Do not introduce changes that could break the full build.
- Do not modify shared components when the change could cause breaking behavior elsewhere.
- Prefer local, isolated UI changes over shared or cross-cutting changes.
- Preserve existing backend behavior, APIs, data contracts, and server-side logic.
- Keep all changes minimal, targeted, and backward-compatible.