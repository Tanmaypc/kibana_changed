/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

type CyberstancRuntimeSurface = 'integrations' | 'rules' | 'alerts';

interface RuntimeLocation {
  pathname: string;
  hash: string;
}

interface ReplacedText {
  original: string;
  replacement: string;
}

const CYBERSTANC_WEBSITE_URL = 'https://cyberstanc.com';
const SURFACE_ATTRIBUTE = 'data-cyberstanc-runtime-surface';
const STYLE_ELEMENT_ID = 'cyberstanc-runtime-ui-styles';
const APP_ROOT_SELECTOR = '.kbnAppWrapper';
const ELASTIC_WEBSITE_DOMAINS = [
  'elastic.co',
  'elastic.com',
  'elastic.dev',
  'ela.st',
];
const OPERATIONAL_ELASTIC_HOSTS = [
  'apm-agent-versions.elastic.co',
  'artifacts-api.elastic.co',
  'artifacts.elastic.co',
  'artifacts.security.elastic.co',
  'cdn.elastic.co',
  'cloud.elastic.co',
  'epr.elastic.co',
  'feeds.elastic.co',
  'helm.elastic.co',
  'kibana-knowledge-base-artifacts.elastic.co',
  'ml-models.elastic.co',
  'packages.elastic.co',
  'static-www.elastic.co',
  'telemetry-staging.elastic.co',
  'telemetry.elastic.co',
  'tiles.maps.elastic.co',
];

const SURFACE_ANCHORS: Record<CyberstancRuntimeSurface, string> = {
  integrations: [
    '[data-test-subj="epmList.integrationCards"]',
    '[data-test-subj="epm.OverviewPage"]',
    '[data-test-subj="integrationPolicyTable"]',
  ].join(', '),
  rules: '[data-test-subj="all-rules"], [data-test-subj^="rules-details-"]',
  alerts:
    '[data-test-subj="alerts-page-content"], [data-test-subj="alerts-page-data-view-wrapper"]',
};

const SKIPPED_TEXT_ANCESTOR_SELECTOR = [
  'a',
  'code',
  'input',
  'option',
  'pre',
  'script',
  'select',
  'style',
  'textarea',
  '[contenteditable="true"]',
  '[data-test-subj*="codeBlock"]',
  '[data-test-subj*="codeEditor"]',
].join(',');

const RUNTIME_STYLES = `
body[${SURFACE_ATTRIBUTE}] {
  --cyberstanc-runtime-accent: #00b8d9;
  --cyberstanc-runtime-accent-strong: #007f9e;
  --cyberstanc-runtime-line: rgb(0 184 217 / 30%);
  --cyberstanc-runtime-wash: rgb(0 184 217 / 8%);
}

body[${SURFACE_ATTRIBUTE}="rules"] [data-test-subj="header-page"],
body[${SURFACE_ATTRIBUTE}="alerts"] [data-test-subj="header-page"] {
  padding: 16px 20px;
  border: 1px solid var(--cyberstanc-runtime-line);
  border-radius: 12px;
  background: linear-gradient(120deg, var(--cyberstanc-runtime-wash), transparent 62%);
  box-shadow: inset 4px 0 0 var(--cyberstanc-runtime-accent);
}

body[${SURFACE_ATTRIBUTE}="integrations"] [data-test-subj="epmList.integrationCards"],
body[${SURFACE_ATTRIBUTE}="integrations"] [data-test-subj="epm.OverviewPage"],
body[${SURFACE_ATTRIBUTE}="integrations"] [data-test-subj="integrationPolicyTable"],
body[${SURFACE_ATTRIBUTE}="rules"] [data-test-subj="all-rules"],
body[${SURFACE_ATTRIBUTE}="alerts"] [data-test-subj="alerts-page-content"] {
  border-radius: 12px;
}

body[${SURFACE_ATTRIBUTE}="integrations"] [data-test-subj="epmList.integrationCards"] .euiCard,
body[${SURFACE_ATTRIBUTE}="integrations"] [data-test-subj="epm.OverviewPage"] .euiPanel,
body[${SURFACE_ATTRIBUTE}="rules"] [data-test-subj="all-rules"] .euiPanel,
body[${SURFACE_ATTRIBUTE}="alerts"] [data-test-subj="alerts-page-content"] .euiPanel {
  border-color: var(--cyberstanc-runtime-line);
  box-shadow: 0 8px 24px rgb(16 42 67 / 8%);
}

body[${SURFACE_ATTRIBUTE}="integrations"]
  [data-test-subj="epmList.integrationCards"] .euiCard:hover {
  border-color: var(--cyberstanc-runtime-accent);
  box-shadow: 0 12px 30px rgb(0 184 217 / 16%);
  transform: translateY(-2px);
}

body[${SURFACE_ATTRIBUTE}]
  .kbnAppWrapper .euiButton.euiButton--primary.euiButton--fill {
  border-color: var(--cyberstanc-runtime-accent-strong);
  background:
    linear-gradient(135deg, var(--cyberstanc-runtime-accent-strong), var(--cyberstanc-runtime-accent));
}

body[${SURFACE_ATTRIBUTE}] .kbnAppWrapper .euiTableHeaderCell {
  border-block-end-color: var(--cyberstanc-runtime-line);
  background-color: var(--cyberstanc-runtime-wash);
}

body[${SURFACE_ATTRIBUTE}] .kbnAppWrapper .euiBadge.euiBadge--primary {
  border-color: var(--cyberstanc-runtime-line);
}

@media (prefers-reduced-motion: reduce) {
  body[${SURFACE_ATTRIBUTE}] .kbnAppWrapper .euiCard {
    transition: none;
  }

  body[${SURFACE_ATTRIBUTE}="integrations"]
    [data-test-subj="epmList.integrationCards"] .euiCard:hover {
    transform: none;
  }
}
`;

/**
 * Identifies only the three explicitly branded runtime areas. DOM anchors are a
 * fallback for deployments that use a non-standard base path or hash routing.
 */
export const getCyberstancRuntimeSurface = (
  runtimeLocation: RuntimeLocation,
  root: ParentNode
): CyberstancRuntimeSurface | undefined => {
  const route = `${runtimeLocation.pathname}${runtimeLocation.hash}`.toLowerCase();

  if (/\/app\/integrations(?:[/?#]|$)/.test(route)) {
    return 'integrations';
  }

  if (/\/app\/security\/rules(?:[/?#]|$)/.test(route)) {
    return 'rules';
  }

  if (/\/app\/security\/alerts(?:[/?#]|$)/.test(route)) {
    return 'alerts';
  }

  if (
    route.includes('/app/integrations') &&
    root.querySelector(SURFACE_ANCHORS.integrations)
  ) {
    return 'integrations';
  }

  if (route.includes('/app/security') && root.querySelector(SURFACE_ANCHORS.rules)) {
    return 'rules';
  }

  if (route.includes('/app/security') && root.querySelector(SURFACE_ANCHORS.alerts)) {
    return 'alerts';
  }
};

/** Rebrands presentation copy while deliberately preserving technical product names. */
export const replaceCyberstancRuntimeBrandText = (value: string): string =>
  value
    .replace(/Elastic Security/g, 'Cyberstanc Security')
    .replace(/Elastic managed/g, 'Cyberstanc managed')
    .replace(/Elastic prebuilt/g, 'Cyberstanc prebuilt')
    .replace(/Elastic authored/g, 'Cyberstanc authored');

const isDomainOrSubdomain = (hostname: string, domain: string): boolean =>
  hostname === domain || hostname.endsWith(`.${domain}`);

/** Returns the Cyberstanc destination only for external Elastic-owned websites. */
export const getCyberstancRedirectUrl = (
  href: string,
  baseUrl = 'https://localhost/'
): string | undefined => {
  try {
    const currentUrl = new URL(baseUrl);
    const url = new URL(href, currentUrl);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return;
    }

    if (url.origin === currentUrl.origin) {
      return;
    }

    const hostname = url.hostname.toLowerCase().replace(/\.$/, '');
    const isOperationalDestination =
      OPERATIONAL_ELASTIC_HOSTS.includes(hostname) ||
      isDomainOrSubdomain(hostname, 'elastic-cloud.com') ||
      (hostname === 'www.elastic.co' &&
        (url.pathname === '/downloads' || url.pathname.startsWith('/downloads/'))) ||
      (hostname === 'ela.st' &&
        (url.pathname === '/download-elastic-agent' ||
          url.pathname.startsWith('/download-elastic-agent/')));

    if (isOperationalDestination) {
      return;
    }

    const isElasticWebsite =
      ELASTIC_WEBSITE_DOMAINS.some((domain) => isDomainOrSubdomain(hostname, domain)) ||
      hostname === 'elastic.github.io';

    return isElasticWebsite ? CYBERSTANC_WEBSITE_URL : undefined;
  } catch {
    return;
  }
};

const shouldSkipTextNode = (textNode: Text): boolean => {
  const parent = textNode.parentElement;
  return parent === null || parent.closest(SKIPPED_TEXT_ANCESTOR_SELECTOR) !== null;
};

const addRuntimeStyles = (documentRef: Document) => {
  if (documentRef.getElementById(STYLE_ELEMENT_ID)) {
    return;
  }

  const style = documentRef.createElement('style');
  style.id = STYLE_ELEMENT_ID;
  style.dataset.cyberstancRuntimeUi = 'true';
  style.textContent = RUNTIME_STYLES;
  documentRef.head.appendChild(style);
};

const removeRuntimeStyles = (documentRef: Document) => {
  documentRef.getElementById(STYLE_ELEMENT_ID)?.remove();
};

/**
 * Starts a browser-only UI layer. Elastic-owned website links are redirected
 * throughout the rendered UI, while presentation styling and text remain
 * scoped to Integrations, Rules, and Alerts. Form values, code, application
 * state, internal routes, and API data are never changed.
 */
export const startCyberstancRuntimeUiInjection = ({
  documentRef = document,
  windowRef = window,
}: {
  documentRef?: Document;
  windowRef?: Window & typeof globalThis;
} = {}): (() => void) => {
  const replacedTextNodes = new Map<Text, ReplacedText>();
  const replacedLinks = new Map<HTMLAnchorElement, string>();
  const pendingTextRoots = new Set<Node>();
  const pendingLinkRoots = new Set<Node>();
  let activeSurface: CyberstancRuntimeSurface | undefined;
  let animationFrame: number | undefined;
  let needsFullLinkScan = true;
  let needsFullTextScan = true;

  const restoreReplacedText = () => {
    replacedTextNodes.forEach(({ original, replacement }, textNode) => {
      if (textNode.isConnected && textNode.data === replacement) {
        textNode.data = original;
      }
    });
    replacedTextNodes.clear();
  };

  const restoreReplacedLinks = () => {
    replacedLinks.forEach((originalHref, link) => {
      if (link.isConnected && link.getAttribute('href') === CYBERSTANC_WEBSITE_URL) {
        link.setAttribute('href', originalHref);
      }
    });
    replacedLinks.clear();
  };

  const replaceLink = (link: HTMLAnchorElement) => {
    const currentHref = link.getAttribute('href');
    if (!currentHref) {
      return;
    }

    const previousHref = replacedLinks.get(link);
    if (previousHref && currentHref === CYBERSTANC_WEBSITE_URL) {
      return;
    }

    if (previousHref) {
      replacedLinks.delete(link);
    }

    const redirectUrl = getCyberstancRedirectUrl(currentHref, windowRef.location.href);
    if (redirectUrl) {
      replacedLinks.set(link, currentHref);
      link.setAttribute('href', redirectUrl);
    }
  };

  const replaceElasticWebsiteLinks = () => {
    replacedLinks.forEach((_originalHref, link) => {
      if (!link.isConnected) {
        replacedLinks.delete(link);
      }
    });

    const roots = needsFullLinkScan ? [documentRef.body] : [...pendingLinkRoots];
    needsFullLinkScan = false;
    pendingLinkRoots.clear();

    roots.forEach((root) => {
      if (!root.isConnected || (root !== documentRef.body && !documentRef.body.contains(root))) {
        return;
      }

      if (root.nodeType !== windowRef.Node.ELEMENT_NODE) {
        return;
      }

      const element = root as Element;
      if (element.matches('a[href]')) {
        replaceLink(element as HTMLAnchorElement);
      }
      element.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(replaceLink);
    });
  };

  const replaceTextNode = (textNode: Text) => {
    const previousReplacement = replacedTextNodes.get(textNode);

    if (previousReplacement?.replacement === textNode.data) {
      return;
    }

    if (previousReplacement) {
      replacedTextNodes.delete(textNode);
    }

    if (shouldSkipTextNode(textNode)) {
      return;
    }

    const replacement = replaceCyberstancRuntimeBrandText(textNode.data);
    if (replacement !== textNode.data) {
      replacedTextNodes.set(textNode, { original: textNode.data, replacement });
      textNode.data = replacement;
    }
  };

  const replaceVisibleBrandText = () => {
    const appRoot = documentRef.querySelector(APP_ROOT_SELECTOR);
    if (!appRoot) {
      return;
    }

    replacedTextNodes.forEach((_replacement, textNode) => {
      if (!textNode.isConnected) {
        replacedTextNodes.delete(textNode);
      }
    });

    const roots = needsFullTextScan ? [appRoot] : [...pendingTextRoots];
    needsFullTextScan = false;
    pendingTextRoots.clear();

    roots.forEach((root) => {
      if (!root.isConnected || (root !== appRoot && !appRoot.contains(root))) {
        return;
      }

      if (root.nodeType === windowRef.Node.TEXT_NODE) {
        replaceTextNode(root as Text);
        return;
      }

      const walker = documentRef.createTreeWalker(root, windowRef.NodeFilter.SHOW_TEXT);
      let currentNode = walker.nextNode();
      while (currentNode) {
        replaceTextNode(currentNode as Text);
        currentNode = walker.nextNode();
      }
    });
  };

  const applyRuntimeUi = () => {
    animationFrame = undefined;
    replaceElasticWebsiteLinks();
    const nextSurface = getCyberstancRuntimeSurface(windowRef.location, documentRef);

    if (activeSurface !== nextSurface) {
      restoreReplacedText();
      pendingTextRoots.clear();
      needsFullTextScan = true;
      activeSurface = nextSurface;
    }

    if (!activeSurface) {
      pendingTextRoots.clear();
      documentRef.body.removeAttribute(SURFACE_ATTRIBUTE);
      removeRuntimeStyles(documentRef);
      return;
    }

    documentRef.body.setAttribute(SURFACE_ATTRIBUTE, activeSurface);
    addRuntimeStyles(documentRef);
    // Integration copy is rebranded in Fleet's source/render pipeline so package
    // content, headings, and cards do not depend on DOM text replacement.
    if (activeSurface === 'integrations') {
      pendingTextRoots.clear();
      needsFullTextScan = true;
    } else {
      replaceVisibleBrandText();
    }
  };

  const scheduleRuntimeUi = () => {
    if (animationFrame === undefined) {
      animationFrame = windowRef.requestAnimationFrame(applyRuntimeUi);
    }
  };

  const observer = new windowRef.MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData') {
        pendingTextRoots.add(mutation.target);
      } else if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => pendingTextRoots.add(node));
        mutation.addedNodes.forEach((node) => pendingLinkRoots.add(node));
      } else if (mutation.type === 'attributes') {
        pendingLinkRoots.add(mutation.target);
      }
    });
    scheduleRuntimeUi();
  });
  observer.observe(documentRef.body, {
    attributeFilter: ['href'],
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
  windowRef.addEventListener('hashchange', scheduleRuntimeUi);
  windowRef.addEventListener('popstate', scheduleRuntimeUi);
  applyRuntimeUi();

  return () => {
    observer.disconnect();
    windowRef.removeEventListener('hashchange', scheduleRuntimeUi);
    windowRef.removeEventListener('popstate', scheduleRuntimeUi);
    if (animationFrame !== undefined) {
      windowRef.cancelAnimationFrame(animationFrame);
    }
    restoreReplacedText();
    restoreReplacedLinks();
    documentRef.body.removeAttribute(SURFACE_ATTRIBUTE);
    removeRuntimeStyles(documentRef);
  };
};
