import { body } from 'express-validator'

export const loginValidation = [
    body('email', "Notogri email").isEmail(),
    body('password', "Juda qisqa parol").isLength({ min: 5 }),
]

export const registerValidation = [
    body('email', "Notogri email").isEmail(),
    body('password', "Juda qisqa parol").isLength({ min: 5 }),
    body('fullName', "Juda qisqa ism").isLength({ min: 3 }),
    body('avatarUrl', "Notogri havola").optional().isURL()
]

export const postCreateValidation = [
    body('title', "Sarlavhani kiriting").isLength({ min: 3 }).isString(),
    body('text', "Maqolani kiriting").isLength({ min: 3 }).isString(),
    body('tags', "Teglar notogri (massiv kiriting)").optional().isString(),
    body('imageUrl', "Notogri havola").optional().isString()
]