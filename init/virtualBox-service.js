var reg = require("cla/reg");

reg.register('service.virtualbox.run', {
    name: _('Manage VirtualBox'),
    icon: '/plugin/cla-virtualbox-plugin/icon/virtualBox.svg',
    form: '/plugin/cla-virtualbox-plugin/form/virtualBox-form.js',
    handler: function(ctx, config) {

        var ci = require("cla/ci");
        var log = require("cla/log");
        var reg = require('cla/reg');
        var errors = config.errors;
        var server = config.server;
        var response;
        var virtualBoxPath = config.virtualBoxPath;
        var virtualBoxArgs = config.virtualBoxArgs || [];
        var virtualBoxParams = virtualBoxArgs.join(" ");
        var command = config.command;
        var virtualBoxCommand;

        function remoteCommand(params, command, server, errors) {
            var output = reg.launch('service.scripting.remote', {
                name: _('VirtualBox execute'),
                config: {
                    errors: errors,
                    server: server,
                    path: command,
                    output_error: params.output_error,
                    output_warn: params.output_warn,
                    output_capture: params.output_capture,
                    output_ok: params.output_ok,
                    meta: params.meta,
                    rc_ok: params.rcOk,
                    rc_error: params.rcError,
                    rc_warn: params.rcWarn
                }
            });
            return output;
        }

        if (command == "custom") {
            virtualBoxCommand = "VBoxManage " + virtualBoxParams;
        } else if (command == "") {
            log.fatal(_("No option selected"));
        } else {
            virtualBoxCommand = "VBoxManage " + command + " " + virtualBoxParams;
        }

        log.info(_("Executing VirtualBox command: "));
        response = remoteCommand(config, virtualBoxCommand, server, errors);
        log.info(_("VirtualBox command executed: "), response.output);

        return response.output;
    }
});