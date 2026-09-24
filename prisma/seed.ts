import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/infra/db/prisma/client";

const dbUser = `${process.env.DB_USER}`;
const dbPassword = `${process.env.DB_PASSWORD}`;
const dbHost = `${process.env.DB_HOST}`;
const dbPort = `${process.env.DB_PORT}`;
const dbName = `${process.env.DB_NAME}`;
const connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function loadSeedData(path: string) {
    const module = await import(path, { with: { type: "json" } });
    return module.default;
}

async function main() {
    const existedProfiles = await prisma.profile.count();

    if (existedProfiles) {
        console.log("\nPrisma: skip seeding because of existing profiles");
        return;
    }
    const seedData = await loadSeedData("./seed_data.json");

    const companies = new Map<number, any>();
    const skills = new Map<number, any>();

    seedData.companies.map((c: any) => companies.set(c.id, { name: c.name, dbId: null }));
    seedData.skills.map((s: any) => skills.set(s.id, { name: s.name, dbId: null }));

    // Upsert companies
    for (const key of companies.keys()) {
        const company = companies.get(Number(key));
        const savedObj = await prisma.company.upsert({
            where: { name: company.name },
            update: {},
            create: {
                name: company.name,
            },
        });
        company.dbId = savedObj.id;
    }

    // Upsert skills
    for (const key of skills.keys()) {
        const skill = skills.get(Number(key));
        const savedObj = await prisma.skill.upsert({
            where: { name: skill.name },
            update: {},
            create: {
                name: skill.name,
            },
        });
        skill.dbId = savedObj.id;
    }

    // Add profiles, profile's skills, useful links, projects, and work experiences
    for (const profile of seedData.profiles) {
        const workExp = profile.workExperience.reduce((acc: any[], current: any) => {
            acc.push({
                position: current.position,
                achievement: current.achievement,
                startedAt: new Date(current.startedAt),
                endedAt: current.endedAt ? new Date(current.endedAt) : null,
                companyId: companies.get(current.companyId).dbId,
            });
            return acc;
        }, []);

        const profileSkills = profile.skills.reduce((acc: any[], current: any) => {
            acc.push({
                skillId: skills.get(current).dbId,
            });
            return acc;
        }, []);

        await prisma.profile.create({
            data: {
                name: profile.name,
                shortDescription: profile.shortDescription,

                usefulLinks: {
                    create: profile.usefulLinks,
                },

                projects: {
                    create: profile.projects,
                },

                workExperience: {
                    create: workExp,
                },

                skillsOnProfiles: {
                    createMany: {
                        data: profileSkills,
                    },
                },
            },
        });
    }
}

main();
