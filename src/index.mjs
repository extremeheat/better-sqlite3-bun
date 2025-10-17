/**
 * SQLite database implementation with automatic runtime detection.
 *
 * This module provides a unified interface for SQLite operations that works across
 * different JavaScript runtimes by automatically detecting the best available implementation:
 *
 * - **Bun Runtime**: Uses Bun's native `bun:sqlite` module (faster, zero native dependencies)
 * - **Node.js Runtime**: Falls back to the `better-sqlite3` package
 *
 * The implementation is determined once at startup and cached for performance.
 *
 * @module better-sqlite3-bun
 *
 * @example
 * import { Database } from 'better-sqlite3-bun'
 *
 * // Works the same regardless of runtime
 * const db = new Database('application.db')
 * const users = db.prepare('SELECT * FROM users WHERE active = 1').all()
 *
 * // Prepared statements work as expected
 * const getUser = db.prepare('SELECT * FROM users WHERE id = ?')
 * const user = getUser.get(123)
 */

/**
 * The `Database` class represents the SQLite database connection.
 * The actual implementation depends on the detected runtime:
 * - Bun: uses `bun:sqlite`
 * - Node.js: uses `better-sqlite3`
 *
 * @type {import('better-sqlite3').Database}
 */
let Database

try {
  // Try Bun's native SQLite first (better performance, no native dependencies required)
  // @ts-ignore - Bun's built-in modules are not recognized by TypeScript in non-Bun environments
  const sqlite3 = await import('bun:sqlite')
  Database = sqlite3.Database
  Database.prototype.pragma = () => {}
} catch {
  // Fall back to better-sqlite3 for Node.js environments
  try {
    const sqlite3 = await import('better-sqlite3')
    Database = sqlite3.default
  } catch (error) {
    throw new Error(
      'SQLite database initialization failed. ' +
      'For Node.js: Install better-sqlite3 (npm install better-sqlite3). ' +
      'For Bun: Ensure you are running in a Bun environment.',
      { cause: error }
    )
  }
}

export { Database }


