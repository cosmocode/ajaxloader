var ajax_loader = {

    sack_form: function (form, func, replace) {
        if (typeof replace === undefined) {
            replace = true;
        }
        var ajax = new sack(DOKU_BASE + 'lib/exe/ajax.php');
        function serializeByTag(tag) {
            var inps = form.getElementsByTagName(tag);
            for (var inp in inps) {
                if (inps[inp].name) {
                    ajax.setVar(inps[inp].name, inps[inp].value);
                }
            }
        }
        serializeByTag('input');
        serializeByTag('textarea');
        if (replace) {
            ajax.elementObj = form.parentNode;
        }
        ajax.afterCompletion = func;
        ajax.runAJAX();
        return false;
    },

    start: function () {
        var forms = getElementsByClass('ajax_loader', document, 'form');
        if (forms.length > 0) ajax_loader.sack_form(forms[0], ajax_loader.start);
    },

    Loader: function (plugin, data) {
        var form = document.createElement('form');
        form.className = 'ajax_loader';
        form.addHidden = function (name, value) {
            this.innerHTML += '<input type="hidden" name="' + name + '" value="' + value +
                              '" />';
        };
        form.addHidden('call', 'ajax_loader_' + plugin);
        for (var k in data) {
            form.addHidden('ajax_loader_data[' + k + ']', data[k]);
        }
        return form;
    }


};

addInitEvent(ajax_loader.start);
