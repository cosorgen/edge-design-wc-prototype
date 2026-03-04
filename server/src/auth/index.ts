import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';
import path from 'path';

type CustomRequest = Request & {
  session: Session & { authenticatedRoutes?: Record<string, boolean> };
};

export function protectRoute(route: string) {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    // Check if the user is authenticated for this route
    if (
      req.session.authenticatedRoutes &&
      req.session.authenticatedRoutes[route]
    ) {
      return next();
    }

    // If password is incorrect or missing, show password form
    const pubDir = process.env.PUBLIC_DIR || 'public';
    res.sendFile(path.join(__dirname, pubDir, 'signin.html'));
  };
}

export function signInRoute(route: string, routePass?: string) {
  return (req: CustomRequest, res: Response): void => {
    // Check if the correct password is provided
    if (req.body.password === routePass) {
      // Mark this route as authenticated in the session
      req.session.authenticatedRoutes = {
        ...req.session.authenticatedRoutes,
        [route]: true,
      };
      res.sendStatus(200);
      return;
    }

    res.sendStatus(401);
  };
}
