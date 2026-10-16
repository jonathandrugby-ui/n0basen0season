// Copy button for the email signature page.
document.getElementById('copy').addEventListener('click', function () {
    var sig = document.getElementById('sig');
    var html = sig.outerHTML;
    var text = sig.innerText;
    var done = document.getElementById('done');
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
