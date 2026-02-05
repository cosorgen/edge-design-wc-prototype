import { observable } from '@microsoft/fast-element';

export default class EdgePermissionsService {
  @observable cameraPermission: 'allow' | 'block' | 'ask' = 'ask';
  @observable cameraState: 'active' | 'inactive' = 'inactive';

  @observable microphonePermission: 'allow' | 'block' | 'ask' = 'ask';
  @observable microphoneState: 'active' | 'inactive' = 'inactive';

  @observable permissionsPrompted: Array<'camera' | 'microphone'> = [];

  requestCameraAccess() {
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
    this.permissionsPrompted = this.permissionsPrompted.filter(
      (p) => p !== 'camera',
    );
  }
  denyCameraAccess() {
    this.cameraPermission = 'block';
    this.cameraState = 'inactive';
    this.permissionsPrompted = this.permissionsPrompted.filter(
      (p) => p !== 'camera',
    );
  }

  requestMicrophoneAccess() {
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
    this.permissionsPrompted = this.permissionsPrompted.filter(
      (p) => p !== 'microphone',
    );
  }

  denyMicrophoneAccess() {
    this.microphonePermission = 'block';
    this.microphoneState = 'inactive';
    this.permissionsPrompted = this.permissionsPrompted.filter(
      (p) => p !== 'microphone',
    );
  }
}
