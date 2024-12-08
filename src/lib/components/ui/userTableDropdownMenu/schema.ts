import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	id: z.string(),
	username: z.string(),
	email: z.string(),
	role: z.date(),
	createdAt: z.date(),
    lastModified: z.string(),
    enabled: z.boolean(),
});

export type Task = z.infer<typeof taskSchema>;