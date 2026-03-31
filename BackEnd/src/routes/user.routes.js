import { Router } from "express";
import { 
    getusers,
    getuserByName,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', getusers);
router.post('/search', getuserByName);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;