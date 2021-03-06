import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";

type UserDTO = {
  id: string;
  email: string;
};

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const retorno: UserDTO = { id: user.id, email: user.email };

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

    return res.json({
      retorno,
      token,
    });
  }
}

export default new AuthController();
