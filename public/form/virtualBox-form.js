(function(params) {
    var data = params.data;

    var serverComboBox = Cla.ui.ciCombo({
        name: 'server',
        role: 'Server',
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
            ['startvm',_('Start')],
            ['controlvm',_('Control')],
            ['clonevm',_('Clone')],
            ['list',_('List')],
            ['createvm',_('Create')],
            ['modifyvm',_('Modify')],
            ['registervm',_('Register')],
            ['unregistervm',_('Unregister')],
            ['custom',_('Custom command')]
        ],
        value: data.command || 'startvm',
        allowBlank: false,
        anchor: '100%',
        singleMode: true
    });

    var argumentsTextField = Cla.ui.arrayGrid({
        name: 'virtualBoxArgs',
        fieldLabel: _('Parameters'),
        value: params.data.virtualBoxArgs,
        description: _('Parameters'),
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