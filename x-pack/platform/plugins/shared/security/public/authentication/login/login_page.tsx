/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiSpacer,
  EuiText,
  type EuiThemeComputed,
  EuiTitle,
} from '@elastic/eui';
import { css } from '@emotion/react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type {
  AppMountParameters,
  CustomBrandingStart,
  FatalErrorsStart,
  HttpStart,
  NotificationsStart,
} from '@kbn/core/public';
import type { CustomBranding } from '@kbn/core-custom-branding-common';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n-react';

import type { LoginFormProps } from './components';
import { DisabledLoginForm, LoginForm, LoginFormMessageType } from './components';
import type { StartServices } from '../..';
import {
  AUTH_PROVIDER_HINT_QUERY_STRING_PARAMETER,
  LOGOUT_REASON_QUERY_STRING_PARAMETER,
} from '../../../common/constants';
import type { LoginState } from '../../../common/login_state';
import type { LogoutReason } from '../../../common/types';
import type { ConfigType } from '../../config';

interface Props {
  http: HttpStart;
  notifications: NotificationsStart;
  fatalErrors: FatalErrorsStart;
  loginAssistanceMessage: string;
  sameSiteCookies?: ConfigType['sameSiteCookies'];
  customBranding: CustomBrandingStart;
}

interface State {
  loginState: LoginState | null;
  customBranding: CustomBranding;
}

const CYBERSTANC_BRAND_NAME = 'Cyberstanc';

const loginPageStyles = css`
  min-height: 100vh;
  padding: 24px;
  background:
    radial-gradient(circle at 12% 15%, rgba(34, 211, 238, 0.18), transparent 34%),
    radial-gradient(circle at 88% 85%, rgba(129, 92, 246, 0.16), transparent 32%),
    #07111f;

  @media (max-width: 767px) {
    padding: 0;
  }
`;

const loginShellStyles = css`
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(420px, 1.1fr);
  min-height: calc(100vh - 48px);
  max-width: 1440px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 24px;
  box-shadow: 0 32px 80px rgba(2, 8, 23, 0.44);

  @media (max-width: 767px) {
    display: block;
    min-height: 100vh;
    border: 0;
    border-radius: 0;
  }
`;

const brandPanelStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  padding: clamp(32px, 5vw, 72px);
  overflow: hidden;
  color: #f8fafc;
  background:
    linear-gradient(145deg, rgba(11, 28, 51, 0.92), rgba(10, 21, 40, 0.98)),
    #0a1528;

  &::after {
    position: absolute;
    right: -120px;
    bottom: -150px;
    width: 360px;
    height: 360px;
    border: 1px solid rgba(34, 211, 238, 0.24);
    border-radius: 50%;
    box-shadow:
      0 0 0 48px rgba(34, 211, 238, 0.035),
      0 0 0 96px rgba(129, 92, 246, 0.025);
    content: '';
  }

  @media (max-width: 767px) {
    min-height: auto;
    padding: 28px 24px 40px;
  }
`;

const brandLockupStyles = css`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const brandMessageStyles = css`
  position: relative;
  z-index: 1;
  max-width: 520px;
  margin: clamp(64px, 14vh, 160px) 0;

  @media (max-width: 767px) {
    margin: 48px 0 0;
  }
`;

const formPanelStyles = (euiTheme: EuiThemeComputed) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(32px, 7vw, 96px);
  background: ${euiTheme.colors.backgroundBasePlain};

  @media (max-width: 767px) {
    min-height: 60vh;
    padding: 48px 24px;
  }
`;

const formContainerStyles = (euiTheme: EuiThemeComputed) => css`
  width: 100%;
  max-width: 460px;
  padding: ${euiTheme.size.xl};
  border: ${euiTheme.border.thin};
  border-radius: ${euiTheme.border.radius.medium};
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.1);

  @media (max-width: 767px) {
    padding: ${euiTheme.size.l};
  }
`;

const CyberstancLogo = () => (
  <svg
    aria-hidden="true"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="14" fill="#0F213B" />
    <path
      d="M24 7L38 13V22.5C38 31.6 32.1 39.7 24 42C15.9 39.7 10 31.6 10 22.5V13L24 7Z"
      fill="#22D3EE"
      fillOpacity="0.16"
      stroke="#22D3EE"
      strokeWidth="2"
    />
    <path
      d="M29.7 18.3C28.2 16.8 26.3 16 24 16C19.6 16 16 19.6 16 24C16 28.4 19.6 32 24 32C26.3 32 28.2 31.2 29.7 29.7"
      stroke="#F8FAFC"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path d="M29 24H36" stroke="#818CF8" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

const loginFormMessages: Record<LogoutReason, NonNullable<LoginFormProps['message']>> = {
  SESSION_EXPIRED: {
    type: LoginFormMessageType.Info,
    content: i18n.translate('xpack.security.login.sessionExpiredDescription', {
      defaultMessage: 'Your session has timed out. Please log in again.',
    }),
  },
  CONCURRENCY_LIMIT: {
    type: LoginFormMessageType.Info,
    content: i18n.translate('xpack.security.login.concurrencyLimitDescription', {
      defaultMessage: 'You have logged in on another device. Please log in again.',
    }),
  },
  AUTHENTICATION_ERROR: {
    type: LoginFormMessageType.Info,
    content: i18n.translate('xpack.security.login.authenticationErrorDescription', {
      defaultMessage: 'An unexpected authentication error occurred. Please log in again.',
    }),
  },
  LOGGED_OUT: {
    type: LoginFormMessageType.Info,
    content: i18n.translate('xpack.security.login.loggedOutDescription', {
      defaultMessage: 'You have logged out of Cyberstanc.',
    }),
  },
  UNAUTHENTICATED: {
    type: LoginFormMessageType.Danger,
    content: i18n.translate('xpack.security.unauthenticated.errorDescription', {
      defaultMessage:
        'Try logging in again, and if the problem persists, contact your system administrator.',
    }),
  },
};

export class LoginPage extends Component<Props, State> {
  state = { loginState: null, customBranding: {} } as State;
  private customBrandingSubscription?: Subscription;

  public async componentDidMount() {
    const loadingCount$ = new BehaviorSubject(1);
    this.customBrandingSubscription = this.props.customBranding.customBranding$.subscribe(
      (next) => {
        this.setState({ ...this.state, customBranding: next });
      }
    );
    this.props.http.addLoadingCountSource(loadingCount$.asObservable());

    try {
      this.setState({
        loginState: await this.props.http.get('/internal/security/login_state'),
      });
    } catch (err) {
      this.props.fatalErrors.add(err as Error);
    }

    loadingCount$.next(0);
    loadingCount$.complete();
  }

  public componentWillUnmount() {
    this.customBrandingSubscription?.unsubscribe();
  }

  public render() {
    const loginState = this.state.loginState;
    if (!loginState) {
      return null;
    }

    const isSecureConnection = !!window.location.protocol.match(/^https/);
    const isCookiesEnabled = window.navigator.cookieEnabled;
    const customLogo = this.state.customBranding?.logo;
    const logo = customLogo ? (
      <EuiImage
        src={customLogo}
        size={48}
        alt={i18n.translate('xpack.security.loginPage.cyberstancLogoAlt', {
          defaultMessage: 'Cyberstanc logo',
        })}
      />
    ) : (
      <CyberstancLogo />
    );

    return (
      <div data-test-subj="loginForm" css={loginPageStyles}>
        <div css={loginShellStyles}>
          <section css={brandPanelStyles} aria-label={CYBERSTANC_BRAND_NAME}>
            <div css={brandLockupStyles}>
              {logo}
              <span>{CYBERSTANC_BRAND_NAME}</span>
            </div>

            <div css={brandMessageStyles}>
              <EuiText
                size="s"
                css={css`
                  color: #67e8f9;
                  font-weight: 700;
                  letter-spacing: 0.14em;
                  text-transform: uppercase;
                `}
              >
                <FormattedMessage
                  id="xpack.security.loginPage.platformLabel"
                  defaultMessage="Cyber defense platform"
                />
              </EuiText>
              <EuiSpacer size="m" />
              <EuiTitle
                size="l"
                css={css`
                  color: #f8fafc;
                `}
              >
                <h1>
                  <FormattedMessage
                    id="xpack.security.loginPage.brandStatement"
                    defaultMessage="Operate with confidence."
                  />
                </h1>
              </EuiTitle>
              <EuiSpacer size="m" />
              <EuiText
                size="m"
                css={css`
                  max-width: 440px;
                  color: #cbd5e1;
                  line-height: 1.65;
                `}
              >
                <p>
                  <FormattedMessage
                    id="xpack.security.loginPage.brandDescription"
                    defaultMessage="Unified visibility, investigation, and response for the threats that matter most."
                  />
                </p>
              </EuiText>
            </div>

            <EuiText
              size="xs"
              css={css`
                position: relative;
                z-index: 1;
                color: #94a3b8;

                @media (max-width: 767px) {
                  display: none;
                }
              `}
            >
              <FormattedMessage
                id="xpack.security.loginPage.brandFooter"
                defaultMessage="Secure access powered by Cyberstanc"
              />
            </EuiText>
          </section>

          <main css={({ euiTheme }) => formPanelStyles(euiTheme)}>
            <div css={({ euiTheme }) => formContainerStyles(euiTheme)}>
              <EuiTitle size="m" data-test-subj="loginWelcomeTitle">
                <h2>
                  <FormattedMessage
                    id="xpack.security.loginPage.welcomeTitle"
                    defaultMessage="Welcome to Cyberstanc"
                  />
                </h2>
              </EuiTitle>
              <EuiSpacer size="s" />
              <EuiText size="s" color="subdued">
                <p>
                  <FormattedMessage
                    id="xpack.security.loginPage.welcomeDescription"
                    defaultMessage="Sign in to continue to your security workspace."
                  />
                </p>
              </EuiText>
              <EuiSpacer size="xl" />
              <EuiFlexGroup gutterSize="l">
                <EuiFlexItem>
                  {this.getLoginForm({
                    ...loginState,
                    isSecureConnection,
                    isCookiesEnabled,
                  })}
                </EuiFlexItem>
              </EuiFlexGroup>
            </div>
          </main>
        </div>
      </div>
    );
  }

  private getLoginForm = ({
    layout,
    requiresSecureConnection,
    isSecureConnection,
    isCookiesEnabled,
    selector,
    loginHelp,
  }: LoginState & {
    isSecureConnection: boolean;
    isCookiesEnabled: boolean;
  }) => {
    const isLoginExplicitlyDisabled = selector.providers.length === 0;
    if (isLoginExplicitlyDisabled) {
      return (
        <DisabledLoginForm
          title={
            <FormattedMessage
              id="xpack.security.loginPage.noLoginMethodsAvailableTitle"
              defaultMessage="Login is disabled."
            />
          }
          message={
            <FormattedMessage
              id="xpack.security.loginPage.noLoginMethodsAvailableMessage"
              defaultMessage="Contact your system administrator."
            />
          }
        />
      );
    }

    if (requiresSecureConnection && !isSecureConnection) {
      return (
        <DisabledLoginForm
          title={
            <FormattedMessage
              id="xpack.security.loginPage.requiresSecureConnectionTitle"
              defaultMessage="A secure connection is required for log in"
            />
          }
          message={
            <FormattedMessage
              id="xpack.security.loginPage.requiresSecureConnectionMessage"
              defaultMessage="Contact your system administrator."
            />
          }
        />
      );
    }

    if (!isCookiesEnabled) {
      if (isWindowEmbedded()) {
        return (
          <div style={{ maxWidth: '36em', margin: 'auto', textAlign: 'center' }}>
            <EuiText color="subdued">
              <p>
                {this.props.sameSiteCookies !== 'None' ? (
                  <FormattedMessage
                    id="xpack.security.loginPage.openInNewWindowOrChangeKibanaConfigTitle"
                    defaultMessage="To view this content, open it in a new window or ask your administrator to allow cross-origin cookies."
                  />
                ) : (
                  <FormattedMessage
                    id="xpack.security.loginPage.openInNewWindowOrChangeBrowserSettingsTitle"
                    defaultMessage="To view this content, open it in a new window or adjust your browser settings to allow third-party cookies."
                  />
                )}
              </p>
            </EuiText>
            <EuiSpacer />
            <EuiButton
              href={window.location.href}
              target="_blank"
              iconType="popout"
              iconSide="right"
              fill
            >
              <FormattedMessage
                id="xpack.security.loginPage.openInNewWindowButton"
                defaultMessage="Open in new window"
              />
            </EuiButton>
          </div>
        );
      }

      return (
        <DisabledLoginForm
          title={
            <FormattedMessage
              id="xpack.security.loginPage.requiresCookiesTitle"
              defaultMessage="Cookies are required to log in to Cyberstanc"
            />
          }
          message={
            <FormattedMessage
              id="xpack.security.loginPage.requiresCookiesMessage"
              defaultMessage="Enable cookies in your browser settings to continue."
            />
          }
        />
      );
    }

    if (layout === 'error-es-unavailable') {
      return (
        <DisabledLoginForm
          title={
            <FormattedMessage
              id="xpack.security.loginPage.esUnavailableTitle"
              defaultMessage="Cannot connect to the Elasticsearch cluster"
            />
          }
          message={
            <FormattedMessage
              id="xpack.security.loginPage.esUnavailableMessage"
              defaultMessage="See the Cyberstanc logs for details and try reloading the page."
            />
          }
        />
      );
    }

    if (layout === 'error-xpack-unavailable') {
      return (
        <DisabledLoginForm
          title={
            <FormattedMessage
              id="xpack.security.loginPage.xpackUnavailableTitle"
              defaultMessage="Cannot connect to the Elasticsearch cluster currently configured for Cyberstanc."
            />
          }
          message={
            <FormattedMessage
              id="xpack.security.loginPage.xpackUnavailableMessage"
              defaultMessage="To use the full set of free features in this distribution of Cyberstanc, please update Elasticsearch to the default distribution."
            />
          }
        />
      );
    }

    if (layout !== 'form') {
      return (
        <DisabledLoginForm
          title={
            <FormattedMessage
              id="xpack.security.loginPage.unknownLayoutTitle"
              defaultMessage="Unsupported login form layout."
            />
          }
          message={
            <FormattedMessage
              id="xpack.security.loginPage.unknownLayoutMessage"
              defaultMessage="See the Cyberstanc logs for details and try reloading the page."
            />
          }
        />
      );
    }

    const { searchParams } = new URL(window.location.href);

    return (
      <LoginForm
        http={this.props.http}
        notifications={this.props.notifications}
        selector={selector}
        message={
          loginFormMessages[searchParams.get(LOGOUT_REASON_QUERY_STRING_PARAMETER) as LogoutReason]
        }
        loginAssistanceMessage={this.props.loginAssistanceMessage}
        loginHelp={loginHelp}
        authProviderHint={searchParams.get(AUTH_PROVIDER_HINT_QUERY_STRING_PARAMETER) || undefined}
      />
    );
  };
}

export function renderLoginPage(
  services: StartServices,
  { element }: Pick<AppMountParameters, 'element'>,
  props: Props
) {
  ReactDOM.render(services.rendering.addContext(<LoginPage {...props} />), element);

  return () => ReactDOM.unmountComponentAtNode(element);
}

function isWindowEmbedded() {
  try {
    return window.self !== window.top;
  } catch (error) {
    return true;
  }
}
