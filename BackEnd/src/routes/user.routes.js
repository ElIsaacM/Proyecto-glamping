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

import { validateRules } from '../middleware/validate.middleware.js';
import { rulesCreateUser, rulesUpdateUser } from '../validators/user.rules.js';

const router = Router();

router.get('/', getusers);
router.post('/search', getuserByName);
router.post('/', rulesCreateUser, validateRules, createUser);
router.put('/:id', rulesUpdateUser, validateRules, updateUser);
router.delete('/delete/:id', deleteUser);
router.put('/activate/:id', activateUser);
router.get('/stats', getUserStats);
router.get('/filters', userFilters);

export default router;