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
    console.log(`${stepMessage}\n`)
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

    const { data, error } = await supabase.from('projects').insert(projects).select('id')

    if (error) {
        logErrorAndExit('projects', error)
    } else {
        logStep('Projects seeded successfully!')
    }

    return data
}

const seedTasks = async (numEntries, projectsIds) => {
    logStep('Seeding Tasks...')

    const tasks = Array.from({ length: numEntries }, () => ({
        name: faker.lorem.words(3),
        status: faker.helpers.arrayElement(['in-progress', 'completed', 'archived']),
        description: faker.lorem.sentence(),
        due_date: faker.date.future(),
        project_id: faker.helpers.arrayElement(projectsIds),
        collaborators: faker.helpers.arrayElements([1, 2, 3]),
    }))

    const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

    if (error) {
        logErrorAndExit('Tasks: ', error)
    } else {
        logStep('Tasks seeded successfully!', data)
    }

    return data
}

const seedDatabase = async (numEntrsPerTable) => {
    const projectsIds = (await seedProjects(numEntrsPerTable)).map((project) => project.id)
    await seedTasks(numEntrsPerTable, projectsIds)
}

const numEntriesPerTable = 50

seedDatabase(numEntriesPerTable)
