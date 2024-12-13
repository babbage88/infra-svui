import { z } from "zod";
import type { User } from "$lib/services/user";

export const userSchema = z.object({
	id: z.number(),
	username: z.string(),
	email: z.string(),
	role: z.string(),
	createdAt: z.string(),
	lastModified: z.string(),
	enabled: z.boolean(),
	isDeleted: z.boolean(),
});

export type UserTableItem = z.infer<typeof userSchema>;

export async function transformAndValidateUsers(users: User[]): Promise<UserTableItem[]> {
    return users.map(user => {
      // Validate each user against the schema
      const result = userSchema.parse(user);
      return result;
    });
}
