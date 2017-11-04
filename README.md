# VirtualBox Plugin

<img src="https://cdn.rawgit.com/clarive/cla-virtualbox-plugin/master/public/icon/virtualBox.svg?sanitize=true" alt="VirtualBox Plugin" title="VirtualBox Plugin" width="120" height="120">

The VirtualBox plugin will allow you to execute VirtualBox command in Clarive and view its result.

# What is VirtualBox? 

VirtualBox is a software virtualization package that installs on an operating system as an application.  VirtualBox
allows additional operating systems to be installed on it as a Guest OS, and be run in a virtual environment.

## Requirements

To be able to use the plugin correctly, you must have VirtualBox installed on the server where you wish to run the
command.  Also the system must enable calling of VirtualBox command from anywhere.

## Installation

To install the plugin, place the `cla-virtualbox-plugin` folder inside `$CLARIVE_BASE/plugins` directory in the Clarive
instance.

### Manage VirtualBox

The various parameters are:

- **Server (variable name: server)** - The GenericServer Resource where you wish to execute the command. 
- **Command (command)** - List of commands to launch with the service:
    - **Start VM ("startvm")** - Start a virtual machine.
    - **Clone VM ("clonevm")** - Clone an existing virtual machine.
    - **List ("list")** - List of virtual machines.
    - **Create VM ("createvm")** - Create a virtual machine.
    - **Modify VM ("modifyvm")** - Modify a virtual machine.
    - **Register VM ("registervm")** - Register a virtual machine.
    - **Unregister VM ("unregistervm")** - Unregister a virtual machine.
    - **Custom command ("custom")** - Allows creation of a customized command.
- **VirtualBox parameters (virtualbox_args)** - Additional flags for the VirtualBox command or the custom command for VirtualBox
  management.

**Only Clarive EE**

- **Errors and Output** - These two fields deal with management of control errors. The options are:
   - **Fail and Output error** - Search for a configured error pattern in the script output. If found, an error message
     is displayed in the monitor showing the match.
   - **Warn and Output warning** - Search for a configured warning pattern in the script output. If found, an error
     message is displayed in the monitor showing the match.
   - **Custom** - If the combo box Errors is set to custom, a new form is displayed to define the behavior with the
     following fields:
    - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the
      monitor.
    - **Warn** - Range of return code values to warn the user. A warning will be displayed in the monitor.
    - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the
      monitor.  The plugin will return all the console output of the command.s
   - **Silent** - Silence all errors found.

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **Manage VirtualBox**

Example:

```yaml
      Server: virtualBox_server
      Command: Create VM
      VirtualBox parameters: --name VBox-Machine
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

```yaml
rule: VirtualBox demo
do:
   - virtualbox_task:
       server: virtualbox_server  # Required. Use the mid set to the resource you created
       user: ${username}
       command: "startvm"         # Required
       virtualbox_args: ['--name VBox-Machine']
```

##### Outputs

###### Success

The service will return the console output for the command.

```yaml
do:
   - virtualbox_task:
       server: virtualbox_server  # Required. Use the mid set to the resource you created
       user: ${username}
       command: "custom"          # Required
       virtualbox_args: ['-v']
```

For this command the output will be similar to this one:

```yaml
5.1.30r118389
```

###### Possible configuration failures

**Task failed**

You will get the error output from the console.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "virtualbox_task": "command"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Command` not available for op "virtualbox_task"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.