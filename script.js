var ajax_loader = {

    sack_new_form: function(form, plugin, func) {
        var ajax = this.pre_sack(form, func);
        ajax.setVar('call', 'ajax_loader_' + plugin);
        ajax.runAJAX();
        return ajax;
    },

    sack_form: function (form, func) {
        var ajax = this.pre_sack(form, func);
        ajax.elementObj = form.parentNode;
        ajax.runAJAX();
        return false;
    },

    pre_sack: function (form, func) {
        var ajax = new sack(DOKU_BASE + 'lib/exe/ajax.php');
        function serializeByTag(tag) {
            var inps = form.getElementsByTagName(tag);
            for (var inp in inps) {
                if (inps[inp].name) {
                    var name = (inps[inp].name.match(/^ajax_loader_data/) ||
                               inps[inp].name === 'call') ?
                               inps[inp].name :
                               ('ajax_loader_data[' + inps[inp].name + ']');
                    ajax.setVar(name, inps[inp].value);
                }
            }
        }
        serializeByTag('input');
        serializeByTag('textarea');
        ajax.afterCompletion = func;
        return ajax;
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
