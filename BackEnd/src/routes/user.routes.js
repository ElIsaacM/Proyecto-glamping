import { Router } from "express";
import { 
    getusers,
    getuserByName,
    createUser,
    updateUser,
    deleteUser,
    activateUser,
    getUserStats,
    userFilters
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', getusers);
router.post('/search', getuserByName);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.put('/activate/:id', activateUser);
router.get('/stats', getUserStats);
router.get('/filters', userFilters);

export default router;