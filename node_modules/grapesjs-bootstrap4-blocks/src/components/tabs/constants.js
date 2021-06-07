const prefix = 'tabs-';
const tabsName="tabs";
const containerName = `${prefix}container`;
const navigationName = `${prefix}navigation`;
const tabPanesName = `${prefix}panes`;
const tabName = `${prefix}tab`;
const tabPaneName = `${prefix}tab-pane`;

export default {
  tabsName,
  navigationName,
  tabPanesName,
  tabName,
  tabPaneName,

  // Selectors
  tabsSelector: `[data-gjs-type="${tabsName}"]`,
  navigationSelector: `[data-gjs-type="${navigationName}"]`,
  tabPanesSelector: `[data-gjs-type="${tabPanesName}"]`,
  tabSelector: `[data-gjs-type="${tabName}"]`,
  tabPaneSelector: `[data-gjs-type="${tabPaneName}"]`,

  // IDs
  containerId: `data-${containerName}`,
  navigationId: `data-${navigationName}`,
  tabPanesId: `data-${tabPanesName}`,
  tabId: `data-${tabName}`,
  tabPaneId: `data-${tabPaneName}`,
}
