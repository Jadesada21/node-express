
export function safeResponse<T extends { password: string }>(user: T) {
    const { password, ...safeData } = user
    return safeData
}