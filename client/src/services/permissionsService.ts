import { observable } from '@microsoft/fast-element';

export default class EdgePermissionsService {
  @observable cameraPermission: 'allow' | 'block' | 'ask' = 'ask';
  @observable cameraState: 'requested' | 'active' | 'inactive' = 'inactive';

  @observable microphonePermission: 'allow' | 'block' | 'ask' = 'ask';
  @observable microphoneState: 'requested' | 'active' | 'inactive' = 'inactive';

  requestCameraAccess() {
    if (this.cameraPermission === 'block') {
      this.cameraState = 'inactive';
      return;
    }

    if (this.cameraPermission === 'allow') {
      this.cameraState = 'active';
      return;
    }

    this.cameraState = 'requested';
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

    this.microphoneState = 'requested';
  }
}
