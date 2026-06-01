function showPage(pageNumber) {
    var pages = document.querySelectorAll('.weapon-page');
    pages.forEach(function(page, index) {
      if (index === pageNumber - 1) {
        page.hidden = false;
      } else {
        page.hidden = true;
      }
    });
  }