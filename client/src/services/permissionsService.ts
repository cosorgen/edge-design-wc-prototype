import { observable } from '@microsoft/fast-element';

export default class EdgePermissionsService {
  @observable cameraPermission: 'allow' | 'block' | 'ask' = 'ask';
  @observable cameraState: 'requested' | 'active' | 'inactive' = 'inactive';

  @observable microphonePermission: 'allow' | 'block' | 'ask' = 'ask';
  @observable microphoneState: 'requested' | 'active' | 'inactive' = 'inactive';

  @observable permissionsPrompted: Array<'camera' | 'microphone'> = [];

  @observable statusIcon?: 'camera' | 'microphone';
  @observable statusState?: 'allow' | 'block';

  requestCameraAccess() {
    this.cameraState = 'requested';

    if (this.cameraPermission === 'block') {
      this.cameraState = 'inactive';
      return;
    }

    if (this.cameraPermission === 'allow') {
      this.cameraState = 'active';
      return;
    }

    if (!this.permissionsPrompted.includes('camera')) {
      this.permissionsPrompted = [...this.permissionsPrompted, 'camera'];
    }
  }

  grantCameraAccess(alwaysAllow = false) {
    this.cameraPermission = alwaysAllow ? 'allow' : 'ask';
    this.cameraState = 'active';
    this.statusIcon = 'camera';
    this.statusState = 'allow';
    this.permissionsPrompted = this.permissionsPrompted.filter(
      (p) => p !== 'camera',
    );
  }

  denyCameraAccess() {
    this.cameraPermission = 'block';
    this.cameraState = 'inactive';
    this.statusIcon = 'camera';
    this.statusState = 'block';
    this.permissionsPrompted = this.permissionsPrompted.filter(
      (p) => p !== 'camera',
    );
  }

  requestMicrophoneAccess() {
    this.microphoneState = 'requested';

    if (this.microphonePermission === 'block') {
      this.microphoneState = 'inactive';
      return;
    }

    if (this.microphonePermission === 'allow') {
      this.microphoneState = 'active';
      return;
    }

    if (!this.permissionsPrompted.includes('microphone')) {
      this.permissionsPrompted = [...this.permissionsPrompted, 'microphone'];
    }
  }

  grantMicrophoneAccess(alwaysAllow = false) {
    this.microphonePermission = alwaysAllow ? 'allow' : 'ask';
    this.microphoneState = 'active';
    if (this.statusIcon !== 'camera') {
      this.statusIcon = 'microphone';
      this.statusState = 'allow';
    }
    this.permissionsPrompted = this.permissionsPrompted.filter(
      (p) => p !== 'microphone',
    );
  }

  denyMicrophoneAccess() {
    this.microphonePermission = 'block';
    this.microphoneState = 'inactive';
    if (this.statusIcon !== 'camera') {
      this.statusIcon = 'microphone';
      this.statusState = 'block';
    }
    this.permissionsPrompted = this.permissionsPrompted.filter(
      (p) => p !== 'microphone',
    );
  }
}
