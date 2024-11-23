'use server'
export const ValidateAdmin = (val: string) => process.env.USER === val;
