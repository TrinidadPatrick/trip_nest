import { generateVerificationToken } from "../helpers/generate-verification-token"
import { getAllUsers, createUser, User } from "../services/user.services"


export const c_getUsers = async (req : any, res : any) => {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (error : any) {
        res.status(500).json({message: error?.message})
    }
}

export const c_createUser = async ( req: any, res: any) => {
    const data : User = req.body

    const now = new Date()
    now.setHours(now.getHours() + 2)

    const verificationToken = generateVerificationToken()
    
    data.tokenExpiresAt = now
    data.verificationToken = verificationToken

    try {
        const user = await createUser(data)
        res.json(user)
    } catch (error : any) {
        res.status(500).json({message: error?.message})
    }
}