const dbConfig = {
    synchronize: true,
    migrations: ['migrations/*.js'],
    cli: {
        migrationsDir: 'migrations',
    },
}

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js'],
        })
        break;
    case 'production':
        Object.assign(dbConfig, {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: ['**/*.entity.js'],
            migrationsRun: true,
            ssl: {
                rejectUnauthorized: false,
            },

        })
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
            migrationsRun: true,
        })
        break;
    default:
        throw new Error('Invalid NODE_ENV')
}
export default dbConfig;