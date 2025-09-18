export type User = { email: string; username: string; pwd: string; createdAt: number };

function normalize(email: string) {
    return email.trim().toLowerCase();
}

let users: User[] = [
    { email:"tropicalFruits123@gmail.com", username: "tropicalFruits123", pwd: "12345678", createdAt: Date.now() - 86400000 },
    { email: "appleU@gmail.com", username: "apple123", pwd: "12345678A", createdAt: Date.now() - 3600000 },
];

export function userExists(email: string) {
    const e = normalize(email);
    return users.some(u => u.email === e);
}

export function addUser(email: string, pwd: string) {
    const e = normalize(email);
    if (userExists(e)) return false;
    users.push({ email: e, username: "", pwd: pwd, createdAt: Date.now() });
    return true;
}