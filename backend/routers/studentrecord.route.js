import { Router } from "express";
import { getstudentlist, addnewstudent, editstudent, deletestudent } from "../controllers/studentcontroller.js";
const router = Router();

router.get('/',getstudentlist);
router.post('/',addnewstudent);
router.put('/:id',editstudent);
router.delete('/:id',deletestudent);

export default router;