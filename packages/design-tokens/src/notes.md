# Notes

## Status

* Severe has been renamed to caution to align with Windows naming
* Status does not take into account outline styles (badge), fluent2 has different outline style colors, the control/semantic tokens will not support this.
* Subtle is not represented

## Shadow

These are not currently broken out with a ramp, right now the following will be available:

* `--ctrlShadowKeyLowColor`
* `--ctrlShadowKeyHighColor`
* `--ctrlShadowAmbientLowColor`
* `--ctrlShadowAmbientLowBlur`
* `--ctrlShadowAmbientHighColor`
* `--ctrlShadowAmbientHighBlur`

However this requires a re-work of current styles. For now we have control tokens that are matching fluent2.