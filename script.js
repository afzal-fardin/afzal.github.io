/* Light, dependency-free interactivity: image lightbox, PDF preview, copy-DOI.
   Everything also works without JavaScript (links simply open in the browser). */
(function () {
    'use strict';

    var lastFocus = null;

    function focusables(root) {
        return [].slice.call(root.querySelectorAll('a[href], button:not([disabled])')).filter(function (n) {
            return n.offsetParent !== null;
        });
    }
    function trapTab(e, root) {
        if (e.key !== 'Tab') { return; }
        var f = focusables(root);
        if (!f.length) { return; }
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    /* ---------- Image lightbox ---------- */
    var lbLinks = [].slice.call(document.querySelectorAll('a[data-lightbox]'));
    if (lbLinks.length) {
        var lb = document.createElement('div');
        lb.className = 'lb-overlay';
        lb.hidden = true;
        lb.setAttribute('role', 'dialog');
        lb.setAttribute('aria-modal', 'true');
        lb.setAttribute('aria-label', 'Image viewer');
        lb.innerHTML =
            '<button type="button" class="lb-btn lb-close" aria-label="Close image viewer"><i class="fas fa-xmark" aria-hidden="true"></i></button>' +
            '<button type="button" class="lb-btn lb-prev" aria-label="Previous image"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>' +
            '<figure class="lb-figure"><img alt=""><figcaption></figcaption></figure>' +
            '<button type="button" class="lb-btn lb-next" aria-label="Next image"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>';
        document.body.appendChild(lb);

        var lbImg = lb.querySelector('img');
        var lbCap = lb.querySelector('figcaption');
        var lbClose = lb.querySelector('.lb-close');
        var lbPrev = lb.querySelector('.lb-prev');
        var lbNext = lb.querySelector('.lb-next');
        var group = [], idx = 0;

        var showLb = function (i) {
            idx = (i + group.length) % group.length;
            var a = group[idx];
            var thumb = a.querySelector('img');
            lbImg.src = a.getAttribute('href');
            lbImg.alt = a.getAttribute('data-alt') || (thumb ? thumb.alt : '');
            var cap = a.getAttribute('data-caption') || '';
            lbCap.innerHTML = '';
            lbCap.appendChild(document.createTextNode(cap));
            if (group.length > 1) {
                var c = document.createElement('span');
                c.className = 'lb-count';
                c.textContent = (idx + 1) + ' / ' + group.length;
                lbCap.appendChild(c);
            }
            lbPrev.hidden = lbNext.hidden = group.length < 2;
        };
        var openLb = function (a) {
            var name = a.getAttribute('data-lightbox');
            group = lbLinks.filter(function (l) { return l.getAttribute('data-lightbox') === name; });
            lastFocus = document.activeElement;
            lb.hidden = false;
            document.body.classList.add('modal-open');
            showLb(group.indexOf(a));
            lbClose.focus();
        };
        var closeLb = function () {
            lb.hidden = true;
            lbImg.removeAttribute('src');
            document.body.classList.remove('modal-open');
            if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
        };

        lbLinks.forEach(function (a) {
            a.addEventListener('click', function (e) {
                if (e.ctrlKey || e.metaKey || e.shiftKey) { return; }
                e.preventDefault();
                openLb(a);
            });
        });
        [].slice.call(document.querySelectorAll('[data-open-gallery]')).forEach(function (b) {
            b.addEventListener('click', function () {
                var name = b.getAttribute('data-open-gallery');
                var first = lbLinks.filter(function (l) { return l.getAttribute('data-lightbox') === name; })[0];
                if (first) { openLb(first); }
            });
        });
        lbClose.addEventListener('click', closeLb);
        lbPrev.addEventListener('click', function () { showLb(idx - 1); });
        lbNext.addEventListener('click', function () { showLb(idx + 1); });
        lb.addEventListener('click', function (e) { if (e.target === lb) { closeLb(); } });
        document.addEventListener('keydown', function (e) {
            if (lb.hidden) { return; }
            if (e.key === 'Escape') { closeLb(); }
            else if (e.key === 'ArrowLeft' && group.length > 1) { showLb(idx - 1); }
            else if (e.key === 'ArrowRight' && group.length > 1) { showLb(idx + 1); }
            else { trapTab(e, lb); }
        });
    } else {
        [].slice.call(document.querySelectorAll('[data-open-gallery]')).forEach(function (b) { b.hidden = true; });
    }

    /* ---------- PDF preview ---------- */
    var pdfLinks = [].slice.call(document.querySelectorAll('a[data-pdf]'));
    if (pdfLinks.length) {
        var pv = document.createElement('div');
        pv.className = 'pdf-overlay';
        pv.hidden = true;
        pv.setAttribute('role', 'dialog');
        pv.setAttribute('aria-modal', 'true');
        pv.setAttribute('aria-labelledby', 'pdf-title');
        pv.innerHTML =
            '<div class="pdf-panel">' +
            '<div class="pdf-bar"><h2 id="pdf-title">PDF preview</h2>' +
            '<a class="btn ghost" target="_blank" rel="noopener noreferrer" href="#"><i class="fas fa-up-right-from-square" aria-hidden="true"></i> Open in new tab</a>' +
            '<button type="button" class="btn primary pdf-close"><i class="fas fa-xmark" aria-hidden="true"></i> Close</button></div>' +
            '<iframe class="pdf-frame" title="PDF preview" src="about:blank"></iframe>' +
            '<p class="pdf-hint">If the preview does not appear in your browser, use &ldquo;Open in new tab&rdquo;.</p></div>';
        document.body.appendChild(pv);

        var frame = pv.querySelector('iframe');
        var ptitle = pv.querySelector('h2');
        var plink = pv.querySelector('a.btn');
        var pclose = pv.querySelector('.pdf-close');

        var closePdf = function () {
            pv.hidden = true;
            frame.src = 'about:blank';
            document.body.classList.remove('modal-open');
            if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
        };
        pdfLinks.forEach(function (a) {
            a.addEventListener('click', function (e) {
                /* Phones/tablets rarely render PDFs inside a frame: let the link open the PDF in a new tab. */
                if (window.matchMedia('(max-width: 700px)').matches || e.ctrlKey || e.metaKey || e.shiftKey) { return; }
                e.preventDefault();
                lastFocus = document.activeElement;
                var href = a.getAttribute('href');
                ptitle.textContent = a.getAttribute('data-title') || 'PDF preview';
                plink.setAttribute('href', href);
                frame.title = ptitle.textContent;
                frame.src = href + '#toolbar=1&navpanes=0&view=FitH';
                pv.hidden = false;
                document.body.classList.add('modal-open');
                pclose.focus();
            });
        });
        pclose.addEventListener('click', closePdf);
        pv.addEventListener('click', function (e) { if (e.target === pv) { closePdf(); } });
        document.addEventListener('keydown', function (e) {
            if (pv.hidden) { return; }
            if (e.key === 'Escape') { closePdf(); } else { trapTab(e, pv); }
        });
    }

    /* ---------- Copy DOI ---------- */
    if (navigator.clipboard && navigator.clipboard.writeText) {
        [].slice.call(document.querySelectorAll('button[data-copy]')).forEach(function (b) {
            b.hidden = false;
            b.addEventListener('click', function () {
                var original = b.innerHTML;
                navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () {
                    b.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Copied';
                    setTimeout(function () { b.innerHTML = original; }, 1800);
                });
            });
        });
    }
})();
