/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { i18n } from '@kbn/i18n';
import {
  EuiButton,
  EuiCallOut,
  EuiCard,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiLink,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n-react';
import { getDocLinks } from '@kbn/doc-links';
import { useAppContext } from '../../app_context';
import { AssistantIcon } from '../../icons/assistant_icon/assistant_icon';

const heroStyles = css`
  background: linear-gradient(120deg, #071226 0%, #0b1f3a 58%, #172554 100%);
  border: 1px solid rgba(103, 232, 249, 0.18);
  border-radius: 24px;
  box-shadow: 0 20px 48px rgba(2, 6, 23, 0.18);
  color: #f8fafc;
  overflow: hidden;
  padding: 32px 36px;

  .euiText {
    color: #cbd5e1 !important;
    max-width: 760px;
  }
`;

const assistantCardStyles = css`
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.07), rgba(99, 102, 241, 0.08));
  border-color: rgba(34, 211, 238, 0.26) !important;
  border-radius: 18px;
  min-height: 100%;
`;

export function AiAssistantSelectionPage() {
  const {
    capabilities,
    setBreadcrumbs,
    navigateToApp,
    buildFlavor,
    kibanaBranch,
    securityAIAssistantEnabled,
  } = useAppContext();
  const aiAssistantManagementSelection = capabilities.management.ai.aiAssistantManagementSelection;

  const observabilityAIAssistantEnabled = capabilities.observabilityAIAssistant?.show;
  const securityAIAssistantVisibility = Boolean(
    capabilities.securitySolutionAssistant['ai-assistant']
  );
  const isSecurityAIAssistantEnabled =
    securityAIAssistantEnabled && aiAssistantManagementSelection && securityAIAssistantVisibility;

  const observabilityDoc = getDocLinks({ buildFlavor, kibanaBranch }).observability.aiAssistant;
  const securityDoc = getDocLinks({ buildFlavor, kibanaBranch }).securitySolution.aiAssistant.home;

  useEffect(() => {
    setBreadcrumbs([
      {
        text: i18n.translate('aiAssistantManagementSelection.breadcrumb.index', {
          defaultMessage: 'Cyberstanc AI Assistants',
        }),
      },
    ]);
  }, [setBreadcrumbs]);

  return (
    <>
      <div css={heroStyles}>
        <EuiFlexGroup alignItems="center" responsive={false} gutterSize="l">
          <EuiFlexItem grow={false}>
            <AssistantIcon size="xxl" />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiTitle size="l" data-test-subj="pluginsAiAssistantSelectionPageTitle">
              <h2>
                {i18n.translate(
                  'aiAssistantManagementSelection.aiAssistantSettingsPage.h2.aIAssistantLabel',
                  {
                    defaultMessage: 'Cyberstanc AI Assistants',
                  }
                )}
              </h2>
            </EuiTitle>
            <EuiSpacer size="s" />
            <EuiText data-test-subj="pluginsAiAssistantSelectionPageDescription">
              {i18n.translate(
                'aiAssistantManagementSelection.aiAssistantSettingsPage.descriptionTextLabel',
                {
                  defaultMessage:
                    'Cyberstanc AI Assistants help your team explain errors, plan remediation, and request, analyze, and visualize security and observability data.',
                }
              )}
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>

      <EuiSpacer size="l" />

      <EuiFlexGrid columns={2}>
        <EuiFlexItem grow>
          <EuiCard
            css={assistantCardStyles}
            data-test-subj="aiAssistantSelectionPageObservabilityCard"
            description={
              <div>
                {!observabilityAIAssistantEnabled ? (
                  <>
                    <EuiSpacer size="s" />
                    <EuiCallOut
                      iconType="warning"
                      data-test-subj="pluginsAiAssistantSelectionPageObservabilityDocumentationCallout"
                      title={i18n.translate(
                        'aiAssistantManagementSelection.aiAssistantSelectionPage.observabilityAi.thisFeatureIsDisabledCallOutLabel',
                        {
                          defaultMessage: 'This feature is disabled.',
                        }
                      )}
                      size="s"
                      className="eui-displayInlineBlock"
                    />
                    <EuiSpacer size="s" />
                  </>
                ) : null}
                <p>
                  <FormattedMessage
                    id="aiAssistantManagementSelection.aiAssistantSelectionPage.obsAssistant.documentationLinkDescription"
                    defaultMessage="For more info, refer to our {documentation}."
                    values={{
                      documentation: (
                        <EuiLink
                          data-test-subj="pluginsAiAssistantSelectionPageDocumentationLink"
                          external
                          target="_blank"
                          href={observabilityDoc}
                        >
                          {i18n.translate(
                            'aiAssistantManagementSelection.aiAssistantSelectionPage.obsAssistant.documentationLinkLabel',
                            { defaultMessage: 'documentation' }
                          )}
                        </EuiLink>
                      ),
                    }}
                  />
                </p>
                {observabilityAIAssistantEnabled && (
                  <EuiButton
                    iconType="gear"
                    data-test-subj="pluginsAiAssistantSelectionPageButton"
                    onClick={() =>
                      navigateToApp('management', {
                        path: 'ai/observabilityAiAssistantManagement',
                      })
                    }
                  >
                    {i18n.translate(
                      'aiAssistantManagementSelection.aiAssistantSelectionPage.obsAssistant.manageSettingsButtonLabel',
                      { defaultMessage: 'Manage Settings' }
                    )}
                  </EuiButton>
                )}
              </div>
            }
            display="plain"
            hasBorder
            icon={
              <EuiFlexGroup
                gutterSize="m"
                alignItems="center"
                responsive={false}
                direction="row"
                justifyContent="center"
              >
                <EuiFlexItem grow={false}>
                  <EuiIcon size="xxl" type="logoObservability" />
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiIcon size="xxl" type="logoEnterpriseSearch" />
                </EuiFlexItem>
              </EuiFlexGroup>
            }
            isDisabled={!observabilityAIAssistantEnabled}
            title={i18n.translate(
              'aiAssistantManagementSelection.aiAssistantSelectionPage.observabilityLabel',
              { defaultMessage: 'Cyberstanc AI Assistant for Observability and Search' }
            )}
            titleSize="xs"
          />
        </EuiFlexItem>
        <EuiFlexItem grow>
          <EuiCard
            css={assistantCardStyles}
            description={
              <div>
                {!isSecurityAIAssistantEnabled ? (
                  <>
                    <EuiSpacer size="s" />
                    <EuiCallOut
                      iconType="warning"
                      data-test-subj="pluginsAiAssistantSelectionPageSecurityDocumentationCallout"
                      title={i18n.translate(
                        'aiAssistantManagementSelection.aiAssistantSelectionPage.securityAi.thisFeatureIsDisabledCallOutLabel',
                        {
                          defaultMessage: 'This feature is disabled.',
                        }
                      )}
                      size="s"
                      className="eui-displayInlineBlock"
                    />
                    <EuiSpacer size="s" />
                  </>
                ) : null}
                <p>
                  <FormattedMessage
                    id="aiAssistantManagementSelection.aiAssistantSelectionPage.securityAssistant.documentationLinkDescription"
                    defaultMessage="For more info, refer to our {documentation}."
                    values={{
                      documentation: (
                        <EuiLink
                          data-test-subj="securityAiAssistantSelectionPageDocumentationLink"
                          external
                          target="_blank"
                          href={securityDoc}
                        >
                          {i18n.translate(
                            'aiAssistantManagementSelection.aiAssistantSettingsPage.securityAssistant.documentationLinkLabel',
                            { defaultMessage: 'documentation' }
                          )}
                        </EuiLink>
                      ),
                    }}
                  />
                </p>
                {isSecurityAIAssistantEnabled && (
                  <EuiButton
                    data-test-subj="pluginsAiAssistantSelectionSecurityPageButton"
                    iconType="gear"
                    onClick={() =>
                      navigateToApp('management', { path: 'ai/securityAiAssistantManagement' })
                    }
                  >
                    {i18n.translate(
                      'aiAssistantManagementSelection.aiAssistantSelectionPage.securityAssistant.manageSettingsButtonLabel',
                      { defaultMessage: 'Manage Settings' }
                    )}
                  </EuiButton>
                )}
              </div>
            }
            display="plain"
            hasBorder
            icon={<EuiIcon size="xxl" type="logoSecurity" />}
            isDisabled={!isSecurityAIAssistantEnabled}
            title={i18n.translate(
              'aiAssistantManagementSelection.aiAssistantSelectionPage.securityLabel',
              { defaultMessage: 'Cyberstanc AI Assistant for Security' }
            )}
            titleSize="xs"
          />
        </EuiFlexItem>
      </EuiFlexGrid>
    </>
  );
}
