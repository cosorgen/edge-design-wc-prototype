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
      permission: 'ask',
      state: 'inactive' as 'requested' | 'active' | 'inactive',
      allowedDevices: [] as { name: string; id: string; icon: string }[],
      default: 'ask',
    },
  };

  permissionPriority = ['camera', 'microphone', 'usb'] as const;

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
    };
  }
}
