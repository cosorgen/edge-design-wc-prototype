import { observable } from '@microsoft/fast-element';

export default class EdgePermissionsService {
  @observable permissions = {
    camera: {
      permission: 'ask' as 'allow' | 'block' | 'ask',
      state: 'inactive' as 'requested' | 'active' | 'inactive',
      default: 'ask' as 'allow' | 'block' | 'ask',
    },
    microphone: {
      permission: 'ask' as 'allow' | 'block' | 'ask',
      state: 'inactive' as 'requested' | 'active' | 'inactive',
      default: 'ask' as 'allow' | 'block' | 'ask',
    },
    usb: {
      permission: 'ask' as const,
      state: 'inactive' as 'requested' | 'active' | 'inactive',
      allowedDevices: [] as { name: string; id: string; icon: string }[],
      default: 'ask' as const,
    },
    bluetooth: {
      permission: 'ask' as const,
      state: 'inactive' as 'requested' | 'active' | 'inactive',
      allowedDevices: [] as { name: string; id: string; icon: string }[],
      default: 'ask' as const,
    },
    serial: {
      permission: 'ask' as const,
      state: 'inactive' as 'requested' | 'active' | 'inactive',
      allowedDevices: [] as { name: string; id: string }[],
      default: 'ask' as const,
    },
    popup: {
      permission: 'block' as 'block' | 'allow',
      state: 'inactive' as 'inactive' | 'active',
      default: 'block' as 'block' | 'allow',
    },
    location: {
      permission: 'ask' as 'allow' | 'block' | 'ask',
      state: 'inactive' as 'requested' | 'active' | 'inactive',
      default: 'ask' as 'allow' | 'block' | 'ask',
    },
    download: {
      permission: 'ask' as 'allow' | 'block' | 'ask',
      state: 'inactive' as 'requested' | 'active' | 'inactive',
      default: 'ask' as 'allow' | 'block' | 'ask',
    },
    midi: {
      permission: 'ask' as 'allow' | 'block' | 'ask',
      state: 'inactive' as 'requested' | 'active' | 'inactive',
      default: 'ask' as 'allow' | 'block' | 'ask',
    },
    clipboard: {
      permission: 'ask' as 'allow' | 'block' | 'ask',
      state: 'inactive' as 'requested' | 'active' | 'inactive',
      default: 'ask' as 'allow' | 'block' | 'ask',
    },
    notification: {
      permission: 'ask' as 'allow' | 'block' | 'ask',
      state: 'inactive' as 'requested' | 'active' | 'inactive',
      default: 'ask' as 'allow' | 'block' | 'ask',
    },
  };

  permissionPriority = Object.keys(this.permissions);

  requestCameraAccess() {
    if (this.permissions.camera.permission === 'block') {
      return;
    }

    if (this.permissions.camera.permission === 'allow') {
      this.permissions = {
        ...this.permissions,
        camera: { ...this.permissions.camera, state: 'active' },
      };
      return;
    }

    this.permissions = {
      ...this.permissions,
      camera: { ...this.permissions.camera, state: 'requested' },
    };
  }

  grantCameraAccess(alwaysAllow = false) {
    this.permissions = {
      ...this.permissions,
      camera: {
        ...this.permissions.camera,
        permission: alwaysAllow ? 'allow' : 'ask',
        state: 'active',
      },
    };
  }

  denyCameraAccess() {
    this.permissions = {
      ...this.permissions,
      camera: { ...this.permissions.camera, permission: 'block' },
    };
  }

  requestMicrophoneAccess() {
    if (this.permissions.microphone.permission === 'block') {
      return;
    }

    if (this.permissions.microphone.permission === 'allow') {
      this.permissions = {
        ...this.permissions,
        microphone: { ...this.permissions.microphone, state: 'active' },
      };
      return;
    }

    this.permissions = {
      ...this.permissions,
      microphone: { ...this.permissions.microphone, state: 'requested' },
    };
  }

  grantMicrophoneAccess(alwaysAllow = false) {
    this.permissions = {
      ...this.permissions,
      microphone: {
        ...this.permissions.microphone,
        permission: alwaysAllow ? 'allow' : 'ask',
        state: 'active',
      },
    };
  }

  denyMicrophoneAccess() {
    this.permissions = {
      ...this.permissions,
      microphone: { ...this.permissions.microphone, permission: 'block' },
    };
  }

  requestUsbAccess() {
    this.permissions = {
      ...this.permissions,
      usb: { ...this.permissions.usb, state: 'requested' },
    };
  }

  grantUsbAccess(device: { name: string; id: string; icon: string }) {
    this.permissions = {
      ...this.permissions,
      usb: {
        ...this.permissions.usb,
        state: 'active',
        allowedDevices: Array.from(
          new Set([...this.permissions.usb.allowedDevices, device]),
        ),
      },
    };
  }

  cancelUsbRequest() {
    this.permissions = {
      ...this.permissions,
      usb: {
        ...this.permissions.usb,
        state:
          this.permissions.usb.allowedDevices.length > 0
            ? 'active'
            : 'inactive',
      },
    };
  }

  denyUsbAccess(deviceId: string) {
    const allowedDevices = this.permissions.usb.allowedDevices.filter(
      (d) => d.id !== deviceId,
    );
    this.permissions = {
      ...this.permissions,
      usb: {
        ...this.permissions.usb,
        allowedDevices,
        state: allowedDevices.length > 0 ? 'active' : 'inactive',
      },
    };
  }

  requestBluetoothAccess() {
    this.permissions = {
      ...this.permissions,
      bluetooth: { ...this.permissions.bluetooth, state: 'requested' },
    };
  }

  grantBluetoothAccess(device: { name: string; id: string; icon: string }) {
    this.permissions = {
      ...this.permissions,
      bluetooth: {
        ...this.permissions.bluetooth,
        state: 'active',
        allowedDevices: Array.from(
          new Set([...this.permissions.bluetooth.allowedDevices, device]),
        ),
      },
    };
  }

  cancelBluetoothRequest() {
    this.permissions = {
      ...this.permissions,
      bluetooth: {
        ...this.permissions.bluetooth,
        state:
          this.permissions.bluetooth.allowedDevices.length > 0
            ? 'active'
            : 'inactive',
      },
    };
  }

  denyBluetoothAccess(deviceId: string) {
    const allowedDevices = this.permissions.bluetooth.allowedDevices.filter(
      (d) => d.id !== deviceId,
    );
    this.permissions = {
      ...this.permissions,
      bluetooth: {
        ...this.permissions.bluetooth,
        allowedDevices,
        state: allowedDevices.length > 0 ? 'active' : 'inactive',
      },
    };
  }

  requestSerialAccess() {
    this.permissions = {
      ...this.permissions,
      serial: { ...this.permissions.serial, state: 'requested' },
    };
  }

  grantSerialAccess(device: { name: string; id: string }) {
    this.permissions = {
      ...this.permissions,
      serial: {
        ...this.permissions.serial,
        state: 'active',
        allowedDevices: Array.from(
          new Set([...this.permissions.serial.allowedDevices, device]),
        ),
      },
    };
  }

  cancelSerialRequest() {
    this.permissions = {
      ...this.permissions,
      serial: {
        ...this.permissions.serial,
        state:
          this.permissions.serial.allowedDevices.length > 0
            ? 'active'
            : 'inactive',
      },
    };
  }

  denySerialAccess(deviceId: string) {
    const allowedDevices = this.permissions.serial.allowedDevices.filter(
      (d) => d.id !== deviceId,
    );
    this.permissions = {
      ...this.permissions,
      serial: {
        ...this.permissions.serial,
        allowedDevices,
        state: allowedDevices.length > 0 ? 'active' : 'inactive',
      },
    };
  }

  openPopup() {
    if (this.permissions.popup.permission === 'block') {
      this.permissions = {
        ...this.permissions,
        popup: { ...this.permissions.popup, state: 'active' },
      };
      return;
    }

    this.permissions = {
      ...this.permissions,
      popup: { ...this.permissions.popup, state: 'active' },
    };
    window.open(
      '',
      'Popup',
      'width=400,height=400,toolbar=no,menubar=no,scrollbars=no,resizable=no',
    );
  }

  allowPopup() {
    this.permissions = {
      ...this.permissions,
      popup: {
        ...this.permissions.popup,
        permission: 'allow',
        state: 'active',
      },
    };
  }

  denyPopup() {
    this.permissions = {
      ...this.permissions,
      popup: {
        ...this.permissions.popup,
        permission: 'block',
        state: 'active',
      },
    };
  }

  requestLocationAccess() {
    if (this.permissions.location.permission === 'block') {
      return;
    }

    if (this.permissions.location.permission === 'allow') {
      this.permissions = {
        ...this.permissions,
        location: { ...this.permissions.location, state: 'active' },
      };
      return;
    }

    this.permissions = {
      ...this.permissions,
      location: { ...this.permissions.location, state: 'requested' },
    };
  }

  grantLocationAccess(alwaysAllow = false) {
    this.permissions = {
      ...this.permissions,
      location: {
        ...this.permissions.location,
        permission: alwaysAllow ? 'allow' : 'ask',
        state: 'active',
      },
    };
  }

  denyLocationAccess() {
    this.permissions = {
      ...this.permissions,
      location: { ...this.permissions.location, permission: 'block' },
    };
  }

  requestDownload() {
    if (this.permissions.download.permission === 'block') {
      return;
    }

    if (this.permissions.download.permission === 'allow') {
      this.permissions = {
        ...this.permissions,
        download: { ...this.permissions.download, state: 'active' },
      };
      return;
    }

    this.permissions = {
      ...this.permissions,
      download: { ...this.permissions.download, state: 'requested' },
    };
  }

  allowDownload() {
    this.permissions = {
      ...this.permissions,
      download: {
        ...this.permissions.download,
        permission: 'allow',
        state: 'active',
      },
    };
  }

  denyDownload() {
    this.permissions = {
      ...this.permissions,
      download: {
        ...this.permissions.download,
        permission: 'block',
      },
    };
  }

  requestMidiAccess() {
    if (this.permissions.midi.permission === 'block') {
      return;
    }

    if (this.permissions.midi.permission === 'allow') {
      this.permissions = {
        ...this.permissions,
        midi: { ...this.permissions.midi, state: 'active' },
      };
      return;
    }

    this.permissions = {
      ...this.permissions,
      midi: { ...this.permissions.midi, state: 'requested' },
    };
  }

  grantMidiAccess() {
    this.permissions = {
      ...this.permissions,
      midi: {
        ...this.permissions.midi,
        permission: 'allow',
        state: 'active',
      },
    };
  }

  denyMidiAccess() {
    this.permissions = {
      ...this.permissions,
      midi: {
        ...this.permissions.midi,
        permission: 'block',
      },
    };
  }

  requestClipboardAccess() {
    if (this.permissions.clipboard.permission === 'block') {
      return;
    }

    if (this.permissions.clipboard.permission === 'allow') {
      this.permissions = {
        ...this.permissions,
        clipboard: { ...this.permissions.clipboard, state: 'active' },
      };
      return;
    }

    this.permissions = {
      ...this.permissions,
      clipboard: { ...this.permissions.clipboard, state: 'requested' },
    };
  }

  grantClipboardAccess() {
    this.permissions = {
      ...this.permissions,
      clipboard: {
        ...this.permissions.clipboard,
        permission: 'allow',
        state: 'active',
      },
    };
  }

  denyClipboardAccess() {
    this.permissions = {
      ...this.permissions,
      clipboard: {
        ...this.permissions.clipboard,
        permission: 'block',
      },
    };
  }

  requestNotificationAccess() {
    if (this.permissions.notification.permission === 'block') {
      return;
    }

    if (this.permissions.notification.permission === 'allow') {
      this.permissions = {
        ...this.permissions,
        notification: { ...this.permissions.notification, state: 'active' },
      };
      return;
    }

    this.permissions = {
      ...this.permissions,
      notification: { ...this.permissions.notification, state: 'requested' },
    };
  }

  grantNotificationAccess() {
    this.permissions = {
      ...this.permissions,
      notification: {
        ...this.permissions.notification,
        permission: 'allow',
        state: 'active',
      },
    };
  }

  denyNotificationAccess() {
    this.permissions = {
      ...this.permissions,
      notification: {
        ...this.permissions.notification,
        permission: 'block',
      },
    };
  }

  resetPermissions() {
    this.permissions = {
      camera: {
        ...this.permissions.camera,
        permission: this.permissions.camera.default,
        state: 'inactive',
      },
      microphone: {
        ...this.permissions.microphone,
        permission: this.permissions.microphone.default,
        state: 'inactive',
      },
      usb: {
        ...this.permissions.usb,
        permission: this.permissions.usb.default,
        state: 'inactive',
        allowedDevices: [],
      },
      bluetooth: {
        ...this.permissions.bluetooth,
        permission: this.permissions.bluetooth.default,
        state: 'inactive',
        allowedDevices: [],
      },
      serial: {
        ...this.permissions.serial,
        permission: this.permissions.serial.default,
        state: 'inactive',
        allowedDevices: [],
      },
      popup: {
        ...this.permissions.popup,
        state: 'inactive',
        permission: this.permissions.popup.default,
      },
      location: {
        ...this.permissions.location,
        permission: this.permissions.location.default,
        state: 'inactive',
      },
      download: {
        ...this.permissions.download,
        permission: this.permissions.download.default,
        state: 'inactive',
      },
      midi: {
        ...this.permissions.midi,
        permission: this.permissions.midi.default,
        state: 'inactive',
      },
      clipboard: {
        ...this.permissions.clipboard,
        permission: this.permissions.clipboard.default,
        state: 'inactive',
      },
      notification: {
        ...this.permissions.notification,
        permission: this.permissions.notification.default,
        state: 'inactive',
      },
    };
  }
}
