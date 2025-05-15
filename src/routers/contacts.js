import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  upsertContactController
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createValidateScheme, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';


const router = Router();

  router.use(authenticate);

  router.get('/', ctrlWrapper(getContactsController));

  router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

  router.post('/', validateBody(createValidateScheme), ctrlWrapper(createContactController));

  router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

  router.put('/:contactId', isValidId, validateBody(createValidateScheme), ctrlWrapper(upsertContactController));

  router.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;


