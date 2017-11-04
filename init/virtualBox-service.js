var reg = require("cla/reg");

reg.register('service.virtualbox.run', {
    name: _('Manage VirtualBox'),
    icon: '/plugin/cla-virtualbox-plugin/icon/virtualBox.svg',
    form: '/plugin/cla-virtualbox-plugin/form/virtualBox-form.js',
    rulebook: {
        moniker: 'virtualbox_task',
        description: _('Executes VirtualBox tasks'),
        required: [ 'server', 'command'],
        allow: ['server', 'command', 'virtualbox_args', 'user', 'errors'],
        mapper: {
            'virtualbox_args':'virtualBoxArgs'
        },
        examples: [{
            virtualbox_task: {
                server: 'virtualbox_server',
                command: 'startvm',
                virtualbox_args: ['--name VBox-Machine']
            }
        }]
    },
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
        var user = config.user || "";

        function remoteCommand(params, command, server, errors, user) {
            var output = reg.launch('service.scripting.remote', {
                name: _('VirtualBox execute'),
                config: {
                    errors: errors,
                    server: server,
                    user: user,
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
        response = remoteCommand(config, virtualBoxCommand, server, errors, user);
        log.info(_("VirtualBox command executed: "), response.output);

        return response.output;
    }
});