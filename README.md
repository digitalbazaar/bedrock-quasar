# bedrock-quasar

Frontend support for the [Quasar Framework][] in Bedrock Web applications

## Usage

**Note**: This module currently must be loaded **before** `quasar` due to a
specific Firefox patch polyfill. Take care to ensure this loading order and
avoid dynamic import patterns that could load `quasar` first.

[Quasar Framework]: https://quasar-framework.org/
