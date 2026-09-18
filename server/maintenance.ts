import { copyDatabase, verifyDatabase } from './databaseBackup.ts'

const [action, source, destination, ...extra] = process.argv.slice(2)
try {
  if (extra.length || !source || !['backup', 'restore', 'verify'].includes(action)
    || (action === 'verify' ? !!destination : !destination)) {
    throw new Error('Usage: npm run db:backup -- source.sqlite new-backup.sqlite | npm run db:restore -- backup.sqlite new-restored.sqlite | npm run db:verify -- snapshot.sqlite')
  }
  const result = action === 'verify' ? verifyDatabase(source) : await copyDatabase(source, destination)
  console.log(`${action} verified: ${result.rooms} room records. No running service or source database was changed.`)
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Database maintenance failed.')
  process.exitCode = 1
}
