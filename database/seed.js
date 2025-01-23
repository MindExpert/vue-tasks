import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const logErrorAndExit = (tableName, error) => {
    console.error(
        `An error occurred while seeding ${tableName}: with code ${error.code} and message ${error.message}`,
    )
    process.exit(1)
}

const logStep = (stepMessage) => {
    console.log(`\n\n${stepMessage}\n\n`)
}

const seedProjects = async (numEntries) => {
    logStep('Seeding projects...')

    const projects = Array.from({ length: numEntries }, () => ({
        name: faker.lorem.words(3),
        slug: faker.helpers.slugify(faker.lorem.words(3)),
        status: faker.helpers.arrayElement(['in-progress', 'completed', 'archived']),
        description: faker.lorem.sentence(),
        collaborators: faker.helpers.arrayElements([1, 2, 3]),
    }))

    const { data, error } = await supabase.from('projects').insert(projects)

    if (error) {
        logErrorAndExit('projects', error)
    } else {
        logStep('Projects seeded successfully!', data)
    }
}

await seedProjects(50)
