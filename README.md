# VirtualBox Plugin

The VirtualBox plugin will allow you to execute VirtualBox command in Clarive and view its result.

# What is VirtualBox? 

VirtualBox is a software virtualization package that installs on an operating system as an application.  VirtualBox
allows additional operating systems to be installed on it as a Guest OS, and be run in a virtual environment.

## Requirements

To be able to use the plugin correctly, you must have VirtualBox installed on the server where you wish to run the
command.  Also the system must enable calling of VirtualBox command from anywhere.

## Installation

To install the plugin, place the `cla-virtualBox-plugin` folder inside `CLARIVE_BASE/plugins` directory in the Clarive
instance.

## How to Use

Once the plugin is placed in its folder, you can start using it by going to your Clarive instance.

After restarting your Clarive instance, you will have a new palette service called 'Manage VirtualBox'.

### Manage VirtualBox

The service will execute the command that you set on the server you specify.

The parameters available for this service are:

- **Server** - The GenericServer Resource where you wish to execute the command. 
- **Command** - List of commands to launch with the service:
    - **Start vm** - Start a virtual machine.
    - **Clone vm** - Clone an existing virtual machine.
    - **List** - List of virtual machines.
    - **Create vm** - Create a virtual machine.
    - **Modify vm** - Modify a virtual machine.
    - **Register vm** - Register a virtual machine.
    - **Unregister vm** - Unregister a virtual machine.
    - **Custom command** - Allows creation of a customized command.
- **VirtualBox parameters** - Additional flags for the VirtualBox command or the custom command for VirtualBox
  management.
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

Configuration example:

      Server: virtualBox_server
      Command: Create VM
      VirtualBox parameters: --name VBox-Machine
