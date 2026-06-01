document.addEventListener('DOMContentLoaded', function () {
    const mainTabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    mainTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        mainTabs.forEach(tab => tab.classList.remove('active'));
        tab.classList.add('active');
        tabContents.forEach(content => content.classList.remove('active'));
        const activeTab = document.getElementById(tab.getAttribute('data-tab'));
        activeTab.classList.add('active');
      });
    });
    const subTabs = document.querySelectorAll('.sub-tab-link');
    const subTabContents = document.querySelectorAll('.subtab-content');
  
    subTabs.forEach(subTab => {
      subTab.addEventListener('click', function () {
        subTabs.forEach(subTab => subTab.classList.remove('active'));
        subTab.classList.add('active');
        subTabContents.forEach(subTabContent => subTabContent.classList.remove('active'));
        const activeSubTab = document.getElementById(subTab.getAttribute('data-subtab'));
        activeSubTab.classList.add('active');
      });
    });
  });