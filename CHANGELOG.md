# bedrock-quasar ChangeLog

## 10.0.0 - 2023-10-xx

### Changed
- Update dependencies.
- **BREAKING**: Drop support for Node.js < 18.
- **BREAKING**: Update peer dep `@bedrock/vue` to v6.0 that uses peer dep
  `@bedrock/web@4.0`.
- **BREAKING**: Remove bedrock override to use quasar UMD bundle.
  - Any app using this package and `bedrock-webpack` is effected by this change
    and may need to update imports due to differences in the UMD vs ESM quasar
    bundles.
  - Change `import Quasar from 'quasar';` to `import {Quasar} from 'quasar';`.
  - Change `import {default as Quasar} from 'quasar';` to `import {Quasar} from
    'quasar';`.
  - Change `import {utils} from 'quasar';` to import `utils` used directly such
    as `import {date, format} from 'quasar';`.
  - There may be other similar changes. Check that your `quasar` imports are
    functioning properly.

### Fixed
- Fix quasar import.

## 9.0.0 - 2022-08-19

### Changed
- **BREAKING**: Use `exports` instead of `module`.
- Lint module.

## 8.0.1 - 2022-05-26

### Fixed
- Make `animate.css` and `quasar` regular dependencies to resolve
  build issues.

## 8.0.0 - 2022-05-26

### Changed
- **BREAKING**: Require Quasar 2 and Vue 3.
- **BREAKING**: Update to `animate.css@4` for Quasar 2.

### Removed
- **BREAKING**: Remove patch for CSS getComputedStyle for very old
  Firefox <= 62.

## 7.0.0 - 2022-04-14

### Removed
- **BREAKING**: Remove IE11 support.
  - To upgrade, remove any calls to `supportIE11()`.

### Changed
- Update dependencies.

## 6.0.1 - 2022-04-10

### Fixed
- Fix imports.

## 6.0.0 - 2022-04-10

### Changed
- **BREAKING**: Rename package to `@bedrock/quasar`.

## 5.0.0 - 2022-04-10

### Changed
- **BREAKING**: Convert to module (ESM).

## 4.0.0 - 2019-11-08

### Changed
- Update dependencies.
  - Using latest Quasar 1.x.
- Add `webpackChunkName` to dynamic imports.
- Import CSS for bundler.
- Load Roboto font via CSS by default.
- Load Firefox polyfill by default. Note that this package **must** be loaded
  before `quasar` for this to work.

### Removed
- Overrides unneeded with bedrock-views 7 + bedrock-webpack 3.

### Added
- Quasar based override for `bedrock-vue` base error page.

## 3.1.1 - 2019-09-17

### Fixed
- Pin Quasar to 1.1.0 to prevent less compilation failure caused by
  quasar@1.1.1.

## 3.1.0 - 2019-04-11

## Changed
- Upgrade path to ie-compat file.

## 3.0.0 - 2019-04-09

## Changed
- **BREAKING** - Upgrade quasar-framework to v1.0.0-beta.

## 2.0.0 - 2018-09-21

## Changed
- **BREAKING** - Update quasar-framework to v0.17.

## 1.0.0 - 2018-08-08

## Added
- Depend on firefox-iframe-getcomputedstyle.

## 0.1.0 - 2018-07-27

### Added
- Add core files.

- See git history for changes previous to this release.
