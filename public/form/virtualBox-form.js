(function(params) {
    var data = params.data;

    var serverComboBox = Cla.ui.ciCombo({
        name: 'server',
        class: 'generic_server',
        fieldLabel: _('Server'),
        value: data.server || '',
        allowBlank: false,
        width: 400,
        with_vars: 1
    });

    var commandComboBox = Cla.ui.comboBox({
        name: 'command',
        fieldLabel: _('Command'),
        data: [
            ['startvm',_('Start vm')],
            ['controlvm',_('Control vm')],
            ['clonevm',_('Clone vm')],
            ['list',_('List')],
            ['createvm',_('Create vm')],
            ['modifyvm',_('Modify vm')],
            ['registervm',_('Register vm')],
            ['unregistervm',_('Unregister vm')],
            ['custom',_('Custom command')]
        ],
        value: data.command || 'startvm',
        allowBlank: false,
        anchor: '100%',
        singleMode: true
    });

    var argumentsTextField = Cla.ui.arrayGrid({
        name: 'virtualBoxArgs',
        fieldLabel: _('VirtualBox parameters'),
        value: params.data.virtualBoxArgs,
        description: _('VirtualBox parameters'),
        default_value: '.',
    });


    var errorBox = Cla.ui.errorManagementBox({
        errorTypeName: 'errors',
        errorTypeValue: params.data.errors || 'fail',
        rcOkName: 'rcOk',
        rcOkValue: params.data.rcOk,
        rcWarnName: 'rcWarn',
        rcWarnValue: params.data.rcWarn,
        rcErrorName: 'rcError',
        rcErrorValue: params.data.rcError,
        errorTabsValue: params.data
    });

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            serverComboBox,
            commandComboBox,
            argumentsTextField,
            errorBox
        ]
    });


    return panel;
})