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
  };

  permissionPriority = ['camera', 'microphone'] as const;

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
    };
  }
}
