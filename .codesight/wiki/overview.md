# kibana — Overview

> **Navigation aid.** This article shows WHERE things live (routes, models, files). Read actual source files before implementing new features or making changes.

**kibana** is a typescript project built with express.

## Scale

1 API routes · 8038 UI components · 12875 library files · 680 middleware layers · 132 environment variables

## Subsystems

- **[Async_sender](./async_sender.md)** — 1 routes

**UI:** 8038 components (react) — see [ui.md](./ui.md)

**Libraries:** 12875 files — see [libraries.md](./libraries.md)

## High-Impact Files

Changes to these files have the widest blast radius across the codebase:

- `x-pack/solutions/security/plugins/security_solution/public/common/lib/kibana/index.ts` — imported by **613** files
- `x-pack/platform/test/functional/ftr_provider_context.ts` — imported by **590** files
- `x-pack/solutions/security/plugins/security_solution/public/common/mock/index.ts` — imported by **544** files
- `x-pack/platform/plugins/shared/cases/common/types/domain/index.ts` — imported by **489** files
- `x-pack/solutions/security/plugins/security_solution/common/constants.ts` — imported by **431** files
- `x-pack/platform/plugins/shared/alerting/server/types.ts` — imported by **352** files

## Required Environment Variables

- `ALERTING_PROXY_PORT` — `x-pack/platform/test/alerting_api_integration/common/config.ts`
- `ALLOW_PERFORMANCE_HOOKS_IN_TASK_MANAGER` — `x-pack/scripts/functional_tests_server.js`
- `APM_TEST_GREP_FILES` — `x-pack/solutions/observability/test/apm_api_integration/tests/index.ts`
- `ARTIFACTS_FOLDER` — `x-pack/solutions/observability/plugins/observability_onboarding/e2e/playwright/playwright.config.ts`
- `AZURE_OPENAI_API_KEY` — `x-pack/platform/packages/shared/kbn-sample-parser/src/create_openai_client.ts`
- `AZURE_OPENAI_API_VERSION` — `x-pack/platform/packages/shared/kbn-sample-parser/src/create_openai_client.ts`
- `AZURE_OPENAI_DEPLOYMENT` — `x-pack/platform/packages/shared/kbn-sample-parser/src/create_openai_client.ts`
- `AZURE_OPENAI_ENDPOINT` — `x-pack/platform/packages/shared/kbn-sample-parser/src/create_openai_client.ts`
- `AZURE_OPENAI_MODEL` — `x-pack/platform/packages/shared/kbn-sample-parser/src/create_openai_client.ts`
- `BASE_URL` — `x-pack/solutions/security/test/security_solution_playwright/api_utils/api_key.ts`
- `BEATS` — `x-pack/platform/test/stack_functional_integration/apps/monitoring/_monitoring_metricbeat.js`
- `BUILD_ID` — `x-pack/platform/test/load/config.ts`
- _...120 more_

---
_Back to [index.md](./index.md) · Generated 2026-07-12_