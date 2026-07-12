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

const SURFACE_ATTRIBUTE = 'data-cyberstanc-runtime-surface';
const STYLE_ELEMENT_ID = 'cyberstanc-runtime-ui-styles';
const APP_ROOT_SELECTOR = '.kbnAppWrapper';

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
 * Starts an idempotent, browser-only UI layer for Integrations, Rules, and
 * Alerts. It never touches form values, links, code, application state, or API
 * data, and returns a cleanup function for the core browser lifecycle.
 */
export const startCyberstancRuntimeUiInjection = ({
  documentRef = document,
  windowRef = window,
}: {
  documentRef?: Document;
  windowRef?: Window;
} = {}): (() => void) => {
  const replacedTextNodes = new Map<Text, ReplacedText>();
  const pendingTextRoots = new Set<Node>();
  let activeSurface: CyberstancRuntimeSurface | undefined;
  let animationFrame: number | undefined;
  let needsFullTextScan = true;

  const restoreReplacedText = () => {
    replacedTextNodes.forEach(({ original, replacement }, textNode) => {
      if (textNode.isConnected && textNode.data === replacement) {
        textNode.data = original;
      }
    });
    replacedTextNodes.clear();
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
    replaceVisibleBrandText();
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
      } else {
        mutation.addedNodes.forEach((node) => pendingTextRoots.add(node));
      }
    });
    scheduleRuntimeUi();
  });
  observer.observe(documentRef.body, { childList: true, characterData: true, subtree: true });
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
    documentRef.body.removeAttribute(SURFACE_ATTRIBUTE);
    removeRuntimeStyles(documentRef);
  };
};
