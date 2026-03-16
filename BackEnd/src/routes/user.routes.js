import { Router } from "express";
import { 
    getusers,
    getuserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', getusers);
router.get('/:id', getuserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
