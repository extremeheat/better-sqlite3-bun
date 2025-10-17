# better-sqlite3-bun
[![NPM version](https://img.shields.io/npm/v/better-sqlite3-bun.svg)](http://npmjs.com/package/better-sqlite3-bun)
[![Build Status](https://github.com/extremeheat/better-sqlite3-bun/actions/workflows/ci.yml/badge.svg)](https://github.com/extremeheat/better-sqlite3-bun/actions/workflows/)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/extremeheat/better-sqlite3-bun)


  SQLite database implementation with automatic runtime detection.
 
  This module provides a unified interface for SQLite operations that works across
  different JavaScript runtimes by automatically detecting the best available implementation:
 
  - **Bun Runtime**: Uses Bun's native `bun:sqlite` module (faster, zero native dependencies)
  - **Node.js Runtime**: Falls back to the `better-sqlite3` package
 
  The implementation is determined once at startup and cached for performance.
 
  @example
  ```typescript
  import { Database } from 'better-sqlite3-bun'
 
  // Works the same regardless of runtime
  const db = new Database('application.db')
  const users = db.prepare('SELECT * FROM users WHERE active = 1').all()
 
  // Prepared statements work as expected
  const getUser = db.prepare('SELECT * FROM users WHERE id = ?')
  const user = getUser.get(123)
  ```
