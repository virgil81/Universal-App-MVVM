﻿(function (g, WinJS) {
    var Messenger = {
        on: function (name, callback, scope) {
            WinJS.Application.addEventListener(name, function (e) { callback.call(scope || this, e.value) }, false);
        },

        off: function (name, callback, scope) {
            WinJS.Application.removeEventListener(name, function (e) { callback.call(scope || this, e.value) }, false);
        },

        trigger: function (name, value) {
            WinJS.Application.queueEvent({ type: name, value: value });
        }
    };

    // Navigate events as global events
    var nav = WinJS.Navigation;
    nav.addEventListener('beforenavigate', function (e) {
        WinJS.Messenger.trigger('beforenavigate', e);
    });
    nav.addEventListener('navigating', function (e) {
        WinJS.Messenger.trigger('navigating', e);
    });
    nav.addEventListener('navigated', function (e) {
        WinJS.Messenger.trigger('navigated', e);
    });

    WinJS.Namespace.define('WinJS', {
        Messenger: Messenger
    });
})(this, WinJS);