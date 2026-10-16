// Copy buttons for the email signature page. Each button copies the element named in data-target.
document.querySelectorAll('button.copy').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var sig = document.getElementById(btn.getAttribute('data-target'));
    var done = document.getElementById(btn.getAttribute('data-done'));
    var html = sig.outerHTML;
    var text = sig.innerText;
    function fallback() {
      var r = document.createRange(); r.selectNode(sig);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      var ok = document.execCommand('copy'); s.removeAllRanges();
      done.textContent = ok ? 'Copied. Now paste it into your signature settings.' : 'Select the signature above and copy it by hand.';
    }
    if (navigator.clipboard && window.ClipboardItem) {
      navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' })
      })]).then(function () { done.textContent = 'Copied. Now paste it into your signature settings.'; }, fallback);
    } else { fallback(); }
  });
});
