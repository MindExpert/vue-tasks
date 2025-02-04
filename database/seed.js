import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const testingUserEmail = process.env.TESTING_USER_EMAIL
if (!testingUserEmail) {
    console.error('Have you forgot to add TESTING_USER_EMAIL to your .env file?')
    process.exit()
}

const logErrorAndExit = (tableName, error) => {
    console.error(
        `An error occurred while seeding ${tableName}: with code ${error.code} and message ${error.message}`,
    )
    process.exit(1)
}

const logStep = (stepMessage) => {
    console.log(`${stepMessage}\n`)
}

const PrimaryTestUserExists = async () => {
    logStep('Checking if primary test user exists...')
    const { data, error } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('username', 'testaccount1')
        .single()

    if (error) {
        console.log('Primary test user not found. Will create one.')
        return false
    }

    logStep('Primary test user is found.')
    return data?.id
}

const createPrimaryTestUser = async () => {
    logStep('Creating primary test user...')
    const firstName = 'Test'
    const lastName = 'Account'
    const userName = 'testaccount1'
    const email = testingUserEmail
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: 'password',
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                full_name: firstName + ' ' + lastName,
                username: userName,
            },
        },
    })

    if (error) {
        logErrorAndExit('Users', error)
    }

    if (data) {
        const userId = data.user.id
        await supabase.from('profiles').insert({
            id: userId,
            full_name: firstName + ' ' + lastName,
            username: userName,
            bio: 'The main testing account',
            avatar_url: `https://i.pravatar.cc/150?u=${data.user.id}`,
        })

        logStep('Primary test user created successfully.')
        return userId
    }
}

const seedProjects = async (numEntries, userId) => {
    logStep('Seeding projects...')

    const projects = Array.from({ length: numEntries }, () => ({
        name: faker.lorem.words(3),
        slug: faker.helpers.slugify(faker.lorem.words(3)),
        status: faker.helpers.arrayElement(['in-progress', 'completed', 'archived']),
        description: faker.lorem.sentence(),
        collaborators: faker.helpers.arrayElements([userId]),
    }))

    const { data, error } = await supabase.from('projects').insert(projects).select('id')

    if (error) return logErrorAndExit('projects', error)

    logStep('Projects seeded successfully!')

    return data
}

const seedTasks = async (numEntries, projectsIds, userId) => {
    logStep('Seeding Tasks...')

    const tasks = Array.from({ length: numEntries }, () => ({
        name: faker.lorem.words(3),
        status: faker.helpers.arrayElement(['in-progress', 'completed', 'archived']),
        description: faker.lorem.sentence(),
        due_date: faker.date.future(),
        profile_id: userId,
        project_id: faker.helpers.arrayElement(projectsIds),
        collaborators: faker.helpers.arrayElements([userId]),
    }))

    const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

    if (error) return logErrorAndExit('Tasks: ', error)

    logStep('Tasks seeded successfully!', data)

    return data
}

const seedDatabase = async (numEntrsPerTable) => {
    let userId

    const testUserId = await PrimaryTestUserExists()

    if (!testUserId) {
        const primaryTestUserId = await createPrimaryTestUser()
        userId = primaryTestUserId
    } else {
        userId = testUserId
    }

    const projectsIds = (await seedProjects(numEntrsPerTable, userId)).map((project) => project.id)

    await seedTasks(numEntrsPerTable, projectsIds, userId)
}

const numEntriesPerTable = 50

seedDatabase(numEntriesPerTable)
