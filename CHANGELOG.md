# bedrock-quasar ChangeLog

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
