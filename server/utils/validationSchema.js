const { z } = require("zod");

const userSchema = z.object({
    name: z.string().trim().min(1),
    email: z.string().toLowerCase().email(),
    password: z.string().min(8),
    number: z.string().min(10),
});

const emailSchema = userSchema.omit({
    name: true,
    password: true,
});

const loginSchema = z.object({
    email: z.string().min(1).toLowerCase(),
    password: z.string().min(1),
});

const jobSchema = z.object({
    name: z.string().min(1),
    logo: z.string().min(1),
    position: z.string().min(1),
    salary: z.coerce.number().nonnegative(),
    jobType: z.enum(["Full-Time", "Part-Time", "Contract", "Internship"]),
    remote: z.enum(["Remote", "Office"]),
    location: z.string().min(1),
    description: z.string().min(1),
    about: z.string().min(1),
    skills: z.string().min(1),
    information: z.string(),
});

module.exports = {
    userSchema,
    emailSchema,
    loginSchema,
    jobSchema,
};
