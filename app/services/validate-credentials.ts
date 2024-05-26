import { DaprClient } from "@dapr/dapr";
import { createHash } from "crypto";
import { stateUserStoreName } from "~/types/constants";
import { User } from "~/types/user";

export async function validateCredentials(username: FormDataEntryValue | null, password: FormDataEntryValue | null): Promise<{ key: string; data: User; etag?: string | undefined; error?: string | undefined; } | null> {
    const daprClient = new DaprClient();
    // Implement your logic to validate the credentials here
    // For example, you can check if the username and password match a user in your database
    // Return the userId if the credentials are valid, otherwise return null
    const passwordHash = createHash('sha256').update(password as string).digest('hex');
    // console.log('passwordHash', passwordHash);
    // echo -n 'MyP@ssw0rd'| shasum -a 256
    // await daprClient.state.save(stateUserStoreName, [{
    //     key: '1715C4B2-F0A7-4EC1-92CB-66CE9C73EEF3',
    //     value: {
    //         displayName: "admin",
    //         passwordHash: "b676993c5c591ce1f67b0f0efc4912a8a04782b1283254824c7fb9afc3d7dd3f",
    //     } as User
    // }]);
    const data = await daprClient.state.query(stateUserStoreName, {
        filter: {
            AND: [{
                EQ: { displayName: username }
            }, {
                EQ: { passwordHash: passwordHash }
            }]
        },
        page: {
            limit: 1
        },
        sort: []
    });

    if (data.results.length === 0) {
        return null;
    }

    return data.results[0];
}
