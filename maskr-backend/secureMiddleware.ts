import { NextFunction, Request, Response } from "express";

export function secureMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("Session:", req.session);
  console.log("User:", req.session?.user);

  if (req.session?.user) {
    res.locals.user = req.session.user;
    return next();
  }
  return res.redirect("/login");
}
